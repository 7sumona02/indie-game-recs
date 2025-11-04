import { create } from 'zustand'

export const gameGallery = create((set) => ({
  games: [],
  
  setGames: (games) => set({ games }),

  createGame: async (newGame) => {
    if (!newGame.name || !newGame.genre || !newGame.price || !newGame.image) {
      return { success: false, message: 'All fields are required.' }
    }

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      })

      if (!res.ok) {
        const error = await res.text()
        return { success: false, message: error || 'Failed to add game.' }
      }

      const data = await res.json()

      set((state) => ({ games: [...state.games, data.data] }))

      return { success: true, message: 'Game added successfully!' }

    } catch (err) {
      console.error('Error adding game:', err)
      return { success: false, message: 'Server error occurred.' }
    }
  },

  fetchGames: async () => {
    const res = await fetch('/api/games');
    const data = await res.json()
    set({ games: data })
  },

  deleteGame: async(gid) => {
    const res = await fetch(`/api/games/${gid}`, {
        method:'DELETE'
    })
    const data = await res.json()
    if(!data.success) {
        return {success:false, message:data.message || 'Failed to delete game.'}
    }
    set(state => ({games:state.games.filter(game => game._id !== gid)}))
  },

  updateGame: async (gid, updatedGame) => {
  try {
    const res = await fetch(`/api/games/${gid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGame),
    })
    const data = await res.json()

    if (!data.success) {
      return { success: false, message: data.message || 'Failed to update game.' }
    }

    set((state) => ({
      games: state.games.map((game) =>
        game._id === gid ? data.data : game
      ),
    }))

    return { success: true, message: 'Game updated successfully!' }
  } catch (err) {
    console.error('Error updating game:', err)
    return { success: false, message: 'Server error.' }
  }
}
}))