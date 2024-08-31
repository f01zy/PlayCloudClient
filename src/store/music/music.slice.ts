import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export interface IExtendsMusic extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

interface IMusicStore {
  music: IExtendsMusic | null,
  loading: string | null,
  modeLoading: boolean
}

const initialState: IMusicStore = {
  music: null,
  loading: null,
  modeLoading: false
}

export const musicSlice = createSlice({
  initialState,
  name: "music",
  reducers: {
    setCurrentMusic(state, { payload }: { payload: IExtendsMusic | null }) { state.music = payload },
    setMusicDelay(state, { payload }: { payload: number }) { if (state.music) state.music.delay = payload },
    setIsPaused(state, { payload }: { payload: boolean }) { if (state.music) state.music.isPaused = payload },
    setLoading(state, { payload }: { payload: string | null }) { state.loading = payload },
    setModeLoading(state, { payload }: { payload: boolean }) { state.modeLoading = payload },
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setLoading, setModeLoading } = musicSlice.actions

export default musicSlice.reducer