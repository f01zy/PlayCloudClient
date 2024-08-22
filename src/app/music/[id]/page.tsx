import { IMusic } from "@/interfaces/music.interface";
import MusicDetail from "@/page/MusicDetail";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const music = await fetch(`http://147.45.160.178:5050/api/music/${id}`).then(res => res.json()).then(res => res as IMusic | null)

  if (!music || music._id) return {
    title: "Music not found | PlayCloud",
    description: "Music not found. Try pass a valid music id"
  }

  return {
    title: music.name + " | PlayCloud",
    description: `A separate music page called ${music.name}`,
  }
}

const MusicDetailPage = ({ params }: { params: { id: string } }) => {
  return <MusicDetail {...params} />
}

export default MusicDetailPage;