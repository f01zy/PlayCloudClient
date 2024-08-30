"use client"

import { playerController } from "@/components/Wrappers/Layout"
import { IMusic } from "@/interfaces/music.interface"
import { IExtendsMusic, setCurrentMusic, setLoading, setMusicDelay } from "@/store/music/music.slice"
import { startMusicInterval } from "./startMusicInterval.utils"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { IUser } from "@/interfaces/user.interface"
import { listen } from "./listen.utils"

export const playMusic = ({ _id, author, listenings, name, likes, date, type }: IMusic, dispatch: Dispatch<UnknownAction>, user: IUser) => {
  dispatch(setLoading(_id))
  console.log("loading", name)
  listen(_id, dispatch).then(() => {
    dispatch(setMusicDelay(0))

    playerController.playerSrc = _id

    playerController.onLoadedMetadata = () => {
      const setMusic: IExtendsMusic = { type, date, _id, listenings, author, name, likes, delay: 0, maxDelay: playerController.getMaxDelay || 0, isPaused: false }
      dispatch(setCurrentMusic(setMusic))
      dispatch(setLoading(null))
      startMusicInterval(dispatch)
      playerController.play()
    }
  })
}