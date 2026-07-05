// components/ui/Aside.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "PROJECTS", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "WHO WE WORKED WITH", href: "/clients" },
  { name: "CONTACT", href: "/contact" },
]

export default function Aside() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex w-72 flex-col justify-between p-10 border-r border-zinc-900 fixed h-screen bg-black">
      <div>
        {/* Logo manual dengan img tag */}
        <div className="mb-12 flex justify-center">
          <Link href="/" className="block hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo-aico.png" 
              alt="AICO Creative Logo"
              className="w-auto h-12 object-contain"
            />
          </Link>
        </div>
        
        <nav className="flex flex-col space-y-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition-colors ${
                isActive(item.href)
                  ? "text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="text-xs text-zinc-600">© 2026 AICO</div>
    </aside>
  )
}