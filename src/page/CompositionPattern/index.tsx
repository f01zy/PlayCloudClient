"use client"

import Image from "next/image";
import { SERVER_URL } from "@/config";
import { FC, useState, useEffect } from "react"
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { $api } from "@/http";
import { useTypedSelector } from "@/hooks/selector.hook";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux"
import { handlePlayClick } from "@/utils/handlePlayClick.utils";
import { useRouter } from "next/navigation";
import { FcLike, FcDislike } from "react-icons/fc";
import Link from "next/link";
import { handleClickBlock } from "@/utils/handleClickBlock.utils";
import { filterListeningsByDate } from "@/utils/filterListeningsByDate.utils";
import TracksList from "@/components/Tracks/TracksList";
import { TComposition } from "@/types/composition.type";
import { IMusic } from "@/interfaces/music.interface";
import { IPlaylist } from "@/interfaces/playlist.interface";

interface ICompositionPattern {
  id: string,
  type: TComposition
}

const CompositionPattern: FC<ICompositionPattern> = ({ id, type }) => {
  const [composition, setComposition] = useState<IMusic | IPlaylist>()
  const { music } = useTypedSelector(selector => selector.musicSlice)
  const { alert } = useTypedSelector(selector => selector.alertSlice)
  const { blocked } = useTypedSelector(selector => selector.siteSlice)
  const user = useTypedSelector(selector => selector.userSlice.user)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const likeButtonField = type === "track" ? "likes" : "saves"
  const likeUrl = type === "track" ? "/music/like" : "/playlist/save"

  const paths: { [key in TComposition]: string } = { playlist: "playlist", track: "composition" }

  useEffect(() => { $api.get(`/${paths[type]}/${id}`).then(res => setComposition(res.data)) }, [])

  return composition ? (
    <div className={styles.composition}>
      <div className={styles.banner}></div>
      <div className={styles.container}>
        <div className={styles.compositionInfo}>
          <div className={styles.avatar}>
            {composition.type === "playlist" ? <h4 className="!text-white">{composition.name[0].toUpperCase()}</h4> : <Image unoptimized src={`${SERVER_URL}/cover/${composition._id}.jpg`} alt={composition.name} width={100} height={100} />}
          </div>
          <div className={styles.info}>
            <Link href={`/tracks/${composition._id}`}><h1>{composition.name}</h1></Link>
            <p>
              {
                composition.type === "track" ?
                  `(${filterListeningsByDate(composition.listenings).length} listening on last week) (${composition.likes.length} likes)` :
                  `(${composition.saving.length} savings) (${composition.tracks.length} tracks)`
              }
            </p>
            <Link href={`/profile/${composition.author._id}`}><p>{composition.author.username}</p></Link>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.button} onClick={() => { handlePlayClick(dispatch, composition, user, router, music?.name) }}>
            {music ? music._id === composition._id ? music.isPaused ? <IoIosPlay /> : <FaPause /> : <IoIosPlay /> : <IoIosPlay />}
          </div>
          <div className={styles.button} onClick={() => {
            const isBlocked = handleClickBlock(dispatch, blocked, alert.isShow); if (isBlocked) return
            user ? $api.post<IMusic>(likeUrl, { id: composition._id }).then(res => setComposition(res.data)) : router.push("/login")
          }}>
            {
              (composition as any)[likeButtonField].indexOf(user ? user._id : "") != -1 ? <FcDislike /> : <FcLike />
            }
          </div>
        </div>
      </div>
      <div className={styles.songs}>
        <h2 className="mb-4">{type === "track" ? "History" : "Tracks"}</h2>
        <TracksList tracks={composition.type === "track" ? "recent" : composition.tracks} />
      </div>
    </div>
  ) : ""
}

export default CompositionPattern;