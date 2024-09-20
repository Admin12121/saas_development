import Layout from "@/components/layout/layout"
import { getSubdomain } from "@/lib/subdomain";
import { Navigate } from "react-router-dom";
import { MagicCard } from "@/components/global/card";

const Availabledomains = () => {

  const { subdomain } = getSubdomain();
  if(subdomain){
    return <Navigate to="/" />
  }
  return (
    <Layout login={false}>
        <div className="flex flex-col items-center justify-center h-screen w-screen">
        <MagicCard className="w-96 h-40 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold">Available Domains</h1>
            </div>
        </MagicCard>
        </div>
    </Layout>

  )
}

export default Availabledomains