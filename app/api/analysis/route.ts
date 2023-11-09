async function getCheckyResponse({ url, type }: { url: string; type: number }) {
  try {
    const endpoint = new URL("http://13.124.34.149:8080/v1");

    endpoint.pathname = "/crawling/result/stream";

    endpoint.searchParams.append("url", url);
    endpoint.searchParams.append("type", type.toString());

    return fetch(endpoint.href, {
      headers: {
        "Content-Type": "application/json",
        withCredentials: "true",
      },
      credentials: "include",
      method: "GET",
    }).then((response) => response);
  } catch (error) {
    console.error(error);
  }
}

export type CheckyResponseType = {
  code: number;
  message: string;
  data: {
    summaryContent: string;
    tags: string[];
    words: string[];
    ads: string[];
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const type = searchParams.get("type");

  return await getCheckyResponse({
    url: url as string,
    type: Number(type),
  });
}
