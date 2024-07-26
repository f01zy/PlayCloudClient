import { IUser } from "@/interfaces/user.interface"
import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { login, register } from "./user.actions"

interface IState {
  error: SerializedError | null,
  loading: boolean,
  user: IUser | null
}

const initialState: IState = {
  error: null,
  loading: false,
  user: null
} as IState

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, { payload }: { payload: IUser | null }) => {
      state.user = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error
        state.loading = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload!
        state.error = null
        state.loading = false
      })

      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload!
        state.error = null
        state.loading = false
      })
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer