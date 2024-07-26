"use client"

import Profile from "@/pagesComponents/Profile";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return <Profile {...params} />
}

export default ProfilePage;