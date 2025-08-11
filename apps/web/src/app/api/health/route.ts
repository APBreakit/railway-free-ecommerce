import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(
    { status: 'ok', service: 'web', timestamp: Date.now() },
    { status: 200, headers: { 'X-Request-Id': crypto.randomUUID() } }
  )
}