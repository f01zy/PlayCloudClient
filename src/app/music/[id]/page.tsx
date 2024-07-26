import { API_URL, STATIC_URL } from "@/config";
import { IMusic } from "@/interfaces/music.interface";
import MusicDetail from "@/pagesComponents/MusicDetail";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const music = await fetch(`http://85.193.80.231:5050/api/music/${id}`).then(res => res.json()).then(res => res as IMusic)

  return {
    title: music.name + " | PlayCloud",
    description: `A separate music page called ${music.name}. The author of the song is ${music.author.username}`,
    icons: {
      icon: `http://85.193.80.231:5050/cover/${music._id}.jpg`
    }
  }
}

const MusicDetailPage = ({ params }: { params: { id: string } }) => {
  return <MusicDetail {...params} />
}

export default MusicDetailPage;