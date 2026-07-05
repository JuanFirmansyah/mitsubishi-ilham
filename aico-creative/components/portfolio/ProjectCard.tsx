"use client";

import Image from "next/image";
import { useRef } from "react";

export default function ProjectCard() {

  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={pause}
      className="relative h-80 rounded-2xl overflow-hidden"
    >

      <Image
        src="/project.jpg"
        alt="project"
        fill
        className="object-cover"
      />

      <video
        ref={videoRef}
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition"
      >
        <source src="/preview.mp4" />
      </video>

    </div>
  );
}