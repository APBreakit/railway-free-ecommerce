import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const requestId = crypto.randomUUID()

  try {
    const base = process.env.FOURTHWALL_API_BASE
    const token = process.env.FOURTHWALL_TOKEN

    if (!base || !token) {
      return NextResponse.json(
        { error: { code: 'CONFIG_ERROR', message: 'Missing FOURTHWALL_API_BASE or FOURTHWALL_TOKEN', requestId } },
        { status: 500, headers: { 'X-Request-Id': requestId } }
      )
    }

    const incomingUrl = new URL(req.url)
    const apiUrl = new URL(`${base.replace(/\/$/, '')}/products`)

    // Whitelist dozwolonych parametrów
    const allowedParams = new Set(['page', 'limit', 'locale', 'q'])
    for (const [key, value] of incomingUrl.searchParams.entries()) {
      if (allowedParams.has(key)) apiUrl.searchParams.set(key, value)
    }

    const res = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      // ISR + cache tag
      next: { revalidate: 60, tags: ['fourthwall:products'] },
      // Krótki timeout na połączenie
      signal: AbortSignal.timeout(5000),
    })

    const contentType = res.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const payload = isJson ? await res.json() : await res.text()

    if (!res.ok) {
      return NextResponse.json(
        {
          error: {
            code: `FOURTHWALL_${res.status}`,
            message: typeof payload === 'string' ? payload : payload?.message || 'Upstream error',
            requestId,
          },
        },
        {
          status: res.status,
          headers: {
            'X-Request-Id': requestId,
          },
        }
      )
    }

    // Pass-through danych w bezpiecznej otoczce
    return NextResponse.json(
      { data: payload, requestId },
      {
        status: 200,
        headers: {
          'X-Request-Id': requestId,
          'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err: any) {
    const message = err?.name === 'TimeoutError' ? 'Upstream timeout' : err?.message || 'Unexpected error'
    return NextResponse.json(
      { error: { code: 'PROXY_ERROR', message, requestId } },
      { status: 502, headers: { 'X-Request-Id': requestId } }
    )
  }
}