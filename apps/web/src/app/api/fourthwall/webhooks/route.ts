import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'

export const runtime = 'nodejs'

// Fast 200, async processing placeholder
export async function POST(req: Request) {
  const requestId = crypto.randomUUID()

  try {
    const secret = process.env.FOURTHWALL_WEBHOOK_SECRET
    if (!secret) {
      return NextResponse.json(
        { error: { code: 'CONFIG_ERROR', message: 'Missing FOURTHWALL_WEBHOOK_SECRET', requestId } },
        { status: 500, headers: { 'X-Request-Id': requestId } }
      )
    }

    const signatureHeader =
      req.headers.get('x-fourthwall-signature') || req.headers.get('x-signature') || ''

    const rawBody = await req.text()
    if (!signatureHeader || !rawBody) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Missing signature or body', requestId } },
        { status: 400, headers: { 'X-Request-Id': requestId } }
      )
    }

    // Normalizacja (obsługa ewentualnego prefiksu 'sha256=')
    const provided = signatureHeader.replace(/^sha256=/i, '')
    const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')

    const providedBuf = Buffer.from(provided, 'hex')
    const expectedBuf = Buffer.from(expected, 'hex')

    if (
      providedBuf.length !== expectedBuf.length ||
      !timingSafeEqual(providedBuf, expectedBuf)
    ) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid signature', requestId } },
        { status: 401, headers: { 'X-Request-Id': requestId } }
      )
    }

    // Minimalne przetwarzanie: revalidateTag dla produktów
    try {
      revalidateTag('fourthwall:products')
    } catch {
      // Ignorujemy błąd revalidate, by nie blokować 200
    }

    return new NextResponse(null, {
      status: 200,
      headers: { 'X-Request-Id': requestId },
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: 'WEBHOOK_ERROR', message: err?.message || 'Unexpected error', requestId } },
      { status: 500, headers: { 'X-Request-Id': requestId } }
    )
  }
}