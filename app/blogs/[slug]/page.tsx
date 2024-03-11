import { getAllBlogs, getBlog } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allArticles = await getAllBlogs();

  const validArticles = allArticles.filter(
    (blog) => blog.slug && typeof blog.slug === "string"
  );

  return validArticles.map((blog) => ({
    params: {
      slug: blog.slug,
    },
  }));
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params?.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {blog?.title}
            </h1>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {blog?.description}
            </p>
          </div>
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
