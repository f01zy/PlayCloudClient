"use client"

import TracksGrid from "@/components/TracksGrid";
import styles from "@/page/Tracks/styles.module.scss"

const Tracks = () => {
  return <div className={styles.tracks}>
    <TracksGrid quantity={"full"} label="Tracks" />
  </div>
}

export default Tracks;