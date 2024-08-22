"use client"

import { useParams, usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import styles from "@/components/Layout/styles.module.scss"
import { useAuth } from "@/hooks/auth.hook";
import Player from "../Player";
import { PlayerController } from "@/service/playerController.service";
import { useTypedSelector } from "@/hooks/selector.hook";
import { Alert } from "@mui/material";

export const playerController = new PlayerController()
export let musicInterval: NodeJS.Timeout | null = null
export const setMusicInterval = (newInterval: NodeJS.Timeout | null) => musicInterval = newInterval

export type TFetchError = {
  status: number
}

let i = 0

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()!
  const params = useParams()
  const alert = useTypedSelector(selector => selector.siteSlice.alert)
  const music = useTypedSelector(selector => selector.siteSlice.music)

  let id: string | null = null

  if (params && params.id) id = params.id as string

  const dontSidebarsPages = ["/login", "/register", `/profile/${id}`]

  i === 0 && useAuth()
  i++

  return (
    <>
      {
        dontSidebarsPages.indexOf(pathname) === -1 ? (
          <>
            <Sidebar />
            <div className={styles.column}>
              <Navigation />
              {children}
            </div>
          </>
        ) : <>{children}</>
      }
      <Player />
      <div className={`${styles.alert} ${alert.isShow ? styles.active : styles.disable} ${music ? "bottom-24" : "bottom-5"}`}>
        <h4>{alert.message}</h4>
      </div>
    </>
  )
}

export default Layout;