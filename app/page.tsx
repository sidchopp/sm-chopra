import { createClient } from "contentful";
import { getAllBlogs } from "@/lib/api";
import { FormattedDate } from "@/components/FormattedDate";
import Link from "next/link";
import Image from "next/image";

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

export default async function Home() {
  const blogs = await getAllBlogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full pt-12">
        <div className="mx-auto container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center py-10">
                Sham Mohan{" "}
                <span className="text-blue-600 dark:text-blue-500">Chopra</span>
              </h1>
            </div>
          </div>
          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.sys.id}
                  className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <Image
                    alt="placeholder"
                    className="aspect-[4/3] object-cover w-full"
                    height="263"
                    src={blog?.image?.url}
                    width="350"
                  />
                  <div className="flex-1 p-6">
                    <Link href={`/blogs/${blog?.slug}`}>
                      <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
                        {blog?.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 pb-2">
                      <FormattedDate date={blog?.date} />
                    </p>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-200 text-left">
                      {blog?.subTitle}
                    </p>
                    <div className="flex justify-start">
                      <Link
                        className="inline-flex h-10 items-center justify-center text-sm font-medium"
                        href={`/blogs/${blog?.slug}`}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
