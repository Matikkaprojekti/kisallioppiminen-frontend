import React from 'react'
import Link from '../baseComponents/Link'

export default function Hero(location: any) {
  // console.log(location)

  return (
    <header className="hero">
      <Link href="/">
        <img className="hero-logo" src="/img/kisalli-logo.png" alt="Kisallioppiminen.fi Logo" />
      </Link>
      <div className="hero-content">
        <span className="hero-location">{location.location}</span>
      </div>
    </header>
  )
}
