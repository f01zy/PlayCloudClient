import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export interface IMusicStore extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

interface ISite {
  music: IMusicStore | null,
}

const initialState: ISite = {
  music: null,
}

export const siteSlice = createSlice({
  initialState,
  name: "site",
  reducers: {
    setCurrentMusic(state, { payload }: { payload: IMusicStore | null }) {
      state.music = payload
    },

    setMusicDelay(state, { payload }: { payload: number }) {
      if (state.music) state.music.delay = payload
    },

    setIsPaused(state, { payload }: { payload: boolean }) {
      if (state.music) state.music.isPaused = payload
    }
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused } = siteSlice.actions

export default siteSlice.reducer