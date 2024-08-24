"use client"

import { IMusic } from "@/interfaces/music.interface";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShufflePage: NextPage = () => {
  const [music, setMusic] = useState<IMusic>()
  const router = useRouter()

  getAllMusic()
    .then(res => setMusic(res[Math.floor(Math.random() * (res.length - 0)) + 0]))
    .then(() => {
      if (music) return router.push("/music/" + music._id)
    })

  return <div></div>
}

export default ShufflePage;