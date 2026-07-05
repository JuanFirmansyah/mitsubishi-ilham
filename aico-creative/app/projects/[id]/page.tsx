// app/projects/[id]/page.tsx
"use client"

import { useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Lenis from "@studio-freight/lenis"
import FloatingMenu from "../../../components/FloatingMenu"
import { Folder, User, Film, Mail, Instagram, Linkedin, Dribbble, ArrowLeft, Calendar, Video, Clock, Sparkles } from "lucide-react"

// Data project yang lebih detail
const projectDetails = {
  "project-1": {
    id: "project-1",
    name: "Project Alpha",
    video: "https://drive.google.com/file/d/1ETXRyZ0FJVDN34zH7pk_2GusdWSPgfl4/preview",
    title: "Brand Campaign Launch",
    description: "A cinematic brand campaign for a leading tech company, showcasing innovation and human connection through visual storytelling.",
    longDescription: "Project Alpha was a comprehensive brand campaign that pushed the boundaries of visual storytelling. We collaborated closely with the client to understand their vision and translate it into a compelling narrative that resonates with their audience.",
    director: "Alex Chen",
    dp: "Maya Putri",
    editor: "James Wilson",
    producer: "Sari Dewi",
    duration: "2:30",
    year: "2024",
    category: "Brand Campaign",
    technologies: ["Cinematography", "Color Grading", "Sound Design", "VFX"],
    credits: [
      { role: "Creative Director", name: "Alex Chen" },
      { role: "Director of Photography", name: "Maya Putri" },
      { role: "Editor", name: "James Wilson" },
      { role: "Producer", name: "Sari Dewi" },
      { role: "Sound Designer", name: "Michael Tan" },
      { role: "Colorist", name: "Linda Wijaya" },
    ]
  },
  "project-2": {
    id: "project-2",
    name: "Project Beta",
    video: "https://drive.google.com/file/d/1OraVDaFV_x0rO6SPaSWVIN5g11VTj153/preview",
    title: "Fashion Editorial",
    description: "A stunning fashion film that captures the essence of contemporary style and elegance.",
    longDescription: "Project Beta is a fashion editorial that blends high fashion with cinematic storytelling. Shot in multiple locations across Jakarta, this project showcases the beauty of Indonesian fashion design.",
    director: "Maya Putri",
    dp: "Alex Chen",
    editor: "Sari Dewi",
    producer: "James Wilson",
    duration: "1:45",
    year: "2024",
    category: "Fashion Film",
    technologies: ["Cinematography", "Color Grading", "Styling", "Music Composition"],
    credits: [
      { role: "Creative Director", name: "Maya Putri" },
      { role: "Director of Photography", name: "Alex Chen" },
      { role: "Editor", name: "Sari Dewi" },
      { role: "Producer", name: "James Wilson" },
      { role: "Stylist", name: "Diana Kartika" },
      { role: "Music Composer", name: "Andre Pratama" },
    ]
  },
  // Tambahkan data untuk project lainnya...
}

// Default data jika project tidak ditemukan
const defaultProject = {
  name: "Project",
  title: "Project Details",
  description: "Detailed information about this project coming soon.",
  longDescription: "We're currently working on showcasing the full details of this project. Stay tuned for updates!",
  director: "TBA",
  dp: "TBA",
  editor: "TBA",
  producer: "TBA",
  duration: "TBA",
  year: "2024",
  category: "Coming Soon",
  technologies: ["Cinematography", "Editing", "Color Grading"],
  credits: [
    { role: "Creative Director", name: "AICO Creative Team" },
    { role: "Production", name: "AICO Creative" },
  ]
}

const navMenu = [
  { name: "Projects", link: "/", icon: Folder },
  { name: "About", link: "/about", icon: User },
  { name: "Who We Worked With", link: "/clients", icon: Film },
  { name: "Contact", link: "/contact", icon: Mail },
]

const socialMenu = [
  { name: "Instagram", link: "https://instagram.com/aicocreative", icon: Instagram },
  { name: "LinkedIn", link: "https://linkedin.com/company/aicocreative", icon: Linkedin },
  { name: "Dribbble", link: "https://dribbble.com/aicocreative", icon: Dribbble },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const projectId = params.id as string
  const project = projectDetails[projectId as keyof typeof projectDetails] || defaultProject

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
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          {/* Video Section */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 mb-12">
            <iframe 
              src={project.video} 
              className="w-full h-full" 
              allow="autoplay" 
              title={project.name}
            />
          </div>

          {/* Project Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="text-sm text-zinc-500 mb-2 block">{project.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title || project.name}</h1>
                <p className="text-lg text-zinc-400 leading-relaxed">{project.description}</p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">About This Project</h2>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">Technologies & Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-900 rounded-full text-sm text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-white">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400">Year: {project.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400">Duration: {project.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-400">Category: {project.category}</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-white">Key Credits</h3>
                <div className="space-y-3">
                  {project.credits.map((credit, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500">{credit.role}</span>
                      <span className="text-sm text-white">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Project Suggestion */}
              <div className="bg-linear-to-br from-zinc-900/50 to-zinc-900/30 rounded-xl p-6 border border-zinc-800 text-center">
                <Sparkles className="w-6 h-6 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-400 mb-3">Interested in similar work?</p>
                <Link 
                  href="/"
                  className="text-white text-sm hover:underline"
                >
                  Explore More Projects →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}