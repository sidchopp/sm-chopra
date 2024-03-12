import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/api";
import { FormattedDate } from "@/components/FormattedDate";
import { Blog } from "./types/types";

export default async function Home() {
  const blogs = await getAllBlogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full pt-12">
        <div className="mx-auto container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center  text-center">
            <h1 className="mb-4 font-extrabold leading-none tracking-tight text-gray-900 text-4xl md:text-5xl lg:text-7xl dark:text-white text-center py-4">
              <span className="text-blue-600 dark:text-blue-500">
                Sham Mohan{" "}
              </span>
              Chopra
            </h1>
            <p className="pb-6 text-lg lg:text-xl font-normal text-gray-500 sm:px-16 xl:px-48 dark:text-gray-400">
              "The purpose of our lives is to be happy." - Dalai Lama
            </p>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              About me
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog: Blog) => (
                <article
                  key={blog.sys.id}
                  className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-900"
                >
                  <Image
                    alt="placeholder"
                    className="aspect-[4/3] object-cover w-full"
                    height="263"
                    src={blog?.image?.url}
                    width="350"
                  />
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="font-bold leading-tight text-zinc-900 dark:text-zinc-50 py-4 text-xl md:text-2xl lg:text-3xl">
                      {blog?.title}
                    </h3>
                    <p className="text-sm text-gray-400 pb-2">
                      <FormattedDate date={blog?.date} />
                    </p>
                    <p className="text-lg md:text-xl font-normal text-gray-500 lg:text-xl dark:text-gray-200 text-left flex-1">
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
