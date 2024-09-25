import styles from "@/components/UI/Input/styles.module.scss"
import { InputHTMLAttributes, FC } from "react"

interface IInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  label: string
  field?: string
  register?: any,
}

const Input: FC<IInput> = ({ label, field, register, ...props }) => {
  return <div className={props.type === "file" ? styles.file : styles.input}>
    <input
      placeholder=""
      {...props}
      {...(register && field ? register(field, { ...props }) : {})}
    />
    {props.type === "file" ? <div><p>{label}</p></div> : <p>{label}</p>}
  </div>
}

export default Input;