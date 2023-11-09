async function getCheckyResponse() {
  try {
    const endpoint = new URL("http://13.124.34.149:8080");

    endpoint.pathname = "/crawling/result/keyword";

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

export async function GET() {
  return await getCheckyResponse();
}
