"use client"

import TracksList from "@/components/Tracks/TracksList";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/Library/Recent/styles.module.scss"

const Recent = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return user ? <div className={styles.recent}>
    <h1 className="text-xl mb-4">Recent played</h1>
    {user.history.length != 0 ? <TracksList tracks="recent" /> : <h2 className="text-base">You haven&apos;t listened to anything yet</h2>}
  </div> : <h1 className="text-xl">Please auth</h1>
}

export default Recent;