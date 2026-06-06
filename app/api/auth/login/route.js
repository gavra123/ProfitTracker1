import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get('shop')
  const apiKey = searchParams.get('client_id')
  const clientSecret = searchParams.get('client_secret')
  const redirectUri = `${process.env.HOST}/api/auth/callback`
  const scopes = 'read_orders,read_products'
  const nonce = Buffer.from(`${apiKey}:${clientSecret}`).toString('base64')

  if (!shop || !apiKey || !clientSecret) {
    return new NextResponse(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Profit Tracker</title>
<style>*{box-sizing:border-box}body{font-family:sans-serif;max-width:420px;margin:4rem auto;padding:1rem}h2{margin-bottom:1rem}input{width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:6px;font-size:1rem}button{width:100%;padding:12px;background:#000;color:#fff;border:none;border-radius:6px;font-size:1rem;cursor:pointer;margin-top:8px}</style>
</head><body>
<h2>Profit Tracker</h2>
<form method="GET">
  <input name="shop" placeholder="prodavnica.myshopify.com" required/>
  <input name="client_id" placeholder="Client ID" required/>
  <input name="client_secret" placeholder="Secret" type="password" required/>
  <button type="submit">Poveži prodavnicu</button>
</form>
</body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  }

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`
  return NextResponse.redirect(authUrl)
}
