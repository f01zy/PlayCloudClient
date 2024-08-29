"use client"

import TracksList from "@/components/Tracks/TracksList";
import styles from "@/page/Library/Recent/styles.module.scss"

const Recent = () => {
  return <div className={styles.recent}>
    <h1 className="text-base">Recent played</h1>
    <TracksList tracks="recent" />
  </div>
}

export default Recent;