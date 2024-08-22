import styles from "@/components/AuthForm/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, HTMLInputTypeAttribute } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

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
  const { error, loading } = useTypedSelector(selector => selector.userSlice)
  const pathname = usePathname()
  const buttonLink = pathname === "/login" ? "register" : "login"

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return <div className={styles.auth}>
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{buttonLabel} Here</h1>
        <p className={styles.error}>{error ? "An error occurred. Try again later" : ""}</p>
        {inputs.flatMap(input => (
          <div className={styles.input}>
            <input type={input.type} placeholder="" {...register(input.field, { required: true, })} />
            <p>{input.label}</p>
          </div>
        ))}
        <p className={styles.link}>{pathname === "/register" && <>Don&apos;t</>} have an account yet? - <Link href={`/${buttonLink}`} className="text-cyan-600">{buttonLink}</Link></p>
        <button type="submit">
          {loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>{buttonLabel}</p>}
        </button>
      </form>
    </div>
  </div>
}

export default AuthForm;