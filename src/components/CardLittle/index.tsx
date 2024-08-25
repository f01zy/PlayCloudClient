"use client"

import styles from "@/components/CardLittle/styles.module.scss"
import { SERVER_URL } from "@/config";
import { IMusic } from "@/interfaces/music.interface";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"

const CardLittle: FC<IMusic> = ({ _id, author, listening, name }) => {
  return <div className={styles.cardLittle}>
    <Image className="rounded-md" src={`${SERVER_URL}/cover/${_id}.jpg`} alt={name} width={40} height={40} />
    <div className="ml-3">
      <Link href={`/tracks/${_id}`}><h2>{name}</h2></Link>
      <Link href={`/profile/${author._id}`}><p>{author.username}</p></Link>
    </div>
  </div>
}

export default CardLittle;