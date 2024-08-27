import { IMusic } from "./music.interface"

export interface IUser {
  _id: string
  username: string
  email: string
  isActivated: boolean
  likes: Array<IMusic>
  tracks: Array<IMusic>
  history: Array<IMusic>
}