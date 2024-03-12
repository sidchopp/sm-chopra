import { notFound } from "next/navigation";
import { getAllBlogs, getBlog } from "@/lib/api";
import { Blog, ParamsWithSlug } from "../../types/types";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <article
            key={blog.sys.id}
            className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {blog?.title}
            </h1>
            <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {blog?.description}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
