"use client"

import { playerController } from "@/components/Wrappers/Layout"
import { IMusic } from "@/interfaces/music.interface"
import { IExtendsMusic, setCurrentMusic, setLoading, setMusicDelay } from "@/store/music/music.slice"
import { startMusicInterval } from "./startMusicInterval.utils"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { IUser } from "@/interfaces/user.interface"
import { listen } from "./listen.utils"
import { setOnEnded } from "./setOnEnded.utils"
import { IPlaylist } from "@/interfaces/playlist.interface"
import { random } from "./random.utils"

export const playMusic = (composition: IMusic | IPlaylist, dispatch: Dispatch<UnknownAction>, user: IUser) => {
  const track = composition.type === "track" ? composition : composition.tracks[random(0, composition.tracks.length - 1)]

  dispatch(setLoading(track._id))

  listen(track._id, dispatch).then(() => {
    dispatch(setMusicDelay(0))

    playerController.playerSrc = track._id

    composition.type === "track" ? setOnEnded(user, track, dispatch) : setOnEnded(user, track, dispatch, composition._id)

    playerController.onLoadedMetadata = () => {
      const setMusic: IExtendsMusic = { ...track, delay: 0, maxDelay: playerController.getMaxDelay || 0, isPaused: false }
      dispatch(setCurrentMusic(setMusic))
      dispatch(setLoading(null))
      startMusicInterval(dispatch)
      playerController.play()
    }
  })
}