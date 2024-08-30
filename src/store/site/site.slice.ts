import { createSlice } from "@reduxjs/toolkit"

interface ISite {
  blocked: boolean,
  sidebar: boolean,
  loading: boolean,
  windowForm: "uploadTrack" | "editProfile" | null,
}

const initialState: ISite = {
  blocked: false,
  sidebar: false,
  loading: false,
  windowForm: null,
}

export const siteSlice = createSlice({
  initialState,
  name: "site",
  reducers: {
    setBlocked(state, { payload }: { payload: boolean }) { state.blocked = payload },
    setSidebar(state, { payload }: { payload: boolean }) { state.sidebar = payload },
    setWindowForm(state, { payload }: { payload: "uploadTrack" | "editProfile" | null }) { state.windowForm = payload },
    setLoading(state, { payload }: { payload: boolean }) { state.loading = payload },
  }
})

export const { setBlocked, setSidebar, setWindowForm, setLoading } = siteSlice.actions

export default siteSlice.reducer