import styles from "@/components/TracksGrid/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState, FC } from "react"
import Card from "../Card";

interface ITracksGrid {
  label?: string,
  tracks?: Array<IMusic>
  quantity?: number,
  sort?: "liked" | "listening"
}

const TracksGrid: FC<ITracksGrid> = ({ quantity, label, sort, tracks }) => {
  const [music, setMusic] = useState<Array<IMusic>>([])

  useEffect(() => {
    (tracks ? new Promise(resolve => { }) : getAllMusic())
      .then(res => {
        let tracksArray = tracks ? tracks : res as Array<IMusic>
        if (sort) tracksArray = tracksArray.sort((a, b) => b[sort].length - a[sort].length)
        if (quantity) tracksArray = tracksArray.slice(0, quantity)
        setMusic(tracksArray)
      })
  }, [])

  return <div className={styles.tracks}>
    {label && <h2>{label}</h2>}
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default TracksGrid;