"use client";
import { useState } from "react";
import Header from "../Header";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import parse from "html-react-parser";

export type CheckyResponseType = {
  code: number;
  message: string;
  data: {
    title: string;
    adsPercent: number;
    summaryContent: string;
    tags: string[];
  };
};

type Tag = {
  id: number;
  name: string;
  color: string;
};

const colorList = [
  "#F87171",
  "#FBBF24",
  "#60A5FA",
  "#34D399",
  "#F472B6",
  "#FCD34D",
  "#93C5FD",
  "#6EE7B7",
  "#F472B6",
  "#FCD34D",
  "#93C5FD",
  "#6EE7B7",
];

const Playground = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [checkyResult, setCheckyResult] = useState<{
    title: string;
    adsPercent: number;
    summaryContent: string;
    tags: Tag[];
  }>({
    title: "",
    adsPercent: 0,
    summaryContent: "",
    tags: [],
  });

  function wrapSpecificTextInSpan(
    inputString: string,
    targetText: string
  ): string {
    // 정규식을 사용하여 대상 문자열을 검색하고 각 매치를 <span> 태그로 감싼다.
    const regex = new RegExp(targetText, "g");
    const wrappedString = inputString.replace(
      regex,
      `<span style="font-weight: bold; color: #3f75e5">${targetText}</span>`
    );

    return wrappedString;
  }

  async function requestSummaryApi(body: { url: string; type: number }) {
    const baseUrl = "/api/analysis";
    const params = {
      url: body.url,
      type: String(body.type),
    };

    const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
    const requrl = `${baseUrl}?${queryString}`; // 완성된 요청 url.

    return await fetch(requrl, {
      method: "GET",
    });
  }

  const isUrl = (url: string) => {
    const regExp = new RegExp(
      "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$"
    );
    return regExp.test(url);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!isUrl(input)) {
      alert("올바른 URL을 입력해주세요.");
      setLoading(false);
      return;
    }
    await requestSummaryApi({
      url: input,
      type: checked ? 1 : 0,
    }).then((res) => {
      if (res.status === 200) {
        parseSummaryStreamResult(res, (chunk) => {
          if (chunk.includes("data: [DONE]")) return;
          if (!isJSON(chunk)) return;
          const parsedChunk = JSON.parse(chunk);

          const { title, summaryContent, tags, adsPercent } = parsedChunk.data;

          let replaceString = summaryContent as string;
          replaceString = replaceString?.replace(/"/g, "");
          replaceString = replaceString?.replace(/\\n/g, "<br/><br/>");

          const tagList: Tag[] = [];
          tags.forEach((item: string, index: number) => {
            replaceString = wrapSpecificTextInSpan(replaceString, item);
            const newTag = {
              name: item.trim(),
              // color: COLORS[Math.floor(Math.random() * COLORS.length)],
              color: colorList[index % colorList.length],
              id: index,
            };
            tagList.push(newTag);
          });

          setLoading(false);
          setCheckyResult({
            title,
            summaryContent: replaceString,
            tags: tagList,
            adsPercent,
          });
        }).then((result) => {
          setLoading(false);
          return result;
        });
      } else {
        setLoading(false);
        alert("요청에 실패했습니다.");
        return {
          summaryContent: "",
          tags: [],
          words: [],
          ads: [],
        };
      }
    });

    await fetch("/api/keywords", {
      method: "GET",
    }).then((res) => {
      console.log(res);
    });
  };

  async function parseSummaryStreamResult(
    response: Response,
    onDelta?: (chunk: string) => unknown
  ) {
    const reader = response.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();

    let result = "";
    while (reader) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      if (value.includes("data: [DONE]")) {
        break;
      }

      const lines = value.split("\n\n").filter(Boolean);
      const chunks = lines
        .map((line) => line.substring(5).trim())
        .map((line) => line.replace(/\\n/g, "<br/>"))
        // non-whitespace character를 지우고, 빈 문자열이 아닌 것만 남긴다.
        .filter(Boolean);

      chunks.forEach((chunk) => {
        result += chunk;
        onDelta?.(chunk);
      });
    }
    return result;
  }

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const progressText = (adsPercent: number) => {
    if (adsPercent === 0) {
      return "이 글은 광고일리가 없어요.";
    } else if (adsPercent < 40) {
      return "이 글은 광고일 가능성이 낮아요.";
    } else if (adsPercent < 60) {
      return "이 글은 광고일 확률이 높아요.";
    } else if (adsPercent < 100) {
      return "🔪이 글은 99% 광고협찬 글이에요.🔪";
    } else {
      return "광고가 너무 많아요!";
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-start py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-start text-center px-4 py-2 background-gradient">
        <form
          onSubmit={onSubmit}
          className="text-black my-2 flex justify-center items-center gap-2"
          style={{
            width: "550px",
            backgroundColor: "white",
          }}
        >
          <input
            className="h-10 flex-1 outline-none px-4 border-[#b7634f] border rounded-lg"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg"
            type="submit"
          >
            {loading ? "loading" : "검색"}
          </button>
        </form>
        <div className="w-[550px] text-black border-[#b7634f] border rounded-lg px-8 py-4 bg-white">
          <div className="flex justify-between items-center py-4 border-b border-zinc-200">
            <div className="font-bold flex text-black items-center gap-2 text-2xl">
              <Image
                src={"/checky-logo.png"}
                width={32}
                height={32}
                alt="logo"
              />
              Checky
              <div className="rounded-full border-black border-2 w-5 h-5 flex justify-center items-center text-sm ml-2">
                ?
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value="isGPT4"
                className="sr-only peer"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <div className="w-14 h-7 relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500">
                {checked ? (
                  <div className="absolute top-1.5 left-1 text-xs font-medium text-white">
                    4.0
                  </div>
                ) : (
                  <div className="absolute top-1.5 right-1 text-xs font-medium text-gray-900 dark:text-gray-300">
                    3.5
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="flex text-xl font-bold py-4">
            # {checkyResult.title}
          </div>
          <div className="flex text-sm text-zinc-500">Checky 측정 결과</div>
          <div className="flex text-md font-bold">
            {progressText(checkyResult.adsPercent)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
            <div
              className="bg-orange-500 h-2.5 rounded-full dark:bg-orange-400"
              style={{ width: `${checkyResult.adsPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-end text-zinc-400 py-2 text-xs">
            * GPT 모델과 Checky의 규칙 기반으로 분석되고 있어요.
          </div>
          <div className="flex gap-2 text-sm text-zinc-500 py-6">
            {checkyResult.tags?.map((tag, index) => (
              <div
                key={index}
                className="flex items-center text-xs font-bold text-zinc-500 px-4 py-2 rounded-full"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              borderRadius: "4px",
              textAlign: "left",
              lineHeight: 1.3,
              fontSize: "14px",
            }}
          >
            {parse(checkyResult.summaryContent || "")}
          </div>
          <div>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="w-full mt-8 noticeSwiper"
              centerInsufficientSlides={true}
              centeredSlidesBounds={true}
              centeredSlides={true}
            >
              {checkyResult.tags?.map((tag, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-24 bg-white rounded-lg border-[#b7634f] border p-2">
                    <div className="flex text-sm underline pb-2">
                      {tag.name}
                    </div>
                    <div className="flex text-xs text-left">
                      멜라토닌(영어: melatonin)은 활동일 주기를 조절하는 호르..
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div></div>
          </div>
        </div>
        <h1 className="text-6xl font-bold text-zinc-700 py-4">Checky</h1>
        <p className="mt-3 text-2xl text-zinc-700">
          Checky is a chrome extension for summarizing text.
        </p>
      </main>
    </div>
  );
};

export default Playground;
