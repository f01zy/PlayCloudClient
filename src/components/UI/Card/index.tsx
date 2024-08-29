"use client"

import styles from "@/components/UI/Card/styles.module.scss"
import { SERVER_URL } from "@/config";
import Image from "next/image";
import { FC } from "react";
import { FaPause } from "react-icons/fa6"
import { IoIosPlay } from "react-icons/io";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import { handlePlayClick } from "@/utils/handlePlayClick.utils";
import { filterListeningsByDate } from "@/utils/filterListeningsByDate.utils";
import DraggableWrapper from "../../Wrappers/DraggableWrapper";

const Card: FC<IMusic> = ({ author, name, listenings, _id, likes, date, type }) => {
	const router = useRouter()
	const music = useTypedSelector(selector => selector.siteSlice.music)
	const user = useTypedSelector(selector => selector.userSlice.user)
	const dispatch = useDispatch<AppDispatch>()

	return <div className={styles.card}>
		<div className={styles.container}>
			<div className={styles.cover}>
				<Image src={`${SERVER_URL}/cover/${_id}.jpg`} alt={name} width={100} height={100} />

				<div className={styles.play}>
					<div onClick={() => {
						handlePlayClick(dispatch, { _id, author, listenings, name, likes, date, type }, user, music?.name, router)
					}}>
						{music?.name != name ? <IoIosPlay /> : music?.isPaused ? <IoIosPlay /> : <FaPause />}
					</div>
				</div>
			</div>
			<Link href={`/tracks/${_id}`}><h3>{name}</h3></Link>
			<p>({filterListeningsByDate(listenings).length} listening on last week)</p>
			<Link href={`/profile/${author._id}`}><p>{author.username}</p></Link>
		</div>
	</div>
}

export default Card;