import { createSlice } from "@reduxjs/toolkit"

type TWindowForm = "uploadTrack" | "editProfile" | "createPlaylistStepOne" | "createPlaylistStepTwo" | null

interface ISite {
  blocked: boolean,
  sidebar: boolean,
  loading: boolean,
  windowForm: TWindowForm,
  formBlocked: boolean
}

const initialState: ISite = {
  blocked: false,
  sidebar: false,
  loading: false,
  windowForm: null,
  formBlocked: false
}

export const siteSlice = createSlice({
  initialState,
  name: "site",
  reducers: {
    setBlocked(state, { payload }: { payload: boolean }) { state.blocked = payload },
    setSidebar(state, { payload }: { payload: boolean }) { state.sidebar = payload },
    setWindowForm(state, { payload }: { payload: TWindowForm }) { state.windowForm = payload },
    setLoading(state, { payload }: { payload: boolean }) { state.loading = payload },
    setFormBlocked(state, { payload }: { payload: boolean }) { state.formBlocked = payload },
  }
})

export const { setBlocked, setSidebar, setWindowForm, setLoading, setFormBlocked } = siteSlice.actions

export default siteSlice.reducer