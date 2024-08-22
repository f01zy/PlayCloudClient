"use client"

import Card from "@/components/Card";
import { $api } from "@/http";
import { IMusic } from "@/interfaces/music.interface";
import styles from "@/page/Home/styles.module.scss"
import { getAllMusic } from "@/service/getAllMusic.service";
import { useEffect, useState } from "react"

const Home = async () => {
  const music = await getAllMusic()

  return <div className={styles.home}>
    <h2>Most popular</h2>
    <div className={styles.songs}>
      {music.map(song => <Card key={song._id} {...song} />)}
    </div>
  </div>
}

export default Home;