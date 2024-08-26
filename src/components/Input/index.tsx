import styles from "@/components/Input/styles.module.scss"
import { HTMLInputTypeAttribute, FC } from "react"

interface IInput {
  type?: HTMLInputTypeAttribute,
  multiple?: boolean,
  accept?: string
  label: string
  field: string
  required: boolean,
  register: any
}

const Input: FC<IInput> = ({ type, field, register, required, accept, multiple, label }) => {
  return <div className={type === "file" ? styles.file : styles.input}>
    <input type={type} accept={accept} multiple={multiple} {...register(field, { required })} />
    {type === "file" ? <div><p>{label}</p></div> : <p>{label}</p>}
  </div>
}

export default Input;