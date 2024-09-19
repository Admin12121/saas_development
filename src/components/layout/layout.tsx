import { ReactNode } from "react"
import Navbar from "./navbar/navbar"
import { useSubdomainValidation } from "@/lib/subdomain";
import Spinner from "../ui/spinner";

const Layout = ({children}:{children:ReactNode}) => {
  const { isLoading } = useSubdomainValidation();
  return (
    <>
        <Navbar/>
        {isLoading ? <div className="flex justify-center items-center h-screen"><Spinner/></div> : children}
    </>
  )
}

export default Layout