import styles from "@/components/UI/Button/styles.module.scss"
import { FC } from "react"

interface IButton {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onSubmit?: any;
}

const Button: FC<IButton> = ({ children, onSubmit, type }) => {
  return <button
    type={type}
    onSubmit={onSubmit}
    className={styles.button}
  >{children}</button>
}

export default Button;