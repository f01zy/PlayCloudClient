import styles from "@/components/Forms/WindowForm/styles.module.scss"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TFileInput, TInput } from "../AuthForm";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import Button from "../../UI/Button";
import { FC } from "react"
import { useTypedSelector } from "@/hooks/selector.hook";
import { setWindowForm } from "@/store/site/site.slice";
import Input from "@/components/UI/Input";

interface IWindowForm {
  onSubmit: SubmitHandler<FieldValues>,
  inputs: Array<TInput | TInput & TFileInput>,
  windowName: string
}

const WindowForm: FC<IWindowForm> = ({ inputs, onSubmit, windowName }) => {
  const { loading, windowForm } = useTypedSelector(selector => selector.siteSlice)
  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit } = useForm()

  return <div className={`${styles.form} ${windowForm === windowName ? styles.open : ""}`}>
    <div className="flex justify-between items-center w-full mb-5">
      <h1>Upload a track</h1>
      <IoMdClose width={25} height={25} onClick={() => dispatch(setWindowForm(null))} />
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.flatMap(input => <Input {...(input as TInput & TFileInput)} register={register} required={true} />)}

      <div className="mt-4 mb-4 flex items-center"><input type="checkbox" className="w-4 h-4 mr-2" /><p className="text-sm">I agree with all the rules of publication</p></div>

      <Button type="submit">{loading ? <Image src={"/loader.svg"} width={30} height={100} alt="loader" /> : <p>Upload</p>}</Button>
    </form>
  </div>
}

export default WindowForm;