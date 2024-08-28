import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className=' items-center'>
      <img className='max-w-xs' src='/logo.svg'></img>
      <Button className='text-right'>Sign In</Button>
      <br />
      <br />
      <hr />
      <br />
    </div>
  )
}

export default Header
