import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export interface IMusicStore extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

export interface IAlert {
  message: string
}

interface ISite {
  music: IMusicStore | null,
  alert: IAlert | null,
  alertSafeMessage: string
  blocked: boolean
}

const initialState: ISite = {
  music: null,
  alert: null,
  blocked: false,
  alertSafeMessage: ""
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
    },

    setAlert(state, { payload }: { payload: IAlert | null }) {
      state.alert = payload
    },

    setBlocked(state, { payload }: { payload: boolean }) {
      state.blocked = payload
    },

    setAlertSafeMessage(state, { payload }: { payload: string }) {
      state.alertSafeMessage = payload
    }
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setAlert, setBlocked, setAlertSafeMessage } = siteSlice.actions

export default siteSlice.reducer