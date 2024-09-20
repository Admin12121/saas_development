import Layout from "@/components/layout/layout"
import NotRegister from "./notRegister"
import Hero from "./static"

const Home = ({showHome}:{showHome:string | null}) => {
  return (
    <Layout showHome={showHome}>
      {showHome ? <Hero/> : <NotRegister />}
    </Layout>
  )
}

export default Home