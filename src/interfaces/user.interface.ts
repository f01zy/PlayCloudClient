import { IMusic } from "./music.interface"

export interface IUser {
  username: string
  email: string
  isActivated: boolean
  _id: string
  liked: Array<IMusic>
  music: Array<IMusic>
  history: Array<IMusic>
}