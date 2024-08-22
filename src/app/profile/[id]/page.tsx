import { SERVER_URL } from "@/config";
import { IUser } from "@/interfaces/user.interface";
import Profile from "@/page/Profile";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const user = await fetch(`${SERVER_URL}/api/users/${id}`).then(res => res.json()).then(res => res as IUser)

  if (!user) return { title: "Not Found" }

  return {
    title: user.username + " | PlayCloud",
    description: `The ${user.username} page. Here you can get acquainted with his profile and watch his tracks`,
  }
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <Profile {...params} />
}

export default ProfilePage;