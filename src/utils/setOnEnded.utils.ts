import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, playlistId: string | undefined = undefined) => {
  const pl = user.playlists.find(pl => pl._id === playlistId)
  let playlist = playlistId ? pl?.tracks : user.history
  if (!playlist) return
  const music = getMusicMode() === "all" ?
    playlist[Math.floor(Math.random() * (playlist.length - 1 - 0) + 0)] :
    currentMusic
  console.log(playlistId, playlist.length, music.name)
  playerController.onEnded = () => { playMusic(music, dispatch, user) };
}