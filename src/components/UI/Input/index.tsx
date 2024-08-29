import styles from "@/components/UI/Input/styles.module.scss"
import { HTMLInputTypeAttribute, FC } from "react"

interface IInput {
  type?: HTMLInputTypeAttribute,
  multiple?: boolean,
  min?: number
  max?: number
  accept?: string
  label: string
  field: string
  required: boolean,
  register: any,
}

const Input: FC<IInput> = ({ type, field, register, required, accept, multiple, label, max, min }) => {
  return <div className={type === "file" ? styles.file : styles.input}>
    <input type={type} placeholder="" accept={accept} multiple={multiple} {...register(field, { required, minLength: min, maxLength: max })} />
    {type === "file" ? <div><p>{label}</p></div> : <p>{label}</p>}
  </div>
}

export default Input;