"use client"

import styles from "@/components/Forms/CreatePlaylist/two/styles.module.scss"
import Button from "@/components/UI/Button"
import CardLittle from "@/components/UI/CardLittle"
import { useTypedSelector } from "@/hooks/selector.hook"
import { $api } from "@/http"
import { setWindowForm } from "@/store/site/site.slice"
import { AppDispatch } from "@/store/store"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"

const CreatePlaylistStepTwo = () => {
  const [tracks, setTracks] = useState<Array<string>>([])
  const [error, setError] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)
  const { description, name } = useTypedSelector(selector => selector.playlistSlice.create)!

  const onSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    await $api.post("/playlist", { tracks, description, name }).then(() => dispatch(setWindowForm(null))).catch(() => setError(true))
  }

  return <div className={styles.selectTracks}>
    <form>
      {error ? <p className="text-base mb-2 text-red-600">An error has occurred</p> : ""}
      <div className={styles.tracks}>
        {user ? user.tracks.map(track => <div className={`${styles.track} relative`}>
          <CardLittle {...track} key={track._id} />
          <input className="h-full w-auto ml-4" type="checkbox" onChange={e => { e.target.checked ? setTracks([...tracks, track._id]) : setTracks(tracks.filter(clearTrack => clearTrack != track._id)) }} />
        </div>) : ""}
      </div>
      <Button type="submit" onSubmit={onSubmit}>Create playlist</Button>
    </form>
  </div>
}

export default CreatePlaylistStepTwo;