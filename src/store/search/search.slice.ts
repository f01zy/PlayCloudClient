import { createSlice } from "@reduxjs/toolkit"

type TField = "music"

interface ISearch {
  query: string,
  field: TField
}

const initialState: ISearch = {
  query: "",
  field: "music"
}

export const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    setQuery(state, { payload }: { payload: string }) { state.query = payload },
    setField(state, { payload }: { payload: TField }) { state.field = payload },
  }
})

export const { setQuery, setField } = searchSlice.actions

export default searchSlice.reducer