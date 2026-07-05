"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { ssr: false }
)

const projects = [
{
id: "project-1",
name: "Project Alpha",
video: "https://drive.google.com/file/d/1ETXRyZ0FJVDN34zH7pk_2GusdWSPgfl4/preview",
detail: "/projects/project-1"
},
{
id: "project-2",
name: "Project Beta",
video: "https://drive.google.com/file/d/1OraVDaFV_x0rO6SPaSWVIN5g11VTj153/preview",
detail: "/projects/project-2"
},
{
id: "project-3",
name: "Project Gamma",
video: "https://drive.google.com/file/d/1JfFcXH6kS31WkwIejqyKbm4XusXEStxD/preview",
detail: "/projects/project-3"
},
{
id: "project-4",
name: "Project Delta",
video: "https://drive.google.com/file/d/1_EUALiKtAwDnb0kxDo1OcicQYWYbfTR2/preview",
detail: "/projects/project-4"
},
{
id: "project-5",
name: "Project Epsilon",
video: "https://drive.google.com/file/d/1TJnTNj34RMkM_NRFXsGaXR2yslsG1Us8/preview",
detail: "/projects/project-5"
},
{
id: "project-6",
name: "Project Zeta",
video: "https://drive.google.com/file/d/1kjZKHqG5ZXPBsfpT8q2nvn1V4gwQiAzW/preview",
detail: "/projects/project-6"
},
{
id: "project-7",
name: "Project Eta",
video: "https://drive.google.com/file/d/1HeM9MhDwuRBoAVZJURAFd8LKXe89KGxl/preview",
detail: "/projects/project-7"
},
{
id: "project-8",
name: "Project Theta",
video: "https://drive.google.com/file/d/1sBB1KWLHRiwE6TN2OMkunZX2Q1hK6wlm/preview",
detail: "/projects/project-8"
},
{
id: "project-9",
name: "Project Iota",
video: "https://drive.google.com/file/d/14twIVDKbN02ohaDLMEcp2ZmwzS_5HgLB/preview",
detail: "/projects/project-9"
},
{
id: "project-10",
name: "Project Kappa",
video: "https://drive.google.com/file/d/1DMF0TrOjeu-DRJ_jqnbRZdzfHqSIjCFZ/preview",
detail: "/projects/project-10"
},
{
id: "project-11",
name: "Project Lambda",
video: "https://drive.google.com/file/d/176Ovto6eeKj7wiqtymKe45wQJqCQmbUx/preview",
detail: "/projects/project-11"
},
{
id: "project-12",
name: "Project Mu",
video: "https://drive.google.com/file/d/1yy34EFaCjNqDekyaST4jmxZZwyPpBP3S/preview",
detail: "/projects/project-12"
},
{
id: "project-13",
name: "Project Nu",
video: "https://drive.google.com/file/d/1XOSexwyioVoU9gH3-emYE6-UNnvymBkg/preview",
detail: "/projects/project-13"
}
]

export default function Page() {

  const containerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        })

      })

    }, containerRef)

    return () => ctx.revert()

  }, [])

  return (

    <main
      ref={containerRef}
      className="bg-black text-white min-h-screen flex"
    >

      {/* SIDEBAR */}

      <aside className="hidden md:flex w-72 flex-col justify-between p-10 border-r border-zinc-900 fixed h-screen">

        <div>

          {/* LOGO */}

          <h1 className="text-xl font-semibold tracking-wide mb-12">
            AICO Creative
          </h1>

          {/* MAIN NAV */}

          <div className="mb-12">

            <p className="text-xs text-zinc-500 mb-4 tracking-widest">
              NAV
            </p>

            <nav className="flex flex-col space-y-3 text-sm text-zinc-300">

              <a className="hover:text-white transition">projects</a>
              <a className="hover:text-white transition">about</a>
              <a className="hover:text-white transition">reel</a>
              <a className="hover:text-white transition">contact</a>

            </nav>

          </div>

          {/* PROJECT LIST */}

          <div>

            <p className="text-xs text-zinc-500 mb-4 tracking-widest">
              PROJECTS
            </p>

            <ul className="space-y-2 text-sm text-zinc-400">

            {projects.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="hover:text-white transition">
                {p.name}
                </a>
              </li>
            ))}

            </ul>

          </div>

        </div>

        {/* FOOTER */}

        <div className="text-xs text-zinc-600">
          © 2026 AICO
        </div>

      </aside>

      {/* MOBILE NAV */}

      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between p-6 z-50">

        <span className="font-bold">AICO</span>

        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

      </div>

      {menuOpen && (

        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-8 text-xl">

          <a onClick={()=>setMenuOpen(false)}>projects</a>
          <a onClick={()=>setMenuOpen(false)}>about</a>
          <a onClick={()=>setMenuOpen(false)}>reel</a>
          <a onClick={()=>setMenuOpen(false)}>contact</a>

        </div>

      )}

      {/* CONTENT */}

      <div className="flex-1 md:ml-64 p-8 md:p-16">

        <div className="grid md:grid-cols-2 gap-12">

        {projects.map((p) => (

        <div
        key={p.id}
        id={p.id}
        className="reveal aspect-video rounded-xl overflow-hidden bg-zinc-900"
        >

        <iframe
        src={p.video}
        className="w-full h-full"
        allow="autoplay"
        ></iframe>

        <div className="p-4 text-sm text-zinc-300">
        <a href={p.detail} className="hover:text-white transition">
        {p.name}
        </a>
        </div>

        </div>

        ))}

        </div>

        {/* SPLINE VISUAL */}

        <div className="reveal my-40 h-96 relative">

          <Spline scene="https://prod.spline.design/qliJKLQ75aY5O5lt/scene.splinecode" />

        </div>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="reveal aspect-video bg-zinc-900 rounded-xl"></div>
          <div className="reveal aspect-video bg-zinc-900 rounded-xl"></div>

        </div>

      </div>

    </main>

  )
}