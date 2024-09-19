import Layout from "@/components/layout/layout"
import NotRegister from "./notRegister"
import Hero from "./static"

const Home = ({isValidSubdomain, originalDomain}:{isValidSubdomain:string | null, originalDomain:string | null}) => {
  const showHome = isValidSubdomain || originalDomain;
  return (
    <Layout>
      {showHome ? <Hero/> : <NotRegister />}
    </Layout>
  )
}

export default Home