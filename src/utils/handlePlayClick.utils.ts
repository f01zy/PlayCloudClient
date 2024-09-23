"use client"

import { musicInterval, playerController } from "@/components/Wrappers/Layout";
import { startMusicInterval } from "./startMusicInterval.utils";
import { setIsPaused, } from "@/store/music/music.slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react"
import { IMusic } from "@/interfaces/music.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { playMusic } from "./playMusic.utils";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { setPlaylist } from "@/store/playlist/playlist.slice";

export const handlePlayClick = (dispatch: Dispatch<UnknownAction>, composition: IMusic | IPlaylist, user: IUser | null, router: AppRouterInstance, musicName: string | undefined) => {
  if (!user) return router.push("/login")
  if (composition.type === "playlist" && composition.tracks.length === 0) return alert("This playlist is empty")
  const name = composition.type == "track" ? composition.name : composition.tracks[0].name
  if (musicName != name) {
    composition.type === "playlist" && dispatch(setPlaylist(composition._id))
    playMusic(composition, dispatch, user)
    return
  }
  if (playerController.getIsPaused) { startMusicInterval(dispatch); playerController.resume(); dispatch(setIsPaused(false)) }
  else { if (musicInterval) clearInterval(musicInterval); playerController.pause(); dispatch(setIsPaused(true)) }
}