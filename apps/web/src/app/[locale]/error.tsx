'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="container flex min-h-[50vh] flex-col items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-dark mb-4">Błąd</h1>
        <p className="text-lg text-neutral-dark/70 mb-8">
          Coś poszło nie tak
        </p>
        <Button onClick={() => reset()}>
          Spróbuj ponownie
        </Button>
      </div>
    </main>
  )
}