import styles from "@/components/Loader/styles.module.scss"
import Image from "next/image";

const Loader = () => {
  return <div className={styles.loader}>
    <Image src={"loader.svg"} width={30} height={100} alt="loader" />
  </div>
}

export default Loader;