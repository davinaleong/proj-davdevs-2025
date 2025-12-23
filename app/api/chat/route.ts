import { NextRequest } from "next/server";

interface AzureSearchDocument {
  content: string;
  metadata_storage_path?: string;
}

interface AzureSearchResponse {
  value?: AzureSearchDocument[];
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // 1) Query Azure AI Search (hybrid or vector query depending on your setup)
  const searchEndpoint = process.env.AZURE_SEARCH_ENDPOINT!; // e.g. https://xxxx.search.windows.net
  const indexName = process.env.AZURE_SEARCH_INDEX_NAME!;         // e.g. repo-index
  const searchKey = process.env.AZURE_SEARCH_API_KEY!;
  const apiVersion = process.env.AZURE_SEARCH_API_VERSION || "2023-11-01";

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
        queryType: "simple",
        searchFields: "content",
        top: Number(process.env.RAG_TOP_K ?? 6),
        select: "content,metadata_storage_path",
      }),
    }
  );

  const searchJson: AzureSearchResponse = await searchRes.json();

  const chunks: Array<{ content: string; filePath?: string }> =
    (searchJson.value || []).map((d: AzureSearchDocument) => ({
      content: d.content,
      filePath: d.metadata_storage_path,
    }));

  const context = chunks
    .map((c, i) => `SOURCE ${i + 1}: ${c.filePath ?? "unknown"}\n${c.content}`)
    .join("\n\n---\n\n");

  // 2) Call Azure OpenAI Chat Completions
  // (Use the Azure OpenAI chat completions format from docs)
  const aoaiEndpoint = process.env.AZURE_OPENAI_ENDPOINT!; // e.g. https://xxxx.openai.azure.com
  const aoaiKey = process.env.AZURE_OPENAI_API_KEY!;
  const chatDeployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT!; // your deployment name
  const aoaiApiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-04-01-preview";

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
        temperature: Number(process.env.RAG_TEMPERATURE ?? 0.2),
        max_tokens: Number(process.env.RAG_MAX_TOKENS ?? 800),
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
