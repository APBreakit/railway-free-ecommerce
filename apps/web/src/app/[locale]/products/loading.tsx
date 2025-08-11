import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingProducts() {
  return (
    <main className="container py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-8 w-48" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          <Skeleton className="h-10 w-full md:w-80" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i} className="rounded-container bg-white shadow-sm overflow-hidden border border-neutral-200">
            <Skeleton className="aspect-square w-full bg-neutral-100" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}