"use client"

import Card from "@/components/Card";
import { $api } from "@/http";
import { IMusic } from "@/interfaces/music.interface";
import styles from "@/pagesComponents/Home/styles.module.scss"
import { setIsLoading } from "@/store/site/site.slice";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const Home = () => {
  const [music, setMusic] = useState<Array<IMusic>>([])
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setIsLoading(true))
    $api.get("/music").then(({ data }: { data: Array<IMusic> }) => setMusic(data)).then(() => dispatch(setIsLoading(false)))
  }, [])

  return <div className={styles.home}>
    <h2>Most popular</h2>
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default Home;