"use client"

import { IRegister } from "@/interfaces/register.interface";
import { AppDispatch } from "@/store/store";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerF } from "@/store/user/user.actions"
import AuthForm, { TInput } from "@/components/Forms/AuthForm";
import { useState } from "react"

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSenden, setIsSended] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSenden) return

    setIsSended(true)

    const typedData = data as IRegister
    dispatch(registerF(typedData)).then(() => setIsSended(false))
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