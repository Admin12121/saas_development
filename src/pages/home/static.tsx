import { Example } from "./components/view";
import Component from "./components/temp1";
import { getSubdomain } from "@/lib/subdomain";

const Hero = () => {
  const { subdomain } = getSubdomain();
  return <>{subdomain ? <Component /> : <Example />}</>;
};

export default Hero;
