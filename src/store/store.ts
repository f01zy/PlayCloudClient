import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/user.slice'
import siteSlice from './site/site.slice'
import alertSlice from './alert/alert.slice'
import musicSlice from './music/music.slice'

const reducers = combineReducers({ userSlice, siteSlice, alertSlice, musicSlice })

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store["getState"]>;
export type AppDispatch = typeof store.dispatch;