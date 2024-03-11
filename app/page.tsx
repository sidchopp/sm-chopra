import { createClient } from "contentful";
import { FormattedDate } from "../components/FormattedDate";

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
    <main className="p-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center py-10">
        Sham Mohan{" "}
        <span className="text-blue-600 dark:text-blue-500">Chopra</span>
      </h1>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          {data.map((post) => (
            <div key={post.sys.id}>
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                {post.fields.title}
              </h2>
              <p className="text-sm text-gray-400 py-2">
                <FormattedDate date={post.fields.date} />
              </p>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200 text-left">
                {post.fields.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
