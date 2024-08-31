"use client"

import { musicInterval, playerController } from "@/components/Wrappers/Layout";
import { startMusicInterval } from "./startMusicInterval.utils";
import { setIsPaused, } from "@/store/music/music.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react"
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setOnEnded } from './setOnEnded.utils';

export const handlePlayClick = (dispatch: Dispatch<UnknownAction>, currentMusic: IMusic, user: IUser | null, musicName: string | undefined, router: AppRouterInstance) => {
  if (!user) return router.push("/login")
  if (musicName != currentMusic.name) {
    setOnEnded(user, currentMusic, dispatch)
    return
  }
  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else { if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true)) }
}