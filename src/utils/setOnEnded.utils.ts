import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getMusicMode, playerController } from "@/components/Wrappers/Layout";
import { IUser } from "@/interfaces/user.interface";
import { playMusic } from "./playMusic.utils";
import { IMusic } from "@/interfaces/music.interface";
import { useTypedSelectorType } from '@/hooks/selector.hook';

export const setOnEnded = (user: IUser, currentMusic: IMusic, dispatch: Dispatch<UnknownAction>, useTypedSelector: useTypedSelectorType) => {
  const music = useTypedSelector(selector => selector.musicSlice.mode) === "all" ? user.history[Math.floor(Math.random() * (user.history.length - 1 - 0) + 0)] : currentMusic
  playMusic({ ...currentMusic }, dispatch, user);
  playerController.onEnded = () => { playMusic(music, dispatch, user) };
}