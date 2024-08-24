"use client"

import { useTypedSelector } from "@/hooks/selector.hook";
import { IMusic } from "@/interfaces/music.interface";
import { AppDispatch } from "@/store/store";
import { getAllMusic } from "@/utils/getAllMusic.utils";
import { playMusic } from "@/utils/playMusic.utils";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ShufflePage: NextPage = () => {
  const [music, setMusic] = useState<IMusic>()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const user = useTypedSelector(selector => selector.userSlice.user)

  useEffect(() => {
    getAllMusic()
      .then(res => setMusic(res[Math.floor(Math.random() * (res.length - 0)) + 0]))
      .then(() => {
        if (user && music) { playMusic({ ...music }, dispatch, user); return router.push("/music/" + music._id) }
      })
  }, [])

  return <div></div>
}

export default ShufflePage;