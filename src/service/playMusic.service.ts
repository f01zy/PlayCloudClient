"use client"

import { playerController } from "@/components/Layout"
import { IMusic } from "@/interfaces/music.interface"
import { IMusicStore, setCurrentMusic, setMusicDelay } from "@/store/site/site.slice"
import { startMusicInterval } from "./startMusicInterval.service"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { IUser } from "@/interfaces/user.interface"
import { listen } from "./listen.service"

export const playMusic = ({ _id, author, listening, name, liked }: IMusic, dispatch: Dispatch<UnknownAction>, user: IUser) => {
  listen(_id, dispatch)

  dispatch(setMusicDelay(0))
  playerController.play(_id)

  playerController.setOnLoadedMetadata = () => {
    const setMusic: IMusicStore = { _id, listening, author, name, liked, delay: 0, maxDelay: playerController.getMaxDelay || 0, isPaused: false }
    dispatch(setCurrentMusic(setMusic))
    startMusicInterval(dispatch)
  }

  playerController.setOnEnded = () => {
    if (!user) return
    const index = user.history.indexOf(user.history.find(musicFind => musicFind._id === _id)!)

    let newIndex: number | undefined = undefined
    let musicPlay: IMusic | undefined = undefined

    do {
      newIndex = Math.floor(Math.random() * user.history.length)
    } while (newIndex === index)

    musicPlay = user.history[newIndex]

    if (!musicPlay) return

    playMusic({ ...musicPlay }, dispatch, user)
  }
}