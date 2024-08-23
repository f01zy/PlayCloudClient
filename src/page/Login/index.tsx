"use client"

import AuthForm, { TInput } from "@/components/AuthForm"
import { ILogin } from "@/interfaces/login.interface"
import { AppDispatch } from "@/store/store"
import { login } from "@/store/user/user.actions"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useState } from "react"

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSenden, setIsSended] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSenden) return

    setIsSended(true)

    const typedData = data as ILogin
    dispatch(login(typedData)).then(() => setIsSended(false))
  }

  const inputs: Array<TInput> = [
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

  return <AuthForm buttonLabel="Log In" onSubmit={onSubmit} inputs={inputs} />
}

export default Login;