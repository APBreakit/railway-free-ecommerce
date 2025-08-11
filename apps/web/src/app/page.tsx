export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <section className="container py-16">
        <div className="rounded-container bg-warm-cream p-8 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-dark">
            All Natural
          </h1>
          <p className="mt-4 text-lg text-neutral-dark/80">
            Naturalne produkty pielęgnacyjne w ciepłych, ziemistych tonach – pewność jakości i
            prostoty.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center rounded-brand bg-brand-primary px-6 py-3 text-white shadow hover:bg-brand-secondary transition-colors"
              data-analytics-id="hero_cta"
            >
              Zobacz kolekcje
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}