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

interface IEditProfile {
  windowName: string,
  id: string
}

const EditProfile: FC<IEditProfile> = ({ windowName, id }) => {
  const { loading, windowForm } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<IProfile> = data => {
    console.log(data)
  }

  const { register, handleSubmit } = useForm<IProfile>()

  return <div className={`${styles.form} ${windowForm === windowName ? styles.open : ""}`}>
    <div className="flex justify-between items-center w-full mb-5">
      <h1>Edit profile</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.banner}>
        <input type="file" multiple={false} accept="image/*" {...register("banner", { required: true })} />
      </div>
      <div className={styles.avatar}>
        <input type="file" multiple={false} accept="image/*" {...register("avatar", { required: true })} />
      </div>
      <Input field="username" label="username" required={true} type="text" register={register} />
      <Button type="submit">{loading ? <Image src={"loader.svg"} width={30} height={100} alt="loader" /> : <p>Save changes</p>}</Button>
    </form>
  </div>
}

export default EditProfile;