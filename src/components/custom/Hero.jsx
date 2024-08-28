import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div className='items-center'>
      <h1>Plan your trip with us and get matched with other travellers as well <span className='text-[red]'>for free!</span></h1>
      <Link to={'/trip-creation'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Hero
