"use client"

import styles from "@/page/MusicDetail/styles.module.scss"
import Image from "next/image";
import { SERVER_URL } from "@/config";
import { FC, useState, useEffect } from "react"
import { FaPlay, FaPause } from "react-icons/fa6"
import { IMusic } from "@/interfaces/music.interface";
import { $api } from "@/http";
import { useTypedSelector } from "@/hooks/selector.hook";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux"
import { handlePlayClick } from "@/utils/handlePlayClick.service";
import { useRouter } from "next/navigation";
import CardLittle from "@/components/CardLittle";
import { FcLike, FcDislike } from "react-icons/fc";
import Link from "next/link";
import { handleClickBlock } from "@/utils/handleClickBlock.service";

interface IMusicDetail {
  id: string
}

const MusicDetail: FC<IMusicDetail> = ({ id }) => {
  const [music, setMusic] = useState<IMusic>()
  const { music: currentMusic, blocked: currentBlocked, alert: currentAlert } = useTypedSelector(selector => selector.siteSlice)
  const user = useTypedSelector(selector => selector.userSlice.user)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => { $api.get<IMusic>(`/music/${id}`).then(res => setMusic(res.data)) }, [])

  return music ? (
    <div className={styles.musicDetail}>
      <div className={styles.banner}></div>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Image src={`${SERVER_URL}/cover/${id}.jpg`} alt={music.name} width={100} height={100} />
        </div>
        <div className={styles.info}>
          <Link href={`/music/${music._id}`}><h1>{music.name}</h1></Link>
          <p>({music.listening.length} listening) ({music.liked.length} liked)</p>
          <Link href={`/profile/${music.author._id}`}><p>{music.author.username}</p></Link>
        </div>
        <div className={styles.button} onClick={() => {
          handlePlayClick(dispatch, music, user, currentMusic?.name, router)
        }}>
          {currentMusic ? currentMusic._id === music._id ? currentMusic.isPaused ? <FaPlay /> : <FaPause /> : <FaPlay /> : <FaPlay />}
        </div>
        <div className={styles.button} onClick={() => {
          const isBlocked = handleClickBlock(dispatch, currentBlocked, currentAlert.isShow); if (isBlocked) return
          user ? $api.post<IMusic>("/music/like", { id: music._id }).then(res => setMusic(res.data)) : router.push("/login")
        }}>
          {music.liked.indexOf(user ? user._id : "") != -1 ? <FcDislike /> : <FcLike />}
        </div>
      </div>
      <div className={styles.songs}>
        <h2>History</h2>
        {user ? user.history.map(song => (
          <div className={styles.song}>
            <CardLittle {...song} />
          </div>
        )) : <h3>Please auth</h3>}
      </div>
    </div>
  ) : ""
}

export default MusicDetail;