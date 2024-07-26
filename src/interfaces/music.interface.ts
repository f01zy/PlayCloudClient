import { IUser } from "./user.interface";

export interface IMusic {
  author: Omit<IUser, "music" | "liked">
  name: string
  listening: Array<string>,
  liked: Array<string>,
  _id: string
}