import styles from "@/components/TracksGrid/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState, FC } from "react"
import Card from "../Card";

interface ITracksGrid {
  label?: string,
  tracks?: Array<IMusic>
  quantity?: number,
  sort?: "likes" | "listenings"
}

const TracksGrid: FC<ITracksGrid> = ({ quantity, label, sort, tracks: tempTracks }) => {
  const [music, setMusic] = useState<Array<IMusic>>([])

  useEffect(() => {
    const setup = async () => {
      let tracks = tempTracks ? tempTracks : await getAllMusic()
      if (sort) tracks = tracks.sort((a, b) => b[sort].length - a[sort].length)
      if (quantity) tracks = tracks.slice(0, quantity)
      setMusic(tracks)
    }
    setup()
  }, [])

  return <div className={styles.tracks}>
    {label && <h2>{label}</h2>}
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default TracksGrid;