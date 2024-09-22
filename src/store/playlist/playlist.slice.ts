import { createSlice } from "@reduxjs/toolkit"

type TCreate = {
  name: string
  description: string
}

interface IPlaylist {
  create: TCreate | null
}

const initialState: IPlaylist = {
  create: null
}

export const playlistSlice = createSlice({
  initialState,
  name: "playlist",
  reducers: {
    setCreate(state, { payload }: { payload: TCreate | null }) { state.create = payload }
  }
})

export const { setCreate } = playlistSlice.actions

export default playlistSlice.reducer