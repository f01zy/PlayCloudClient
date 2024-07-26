"use client"

import Card from "@/components/Card";
import { $api } from "@/http";
import { IMusic } from "@/interfaces/music.interface";
import styles from "@/pagesComponents/Home/styles.module.scss"
import { useEffect, useState } from "react"

const Home = () => {
  const [music, setMusic] = useState<Array<IMusic>>([])

  useEffect(() => {
    $api.get("/music").then(({ data }: { data: Array<IMusic> }) => setMusic(data))
  }, [])

  return <div className={styles.home}>
    <h2>Most popular</h2>
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default Home;