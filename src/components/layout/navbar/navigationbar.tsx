import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link} from "react-router-dom";
import "./style.navigation.scss";
import { RollingText } from "../../Animation/Line_Button/Line";

const container = {
  hidden: { opacity:0, y:100 },
  visible: {
    opacity: 1,
    y:0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}
  
const displayNone = {
  display: 'none'
}

const Navigationbar = ({ variants, isInView, href, handleTopScrol,detailScoll,PageScrol,github, source}) => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [scrollDirection, setScrollDirection] = useState(false);
  const [menu, setMenu] = useState(false)
  const [screen, setScreen] = useState(window.innerWidth);

  const handleMouseMove = (e) => {
    for (const card of document.getElementsByClassName("navigationbar")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos < currentScrollPos) {
      setScrollDirection(true);
    } else if (prevScrollPos > currentScrollPos) {
      setScrollDirection(false);
    }
    setPrevScrollPos(currentScrollPos);
  };
  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  let lenis;
  useEffect(() => {
    const updateScreenWidth = () => {
      if (screen > 700) {
        (async () => {
          const Lenis = (await import("@studio-freight/lenis")).default;
          lenis = new Lenis({
            lerp: 0.05,
            duration: 0.4,
            wheelMultiplier: 3,
            infinite: false,
          });
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        })();
      }

    };
    window.addEventListener("resize", updateScreenWidth);
    updateScreenWidth();
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <>
      <div className="fixed_wrappper">
        <motion.span
          className="nav_span_position"
          variants={variants}
          initial="initial"
          animate={
            isInView
              ? isInView && scrollDirection
                ? "animate"
                : "initial"
              : ""
          }
        >
          <motion.div className="navigationbar" style={{height:menu ? "350px" :"60px", bottom:menu ? "180px" :"35px",alignItems:menu ? "end" :"end", transition: ".5s ease"}} transition={{duration:.5, }} onMouseMove={handleMouseMove}>
            {
              href && 
              <>
              <motion.div style={{height:menu ? "285px" :"0px",padding:menu ? "25px" :"0px",transition: ".5s ease"}} className="linksWrapper">
                <motion.span initial={{opacity:0}} variants={container} animate={{opacity:menu ? 1 : 0,display:menu ? "flex" :"none"}} transition={{delay:menu  ? .5 : 0, duration:1}} className="web_links" style={{height:menu ? "200px" :"0px",width:menu ? "200px" :"0px",transition: ".5s ease"}}>
                  <p>Website</p>
                  <span>
                    <Link to="/">
                      <RollingText text="Home" st="Home" />
                    </Link>
                  </span>
                  <span>
                    <Link to="/about">
                      <RollingText text="About" st="About" />
                    </Link>
                  </span>
                  <span>
                    <Link to="/project">
                      <RollingText text="Projects" st="Projects" />
                    </Link>
                  </span>
                  <span>
                    <Link to="/contact">
                      <RollingText text="Contact" st="Contact" />
                    </Link>
                  </span>
                </motion.span>
                <motion.span initial={{opacity:0}} variants={container} animate={{opacity:menu ? 1 : 0,display:menu ? "flex" :"none"}} transition={{delay:menu  ? .5 : 0, duration:1}} className="web_links web_after_links" style={{height:menu ? "200px" :"0px",width:menu ? "200px" :"0px",transition: ".5s ease"}}>
                  <p>Social</p>
                <a href="https://www.instagram.com/vicky__taj/" target="_blank" >
                  <RollingText text="Instagram" st="Instagram" />
                </a>
                <a href="https://github.com/Admin12121" target="_blank" >
                  <RollingText text="Github" st="Github" />
                </a>
                <a href="https://www.linkedin.com/in/vickytajpuriya/" target="_blank" >
                  <RollingText text="Linkedin" st="Linkedin" />
                </a>
                </motion.span>
              </motion.div>
              </>
            }
            <div className="navigation_wrapper" style={{height:"58px"}}>
              <div className="logo">
              {href ?
               <div onClick={()=>{setMenu(el=>!el)}}>
               <span>
               <img src="/log1.svg" alt="logo" style={{height:"100%"}}/>
               </span>
             </div>
              : <Link to="/">
                <span>
                <img src="/log1.svg" alt="logo" style={{height:"100%"}}/>
                </span>
              </Link>}
              </div>
              <div className={`links ${href ? 'disnone' : ''}`}  >
              { href ? 
                 <>
                 <div className="ALink">
                 <a onMouseEnter={handleTopScrol} onClick={handleTopScrol}>
                    <RollingText text="Project" st="Project" />
                  </a>
                  <a  onMouseEnter={detailScoll} onClick={detailScoll}>
                    <RollingText text="Details" st="Details" />
                  </a>
                  <a onMouseEnter={PageScrol} onClick={PageScrol}>
                    <RollingText text="Landing Page" st="Landing Page" />
                  </a>
                 </div>
                 </>
              
              :   
                <>
                  <Link to="/about">
                    <RollingText text="About" st="About" />
                  </Link>
                  <Link to="/project">
                    <RollingText text="Projects" st="Projects" />
                  </Link>
                  <Link to="/contact">
                    <RollingText text="Contact" st="Contact" />
                  </Link>
                </> }
              </div>
              {href &&
              <>
              <span className="psttern"></span>
              <div className="site"> 
               <a className="visit_site nth2"  href={source ? github : "#"} style={{background:`${source ? "" : '#3d3d3d'}  `, color:`${source ? "" : '#fff'}  `,cursor:`${source ? "" : 'not-allowed'}` }} target={`${source ? "_blank" : ''}`}>
                  source code
                </a>
              </div>
              <div className="site"> 
               <a className="visit_site" href={href} target="_blank">
                  Visit Site
                </a>
              </div>
              </>
              }
            </div>
          </motion.div>
        </motion.span>
      </div>
    </>
  );
};

export default Navigationbar;
