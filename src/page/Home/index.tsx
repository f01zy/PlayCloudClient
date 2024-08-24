"use client"

import Card from "@/components/Card";
import { $api } from "@/http";
import { IMusic } from "@/interfaces/music.interface";
import styles from "@/page/Home/styles.module.scss"
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState } from "react"

const Home = () => {
  const [music, setMusic] = useState<Array<IMusic>>([])

  useEffect(() => {
    const music = getAllMusic().then(res => setMusic(res.sort((a, b) => a.listening.length - b.listening.length).slice(0, 5)))
  }, [])

  return <div className={styles.home}>
    <h2>Most popular</h2>
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default Home;