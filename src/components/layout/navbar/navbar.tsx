import "./style.navigation.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ModeToggle } from "../toogle-mode";
import { Button } from "@/components/ui/button";
import { getSubdomain } from "@/lib/subdomain";

const Navbar = ({ position = false }: { position?: boolean }) => {
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
            <div className="logo">
              <Link to="/">
                <span>
                  <img src="/logo.svg" className="invert p-2" alt="logo" /> 
                </span>
              </Link>
            </div>
            <span className="flex gap-2 items-center justify-center">
              <ModeToggle />
              <Button asChild>
                {subdomain ? <Link to="/login">Login</Link> : <Link to="/register">Sign Up</Link>}
              </Button>
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
