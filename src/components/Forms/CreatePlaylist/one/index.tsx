"use client"

import { TFileInput, TInput } from "../../AuthForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setCreate } from "@/store/playlist/playlist.slice";
import { ICreatePlaylist } from "@/interfaces/playlistCreate.interface";
import { setLoading, setWindowForm } from "@/store/site/site.slice";
import WindowForm from "../../WindowForm";
import { useTypedSelector } from "@/hooks/selector.hook";
import { $api } from "@/http";
import { handleClickBlock } from "@/utils/handleClickBlock.utils";

const CreatePlaylistStepOne = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useTypedSelector(selector => selector.userSlice)
  const { blocked } = useTypedSelector(selector => selector.siteSlice)
  const { alert } = useTypedSelector(selector => selector.alertSlice)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (user?.tracks.length === 0) { const isBlocked = handleClickBlock(dispatch, blocked, alert.isShow); if (isBlocked) return; dispatch(setLoading(true)); await $api.post("/playlist", { tracks: [], ...data }).then(() => dispatch(setLoading(false))); return dispatch(setWindowForm(null)) }
    dispatch(setCreate({ ...data as ICreatePlaylist }))
    dispatch(setWindowForm(null))
    setTimeout(() => dispatch(setWindowForm("createPlaylistStepTwo")))
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