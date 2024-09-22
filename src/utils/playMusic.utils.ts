"use client"

import { playerController } from "@/components/Wrappers/Layout"
import { IMusic } from "@/interfaces/music.interface"
import { IExtendsMusic, setCurrentMusic, setLoading, setMusicDelay } from "@/store/music/music.slice"
import { startMusicInterval } from "./startMusicInterval.utils"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { IUser } from "@/interfaces/user.interface"
import { listen } from "./listen.utils"
import { setOnEnded } from "./setOnEnded.utils"

export const playMusic = (music: IMusic, dispatch: Dispatch<UnknownAction>, user: IUser) => {
  dispatch(setLoading(music._id))

  listen(music._id, dispatch).then(() => {
    dispatch(setMusicDelay(0))

    playerController.playerSrc = music._id

    setOnEnded(user, music, dispatch)

    playerController.onLoadedMetadata = () => {
      const setMusic: IExtendsMusic = { ...music, delay: 0, maxDelay: playerController.getMaxDelay || 0, isPaused: false }
      dispatch(setCurrentMusic(setMusic))
      dispatch(setLoading(null))
      startMusicInterval(dispatch)
      playerController.play()
    }
  })
}