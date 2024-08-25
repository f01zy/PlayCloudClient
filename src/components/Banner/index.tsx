import styles from "@/components/Banner/styles.module.scss"
import Image from "next/image";
import { FC } from "react";

interface IBanner {
  title: string,
  value: string,
  image: string
}

const Banner: FC<IBanner> = ({ title, value, image }) => {
  return <div className={styles.banner}>
    <Image src={image} alt="banner" width={100} height={100} />
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  </div>
}

export default Banner;