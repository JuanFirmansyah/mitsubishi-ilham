"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { ssr: false }
);

export default function Hero3D() {
  return (
    <section className="h-screen w-full relative">

      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/qliJKLQ75aY5O5lt/scene.splinecode" />
      </div>

      <div className="flex flex-col items-center justify-center h-full text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-bold"
        >
          Develop Your Idea
        </motion.h1>

        <p className="mt-6 text-xl opacity-80">
          Creative Digital Agency
        </p>

        <MagneticButton>
            Start Project
        </MagneticButton>

      </div>
    </section>
  );
}