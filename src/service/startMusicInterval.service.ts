import { musicInterval, playerController, setMusicInterval } from "@/components/Layout"
import { setMusicDelay } from "@/store/site/site.slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export const startMusicInterval = (dispatch: Dispatch<UnknownAction>) => {
  if (musicInterval) {
    clearInterval(musicInterval)
    setMusicInterval(null)
  }

  setMusicInterval(setInterval(() => {
    dispatch(setMusicDelay(playerController.getMusicDelay || 0))
  }, 1000))
}