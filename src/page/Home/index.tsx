"use client"

import Banner from "@/components/UI/Banner";
import TracksGrid from "@/components/Tracks/TracksGrid";
import styles from "@/page/Home/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook";

const Home = () => {
  const { user } = useTypedSelector(selector => selector.userSlice)

  return <div className={styles.home}>
    <Banner title="PlayCloud" value="The best platform for high-quality music listening" />
    {user && user.tracks.length > 0 && <TracksGrid label="Your most popular tracks" tracks={user.tracks} quantity={6} sort="listenings" />}
    <TracksGrid label="Most popular" quantity={6} sort="listenings" />
  </div>
}

export default Home;