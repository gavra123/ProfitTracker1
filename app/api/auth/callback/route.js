import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  // Uzmi secret iz cookie koji smo snimili
  const secret = request.cookies.get('client_secret')?.value

  if (!shop || !code || !secret) {
    return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
  }

  const clientId = request.cookies.get('client_id')?.value

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers
