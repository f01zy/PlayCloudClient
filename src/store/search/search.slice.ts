import { IMusic } from "@/interfaces/music.interface"
import { createSlice } from "@reduxjs/toolkit"

type TField = "music"

type TResult = { music: Array<IMusic> }

interface ISearch {
  query: string,
  field: TField,
  result: TResult
}

const initialState: ISearch = {
  query: "",
  field: "music",
  result: { music: [] }
}

export const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    setQuery(state, { payload }: { payload: string }) { state.query = payload },
    setField(state, { payload }: { payload: TField }) { state.field = payload },
    setMusicResult(state, { payload }: { payload: Array<IMusic> }) { state.result.music = payload },
  }
})

export const { setQuery, setField, setMusicResult } = searchSlice.actions

export default searchSlice.reducer