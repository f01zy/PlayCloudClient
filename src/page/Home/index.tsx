"use client"

import Card from "@/components/Card";
import TracksGrid from "@/components/TracksGrid";
import { IMusic } from "@/interfaces/music.interface";
import styles from "@/page/Home/styles.module.scss"


const Home = () => {
  return <div className={styles.home}>
    <TracksGrid label="Most popular" quantity={5} sort="listening" />
  </div>
}

export default Home;