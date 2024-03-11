import { createClient } from "contentful";

interface Metadata {
  tags: string[];
}

interface Sys {
  space: Record<string, unknown>[];
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Record<string, unknown>[];
  revision: number;
  contentType: Record<string, unknown>[];
  locale: string;
}

interface Fields {
  title: string;
  date: string;
  description: string;
}

interface DataType {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

async function getData() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_ID as string,
    accessToken: process.env.CONTENTFULL_ACCESS_TOKEN as string,
  });

  const res = await client.getEntries({
    content_type: "blogPost",
  });

  return res.items;
}

export default async function Home() {
  const data: DataType[] = await getData();

  console.log(data);

  return (
    <main className="text-center p-24">
      <div>SM Chopra</div>
      {data.map((post) => (
        <div key={post.sys.id}>
          <p>{post.fields.description}</p>
        </div>
      ))}
    </main>
  );
}
