const About = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <article className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Hi there,
            </h1>
            <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              My name is<i> Sham Mohan Chopra.</i>
            </p>
            <p>More to come in just a little while...</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default About;
