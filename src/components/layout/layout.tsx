import { ReactNode } from "react"
import Navbar from "./navbar/navbar"
import { useSubdomainValidation } from "@/lib/subdomain";
import Spinner from "../ui/spinner";

const Layout = ({children, showHome, login=true}:{children:ReactNode, showHome?:string | null, login?:boolean}) => {
  const { isLoading, organization  } = useSubdomainValidation();
  return (
    <>
        <Navbar isLoading={isLoading} login={login} showHome={showHome} organization={organization}/>
        {isLoading ? <div className="flex justify-center items-center h-screen"><Spinner/></div> : children}
    </>
  )
}

export default Layout