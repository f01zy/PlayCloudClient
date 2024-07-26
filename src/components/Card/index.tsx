"use client"

import styles from "@/components/Card/styles.module.scss"
import { STATIC_URL } from "@/config";
import Image from "next/image";
import { FC } from "react";
import { FaPlay, FaPause } from "react-icons/fa6"
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { handlePlayClick } from "@/service/handlePlayClick.service";

const Card: FC<IMusic> = ({ author, name, listening, _id, liked }) => {
  const router = useRouter()
  const music = useTypedSelector(selector => selector.siteSlice.music)
  const user = useTypedSelector(selector => selector.userSlice.user)
  const dispatch = useDispatch<AppDispatch>()

  return <div className={styles.card}>
    <div className={styles.cover}>
      <Image src={`${STATIC_URL}/cover/${_id}.jpg`} alt={name} width={100} height={100} />

      <div className={styles.play}>
        <div onClick={() => {
          handlePlayClick(dispatch, { _id, author, listening, name, liked }, user, music?.name, router)
        }}>
          {music?.name != name ? <FaPlay /> : music.isPaused ? <FaPlay /> : <FaPause />}
        </div>
      </div>
    </div>
    <Link href={`/music/${_id}`}><h3>{name}</h3></Link>
    <p>({listening.length} listening)</p>
    <Link href={`/profile/${author._id}`}><p>{author.username}</p></Link>
  </div>
}

export default Card;