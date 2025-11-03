'use client'

import { useState } from "react"

const page = () => {
  const [newGame, setNewGame] = useState({
    name: '',
    genre: '',
    price: '',
    image: ''
  })
  return (
    <div className='min-h-screen w-screen bg-neutral-200 flex flex-col justify- items-center font-mono pt-15'>
      <div className='text-4xl tracking-tight text-neutral-900 font-bold'>Your Indie Games Hub</div>
    </div>
  )
}

export default page