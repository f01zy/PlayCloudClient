"use client"

import AuthForm, { TInput } from "@/components/AuthForm"
import { useTypedSelector } from "@/hooks/selector.hook"
import { ILogin } from "@/interfaces/login.interface"
import { AppDispatch } from "@/store/store"
import { login } from "@/store/user/user.actions"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useState } from "react"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [isSenden, setIsSended] = useState<boolean>(false)
  const error = useTypedSelector(selector => selector.userSlice.error)

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    if (isSenden) return

    setIsSended(true)

    const typedData = data as ILogin
    dispatch(login(typedData)).then(() => {
      setIsSended(false)
      if (error) return
      else router.push("/")
    })
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