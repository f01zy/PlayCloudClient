"use client"

import { useTypedSelector } from "@/hooks/selector.hook"
import { ILogin } from "@/interfaces/login.interface"
import styles from "@/pagesComponents/Login/styles.module.scss"
import { AppDispatch } from "@/store/store"
import { login } from "@/store/user/user.actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useTypedSelector(selector => selector.userSlice)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = async data => {
    dispatch(login(data)).then(() => router.push("/"))
  }

  return <div className={styles.login}>
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in Here</h1>
        <p className={styles.error}>{error ? "An error occurred while trying to login. Try again later" : ""}</p>
        <div className={styles.input}>
          <input type="email" placeholder="" {...register("email", {
            required: true
          })} />
          <p>email</p>
        </div>
        <div className={styles.input}>
          <input type="password" placeholder="" {...register("password", {
            required: true,
          })} />
          <p>password</p>
        </div>
        <p className={styles.login}>Don&apos;t have an account yet? - <Link href={"/register"} className="text-cyan-600">register</Link></p>
        <button type="submit">
          {loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>Log in</p>}
        </button>
      </form>
    </div>
  </div>
}

export default Login;