import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, id: string | undefined = undefined) => {
  const findPlaylist = user.playlists.find(playlist => playlist._id === id)
  let playlist = id ? findPlaylist?.tracks : user.history
  if (!playlist) return
  let index = playlist.indexOf(currentMusic)
  index === playlist.length ? index = 0 : index++
  const music = getMusicMode() === "all" ?
    playlist[index] :
    currentMusic
  playerController.onEnded = () => { id ? playMusic(findPlaylist!, dispatch, user) : playMusic(music, dispatch, user) };
}