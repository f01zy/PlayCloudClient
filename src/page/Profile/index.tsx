"use client"

import CardLittle from "@/components/CardLittle"
import EditProfile from "@/components/EditProfile"
import Upload from "@/components/Upload"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { IUser } from "@/interfaces/user.interface"
import styles from "@/page/Profile/styles.module.scss"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import { FC, useEffect, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"

enum ESlide { "Tracks", "Playlists" }
const length = Object.keys(ESlide).length / 2
const values: Array<string> = []

for (let i = 0; i < length; i++) {
  values.push(ESlide[i])
}

const Profile: FC<{ id: string }> = ({ id }) => {
  const [fetchUser, setFetchUser] = useState<IUser>()
  const [slide, setSlide] = useState<ESlide>(ESlide.Tracks)
  const user = useTypedSelector(selector => selector.userSlice.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => { $api.get<IUser>(`/users/${id}`).then(res => setFetchUser(res.data)) }, [])

  return fetchUser ? (
    <div className={styles.profile}>
      <Upload setFetchUser={setFetchUser} />
      <EditProfile id={fetchUser._id} windowName="editProfile" />
      <div className={styles.user}>
        <div className={styles.banner}></div>
        <div className={styles.user_info}>
          <div className={styles.avatar}></div>
          <h3>{fetchUser.username}</h3>
          <p>{fetchUser.tracks.length} треков</p>
          {user?._id === fetchUser._id && <RiEdit2Fill width={30} onClick={() => dispatch(setWindowForm("editProfile"))} className="mt-4 ml-3" />}
        </div>
      </div>
      <nav>
        <ul>
          {values.map(el => (
            <li onClick={() => setSlide(values.indexOf(el))} className={values.indexOf(el) === slide ? "border-b-2 border-white pb-2" : ""} key={el}>{el}</li>
          ))}
          {user?._id === fetchUser._id ? <li onClick={() => dispatch(setWindowForm("uploadTrack"))}>Upload</li> : ""}
        </ul>
      </nav>
      {slide === ESlide.Tracks ? <div className={styles.tracks}>{fetchUser.tracks.map(track => <div className={styles.track}><CardLittle key={track._id} {...track} /></div>)}</div> : ""}
    </div>
  ) : ""
}

export default Profile;