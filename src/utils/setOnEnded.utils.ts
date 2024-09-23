import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, playlistId: string | undefined = undefined) => {
  let playlist = playlistId ? user.playlists.find(pl => pl._id === playlistId)?.tracks : user.history
  if (!playlist) return
  const music = getMusicMode() === "all" ?
    playlist[Math.floor(Math.random() * (user.history.length - 1 - 0) + 0)] :
    currentMusic
  playerController.onEnded = () => { playMusic(music, dispatch, user) };
}