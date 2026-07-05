// app/contact/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "@studio-freight/lenis"
import FloatingMenu from "../../components/FloatingMenu"
import { Folder, User, Film, Mail, Instagram, Linkedin, Dribbble, Send, Sparkles, MapPin, Phone, Youtube } from "lucide-react"

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

// Social media links untuk contact page
const socialLinks = [
  { name: "Instagram", username: "@aicocreative", link: "https://instagram.com/aicocreative", icon: Instagram, color: "hover:text-pink-500" },
  { name: "YouTube", username: "AICO Creative", link: "https://www.youtube.com/@aicocreativetv", icon: Youtube, color: "hover:text-red-500" },
  { name: "Dribbble", username: "aicocreative", link: "https://dribbble.com/aicocreative", icon: Dribbble, color: "hover:text-pink-400" },
  { name: "Email", username: "aicocreativeid@gmail.com", link: "aicocreativeid@gmail.com", icon: Mail, color: "hover:text-blue-400" },
]

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Buat pesan WhatsApp dari form
    const message = `Halo AICO Creative,%0A%0A*Nama:* ${formData.name}%0A*Email:* ${formData.email}%0A*Pesan:*%0A${formData.message}%0A%0A--%0ADikirim dari website AICO Creative`
    
    // Redirect ke WhatsApp dengan pesan yang sudah diformat
    window.open(`https://wa.me/6285256092725?text=${message}`, '_blank')
    
    // Reset form setelah submit
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <FloatingMenu navMenu={navMenu} socialMenu={socialMenu} />
      
      <div className="p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800 mb-6">
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-400">Get in touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Let&apos;s Talk
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Have a project in mind? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-zinc-900/30 rounded-2xl p-8 border border-zinc-800 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-6 text-white">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-300">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 text-white"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-300">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 text-white resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
                <p className="text-xs text-zinc-500 text-center mt-4">
                  Your message will be sent directly to our WhatsApp
                </p>
              </div>
            </div>

            {/* Right Side - Contact Info & Social */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="bg-zinc-900/30 rounded-2xl p-8 border border-zinc-800">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Contact Info</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Email</p>
                        <a href="mailto:aicocreativeid@gmail.com" className="text-white hover:text-zinc-300 transition-colors">
                          aicocreativeid@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <Phone className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">WhatsApp</p>
                        <a href="https://wa.me/6285256092725?text=Halo%20AICO%20Creative%2C%20saya%20tertarik%20untuk%20berkolaborasi" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors">
                          +62 852-5609-2725
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500">Location</p>
                        <p className="text-white">Jakarta, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-zinc-900/30 rounded-2xl p-8 border border-zinc-800">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Follow Us</h2>
                  <div className="space-y-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-xl hover:bg-zinc-800/50 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className={`w-5 h-5 text-zinc-400 group-hover:${social.color.split(' ')[0]} transition-colors`} />
                            </div>
                            <div>
                              <p className="font-medium text-white group-hover:text-zinc-200 transition-colors">
                                {social.name}
                              </p>
                              <p className="text-sm text-zinc-500">{social.username}</p>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Send className="w-4 h-4 text-zinc-400" />
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Unique Element - Interactive Quote */}
                <div className="bg-linear-to-br from-zinc-900/50 to-zinc-900/30 rounded-2xl p-8 border border-zinc-800 text-center group hover:border-zinc-600 transition-all duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-white/5 rounded-full group-hover:bg-white/10 transition-all duration-500" />
                    <Sparkles className="w-8 h-8 text-zinc-400 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500" />
                    <p className="text-lg italic text-zinc-300 mb-3">
                      &quot;Every frame tells a story&quot;
                    </p>
                    <p className="text-sm text-zinc-500">
                      Let&apos;s create yours together
                    </p>
                    <div className="mt-4 w-12 h-px bg-linear-to-r from-transparent via-zinc-500 to-transparent mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}