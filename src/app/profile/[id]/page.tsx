import { IUser } from "@/interfaces/user.interface";
import Profile from "@/pagesComponents/Profile";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = params.id
  const user = await fetch(`http://85.193.80.231:5050/api/users/${id}`).then(res => res.json()).then(res => res as IUser)

  return {
    title: user.username + " | PlayCloud",
    description: `The ${user.username} page. Here you can get acquainted with his profile and watch his tracks`,
  }
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <Profile {...params} />
}

export default ProfilePage;