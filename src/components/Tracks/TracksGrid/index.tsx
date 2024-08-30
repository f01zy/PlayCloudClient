import styles from "@/components/Tracks/TracksGrid/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState, FC } from "react"
import Card from "../../UI/Card";
import Skeleton from "react-loading-skeleton";

interface ITracksGrid {
  label?: string,
  tracks?: Array<IMusic>
  quantity?: number,
  sort?: "likes" | "listenings"
}

const TracksGrid: FC<ITracksGrid> = ({ quantity, label, sort, tracks: tempTracks }) => {
  const [music, setMusic] = useState<Array<IMusic>>([])
  const quantitySkeletons = ["", "", "", "", "", "", "", ""]

  useEffect(() => {
    const setup = async () => {
      let tracks = tempTracks ? tempTracks : await getAllMusic()
      if (sort) tracks = tracks.sort((a, b) => b[sort].length - a[sort].length)
      if (quantity) tracks = tracks.slice(0, quantity)
      setTimeout(() => setMusic(tracks), 4000)
    }
    setup()
  }, [])

  return <div className={styles.tracks}>
    {label && <h2>{label}</h2>}
    <div className={styles.songs}>
      {
        music.length != 0 ?
          music.map(song => <Card key={song._id} {...song} />) :
          quantitySkeletons.map(skeleton => <Skeleton />)
      }
    </div>
  </div>
}

export default TracksGrid;