import styles from "@/components/TracksGrid/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState, FC } from "react"
import Card from "../Card";

interface ITracksGrid {
  quantity: number | "full",
  label: string
}

const TracksGrid: FC<ITracksGrid> = ({ quantity, label }) => {
  const [music, setMusic] = useState<Array<IMusic>>([])

  useEffect(() => { getAllMusic().then(res => setMusic(res.sort((a, b) => b.listening.length - a.listening.length).slice(0, quantity === "full" ? res.length : quantity))) }, [])

  return <div className={styles.tracks}>
    <h2>{label}</h2>
    <div className={styles.container}>
      <div className={styles.songs}>
        {music.map(song => <Card key={song._id} {...song} />)}
      </div>
    </div>
  </div>
}

export default TracksGrid;