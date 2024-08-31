"use client"

import styles from "@/components/UI/Player/styles.module.scss"
import { SERVER_URL } from "@/config"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import { FaForward, FaBackward } from "react-icons/fa"
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { TMusicMode, getMusicMode, playerController, setMusicMode } from "../../Wrappers/Layout"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { handlePlayClick } from "@/utils/handlePlayClick.utils"
import { formatTime } from "@/utils/formatTime.utils"
import { useRouter } from "next/navigation"
import Skeleton from "../Skeleton"
import { RiRepeat2Line, RiRepeatOneLine } from "react-icons/ri";
import { playMusic } from "@/utils/playMusic.utils"
import { setModeLoading } from "@/store/music/music.slice"

const Player = () => {
  const { music, loading, modeLoading } = useTypedSelector(selector => selector.musicSlice)
  const user = useTypedSelector(selector => selector.userSlice.user)!
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const setMusicModeAndOnLoad = (mode: TMusicMode) => {
    dispatch(setModeLoading(true))
    setMusicMode(mode)
    const newMusic = getMusicMode() === "all" ? user.history[Math.floor(Math.random() * (user.history.length - 1 - 0) + 0)] : music!
    playerController.onEnded = () => { playMusic(newMusic, dispatch, user) };
    dispatch(setModeLoading(false))
  }

  return <div className={styles.playerContainer}>
    {
      loading ? <Skeleton width="300px" height="100%" /> : music ? (
        <>
          <div className={styles.player}>
            <Image unoptimized className="rounded-md" src={`${SERVER_URL}/cover/${music._id}.jpg`} alt={music.name} width={40} height={40} />
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
                {music.isPaused ? <IoIosPlay /> : <FaPause />}
              </div>
              <div className={styles.button} onClick={() => playerController.rewind(5, dispatch)}>
                <FaForward />
              </div>
              {
                modeLoading ? <div><Image src={"/circle-loader-white.svg"} alt="loading" width={100} height={100} /></div> : <div className={styles.button} onClick={() => setMusicModeAndOnLoad(getMusicMode() === "all" ? "one" : "all")}>
                  {getMusicMode() === "one" ? <RiRepeatOneLine /> : <RiRepeat2Line />}
                </div>
              }
            </div>
          </div>
        </>
      ) : ""
    }
  </div>
}

export default Player;