import { NextResponse } from 'next/server'

export async function GET(request) {
  const shop = process.env.SHOPIFY_STORE
  const redirectUri = `${process.env.HOST}/api/auth/callback`
  const scopes = process.env.SHOPIFY_SCOPES
  const apiKey = process.env.SHOPIFY_API_KEY
  const nonce = Math.random().toString(36).substring(2)

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`

  return NextResponse.redirect(authUrl)
}
