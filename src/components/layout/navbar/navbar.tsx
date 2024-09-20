import "./style.navigation.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ModeToggle } from "../toogle-mode";
import { Button } from "@/components/ui/button";
import { getSubdomain } from "@/lib/subdomain";
import { Skeleton } from "@/components/ui/skeleton"

const Navbar = ({ isLoading, position = false, organization, showHome, login }: { isLoading: boolean, position?: boolean, organization: string | null, showHome?: string | null, login?: boolean }) => {
  const { subdomain  } = getSubdomain(); 
  const handleMouseMove = (e: any) => {


    for (const card of document.getElementsByClassName("nav")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };
  console.log(showHome)
  return (
    <>

      <motion.div
        initial={{ y: -100, scale: 0.9 }}
        animate={{ y: 10, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="Nav_wrapper"
        style={{ position: position ? "absolute" : "fixed" }}
      >
        <div className="nav" onMouseMove={handleMouseMove}>
          <div className="nav_wrap flex justify-between items-center">
            <span className="flex gap-2 items-center justify-center cursor-pointer">
            <Skeleton className="h-11 w-11 rounded-md" disable={!isLoading}>
              <div className="logo">
                <Link to="/">
                  <span>
                    <img src="/images/logo.png" className="p-2" alt="logo" /> 
                  </span>
                </Link>
              </div>
            </Skeleton>
            <Skeleton className="h-11 w-48 rounded-md" disable={!isLoading}>
              <h1 className="text-2xl font-semibold">{organization ? organization : "Kantipur Portal"}</h1>
            </Skeleton>
            </span>
            <span className="flex gap-2 items-center justify-center">
              <ModeToggle />
             {login && <Skeleton className="h-11 w-24 rounded-md" disable={!isLoading}>
                <Button asChild className="h-11 px-5 rounded-[8px]" >
                  {subdomain ? <Link to="/login">Login</Link> : <Link to="/register">Sign Up</Link>}

                </Button>
              </Skeleton>}

            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
