import { gameGallery } from '@/lib/game'
import { toast } from "sonner"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Input } from './ui/input'
import { useState } from 'react'

const GameCard = ({ game }) => {
    const { deleteGame,updateGame } = gameGallery()
    const [updatedGame, setUpdatedGame] = useState(game)

    const handleDeleteGame = async (gid) => {
        const { success, message } = await deleteGame(gid)
        if (success) {
            toast(message)
        } else {
            toast(message)
        }
    }

    const handleUpdateGame = async (gid, updatedGame) => {
       await updateGame(gid,updatedGame)
       toast("Game updated")
    }
    return (
        <div className='w-lg border-2 border-neutral-900 p-1 flex gap-5 text-sm'>
            <div className='w-30 aspect-square overflow-hidden'>
                <img src={game.image} alt={game.name} className='w-full h-full object-cover' />
            </div>
            <div className='w-full flex flex-col justify-between gap-2 p-1'>
                <div className='w-full flex justify-between items-center font-semibold'>
                    <div>{game.name}</div>
                    <div>{game.price}</div>
                </div>
                <div className='text-xs text-neutral-500'>{game.genre}</div>
                <div className='w-full flex gap-2 justify-end text-xs font-semibold'>
                    <Drawer>
  <DrawerTrigger>
    <div className="cursor-pointer border-2 border-neutral-900 px-2 py-1">
      Edit
    </div>
  </DrawerTrigger>

  <DrawerContent className="font-mono flex justify-center items-center">
    <DrawerHeader>
      <DrawerTitle className="text-xl font-bold">Update Game</DrawerTitle>
    </DrawerHeader>

    <div className="py-5 space-y-2">
      <Input
        placeholder="Name"
        value={updatedGame.name}
        onChange={(e) => setUpdatedGame({ ...updatedGame, name: e.target.value })}
        className="text-sm p-0"
      />
      <Input
        placeholder="Genre"
        value={updatedGame.genre}
        onChange={(e) => setUpdatedGame({ ...updatedGame, genre: e.target.value })}
        className="text-sm p-0"
      />
      <Input
        placeholder="Price"
        value={updatedGame.price}
        onChange={(e) => setUpdatedGame({ ...updatedGame, price: e.target.value })}
        className="text-sm p-0"
      />
      <Input
        placeholder="Image URL"
        value={updatedGame.image}
        onChange={(e) => setUpdatedGame({ ...updatedGame, image: e.target.value })}
        className="text-sm p-0"
      />
    </div>

    <DrawerFooter>
      <button
        onClick={() => handleUpdateGame(game._id, updatedGame)}
        className="w-fit cursor-pointer border-2 border-neutral-900 px-2 py-1 text-sm"
      >
        Update
      </button>
      <DrawerClose>
        <button className="w-fit cursor-pointer border-2 border-neutral-900 px-2 py-1 text-sm">
          Cancel
        </button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

                    <div className='cursor-pointer border-2 border-neutral-900 px-2 py-1' onClick={() => handleDeleteGame(game._id)}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default GameCard