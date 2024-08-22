import { IUser } from "@/interfaces/user.interface";
import Profile from "@/page/Profile";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const user = await fetch(`http://147.45.160.178:5050/api/users/${id}`).then(res => res.json()).then(res => res as IUser | null)

  return {
    title: (user ? user.username : "User not found") + " | PlayCloud",
    description: user ? `The ${user.username} page. Here you can get acquainted with his profile and watch his tracks` : "User not found. Try pass a valid user id",
  }
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <Profile {...params} />
}

export default ProfilePage;