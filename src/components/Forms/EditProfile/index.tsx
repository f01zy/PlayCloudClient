import styles from "@/components/Forms/EditProfile/styles.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import { ChangeEvent, FC, useState } from "react"
import { useTypedSelector } from "@/hooks/selector.hook";
import Input from "../../UI/Input";
import { IProfile } from "@/interfaces/profile.interface";
import Button from "../../UI/Button";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { setWindowForm } from "@/store/site/site.slice";
import { FcAddImage } from "react-icons/fc";
import { $api } from "@/http";
import { SERVER_URL } from "@/config";
import { handleClickBlock } from "@/utils/handleClickBlock.utils";

interface IEditProfile {
  windowName: string,
}

const EditProfile: FC<IEditProfile> = ({ windowName }) => {
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null)
  const [banner, setBanner] = useState<string | ArrayBuffer | null>(null)
  const [loading, setLoading] = useState({ username: false, avatar: false, banner: false })
  const { windowForm, blocked } = useTypedSelector(selector => selector.siteSlice)
  const { user } = useTypedSelector(selector => selector.userSlice)
  const { alert } = useTypedSelector(selector => selector.alertSlice)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<IProfile> = async data => {
    const isBlocked = handleClickBlock(dispatch, blocked, alert.isShow); if (isBlocked) return
    setLoading({ username: data.username.length > 0 ? true : false, avatar: data.avatar.length > 0 ? true : false, banner: data.banner.length > 0 ? true : false })

    const imagesLoad: Array<"avatar" | "banner"> = ["avatar", "banner"]
    imagesLoad.map(async el => { if (data[el].length > 0) { const formData = new FormData(); formData.append(el, data[el][0]); await $api.post(`/auth/edit/${el}`, formData).then(res => { const tempLoading = loading; tempLoading[el] = false; setLoading(tempLoading) }).finally(() => { if (!Object.values(loading).find(e => e === true)) { close() } }) } })
    if (data.username.length > 0) await $api.post("/auth/edit/username", { username: data.username }).then(res => { const tempLoading = loading; tempLoading.username = false; setLoading(tempLoading) }).finally(() => { if (!Object.values(loading).find(e => e === true)) { close() } })
  }

  const close = () => { setLoading({ username: false, avatar: false, banner: false }); setBanner(null); setAvatar(null); dispatch(setWindowForm(null)) }

  const fileChange = (e: ChangeEvent<HTMLInputElement>, field: "avatar" | "banner") => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { if (field === "avatar") setAvatar(reader.result); else if (field === "banner") setBanner(reader.result); };
      reader.readAsDataURL(file);
    }
  }

  const { register, handleSubmit } = useForm<IProfile>()

  return <div className={`${styles.form} ${windowForm === windowName ? styles.open : ""}`}>
    <div className="flex justify-between items-center w-full mb-5">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => close()} />
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.banner}>
        {user?.banner ? <Image unoptimized src={`${SERVER_URL}/banner/${user._id}.jpg`} alt="avatar" width={100} height={100} className="w-full h-full" /> : banner ? <Image unoptimized src={banner.toString()} alt="banner" height={100} width={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("banner", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "banner") })} />
      </div>
      <div className={styles.avatar}>
        {user?.avatar ? <Image unoptimized src={`${SERVER_URL}/avatar/${user._id}.jpg`} alt="avatar" width={100} height={100} className="w-full h-full" /> : avatar ? <Image unoptimized src={avatar.toString()} alt="avatar" height={100} width={100} className="w-full h-full" /> : <FcAddImage width={40} className={styles.load} />}
        <input type="file" multiple={false} accept="image/*" {...register("avatar", { required: false, onChange: (e: ChangeEvent<HTMLInputElement>) => fileChange(e, "avatar") })} />
      </div>
      <Input min={3} max={25} field="username" label="username" required={false} type="text" register={register} />
      <Button type="submit">{Object.values(loading).find(e => e === true) ? <Image unoptimized src={"/loader.svg"} width={30} height={100} alt="loader" /> : <p>Save changes</p>}</Button>
    </form>
  </div>
}

export default EditProfile;