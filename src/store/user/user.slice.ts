import { IUser } from "@/interfaces/user.interface"
import { createSlice } from "@reduxjs/toolkit"
import { login, register } from "./user.actions"

interface IState { error: null | string | undefined, status: "success" | "error" | null, loading: boolean, user: IUser | null }

const initialState: IState = { error: null, status: null, loading: false, user: null } as IState

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
      .addCase(register.pending, state => { state.loading = true })
      .addCase(register.rejected, (state, action) => { state.error = ""; state.status = "error"; state.loading = false })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload!; state.status = "success"; state.loading = false })

      .addCase(login.pending, state => { state.loading = true })
      .addCase(login.rejected, (state, action) => { state.error = action.payload as string; state.status = "error"; state.loading = false })
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload!; state.status = "success"; state.loading = false })
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer