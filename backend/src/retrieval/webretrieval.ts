import axios from "axios";

export async function retrieveWeb(query: string) {
  const response = await axios.post(
    "https://api.tavily.com/search",
    {
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "advanced",
      max_results: 5,
      include_answer: false,
      include_raw_content: true,
    }
  );

  const results = response.data.results || [];

  return results.map((item: any) => ({
    text: item.content || item.raw_content || "",
    source: item.url,
    type: "web",
    title: item.title
  }));
}