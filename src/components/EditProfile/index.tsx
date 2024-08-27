import styles from "@/components/EditProfile/styles.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import { FC } from "react"
import { useTypedSelector } from "@/hooks/selector.hook";
import Input from "../Input";
import { IProfile } from "@/interfaces/profile.interface";
import Button from "../Button";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { setWindowForm } from "@/store/site/site.slice";
import { FcAddImage } from "react-icons/fc";
import { $api } from "@/http";

interface IEditProfile {
  windowName: string,
}

const EditProfile: FC<IEditProfile> = ({ windowName }) => {
  const { loading, windowForm } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<IProfile> = async data => {
    console.log(data)

    if (data.avatar.length > 0) { const formData = new FormData(); formData.append("avatar", data.avatar[0]); $api.post("/auth/edit/avatar", formData) }
    if (data.banner.length > 0) { const formData = new FormData(); formData.append("banner", data.banner[0]); $api.post("/auth/edit/banner", formData) }
    if (data.username.length > 0) $api.post("/auth/edit/username", { username: data.username })

    // if (data.avatar.length > 0 || data.username.length > 0 || data.banner.length > 0) window.location.reload()
  }

  const { register, handleSubmit } = useForm<IProfile>()

  return <div className={`${styles.form} ${windowForm === windowName ? styles.open : ""}`}>
    <div className="flex justify-between items-center w-full mb-5">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.banner}>
        <input type="file" multiple={false} accept="image/*" {...register("banner", { required: false })} />
        <FcAddImage width={40} className={styles.load} />
      </div>
      <div className={styles.avatar}>
        <input type="file" multiple={false} accept="image/*" {...register("avatar", { required: false })} />
        <FcAddImage width={40} className={styles.load} />
      </div>
      <Input field="username" label="username" required={false} type="text" register={register} />
      <Button type="submit">{loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>Save changes</p>}</Button>
    </form>
  </div>
}

export default EditProfile;