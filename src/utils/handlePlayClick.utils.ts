"use client"

import { musicInterval, playerController } from "@/components/Layout";
import { startMusicInterval } from "./startMusicInterval.utils";
import { setIsPaused } from "@/store/site/site.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react"
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { $api } from "@/http";

export const handlePlayClick = (dispatch: Dispatch<UnknownAction>, { _id, author, listening, name, liked }: IMusic, user: IUser | null, musicName: string | undefined, router: AppRouterInstance) => {
  if (!user) return router.push("/login")
  if (musicName != name) {
    playMusic({ _id, author, name, listening, liked }, dispatch, user)
    playerController.onEnded = async () => {
      const music = await $api.get<IMusic>("/music/next").then(res => res.data)
      if (!music) return
      console.log(music)
      playMusic({ ...music }, dispatch, user)
    }
  }
  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else { if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true)) }
}