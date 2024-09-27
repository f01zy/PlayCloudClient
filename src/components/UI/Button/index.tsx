import styles from "@/components/UI/Button/styles.module.scss"
import { FC } from "react"

interface IButton {
  type?: "button" | "submit" | "reset";
  disabled?: boolean
  children: React.ReactNode;
  onSubmit?: any;
}

const Button: FC<IButton> = ({ children, onSubmit, type, disabled }) => {
  return <button
    disabled={disabled}
    type={type}
    onSubmit={onSubmit}
    className={styles.button}
  >{children}</button>
}

export default Button;