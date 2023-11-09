"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { useRef } from "react";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import useScrollFadeInLeft from "../hooks/useScrollFadeInLeft";
import useScrollFadeInRight from "../hooks/useScrollFadeInRight";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollFadeIn1 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn2 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn3 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn4 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn5 = useScrollFadeIn(0.7, "50%");

  const scrollFadeIn6 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn7 = useScrollFadeInLeft();
  const scrollFadeIn8 = useScrollFadeInRight();
  const scrollFadeIn9 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn10 = useScrollFadeIn(0.7, "50%");
  const scrollFadeIn11 = useScrollFadeInLeft();
  const scrollFadeIn12 = useScrollFadeInRight();
  const scrollFadeIn13 = useScrollFadeIn(0.7, "50%");

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 컨텍스트 팝업을 위한 x, y 좌표
    const x = e.pageX;
    const y = e.pageY;

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-700 text-sm mb-5 transition duration-300 ease-in-out"
        >
          여기를 클릭하여 openai의 좀 더 자세한 정보를 확인하세요!
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-700 sm:text-7xl">
          모든 텍스트를 요약하세요!{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">GPT로 느끼는 놀라운 경험</span>
          </span>{" "}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-500  text-gray-600 leading-7">
          당신이 원하는 무엇이든, 링크를 통해 Detta에게 알려주세요. <br />
          Detta는 당신의 요청을 들어주고, 당신이 원하는 모든 것을 만들어줄
          것입니다.
        </h2>
        <button
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
          onClick={scrollToSection}
        >
          본격적으로 시작하기
        </button>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg text-gray-800">
                  maybe Detta looks like...
                </h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/Detta-icon.png"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg text-gray-800">
                  maybe Detta looks like...
                </h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={1024}
                  height={1024}
                  src="/Detta-icon-bg.png"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div>아래 단계를 따라 시작해보세요</div>
        <section ref={scrollRef} className="w-full">
          <div
            {...scrollFadeIn1}
            className="text-gray-700 text-3xl font-semibold pb-5 pt-20"
          >
            1 단계: Detta 영상 확인
          </div>
        </section>
        <section className="h-[700px] w-full">
          <div
            {...scrollFadeIn2}
            className="text-gray-700 text-3xl font-semibold pb-5 pt-20"
          >
            2 단계: Detta 설치 및 고정하기
          </div>
          <div className="w-full flex text-gray-800 gap-4">
            <div className="flex-1 aurora rounded-xl flex justify-center flex-col items-center">
              <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-96">
                Detta를 처음 시작하시나요?
              </div>
              <Link
                className="text-blue-600 hover:text-blue-500 transition hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://chrome.google.com/webstore/category/extensions?hl=ko"
                type=""
              >
                구글 웹스토어 바로가기
              </Link>
              <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-96">
                <Image
                  alt="search in store"
                  width={538}
                  height={710}
                  src="/Detta-search.gif"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
            <div className="flex-1 aurora rounded-xl flex justify-center flex-col items-center">
              <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-96">
                Detta를 설치하셨나요?
              </div>
              <div className="text-blue-600">
                툴바에 고정해서 좀 더 편리하게 사용하세요.
              </div>
              <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-96">
                <Image
                  alt="search in store"
                  width={566}
                  height={608}
                  src="/Detta-fix.gif"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="h-[700px] w-full text-gray-800">
          <div
            {...scrollFadeIn3}
            className="text-gray-700 text-3xl font-semibold pb-5 pt-20"
          >
            3 단계: Detta가 도움이 되는 상황
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div {...scrollFadeIn6} className="text-blue-600 text-4xl">
              광고성 글이 의심될 때 🤔
            </div>
            <div {...scrollFadeIn7} className="text-blue-600 text-3xl">
              링크로 이동하기 싫지만 알고 싶을 때 😁
            </div>
            <div {...scrollFadeIn8} className="text-blue-600 text-4xl">
              간단히 요약된 글을 읽고 싶을 때 🧐
            </div>
            <div {...scrollFadeIn9} className="text-blue-600 text-3xl">
              여러 소스의 내용을 확인하고 싶을 때 🥳
            </div>
            <div {...scrollFadeIn10} className="text-blue-600 text-4xl">
              시간을 절약하고 싶을 때 ⏰
            </div>
            <div {...scrollFadeIn11} className="text-blue-600 text-3xl">
              나의 아카이브가 필요할 때 🫙
            </div>
            <div {...scrollFadeIn12} className="text-blue-600 text-4xl">
              gpt와 빠른 채팅이 필요할 때 🤖
            </div>
            <div {...scrollFadeIn13} className="text-blue-600 text-3xl">
              더 많은 기능을 사용하고 싶을 때 🤩
            </div>
          </div>
        </section>
        <section className="h-[700px] w-full">
          <div
            {...scrollFadeIn4}
            className="text-gray-700 text-3xl font-semibold pb-5 pt-20"
          >
            4 단계: Detta와 함께 플레이!
          </div>
          <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-full">
            <Image
              alt="search in store"
              width={2734}
              height={1734}
              src="/Detta-chat.gif"
              className="w-full object-cover h-[550px] rounded-2xl sm:mt-0 mt-2"
            />
          </div>
        </section>
        <section className="h-[700px] w-full text-gray-800">
          <div
            {...scrollFadeIn5}
            className="text-gray-700 text-3xl font-semibold pb-5 pt-20"
          >
            5 단계: Detta를 사용하면 좋은 사이트
          </div>
          <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-full">
            <Image
              alt="search in store"
              width={1480}
              height={600}
              src="/good-for-you.png"
              className="w-full object-cover rounded-2xl sm:mt-0 mt-2"
            />
          </div>
        </section>
        <section className="h-[700px] w-full text-gray-800">
          <div className="font-semibold text-xl  py-2 my-4 rounded-lg w-full justify-center">
            <Image
              alt="search in store"
              width={1024}
              height={1024}
              src="/Detta-icon.png"
              className="w-[700px] object-cover rounded-2xl sm:mt-0 mt-2 opacity-50 mx-auto"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
