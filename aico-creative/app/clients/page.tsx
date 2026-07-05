// app/clients/page.tsx
"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import FloatingMenu from "../../components/FloatingMenu"
import { Folder, User, Film, Mail, Instagram, Linkedin, Dribbble } from "lucide-react"
import Image from "next/image"

const navMenu = [
  { name: "Projects", link: "/", icon: Folder },
  { name: "About", link: "/about", icon: User },
  { name: "Who We Worked With", link: "/clients", icon: Film },
  { name: "Contact", link: "/contact", icon: Mail },
]

const socialMenu = [
  { name: "Instagram", link: "https://instagram.com", icon: Instagram },
  { name: "LinkedIn", link: "https://linkedin.com", icon: Linkedin },
  { name: "Dribbble", link: "https://dribbble.com", icon: Dribbble },
]

const clients = [
  { name: "Kalla Institute Teknologi dan Bisnis", category: "Education", logo: "/clients/kalla-institute.png" },
  { name: "BCA", category: "Banking & Finance", logo: "/clients/bca.png" },
  { name: "F8", category: "Event & Entertainment", logo: "/clients/f8.png" },
  { name: "Profest", category: "Event & Entertainment", logo: "/clients/profest.png" },
  { name: "BNI", category: "Banking & Finance", logo: "/clients/bni.png" },
  { name: "BRI", category: "Banking & Finance", logo: "/clients/bri.png" },
  { name: "Kalla Group Of Company", category: "Conglomerate", logo: "/clients/kalla-group.png" },
  { name: "Saucony", category: "Sportswear", logo: "/clients/saucony.png" },
  { name: "Wondr by BNI", category: "Digital Banking", logo: "/clients/wondr.png" },
  { name: "LIA", category: "Education", logo: "/clients/lia.png" },
  { name: "Mandiri Utama Finance", category: "Finance", logo: "/clients/mandiri-utama.png" },
  { name: "Pelindo", category: "Logistics", logo: "/clients/pelindo.png" },
  { name: "Pertamina", category: "Energy", logo: "/clients/pertamina.png" },
  { name: "Wika Beton", category: "Construction", logo: "/clients/wika-beton.png" },
]

export default function ClientsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 })
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <FloatingMenu navMenu={navMenu} socialMenu={socialMenu} />
      
      <div className="p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Who We Worked With
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
              Proud to collaborate with leading brands and organizations across Indonesia
            </p>
          </div>

          {/* Clients Grid with Logos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group p-6 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Logo Container */}
                  <div className="w-12 h-12 relative shrink-0 bg-white/10 rounded-lg p-2">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain p-1"
                      onError={(e) => {
                        // Fallback jika logo tidak ditemukan
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-zinc-200 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{client.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <div className="text-3xl font-bold text-white mb-2">{clients.length}+</div>
              <div className="text-sm text-zinc-500">Trusted Partners</div>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <div className="text-3xl font-bold text-white mb-2">7+</div>
              <div className="text-sm text-zinc-500">Industries</div>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <div className="text-3xl font-bold text-white mb-2">2019</div>
              <div className="text-sm text-zinc-500">Year Established</div>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-sm text-zinc-500">Projects Completed</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h3 className="text-2xl font-semibold mb-3 text-white">Want to join our clients?</h3>
            <p className="text-zinc-400 mb-6">
              Let&apos;s create something amazing together.
            </p>
            <a 
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Work With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}