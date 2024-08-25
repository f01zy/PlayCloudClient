"use client"

import styles from "@/components/Sidebar/styles.module.scss"
import { browseMusic } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname()

  return <aside className={styles.sidebar}>
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