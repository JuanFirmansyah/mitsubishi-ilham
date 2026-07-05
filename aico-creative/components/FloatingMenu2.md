"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { Menu, X } from "lucide-react"

gsap.registerPlugin(Draggable)

/* ------------------------------- */
/* Types */
/* ------------------------------- */

interface NavItem {
  name: string
  link: string
  icon: React.ElementType
}

interface SocialItem {
  name: string
  link: string
  icon: React.ElementType
}

interface FloatingMenuProps {
  navMenu: NavItem[]
  socialMenu: SocialItem[]
}

type Side = "left" | "right" | "center"

/* ------------------------------- */
/* Component */
/* ------------------------------- */

export default function FloatingMenu({ navMenu, socialMenu }: FloatingMenuProps) {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const orbRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const draggableInstance = useRef<Draggable | null>(null)
  const dragMoved = useRef(false)

  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<Side>("center")

  /* ------------------------------- */
  /* Update Menu Position */
  /* ------------------------------- */

  const updateMenuPosition = useCallback(() => {
    if (!orbRef.current || !menuRef.current) return

    const rect = orbRef.current.getBoundingClientRect()

    gsap.set(menuRef.current, {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2
    })
  }, [])

  /* ------------------------------- */
  /* Detect Side (SAFE) */
  /* ------------------------------- */

  const detectSide = useCallback(() => {
    if (!orbRef.current) return

    const rect = orbRef.current.getBoundingClientRect()
    const vw = window.innerWidth
    const center = rect.left + rect.width / 2

    const newSide: Side =
      center < vw * 0.35
        ? "left"
        : center > vw * 0.65
        ? "right"
        : "center"

    setSide(prev => (prev !== newSide ? newSide : prev))
  }, [])

  /* ------------------------------- */
  /* Snap to Edge */
  /* ------------------------------- */

  const snapToEdge = useCallback(() => {
    if (!orbRef.current || !draggableInstance.current) return

    const rect = orbRef.current.getBoundingClientRect()
    const drag = draggableInstance.current

    const vw = window.innerWidth
    const vh = window.innerHeight

    const snapX = rect.left < vw / 2 ? 16 : vw - 80
    const snapY = Math.min(Math.max(rect.top, 16), vh - 80)

    gsap.to(orbRef.current, {
      x: snapX - rect.left + drag.x,
      y: snapY - rect.top + drag.y,
      duration: 0.35,
      ease: "power3.out",
      onUpdate: updateMenuPosition
    })
  }, [updateMenuPosition])

  /* ------------------------------- */
  /* Drag System */
  /* ------------------------------- */

  useEffect(() => {
    if (!containerRef.current || !orbRef.current) return

    const orb = orbRef.current

    const draggableArray = Draggable.create(orb, {
      type: "x,y",
      bounds: containerRef.current,
      edgeResistance: 0.85,

      onPress() {
        dragMoved.current = false
      },

      onDrag() {
        dragMoved.current = true
        updateMenuPosition()
        detectSide()
      },

      onRelease() {
        updateMenuPosition()
        detectSide()
        snapToEdge()
      }
    })

    draggableInstance.current = draggableArray[0]

    updateMenuPosition()

    return () => {
      draggableInstance.current?.kill()
      draggableInstance.current = null
    }
  }, [detectSide, snapToEdge, updateMenuPosition])

  /* ------------------------------- */
  /* Menu Animation */
  /* ------------------------------- */

  useEffect(() => {
    if (!menuRef.current) return

    const items = menuRef.current.children

    if (open) {
      gsap.fromTo(
        items,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.35,
          ease: "back.out(1.7)"
        }
      )

      gsap.to(menuRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.25
      })
    } else {
      gsap.to(menuRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.25
      })
    }
  }, [open])

  /* ------------------------------- */
  /* Click Orb */
  /* ------------------------------- */

  const handleClick = () => {
    if (dragMoved.current) return
    setOpen(v => !v)
  }

  /* ------------------------------- */
  /* Smart Radial Angle */
  /* ------------------------------- */

  const getAngle = (index: number, total: number) => {
    if (side === "left") {
      const start = -Math.PI / 2
      const end = Math.PI / 2
      return start + (index / (total - 1)) * (end - start)
    }

    if (side === "right") {
      const start = Math.PI / 2
      const end = (Math.PI * 3) / 2
      return start + (index / (total - 1)) * (end - start)
    }

    return (index / total) * Math.PI * 2
  }

  const items = [...navMenu, ...socialMenu]

  /* ------------------------------- */
  /* Render */
  /* ------------------------------- */

  return (
    <div
      ref={containerRef}
      className="md:hidden fixed inset-0 pointer-events-none z-50"
    >

      {/* ORB */}

      <div
        ref={orbRef}
        onClick={handleClick}
        className="pointer-events-auto absolute bottom-10 right-10 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing"
      >
        <div className="relative w-6 h-6">

          <Menu
            className={`absolute transition-all duration-300 ${
              open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />

          <X
            className={`absolute transition-all duration-300 ${
              open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            }`}
          />

        </div>
      </div>

      {/* RADIAL MENU */}

      <div
        ref={menuRef}
        className="absolute pointer-events-none"
        style={{
          transform: "translate(-50%,-50%) scale(0)",
          opacity: 0
        }}
      >

        {items.map((item, i) => {

          const radius = 110
          const angle = getAngle(i, items.length)

          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const Icon = item.icon

          return (
            <a
              key={item.name}
              href={item.link}
              style={{
                transform: `translate(${x}px,${y}px)`
              }}
              className="absolute w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-110 shadow-lg pointer-events-auto"
            >
              <Icon size={20} />
            </a>
          )
        })}

      </div>
    </div>
  )
}