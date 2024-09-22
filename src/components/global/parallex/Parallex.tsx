"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import styles from "./ParallaxCard.module.css";


const IMG_PADDING = 12;

const Parallax = ({children}:{children:React.ReactNode}) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  // const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 1]);

  useEffect(() => {
    const UPDATE = ({ x, y }: { x: number; y: number }) => {
      gsap.set(document.documentElement, {
        "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
      });
    };

    window.addEventListener("pointermove", UPDATE);

    return () => {
      window.removeEventListener("pointermove", UPDATE);
    };
  }, []);
  return (
    <>
      <motion.article
        className={`${styles.article}`}
        ref={targetRef}
        style={{
          opacity,
          height: `calc(100vh - ${IMG_PADDING * 2}px)`,
          scale,
        }}
      >
        {children}
      </motion.article>
    </>
  );
};

export default Parallax;
