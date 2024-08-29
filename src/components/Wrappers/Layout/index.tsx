"use client"

import { useParams, usePathname } from "next/navigation";
import Navigation from "@/components/UI/Navigation";
import Sidebar from "@/components/UI/Sidebar";
import styles from "@/components/Wrappers/Layout/styles.module.scss"
import { useAuth } from "@/hooks/auth.hook";
import Player from "../../UI/Player";
import { PlayerController } from "@/utils/playerController.utils";
import { useTypedSelector } from "@/hooks/selector.hook";
import Mask from "../../UI/Mask";

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
  const { alert, music, sidebar, windowForm } = useTypedSelector(selector => selector.siteSlice)

  let id: string | null = null

  if (params && params.id) id = params.id as string

  const dontSidebarsPages = ["/login", "/register", `/profile/${id}`, "/shuffle"]

  i === 0 && useAuth()
  i++

  return (
    <>
      {
        dontSidebarsPages.indexOf(pathname) === -1 ? (
          <>
            <Navigation />
            <Sidebar />
            <div className={styles.children}>
              {children}
            </div>
          </>
        ) : <>{children}</>
      }
      <Player />
      {sidebar || windowForm && <Mask />}
      <div className={`${styles.alert} ${alert.isShow ? styles.active : styles.disable} ${music ? "bottom-24" : "bottom-5"}`}>
        <h4>{alert.message}</h4>
      </div>
    </>
  )
}

export default Layout;