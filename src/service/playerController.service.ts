"use client"

import { SERVER_URL } from "@/config"
import { setMusicDelay } from "@/store/site/site.slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export class PlayerController {
  private readonly player = (typeof window !== 'undefined' ? new window.Audio() : null) as HTMLAudioElement

  public play(id: string) {
    if (!this.player.paused) this.player.pause()
    this.player.src = `${SERVER_URL}/music/${id}.mp3`
    this.player.play()
  }


  public rewind(number: number, dispatch: Dispatch<UnknownAction>) {
    if (this.player.currentTime + number < 0) this.player.currentTime = 0
    else if (this.player.currentTime + number > this.player.duration) this.player.currentTime = this.player.duration
    else this.player.currentTime += number
    dispatch(setMusicDelay(Math.floor(this.player.currentTime)))
  }

  public pause() { this.player.pause() }

  public resume() { this.player.play() }

  get getIsPaused() { return this.player.paused }

  get getMusicDelay() { return Math.floor(this.player.currentTime) }

  get getMaxDelay() { return Math.floor(this.player.duration) }

  set setOnLoadedMetadata(func: (this: GlobalEventHandlers) => any) { this.player.onloadedmetadata = func }

  set setOnEnded(func: (this: GlobalEventHandlers) => any) { this.player.addEventListener("ended", func) }
}