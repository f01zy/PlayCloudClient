"use client"

import Avatar from "@/components/UI/Avatar"
import CardLittle from "@/components/UI/CardLittle"
import EditProfile from "@/components/Forms/EditProfile"
import Upload from "@/components/Forms/Upload"
import { SERVER_URL } from "@/config"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { IUser } from "@/interfaces/user.interface"
import styles from "@/page/Profile/styles.module.scss"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { RiEdit2Fill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import CreatePlaylistStepOne from "@/components/Forms/CreatePlaylist/one"
import CreatePlaylistStepTwo from "@/components/Forms/CreatePlaylist/two"
import Link from "next/link"
import Skeleton from "@/components/UI/Skeleton"

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

  const avatar = 90

  useEffect(() => { $api.get<IUser>(`/users/${id}`).then(res => setFetchUser(res.data)) }, [])

  return fetchUser ? <div className={styles.profile}>
    <Upload setFetchUser={setFetchUser} />
    <CreatePlaylistStepOne />
    <CreatePlaylistStepTwo />
    <EditProfile windowName="editProfile" />
    <div className={styles.user}>
      <div className={styles.container}>
        <div className={styles.banner}>{fetchUser.banner && <Image unoptimized src={`${SERVER_URL}/banner/${fetchUser._id}.jpg`} alt="banner" width={100} height={100} className="w-full h-full" />}</div>
        <div className={styles.user_info}>
          <Avatar user={fetchUser} width={avatar} height={avatar} />
          <h3>{fetchUser.username}</h3>
          <p>{fetchUser.tracks.length} tracks</p>
          <p>{fetchUser.playlists.length} playlists</p>
          {user?._id === fetchUser._id && <RiEdit2Fill style={{ marginTop: "15px" }} width={30} onClick={() => dispatch(setWindowForm("editProfile"))} className="ml-3 cursor-pointer" />}
        </div>
      </div>
      <p className={`${styles.description} text-base`}>{fetchUser.description}</p>
      <div className={`${styles.links} mt-3`}>
        <h3 className="text-base">Links</h3>
        {
          fetchUser.links.length > 0 ?
            <ul>
              {fetchUser.links.map(link => <li><Link className="text-sm" href={link}>{link}</Link></li>)}
            </ul> :
            <h4 className="text-sm mt-2">Have&apos;nt links</h4>
        }
      </div>
    </div>
    <nav>
      <ul>
        {values.map(el => (
          <li onClick={() => setSlide(values.indexOf(el))} className={values.indexOf(el) === slide ? "border-b-2 border-white pb-2" : ""} key={el}>{el}</li>
        ))}
        {user?._id === fetchUser._id ? <li onClick={() => dispatch(setWindowForm("uploadTrack"))}>Upload track</li> : ""}
        {user?._id === fetchUser._id ? <li onClick={() => dispatch(setWindowForm("createPlaylistStepOne"))}>Create playlist</li> : ""}
      </ul>
    </nav>
    {slide === ESlide.Tracks ? <div className={styles.tracks}>{fetchUser.tracks.map(track => <div className={styles.track}><CardLittle key={track._id} {...track} /></div>)}</div> : ""}
    {slide === ESlide.Playlists ? <div className={styles.tracks}>{fetchUser.playlists.map(playlist => playlist.author._id === fetchUser._id && <div className={styles.track}><CardLittle key={playlist._id} {...playlist} /></div>)}</div> : ""}
  </div> : <div className={styles.profile}>
    <div className={styles.user}>
      <div className={styles.container}>
        <div className={styles.banner}></div>
        <div className={styles.user_info}>
          <Skeleton width={`${avatar}px`} height={`${avatar}px`} />
        </div>
      </div>
      <p className={`${styles.description} text-base`}><Skeleton width="200px" height="20px" /></p>
    </div>
    <nav>
      <ul>
        <li><Skeleton width="100px" height="25px" /></li>
        <li><Skeleton width="100px" height="25px" /></li>
        <li><Skeleton width="100px" height="25px" /></li>
      </ul>
    </nav>
    <div className={styles.tracks}>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
      <div className={styles.track}><Skeleton width="100%" height="50px" /></div>
    </div>
  </div>
}

export default Profile;