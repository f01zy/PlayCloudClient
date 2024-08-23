"use client"

import { IRegister } from "@/interfaces/register.interface";
import { AppDispatch } from "@/store/store";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerF } from "@/store/user/user.actions"
import { useRouter } from "next/navigation";
import AuthForm, { TInput } from "@/components/AuthForm";
import { useTypedSelector } from "@/hooks/selector.hook";
import { useState } from "react"

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [isSenden, setIsSended] = useState<boolean>(false)
  const error = useTypedSelector(selector => selector.userSlice.error)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSenden) return

    setIsSended(true)

    const typedData = data as IRegister
    dispatch(registerF(typedData))
      .then(() => {
        setTimeout(() => { }, 1000)
        setIsSended(false)
        if (error) return
        router.push("/")
      })
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