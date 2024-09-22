import { IMusic } from "@/interfaces/music.interface"
import { TMusicMode } from "@/types/musicMode.type"
import { createSlice } from "@reduxjs/toolkit"

export interface IExtendsMusic extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean,
}

interface IMusicStore {
  music: IExtendsMusic | null,
  loading: string | null,
  mode: TMusicMode
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
    setMusicMode(state, { payload }: { payload: TMusicMode }) { state.mode = payload },
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setLoading, setMusicMode } = musicSlice.actions

export default musicSlice.reducer