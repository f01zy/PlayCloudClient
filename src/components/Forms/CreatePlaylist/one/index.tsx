"use client"

import { TFileInput, TInput } from "../../AuthForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCreate } from "@/store/playlist/playlist.slice";
import { ICreatePlaylist } from "@/interfaces/playlistCreate.interface";
import { setFormBlocked, setLoading, setWindowForm } from "@/store/site/site.slice";
import WindowForm from "../../WindowForm";
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";

const CreatePlaylistStepOne = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)
  const { formBlocked } = useTypedSelector(selector => selector.siteSlice)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (formBlocked) return
    dispatch(setFormBlocked(true))

    if (user?.tracks.length === 0) { dispatch(setLoading(true)); await $api.post("/playlist", { tracks: [], ...data }).then(() => dispatch(setLoading(false))); dispatch(setWindowForm(null)); return setTimeout(() => dispatch(setFormBlocked(false)), 1000) }
    dispatch(setCreate({ ...data as ICreatePlaylist }))
    dispatch(setWindowForm(null))
    setTimeout(() => { dispatch(setWindowForm("createPlaylistStepTwo")); dispatch(setFormBlocked(false)) }, 1000)
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