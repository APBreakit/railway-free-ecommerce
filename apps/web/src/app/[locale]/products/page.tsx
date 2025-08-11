import Image from 'next/image'
import { type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/get-dictionary'
import { Input } from '@/components/ui/input'

export const revalidate = 60

type Props = {
  params: { locale: string }
  searchParams?: { page?: string; limit?: string; q?: string; min?: string; max?: string }
}

type ProductLike = {
  id?: string | number
  title?: string
  name?: string
  image?: { url?: string }
  images?: Array<{ url?: string }>
  primaryImageUrl?: string
  price?: { amount?: number; currency?: string } | number | string
}

function getTitle(item: ProductLike) {
  return item.title || item.name || '—'
}

function getImageUrl(item: ProductLike) {
  return item.image?.url || item.images?.[0]?.url || item.primaryImageUrl || ''
}

function getPrice(item: ProductLike) {
  if (typeof item.price === 'number') return { amount: item.price, currency: 'USD' }
  if (typeof item.price === 'string') return { amount: Number(item.price), currency: 'USD' }
  if (item.price && typeof item.price === 'object') {
    return { amount: item.price.amount ?? 0, currency: item.price.currency ?? 'USD' }
  }
  return { amount: 0, currency: 'USD' }
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const locale = params.locale as Locale
  const dict = await getDictionary(locale)

  const page = Math.max(1, Number(searchParams?.page ?? 1))
  const limit = Math.min(48, Math.max(1, Number(searchParams?.limit ?? 12)))
  const q = (searchParams?.q ?? '').toString().trim()
  const minRaw = (searchParams?.min ?? '').toString().trim()
  const maxRaw = (searchParams?.max ?? '').toString().trim()
  const min = Number.isFinite(Number(minRaw)) && minRaw !== '' ? Number(minRaw) : undefined
  const max = Number.isFinite(Number(maxRaw)) && maxRaw !== '' ? Number(maxRaw) : undefined

  const qs = new URLSearchParams()
  qs.set('locale', locale)
  qs.set('page', String(page))
  qs.set('limit', String(limit))
  if (q) qs.set('q', q)
  if (typeof min === 'number') qs.set('min', String(min))
  if (typeof max === 'number') qs.set('max', String(max))

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/fourthwall/products?${qs.toString()}`, {
    // Fallback do względnego URL jeśli brak NEXT_PUBLIC_SITE_URL w środowisku dev
    cache: 'no-store',
    next: { revalidate: 60 },
  }).catch(() => null)

  let items: ProductLike[] = []
  if (res && res.ok) {
    const payload = await res.json().catch(() => ({}))
    const data = payload?.data
    if (Array.isArray(data)) {
      items = data as ProductLike[]
    } else if (Array.isArray(data?.items)) {
      items = data.items as ProductLike[]
    } else if (Array.isArray(payload?.items)) {
      items = payload.items as ProductLike[]
    } else if (Array.isArray(payload)) {
      items = payload as ProductLike[]
    }
  }

  // Paginate helpers
  const buildHref = (pageNum: number) => {
    const p = new URLSearchParams()
    p.set('page', String(pageNum))
    p.set('limit', String(limit))
    if (q) p.set('q', q)
    if (typeof min === 'number') p.set('min', String(min))
    if (typeof max === 'number') p.set('max', String(max))
    return `/${locale}/products?` + p.toString()
  }
  const hasPrev = page > 1
  const hasNext = items.length === limit
  const prevHref = hasPrev ? buildHref(page - 1) : undefined
  const nextHref = hasNext ? buildHref(page + 1) : undefined

  return (
    <main className="container py-8 md:py-12">
      <header className="mb-6 md:mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-dark">
          {dict.products.title}
        </h1>

        <form className="w-full md:w-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              name="q"
              defaultValue={q}
              aria-label={dict.products.filters.searchPlaceholder}
              placeholder={dict.products.filters.searchPlaceholder}
              className="w-full md:w-80"
            />
            <Input
              type="number"
              inputMode="decimal"
              step="0.01"
              name="min"
              defaultValue={typeof min === 'number' ? String(min) : ''}
              aria-label={dict.products.filters.minPlaceholder}
              placeholder={dict.products.filters.minPlaceholder}
            />
            <Input
              type="number"
              inputMode="decimal"
              step="0.01"
              name="max"
              defaultValue={typeof max === 'number' ? String(max) : ''}
              aria-label={dict.products.filters.maxPlaceholder}
              placeholder={dict.products.filters.maxPlaceholder}
            />
          </div>
        </form>
      </header>

      {items.length === 0 ? (
        <p className="text-neutral-dark/70">{dict.products.empty}</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => {
            const title = getTitle(item)
            const img = getImageUrl(item)
            const price = getPrice(item)
            return (
              <li key={(item.id ?? idx).toString()} className="group rounded-container bg-white shadow-sm overflow-hidden border border-neutral-200">
                <a href="#" className="block">
                  <div className="relative aspect-square bg-neutral-100">
                    {img ? (
                      <Image
                        src={img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        priority={idx < 4}
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-neutral-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-neutral-900 line-clamp-2">{title}</h3>
                    <div className="mt-1 text-sm text-neutral-700">
                      {price.amount ? `${price.amount} ${price.currency}` : '—'}
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}
      <nav className="mt-8 flex items-center justify-between">
        <a
          className={`text-sm px-4 py-2 rounded-md border ${hasPrev ? 'text-neutral-800 hover:bg-neutral-50' : 'pointer-events-none text-neutral-400 bg-neutral-50'}`}
          href={prevHref}
          aria-disabled={!hasPrev}
        >
          ← {dict.products.pagination.prev}
        </a>
        <span className="text-sm text-neutral-600">
          {page}
        </span>
        <a
          className={`text-sm px-4 py-2 rounded-md border ${hasNext ? 'text-neutral-800 hover:bg-neutral-50' : 'pointer-events-none text-neutral-400 bg-neutral-50'}`}
          href={nextHref}
          aria-disabled={!hasNext}
        >
          {dict.products.pagination.next} →
        </a>
      </nav>
    </main>
  )
}