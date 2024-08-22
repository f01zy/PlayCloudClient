"use client"

import Card from "@/components/Card"
import Upload from "@/components/Upload"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { IUser } from "@/interfaces/user.interface"
import styles from "@/page/Profile/styles.module.scss"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

enum ESlide { "Треки" }
const length = Object.keys(ESlide).length / 2
const values: Array<string> = []

for (let i = 0; i < length; i++) {
  values.push(ESlide[i])
}

const Profile: FC<{ id: string }> = ({ id }) => {
  const [fetchUser, setFetchUser] = useState<IUser>()
  const user = useTypedSelector(selector => selector.userSlice.user)
  const [slide, setSlide] = useState<ESlide>(ESlide.Треки)
  const [isUploadForm, setIsUploadForm] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    $api.get<IUser>(`/users/${id}`).then(res => setFetchUser(res.data))
  }, [])

  return fetchUser ? (
    <div className={styles.profile}>
      {isUploadForm ? <Upload setIsUploadForm={setIsUploadForm} setFetchUser={setFetchUser} /> : ""}
      <div className={styles.user}>
        <div className={styles.banner}></div>
        <div className={styles.user_info}>
          <div className={styles.avatar}></div>
          <h3>{fetchUser.username}</h3>
          <p>{fetchUser.music.length} треков</p>
        </div>
      </div>
      <nav>
        <ul>
          {values.map(el => (
            <li className={values.indexOf(el) === slide ? "border-b-2 border-white pb-2" : ""} key={el}>{el}</li>
          ))}
          {user?._id || "" === fetchUser._id ? <li onClick={() => setIsUploadForm(!isUploadForm)}>Upload</li> : ""}
        </ul>
      </nav>
      {slide === ESlide.Треки ? (
        <div className={styles.tracks}>
          {fetchUser.music.map(song => <Card key={song._id} {...song} />)}
        </div>
      ) : ""}
    </div>
  ) : ""
}

export default Profile;