import { NextRequest } from "next/server";

interface AzureSearchDocument {
  content: string;
  filePath?: string;
}

interface AzureSearchResponse {
  value?: AzureSearchDocument[];
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // 1) Query Azure AI Search (hybrid or vector query depending on your setup)
  const searchEndpoint = process.env.AZURE_SEARCH_ENDPOINT!; // e.g. https://xxxx.search.windows.net
  const indexName = process.env.AZURE_SEARCH_INDEX!;         // e.g. repo-index
  const searchKey = process.env.AZURE_SEARCH_API_KEY!;
  const apiVersion = "2025-09-01"; // example stable API version used in current docs

  const searchRes = await fetch(
    `${searchEndpoint}/indexes/${indexName}/docs/search?api-version=${apiVersion}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": searchKey,
      },
      body: JSON.stringify({
        search: message,
        top: 5,
        select: "content,filePath",
      }),
    }
  );

  const searchJson: AzureSearchResponse = await searchRes.json();
  const chunks: Array<{ content: string; filePath?: string }> =
    (searchJson.value || []).map((d: AzureSearchDocument) => ({
      content: d.content,
      filePath: d.filePath,
    }));

  const context = chunks
    .map((c, i) => `SOURCE ${i + 1}: ${c.filePath ?? "unknown"}\n${c.content}`)
    .join("\n\n---\n\n");

  // 2) Call Azure OpenAI Chat Completions
  // (Use the Azure OpenAI chat completions format from docs)
  const aoaiEndpoint = process.env.AZURE_OPENAI_ENDPOINT!; // e.g. https://xxxx.openai.azure.com
  const aoaiKey = process.env.AZURE_OPENAI_API_KEY!;
  const chatDeployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT!; // your deployment name
  const aoaiApiVersion = "2025-01-01-preview"; // depends on your resource; keep in env if you prefer

  const chatRes = await fetch(
    `${aoaiEndpoint}/openai/deployments/${chatDeployment}/chat/completions?api-version=${aoaiApiVersion}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": aoaiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Answer ONLY using the provided repository context. If missing, say you don't know based on the repo.",
          },
          { role: "user", content: `Question:\n${message}\n\nRepo context:\n${context}` },
        ],
        temperature: 0.2,
      }),
    }
  );

  const chatJson = await chatRes.json();
  const answer = chatJson?.choices?.[0]?.message?.content ?? "No answer returned.";

  return Response.json({
    answer,
    sources: chunks.map((c) => c.filePath).filter(Boolean),
  });
}
