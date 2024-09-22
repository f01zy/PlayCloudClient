import styles from "@/components/Tracks/TracksGrid/styles.module.scss"
import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { useEffect, useState, FC } from "react"
import Card from "../../UI/Card";
import Skeleton from "@/components/UI/Skeleton";

interface ITracksGrid {
  label?: string,
  tracks?: Array<IMusic>
  quantity?: number,
  sort?: "likes" | "listenings"
}

const TracksGrid: FC<ITracksGrid> = ({ quantity, label, sort, tracks: tempTracks }) => {
  const [music, setMusic] = useState<Array<IMusic>>()
  const quantitySkeletons = new Array<string>(15).fill("")

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
    <div className={styles.songs}>{music ? music.map(song => <Card key={song._id} {...song} />) : quantitySkeletons.map(() => <div className="w-full h-60 relative mt-5"><Skeleton width="170px" height="100%" /></div>)}</div>
  </div>
}

export default TracksGrid;