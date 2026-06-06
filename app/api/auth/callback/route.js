import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')
  const clientId = searchParams.get('cid')
  const clientSecret = searchParams.get('cs')

  if (!shop || !code || !clientId || !clientSecret) {
    return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
  }

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  })

  const data = await response.json()
  const token = data.access_token

  if (!token) {
    return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
  }

  const res = NextResponse.redirect(`${process.env.HOST}/dashboard`)
  res.cookies.set('shop', shop, { httpOnly: true, secure: true, maxAge: 86400 * 30 })
  res.cookies.set('token', token, { httpOnly: true, secure: true, maxAge: 86400 * 30 })

  return res
}
