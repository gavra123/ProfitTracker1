import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop') || process.env.SHOPIFY_STORE

  if (!shop) {
    return new NextResponse(`
      <html><body style="font-family:sans-serif;max-width:400px;margin:4rem auto;text-align:center">
        <h2>Profit Tracker</h2>
        <form method="GET">
          <input name="shop" placeholder="prodavnica.myshopify.com" 
            style="width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:6px;font-size:1rem"/>
          <button style="width:100%;padding:10px;background:#000;color:#fff;border:none;border-radius:6px;font-size:1rem;cursor:pointer">
            Poveži prodavnicu
          </button>
        </form>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  const cleanShop = shop.replace('https://', '').replace('/', '')
  const redirectUri = `${process.env.HOST}/api/auth/callback`
  const scopes = process.env.SHOPIFY_SCOPES
  const apiKey = process.env.SHOPIFY_API_KEY
  const nonce = Math.random().toString(36).substring(2)

  const authUrl = `https://${cleanShop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`

  return NextResponse.redirect(authUrl)
}
