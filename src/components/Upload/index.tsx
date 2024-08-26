"use client"

import styles from "@/components/Upload/styles.module.scss"
import { $api } from "@/http"
import { IUpload } from "@/interfaces/upload.interface"
import { IUser } from "@/interfaces/user.interface"
import { AppDispatch } from "@/store/store"
import { setUser } from "@/store/user/user.slice"
import Image from "next/image"
import { SetStateAction, useState, Dispatch, FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import Button from "../Button"
import { setTrackUploadForm } from "@/store/site/site.slice"
import { useTypedSelector } from "@/hooks/selector.hook"
import { IoMdClose } from "react-icons/io";

interface IUploadComponent {
  setFetchUser: Dispatch<SetStateAction<IUser | undefined>>
}

const Upload: FC<IUploadComponent> = ({ setFetchUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { trackUploadForm } = useTypedSelector(selector => selector.siteSlice)

  const { register, handleSubmit } = useForm<IUpload>()

  const onSubmit: SubmitHandler<IUpload> = async data => {
    if (isLoading) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append("files", data.cover[0])
    formData.append("files", data.music[0])
    formData.append("name", data.name)

    const user = await $api.post<IUser>("/music", formData, { headers: { "Content-Type": "mulpipart/form-data" } }).then(res => res.data).catch(() => setError("An error occurred. Try again later")).finally(() => setIsLoading(false))

    if (!user) return

    dispatch(setUser(user))
    setFetchUser(user)
    dispatch(setTrackUploadForm(false))
  }

  return <div className={`${styles.upload} ${trackUploadForm ? "" : styles.close}`}>
    {error ? <h3 className="text-center mb-6 text-red-600 text-base">{error}</h3> : ""}

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center w-full">
        <h2>Upload a track</h2>
        <IoMdClose onClick={() => dispatch(setTrackUploadForm(false))} />
      </div>

      <div className={styles.input_file}><input type="file" multiple={false} id="#cover-input" title="" accept="image/*" placeholder="" {...register("cover", { required: true, })} /><div><p>Choice a cover</p></div></div>
      <div className={styles.input_file}><input type="file" multiple={false} id="#music-input" title="" placeholder="" accept=".mp3" {...register("music", { required: true })} /><div><p>Choice a music</p></div></div>
      <div className={styles.input}><input type="text" placeholder="" {...register("name", { required: true, })} /><p>name</p></div>
      <div className="mt-4 flex"><input type="text" className="w-8 h-8 mr-2" /><p>I agree with all the rules of publication</p></div>

      <Button type="submit">{isLoading ? <Image src={"/loader.svg"} width={30} height={100} alt="loader" /> : <p>Upload</p>}</Button>
    </form>
  </div>
}

export default Upload;