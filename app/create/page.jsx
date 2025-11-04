'use client'

import { useState } from 'react'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { gameGallery } from '@/lib/game'
import { toast } from "sonner"

const Page = () => {
  const [newGame, setNewGame] = useState({
    name: '',
    genre: '',
    price: '',
    image: ''
  })
  const [status, setStatus] = useState('')
  const { createGame } = gameGallery()

  const handleAddGame = async () => {
    const result = await createGame(newGame)
    setStatus(result.message)

    if (result.success) {
      setNewGame({ name: '', genre: '', price: '', image: '' }),
      toast("Game added")
    } else {
      toast("Oops, something went wrong")
    }
  }

  return (
    <div className="min-h-screen w-screen bg-neutral-200 flex flex-col items-center font-mono pt-20">
      <div className="text-4xl tracking-tight text-neutral-900 font-bold">Add Game</div>
      
      <div className="mt-10 w-lg space-y-3">
        <Field>
          <Input
            placeholder="Name"
            value={newGame.name}
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
          />
        </Field>

        <Field>
          <Input
            placeholder="Genre"
            value={newGame.genre}
            onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
          />
        </Field>

        <Field>
          <Input
            placeholder="Price"
            value={newGame.price}
            onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
          />
        </Field>

        <Field>
          <Input
            placeholder="Image URL"
            value={newGame.image}
            onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
          />
        </Field>

        <button
          onClick={handleAddGame}
          className="mt-10 bg-black w-full py-3 text-white cursor-pointer hover:bg-neutral-800 transition-all"
        >
          Submit
        </button>

        {status && <p className="text-sm text-center mt-3 text-neutral-700">{status}</p>}
      </div>
    </div>
  )
}

export default Page
