import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

export interface IMusicStore extends IMusic {
  delay: number,
  maxDelay: number,
  isPaused: boolean
}

export interface IAlert {
  message: string,
  isShow: boolean
}

interface ISite {
  music: IMusicStore | null,
  alert: IAlert,
  blocked: boolean,
  sidebar: boolean,
  windowForm: "uploadTrack" | "editProfile" | null,
  loading: boolean
}

const initialState: ISite = {
  music: null,
  alert: { isShow: false, message: "" },
  blocked: false,
  sidebar: false,
  windowForm: null,
  loading: false
}

export const siteSlice = createSlice({
  initialState,
  name: "site",
  reducers: {
    setCurrentMusic(state, { payload }: { payload: IMusicStore | null }) { state.music = payload },

    setMusicDelay(state, { payload }: { payload: number }) { if (state.music) state.music.delay = payload },

    setIsPaused(state, { payload }: { payload: boolean }) { if (state.music) state.music.isPaused = payload },

    setAlert(state, { payload }: { payload: string }) { state.alert = { isShow: true, message: payload } },

    hideAlert(state) { state.alert.isShow = false },

    setBlocked(state, { payload }: { payload: boolean }) { state.blocked = payload },

    setSidebar(state, { payload }: { payload: boolean }) { state.sidebar = payload },

    setWindowForm(state, { payload }: { payload: "uploadTrack" | "editProfile" | null }) { state.windowForm = payload },

    setLoading(state, { payload }: { payload: boolean }) { state.loading = payload },
  }
})

export const { setMusicDelay, setCurrentMusic, setIsPaused, setAlert, setBlocked, hideAlert, setSidebar, setWindowForm, setLoading } = siteSlice.actions

export default siteSlice.reducer