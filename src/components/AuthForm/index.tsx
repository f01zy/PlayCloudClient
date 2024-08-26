import styles from "@/components/AuthForm/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, HTMLInputTypeAttribute } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../Button"
import Input from "@/components/Input"

export type TFileInput = {
  multiple: boolean,
  accept: string
}

export type TInput = {
  type?: HTMLInputTypeAttribute,
  field: string,
  label: string
}

interface IAuthForm {
  buttonLabel: string,
  onSubmit: SubmitHandler<FieldValues>,
  inputs: Array<TInput>
}

const AuthForm: FC<IAuthForm> = ({ onSubmit, inputs, buttonLabel }) => {
  const { status, loading } = useTypedSelector(selector => selector.userSlice)
  const pathname = usePathname()
  const buttonLink = pathname === "/login" ? "register" : "login"

  const { register, handleSubmit, } = useForm()

  return <div className={styles.auth}>
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{buttonLabel} Here</h1>
        {status && <p className={`w-4/5 text-base ${status === "error" ? "text-red-600" : "text-green-500"}`}>{status === "error" ? "An error has occurred" : `You can go to the `}{status === "success" && <Link href={"/"} className="!text-blue-500">home</Link>}</p>}
        {inputs.flatMap(input => <Input {...input} register={register} required={true} />)}
        <p className={styles.link}>{pathname === "/register" && <>Don&apos;t</>} have an account yet? - <Link href={`/${buttonLink}`} className="text-cyan-600">{buttonLink}</Link></p>
        <Button type="submit">{loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>{buttonLabel}</p>}</Button>
      </form>
    </div>
  </div>
}

export default AuthForm;