// app/page.tsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FloatingMenu from "../components/FloatingMenu"
import { Folder, User, Film, Mail, Instagram, Linkedin, Dribbble, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  name: string
  video: string
  detail: string
}

const projects: Project[] = [
  { id: "project-1", name: "Project Alpha", video: "https://drive.google.com/file/d/1ETXRyZ0FJVDN34zH7pk_2GusdWSPgfl4/preview", detail: "/projects/project-1" },
  { id: "project-2", name: "Project Beta", video: "https://drive.google.com/file/d/1OraVDaFV_x0rO6SPaSWVIN5g11VTj153/preview", detail: "/projects/project-2" },
  { id: "project-3", name: "Project Gamma", video: "https://drive.google.com/file/d/1JfFcXH6kS31WkwIejqyKbm4XusXEStxD/preview", detail: "/projects/project-3" },
  { id: "project-4", name: "Project Delta", video: "https://drive.google.com/file/d/1_EUALiKtAwDnb0kxDo1OcicQYWYbfTR2/preview", detail: "/projects/project-4" },
  { id: "project-5", name: "Project Epsilon", video: "https://drive.google.com/file/d/1TJnTNj34RMkM_NRFXsGaXR2yslsG1Us8/preview", detail: "/projects/project-5" },
  { id: "project-6", name: "Project Zeta", video: "https://drive.google.com/file/d/1kjZKHqG5ZXPBsfpT8q2nvn1V4gwQiAzW/preview", detail: "/projects/project-6" },
  { id: "project-7", name: "Project Eta", video: "https://drive.google.com/file/d/1HeM9MhDwuRBoAVZJURAFd8LKXe89KGxl/preview", detail: "/projects/project-7" },
  { id: "project-8", name: "Project Theta", video: "https://drive.google.com/file/d/1sBB1KWLHRiwE6TN2OMkunZX2Q1hK6wlm/preview", detail: "/projects/project-8" },
  { id: "project-9", name: "Project Iota", video: "https://drive.google.com/file/d/14twIVDKbN02ohaDLMEcp2ZmwzS_5HgLB/preview", detail: "/projects/project-9" },
  { id: "project-10", name: "Project Kappa", video: "https://drive.google.com/file/d/1DMF0TrOjeu-DRJ_jqnbRZdzfHqSIjCFZ/preview", detail: "/projects/project-10" },
  { id: "project-11", name: "Project Lambda", video: "https://drive.google.com/file/d/176Ovto6eeKj7wiqtymKe45wQJqCQmbUx/preview", detail: "/projects/project-11" },
  { id: "project-12", name: "Project Mu", video: "https://drive.google.com/file/d/1yy34EFaCjNqDekyaST4jmxZZwyPpBP3S/preview", detail: "/projects/project-12" },
  { id: "project-13", name: "Project Nu", video: "https://drive.google.com/file/d/1XOSexwyioVoU9gH3-emYE6-UNnvymBkg/preview", detail: "/projects/project-13" }
]

const navMenu = [
  { name: "Projects", link: "#project-1", icon: Folder },
  { name: "About", link: "/about", icon: User },
  { name: "Who We Worked With", link: "/clients", icon: Film },
  { name: "Contact", link: "/contact", icon: Mail },
]

const socialMenu = [
  { name: "Instagram", link: "https://instagram.com/aicocreative", icon: Instagram },
  { name: "LinkedIn", link: "https://linkedin.com/company/aicocreative", icon: Linkedin },
  { name: "Dribbble", link: "https://dribbble.com/aicocreative", icon: Dribbble },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-black">
      <FloatingMenu navMenu={navMenu} socialMenu={socialMenu} />
      
      <div className="p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p) => (
            <div key={p.id} id={p.id} className="reveal rounded-xl overflow-hidden bg-zinc-900 group">
              <div className="aspect-video relative">
                <iframe 
                  src={p.video} 
                  className="w-full h-full pointer-events-none" 
                  allow="autoplay" 
                  title={p.name}
                />
              </div>
              {/* <div className="p-4">
                <Link 
                  href={p.detail} 
                  className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors group/link"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="flex items-center gap-1 text-sm text-zinc-500 group-hover/link:text-white transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}