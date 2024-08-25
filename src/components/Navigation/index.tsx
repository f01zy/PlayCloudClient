"use client"

import styles from "@/components/Navigation/styles.module.scss"
import { links } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";
import { setCurrentMusic, setSidebar } from "@/store/site/site.slice";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/user/user.slice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const [userMenu, setUserMenu] = useState<boolean>(false)

  const pathname = usePathname()!
  const pathnameBreadcrumbs = ("home" + pathname).split("/"); delete pathnameBreadcrumbs[pathnameBreadcrumbs.length - 1]
  const user = useTypedSelector(selector => selector.userSlice.user)
  const dispatch = useDispatch<AppDispatch>()
  const sidebar = useTypedSelector(selector => selector.siteSlice.sidebar)

  return <nav className={styles.navigation}>
    <div className="flex items-center">
      <div className={styles.sidebarToggle} onClick={() => dispatch(setSidebar(!sidebar))}>
        <div className={`${styles.icon} ${sidebar ? styles.open : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p className={styles.logo}><b>Play</b>Cloud</p>
    </div>
    <ul className={styles.links}>
      <li><IoSearchSharp /></li>
      {links.map(link => (
        <li key={link[1]}><Link href={link[1]} className={pathname === link[1] ? styles.active : ""}>{link[0]}</Link></li>
      ))}
    </ul>
    {user ? (
      <div className={styles.user} onClick={() => {
        setUserMenu(!userMenu)
      }}>
        <p>{user.username}</p>
        <div className={styles.avatar}></div>
        <div className={`${styles.menu} ${userMenu ? "visible opacity-100" : "invisible opacity-0"}`}>
          <ul>
            <Link href={`/profile/${user._id}`}><li>Profile</li></Link>
            <li onClick={() => {
              $api.get("/auth/logout")
              dispatch(setUser(null))
              dispatch(setCurrentMusic(null))
            }}>Log out</li>
          </ul>
        </div>
      </div>
    ) : (
      <div className={styles.auth}>
        <button><Link href={"/login"}>Log in</Link></button>
        <button><Link href={"/register"}>Register</Link></button>
      </div>
    )}
  </nav>
}

export default Navigation;