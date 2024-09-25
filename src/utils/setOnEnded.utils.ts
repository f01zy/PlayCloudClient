import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { random } from './random.utils';

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, playlistId: string | undefined = undefined) => {
  const pl = user.playlists.find(pl => pl._id === playlistId)
  let playlist = playlistId ? pl?.tracks : user.history
  if (!playlist) return
  const music = getMusicMode() === "all" ?
    playlist[random(0, playlist.length)] :
    currentMusic
  playerController.onEnded = () => { playlistId ? playMusic(pl!, dispatch, user) : playMusic(music, dispatch, user) };
}