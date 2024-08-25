import { IMusic } from "@/interfaces/music.interface"
import styles from "@/page/Tracks/styles.module.scss"
import { getAllMusic } from "@/utils/getAllMusic.utils"
import { Card } from "@mui/material"
import { useEffect, useState } from "react"

const Tracks = () => {
  const [tracks, setTracks] = useState<Array<IMusic>>([])

  useEffect(() => { getAllMusic().then(res => setTracks(res.sort((a, b) => b.listening.length - a.listening.length))) }, [])

  return <div className={styles.tracks}>
    <h2>Tracks</h2>
    <div className={styles.container}>
      {tracks.map(track => <Card key={track._id} {...track} />)}
    </div>
  </div>
}

export default Tracks;