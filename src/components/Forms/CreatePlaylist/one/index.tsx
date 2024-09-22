"use client"

import { TFileInput, TInput } from "../../AuthForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCreate } from "@/store/playlist/playlist.slice";
import { ICreatePlaylist } from "@/interfaces/playlistCreate.interface";
import { setWindowForm } from "@/store/site/site.slice";
import WindowForm from "../../WindowForm";

const CreatePlaylistStepOne = () => {
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    dispatch(setCreate({ ...data as ICreatePlaylist }))
    dispatch(setWindowForm("createPlaylistStepTwo"))
  }

  const inputs: Array<TInput | TInput & TFileInput> = [
    {
      field: "name",
      label: "name",
      type: "text"
    },
    {
      field: "description",
      label: "description",
      type: "text"
    }
  ]

  return <WindowForm inputs={inputs} onSubmit={onSubmit} windowName="createPlaylistStepOne" title="Create playlist" />
}

export default CreatePlaylistStepOne;