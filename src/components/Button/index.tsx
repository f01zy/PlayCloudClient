import styles from "@/components/Button/styles.module.scss"
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
    className={styles.submit}
  >{children}</button>
}

export default Button;