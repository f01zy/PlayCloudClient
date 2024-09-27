"use client"

import { $api } from "@/http"
import { IUser } from "@/interfaces/user.interface"
import { AppDispatch } from "@/store/store"
import { setUser } from "@/store/user/user.slice"
import { SetStateAction, Dispatch, FC, useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux"
import { setLoading, setWindowError, setWindowForm } from "@/store/site/site.slice"
import WindowForm from "../WindowForm"
import { TInputExtends } from "@/types/input.type"

interface IUploadComponent {
  setFetchUser: Dispatch<SetStateAction<IUser | undefined>>
}

const Upload: FC<IUploadComponent> = ({ setFetchUser }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSuccess) return

    dispatch(setLoading(true))

    const formData = new FormData()
    formData.append("files", data.cover[0])
    formData.append("files", data.music[0])
    formData.append("name", data.name)

    const user = await $api.post<IUser>("/music", formData, { headers: { "Content-Type": "mulpipart/form-data" } }).then(res => { setIsSuccess(true); return res.data }).catch(err => { dispatch(setWindowError(err.response.data.message)) }).finally(() => dispatch(setLoading(false)))

    if (!user) return

    dispatch(setUser(user))
    setFetchUser(user)
    dispatch(setWindowForm(null))
    setTimeout(() => setIsSuccess(false), 2000)
  }

  const inputs: Array<TInputExtends> = [{ accept: "image/*", field: "cover", label: "Choice a cover", multiple: false, type: "file" }, { accept: ".mp3", field: "music", label: "Choice a music", multiple: false, type: "file" }, { field: "name", label: "name", type: "text" }]

  return <WindowForm inputs={inputs} onSubmit={onSubmit} windowName="uploadTrack" title="Upload a track" />
}

export default Upload;