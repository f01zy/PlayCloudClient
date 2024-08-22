import Login from "@/page/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | PlayCloud"
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage;