import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export type TMode = "one" | "all"

export interface IExtendsMusic extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

interface IMusicStore {
  music: IExtendsMusic | null,
  loading: string | null
  mode: TMode
}

const initialState: IMusicStore = {
  music: null,
  loading: null,
  mode: "all"
}

export const musicSlice = createSlice({
  initialState,
  name: "music",
  reducers: {
    setCurrentMusic(state, { payload }: { payload: IExtendsMusic | null }) { state.music = payload },
    setMusicDelay(state, { payload }: { payload: number }) { if (state.music) state.music.delay = payload },
    setIsPaused(state, { payload }: { payload: boolean }) { if (state.music) state.music.isPaused = payload },
    setLoading(state, { payload }: { payload: string | null }) { state.loading = payload },
    setMode(state, { payload }: { payload: TMode }) { state.mode = payload },
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setLoading, setMode } = musicSlice.actions

export default musicSlice.reducer