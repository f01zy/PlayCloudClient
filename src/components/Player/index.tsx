"use client"

import styles from "@/components/Player/styles.module.scss"
import { SERVER_URL } from "@/config"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import { FaForward, FaBackward } from "react-icons/fa"
import { FaPlay, FaPause } from "react-icons/fa6"
import { playerController } from "../Layout"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { handlePlayClick } from "@/utils/handlePlayClick.service"
import { formatTime } from "@/utils/formatTime.service"
import { useRouter } from "next/navigation"

const Player = () => {
  const music = useTypedSelector(selector => selector.siteSlice.music)
  const user = useTypedSelector(selector => selector.userSlice.user)!
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  return <div className={styles.playerContainer}>
    {music ? (
      <>
        <div className={styles.player}>
          <Image className="rounded-md" src={`${SERVER_URL}/cover/${music._id}.jpg`} alt={music.name} width={40} height={40} />
          <div className={`ml-3 flex flex-col items-center justify-center ${styles.title}`}>
            <h1>{music.name}</h1>
            <h5 className="mt-0.5">-{formatTime(music.maxDelay - music.delay)}</h5>
          </div>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={() => playerController.rewind(-5, dispatch)}>
              <FaBackward />
            </div>
            <div className={styles.button} onClick={() => {
              handlePlayClick(dispatch, music, user, music.name, router)
            }}>
              {music.isPaused ? <FaPlay /> : <FaPause />}
            </div>
            <div className={styles.button} onClick={() => playerController.rewind(5, dispatch)}>
              <FaForward />
            </div>
          </div>
        </div>
      </>
    ) : ""}
  </div>
}

export default Player;