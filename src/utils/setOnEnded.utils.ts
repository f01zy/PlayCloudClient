import { alert } from './alert.utils';
import { $api } from '@/http';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { random } from './random.utils';
import { IPlaylist } from '@/interfaces/playlist.interface';

export const setOnEnded = async (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, id: string | undefined = undefined) => {
  const findPlaylist = await $api.get<IPlaylist>(`/playlist/${id}`).then(res => res.data)
  let playlist = id ? findPlaylist.tracks : user.history
  if (!playlist) playlist = user.history
  const music = getMusicMode() === "random" ?
    playlist[random(0, playlist.length - 1)] :
    currentMusic
  console.log(playlist, music)
  playerController.onEnded = () => { id ? playMusic(findPlaylist!, dispatch, user) : playMusic(music, dispatch, user) };
}