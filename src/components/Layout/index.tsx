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
import Loader from "../Loader";

export const playerController = new PlayerController()
export let musicInterval: NodeJS.Timeout | null = null
export const setMusicInterval = (newInterval: NodeJS.Timeout | null) => musicInterval = newInterval

let i = 0

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname()!
  const params = useParams()
  const alert = useTypedSelector(selector => selector.siteSlice.alert)
  const alertMessage = useTypedSelector(selector => selector.siteSlice.alertSafeMessage)
  const isLoading = useTypedSelector(selector => selector.siteSlice.isLoading)

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
              {isLoading ? <Loader /> : <>{children}</>}
            </div>
          </>
        ) : isLoading ? <Loader /> : <>{children}</>
      }
      <Player />
      <div className={`${styles.alert} ${alert ? styles.active : styles.disable}`}>
        <Alert className="!text-gray-950" severity="info">{alertMessage}</Alert>
      </div>
    </>
  )
}

export default Layout;