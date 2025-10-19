export default function BlogIndexPage() {
  const posts: Array<{ slug: string; title: string; excerpt: string }> = [];

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">Blog</h1>
        {posts.length === 0 ? (
          <div className="mt-6 border rounded-xl bg-white p-6">
            <div className="text-gray-900 font-medium">Blog is empty. We’ll add some articles soon.</div>
            <p className="mt-2 text-gray-600">Check back later for news, updates and tips from Cardster.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <article key={p.slug} className="border rounded-xl bg-white p-6">
                <h2 className="text-xl font-semibold text-gray-900">{p.title}</h2>
                <p className="mt-2 text-gray-600">{p.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


