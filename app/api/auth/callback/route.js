import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')

  if (!shop || !code) {
    return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
  }

  try {
    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    })

    const data = await response.json()
    const accessToken = data.access_token

    if (!accessToken) {
      return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
    }

    const res = NextResponse.redirect(`${process.env.HOST}/dashboard`)
    res.cookies.set('shop', shop, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 })
    res.cookies.set('token', accessToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 })

    return res
  } catch (e) {
    return NextResponse.redirect(`${process.env.HOST}/api/auth/login`)
  }
}
