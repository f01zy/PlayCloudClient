import { IUser } from "@/interfaces/user.interface"
import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { login, register } from "./user.actions"

interface IState { message: { status: "success" | "error", message: string } | null, loading: boolean, user: IUser | null }

const initialState: IState = { message: null, loading: false, user: null } as IState

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
      .addCase(register.rejected, (state, action) => { state.message = { message: "An error occurred. Try again later", status: "error" }; state.loading = false })
      .addCase(register.fulfilled, (state, action) => { state.user = action.payload!; state.message = { message: "Success auth. ", status: "success" }; state.loading = false })

      .addCase(login.pending, state => { state.loading = true })
      .addCase(login.rejected, (state, action) => { state.message = { message: "An error occurred. Try again later", status: "error" }; state.loading = false })
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload!; state.message = { message: "Success auth. ", status: "success" }; state.loading = false })
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer