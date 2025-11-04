'use client'

import Link from "next/link"
import { useEffect } from "react"
import {gameGallery} from "@/lib/game" 
import GameCard from "@/components/GameCard"

const page = () => {
  const {fetchGames, games} = gameGallery()

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  console.log(games)
  return (
    <div className='min-h-screen w-screen bg-neutral-200 flex flex-col justify- items-center font-mono pt-15'>
      <div className='text-4xl tracking-tight text-neutral-900 font-bold'>Your Indie Games Hub</div>
      <div className="flex flex-col gap-5 py-10">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
      {games.length===0 && (<div className="pt-20">No products? <Link href='/create' className="underline">Create</Link></div>)}
    </div>
  )
}

export default page