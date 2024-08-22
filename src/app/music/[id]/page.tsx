import { IMusic } from "@/interfaces/music.interface";
import MusicDetail from "@/page/MusicDetail";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const music = await fetch(`http://147.45.160.178:5050/api/music/${id}`).then(res => res.json()).then(res => res as IMusic | null)

  return {
    title: music ? music.name : "Music not found" + " | PlayCloud",
    description: music ? `A separate music page called ${music.name}. The author of the song is ${music.author.username}` : "Music not found. Try pass a valid music id",
  }
}

const MusicDetailPage = ({ params }: { params: { id: string } }) => {
  return <MusicDetail {...params} />
}

export default MusicDetailPage;