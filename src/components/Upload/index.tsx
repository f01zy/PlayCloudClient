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

interface IUploadComponent {
  setIsUploadForm: Dispatch<SetStateAction<boolean>>
  setFetchUser: Dispatch<SetStateAction<IUser | undefined>>
}

const Upload: FC<IUploadComponent> = ({ setIsUploadForm, setFetchUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpload>()

  const onSubmit: SubmitHandler<IUpload> = async data => {
    if (isLoading) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("files", data.cover[0])
    formData.append("files", data.music[0])
    formData.append("name", data.name)
    const user = await $api.post<IUser>("/music", formData, {
      headers: {
        "Content-Type": "mulpipart/form-data"
      }
    })
      .then(res => res.data)
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

    if (!user) return

    dispatch(setUser(user))
    setFetchUser(user)
    setIsUploadForm(false)
  }

  return <div className={styles.upload}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input_file}>
        <input type="file" multiple={false} id="#cover-input" title="" accept="image/*" placeholder="" {...register("cover", {
          required: true,
        })} />
        <div>
          <p>Choice a cover</p>
        </div>
      </div>
      <div className={styles.input_file}>
        <input type="file" multiple={false} id="#music-input" title="" placeholder="" accept="audio/mpeg3" {...register("music", {
          required: true,
        })} />
        <div>
          <p>Choice a music</p>
        </div>
      </div>
      <div className={styles.input}>
        <input type="text" placeholder="" {...register("name", {
          required: true,
        })} />
        <p>name</p>
      </div>
      <button type="submit">
        {isLoading ? <Image src={"/loader.svg"} width={30} height={100} alt="loader" /> : <p>Upload</p>}
      </button>
    </form>
  </div>
}

export default Upload;