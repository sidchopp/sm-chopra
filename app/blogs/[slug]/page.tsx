import { notFound } from "next/navigation";
import { getAllBlogs, getBlog } from "@/lib/api";
import { Blog, ParamsWithSlug } from "../../types/types";
import { FormattedDate } from "@/components/FormattedDate";

export async function generateStaticParams() {
  const allArticles = await getAllBlogs();

  const validArticles = allArticles.filter(
    (blog: Blog) => blog.slug && typeof blog.slug === "string"
  );

  return validArticles.map((blog: Blog) => ({
    params: {
      slug: blog.slug,
    },
  }));
}

export default async function BlogPage({ params }: ParamsWithSlug) {
  const blog = await getBlog(params?.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4 md:px-8">
      <section className="w-full">
        <div className="container space-y-6 px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {blog?.title}
          </h1>
          <p className="text-sm text-gray-500">
            <FormattedDate date={blog?.date} />
          </p>
          <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            {blog?.description}
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Back
          </a>
        </div>
      </section>
    </main>
  );
}
