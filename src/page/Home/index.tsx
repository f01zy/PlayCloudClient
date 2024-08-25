"use client"

import Banner from "@/components/Banner";
import TracksGrid from "@/components/TracksGrid";
import styles from "@/page/Home/styles.module.scss"


const Home = () => {
  return <div className={styles.home}>
    <Banner title="PlayCloud" value="The best platform for high-quality music listening" />
    <TracksGrid label="Most popular" quantity={6} sort="listening" />
  </div>
}

export default Home;