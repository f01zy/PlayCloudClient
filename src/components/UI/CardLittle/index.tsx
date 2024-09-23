"use client"

import styles from "@/components/UI/CardLittle/styles.module.scss"
import { SERVER_URL } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { AppDispatch } from "@/store/store";
import { handlePlayClick } from "@/utils/handlePlayClick.utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import { useDispatch } from "react-redux";
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IPlaylist } from "@/interfaces/playlist.interface";

const CardLittle: FC<IMusic | IPlaylist> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useTypedSelector(selector => selector.userSlice.user)
  const { music, loading } = useTypedSelector(selector => selector.musicSlice)
  const router = useRouter()

  return <div className={styles.cardLittle}>
    <div className={styles.cover}>
      {props.type === "playlist" ? <h4 className="!text-white">{props.name[0].toUpperCase()}</h4> : <Image unoptimized src={`${SERVER_URL}/cover/${props._id}.jpg`} alt={props.name} width={100} height={100} />}

      <div className={styles.play}>
        <div onClick={() => { handlePlayClick(dispatch, props, user, router, music?.name) }}>
          {loading === props._id ? <Image src={"/circle-loader.svg"} alt="loading" width={100} height={100} /> : music?.name != name ? <IoIosPlay /> : music?.isPaused ? <IoIosPlay /> : <FaPause />}
        </div>
      </div>
    </div>
    <div className="ml-3">
      <Link href={`/${props.type}s/${props._id}`}><h2>{props.name}</h2></Link>
      <Link href={`/profile/${props.author._id}`}><p>{props.author.username}</p></Link>
    </div>
  </div>
}

export default CardLittle;