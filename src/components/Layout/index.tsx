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

let i = 0

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()!
  const params = useParams()
  const alert = useTypedSelector(selector => selector.siteSlice.alert)

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
      <div className={`${styles.alert} ${alert ? styles.active : styles.disable}`}>
        <Alert severity={alert?.type}>{alert?.message}</Alert>
      </div>
    </>
  )
}

export default Layout;