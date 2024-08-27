import styles from "@/components/EditProfile/styles.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import { ChangeEvent, FC, useState } from "react"
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
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null)
  const [banner, setBanner] = useState<string | ArrayBuffer | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState({ username: false, avatar: false, banner: false })
  const { windowForm } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<IProfile> = async data => {
    setLoading({ username: true, avatar: true, banner: true })

    if (data.avatar.length > 0) {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      $api.post("/auth/edit/avatar", formData)
        .then(res => { const tempLoading = loading; tempLoading.avatar = false; setLoading(tempLoading) })
        .catch(() => setError("An error has occurred"))
        .finally(() => !error && !Object.values(loading).some(e => e === true) && dispatch(setWindowForm(null)))
    }
    if (data.banner.length > 0) {
      const formData = new FormData();
      formData.append("banner", data.banner[0]);
      $api.post("/auth/edit/banner", formData)
        .then(res => { const tempLoading = loading; tempLoading.banner = false; setLoading(tempLoading) })
        .catch(() => setError("An error has occurred"))
        .finally(() => !error && !Object.values(loading).some(e => e === true) && dispatch(setWindowForm(null)))
    }
    if (data.username.length > 0)
      $api.post("/auth/edit/username", { username: data.username })
        .then(res => { const tempLoading = loading; tempLoading.username = false; setLoading(tempLoading) })
        .catch(() => setError("An error has occurred"))
        .finally(() => !error && !Object.values(loading).some(e => e === true) && dispatch(setWindowForm(null)))
  }

  const fileChange = (e: ChangeEvent<HTMLInputElement>, field: "avatar" | "banner") => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "avatar") setAvatar(reader.result);
        else if (field === "banner") setBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const { register, handleSubmit } = useForm<IProfile>()

  return <div className={`${styles.form} ${windowForm === windowName ? styles.open : ""}`}>
    <div className="flex justify-between items-center w-full mb-5">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>
    {error && <p className="text-base text-center mt-2 mb-2 text-red-600">{error}</p>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.banner}>
        {banner ? <Image src={banner.toString()} alt="banner" height={100} width={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("banner", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "banner") })} />
      </div>
      <div className={styles.avatar}>
        {avatar ? <Image src={avatar.toString()} alt="avatar" height={100} width={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("avatar", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "avatar") })} />
      </div>
      <Input field="username" label="username" required={false} type="text" register={register} />
      <Button type="submit">{!Object.values(loading).some(e => e === false) ? <Image src={"/loader.svg"} width={30} height={100} alt="loader" /> : <p>Save changes</p>}</Button>
    </form>
  </div>
}

export default EditProfile;