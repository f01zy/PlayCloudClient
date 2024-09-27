import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { random } from './random.utils';

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, id: string | undefined = undefined) => {
  const findPlaylist = user.playlists.find(playlist => playlist._id === id)
  let playlist = id ? findPlaylist?.tracks : user.history
  if (!playlist) return
  const music = getMusicMode() === "random" ?
    playlist[random(0, playlist.length - 1)] :
    currentMusic
  playerController.onEnded = () => { id ? playMusic(findPlaylist!, dispatch, user) : playMusic(music, dispatch, user) };
}