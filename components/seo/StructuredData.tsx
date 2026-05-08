import { getJsonLdGraph } from "@/lib/site-config";

export default function StructuredData() {
  const graph = getJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; Next will safely inline this server-rendered content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

