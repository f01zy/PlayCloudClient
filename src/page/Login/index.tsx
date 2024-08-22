"use client"

import AuthForm, { TInput } from "@/components/AuthForm"
import { ILogin } from "@/interfaces/login.interface"
import { AppDispatch } from "@/store/store"
import { login } from "@/store/user/user.actions"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const typedData = data as ILogin
    dispatch(login(typedData)).then(() => router.push("/"))
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