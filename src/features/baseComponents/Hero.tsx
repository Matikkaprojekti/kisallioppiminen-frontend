import React from 'react'
import Link from '../baseComponents/Link'

export default function Hero(location: any) {
  // console.log(location)

  return (
    <div className="maintenance">
      <div className="maintenance-header-text">Päivitys käynnissä</div>
      <div className="maintenance-text">Tämä sivu on sovelluksen vanha versio, jonka käyttöä voit jatkaa. Uusin versio on taas pian käytettävissä.</div>
      <Link href="/">
        <img className="maintenance-hero-logo" src="/img/kisalli-logo.png" alt="Kisallioppiminen.fi Logo" />
      </Link>
      <div className="hero-content">
        <span className="hero-location">{location.location}</span>
      </div>
    </div>
  )
}
