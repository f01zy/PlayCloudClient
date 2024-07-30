"use client"

import { useTypedSelector } from "@/hooks/selector.hook";
import { IRegister } from "@/interfaces/register.interface";
import styles from "@/pagesComponents/Register/styles.module.scss"
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerF } from "@/store/user/user.actions"
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useTypedSelector(selector => selector.userSlice)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegister>()

  const onSubmit: SubmitHandler<IRegister> = async data => {
    dispatch(registerF(data)).then(() => router.push("/"))
  }

  return <div className={styles.register}>
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Here</h1>
        <p className={styles.error}>{error ? "An error occurred while trying to register. Try again later" : ""}</p>
        <div className={styles.input}>
          <input type="text" placeholder="" {...register("username", {
            required: true,
          })} />
          <p>username</p>
        </div>
        <div className={styles.input}>
          <input type="email" {...register("email", {
            required: true
          })} placeholder="" />
          <p>email</p>
        </div>
        <div className={styles.input}>
          <input type="password" placeholder="" {...register("password", {
            required: true,
          })} />
          <p>password</p>
        </div>
        <p className={styles.login}>Already have an account? - <Link href={"/login"} className="text-cyan-600">log in</Link></p>
        <button type="submit">
          {loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>Register</p>}
        </button>
      </form>
    </div>
  </div>
}

export default Register;