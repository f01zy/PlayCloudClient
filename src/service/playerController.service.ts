"use client"

import { STATIC_URL } from "@/config"
import { setMusicDelay } from "@/store/site/site.slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export class PlayerController {
  private readonly player = typeof window !== 'undefined' ? new window.Audio() : null

  public play(id: string) {
    if (!this.player) return
    if (!this.player.paused) this.player.pause()
    this.player.src = `${STATIC_URL}/music/${id}.mp3`
    this.player.play()
  }

  public pause() {
    if (!this.player) return
    this.player.pause()
  }

  public rewind(number: number, dispatch: Dispatch<UnknownAction>) {
    if (!this.player) return
    if (this.player.currentTime + number < 0) this.player.currentTime = 0
    else if (this.player.currentTime + number > this.player.duration) this.player.currentTime = this.player.duration
    else this.player.currentTime += number
    dispatch(setMusicDelay(Math.floor(this.player.currentTime)))
  }

  public resume() {
    if (!this.player) return
    this.player.play()
  }

  get getIsPaused() {
    if (!this.player) return
    return this.player.paused
  }

  get getMusicDelay() {
    if (!this.player) return
    return Math.floor(this.player.currentTime)
  }

  get getMaxDelay() {
    if (!this.player) return
    return Math.floor(this.player.duration)
  }

  set setOnLoadedMetadata(func: (this: GlobalEventHandlers) => any) {
    if (!this.player) return
    this.player.onloadedmetadata = func
  }

  set setOnEnded(func: (this: GlobalEventHandlers) => any) {
    if (!this.player) return
    this.player.addEventListener("ended", func)
  }
}