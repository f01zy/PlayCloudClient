"use client"

import { getMusicMode } from '@/components/Wrappers/Layout/index';
import { musicInterval, playerController } from "@/components/Wrappers/Layout";
import { startMusicInterval } from "./startMusicInterval.utils";
import { setIsPaused, } from "@/store/music/music.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react"
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handlePlayClick = (dispatch: Dispatch<UnknownAction>, { _id, author, listenings, name, likes, date, type }: IMusic, user: IUser | null, musicName: string | undefined, router: AppRouterInstance) => {
  if (!user) return router.push("/login")
  if (musicName != name) {
    const music = getMusicMode() === "all" ? user.history[Math.floor(Math.random() * (user.history.length - 1 - 0) + 0)] : { _id, author, listenings, name, likes, date, type }
    playMusic({ _id, author, name, listenings, likes, date, type }, dispatch, user);
    playerController.onEnded = () => { playMusic(music, dispatch, user) };
    return
  }
  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else { if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true)) }
}