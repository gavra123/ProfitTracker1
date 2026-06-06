'use client'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [shop, setShop] = useState(null)

  useEffect(() => {
    const s = localStorage.getItem('shop')
    if (!s) window.location.href = '/api/auth/login'
    else setShop(s)
  }, [])

  if (!shop) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>Učitavanje...</div>

  return (
    <div style={{fontFamily:'sans-serif',maxWidth:900,margin:'0 auto',padding:'2rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.5rem',fontWeight:700}}>📊 Profit Tracker</h1>
        <span style={{fontSize:'0.85rem',color:'#666',background:'#f0f0f0',padding:'4px 12px',borderRadius:20}}>{shop}</span>
      </div>
      <p style={{color:'#888',textAlign:'center',marginTop:'4rem'}}>Povezano! Dashboard se učitava...</p>
    </div>
  )
}
