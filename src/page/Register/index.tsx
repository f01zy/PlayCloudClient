"use client"

import { IRegister } from "@/interfaces/register.interface";
import { AppDispatch } from "@/store/store";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerF } from "@/store/user/user.actions"
import { useRouter } from "next/navigation";
import AuthForm, { TInput } from "@/components/AuthForm";
import { handleClickBlock } from "@/service/handleClickBlock.service";
import { useTypedSelector } from "@/hooks/selector.hook";

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { alert, blocked } = useTypedSelector(selector => selector.siteSlice)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const isBlocked = handleClickBlock(dispatch, blocked, alert.isShow); if (isBlocked) return

    const typedData = data as IRegister
    dispatch(registerF(typedData)).then(() => router.push("/"))
  }

  const inputs: Array<TInput> = [
    {
      label: "username",
      field: "username",
      type: "text"
    },
    {
      field: "email",
      label: "email",
      type: "email"
    },
    {
      field: "password",
      label: "password",
      type: "password"
    }
  ]

  return <AuthForm buttonLabel="Register" inputs={inputs} onSubmit={onSubmit} />
}

export default Register;