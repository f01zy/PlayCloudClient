"use client"

import { musicInterval, playerController } from "@/components/Layout";
import { startMusicInterval } from "./startMusicInterval.service";
import { setIsPaused } from "@/store/site/site.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react"
import { playMusic } from "./playMusic.service";
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handlePlayClick = (dispatch: Dispatch<UnknownAction>, { _id, author, listening, name, liked }: IMusic, user: IUser | null, musicName: string | undefined, router: AppRouterInstance) => {
  if (!user) return router.push("/login")
  if (musicName != name) { playMusic({ _id, author, name, listening, liked }, dispatch, user); return }
  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else { if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true)) }
}