import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container flex min-h-[50vh] flex-col items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-dark mb-4">404</h1>
        <p className="text-lg text-neutral-dark/70 mb-8">
          Nie znaleziono strony
        </p>
        <Button asChild>
          <Link href="/">Powrót do strony głównej</Link>
        </Button>
      </div>
    </main>
  )
}