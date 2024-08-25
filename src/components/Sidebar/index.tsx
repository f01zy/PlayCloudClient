"use client"

import styles from "@/components/Sidebar/styles.module.scss"
import { browseMusic } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { setSidebar } from "@/store/site/site.slice";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const isOpen = useTypedSelector(selector => selector.siteSlice.sidebar)
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  return <aside className={styles.sidebar}>
    <div className={styles.button} onClick={() => dispatch(setSidebar(!isOpen))}>
      {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
    </div>
    <h2>Browse Music</h2>
    <ul>
      {browseMusic.map(([Icon, label, path]) => (
        <li key={label} className={pathname === path ? styles.active : ""}><Link href={path}><Icon /> {label}</Link></li>
      ))}
    </ul>
    <h2>Library</h2>
    <ul>
      <li>Recent Played</li>
      <li>Favorite Tracks</li>
      <li>Charts</li>
      <li>Radio</li>
    </ul>
  </aside>
}

export default Sidebar;