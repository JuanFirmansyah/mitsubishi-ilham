"use client"

import { useRef, useEffect, useState, useCallback, useMemo, useLayoutEffect } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const draggableInstance = useRef<Draggable | null>(null)
  const dragMoved = useRef(false)

  const [open, setOpen] = useState(false)
  // ✅ State diinisialisasi dengan nilai default, TANPA membaca ref
  const [side, setSide] = useState<Side>("center")
  const [orbRect, setOrbRect] = useState<DOMRect | null>(null)

  // Gabungkan semua item menu
  const items = useMemo(() => [...navMenu, ...socialMenu], [navMenu, socialMenu])

  /* ------------------------------- */
  /* Update orbRect dari ref (hanya di event/effect, bukan render) */
  /* ------------------------------- */
  const updateOrbRect = useCallback(() => {
    if (orbRef.current) {
      setOrbRect(orbRef.current.getBoundingClientRect())
    }
  }, [])

  /* ------------------------------- */
  /* Posisikan menu tepat di tengah orb */
  /* ------------------------------- */
  const updateMenuPosition = useCallback(() => {
    if (!orbRef.current || !menuRef.current) return
    const rect = orbRef.current.getBoundingClientRect()
    gsap.set(menuRef.current, {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2,
    })
  }, [])

  /* ------------------------------- */
  /* Deteksi sisi orb (kiri/tengah/kanan) berdasarkan posisi terkini */
  /* ------------------------------- */
  const detectSide = useCallback(() => {
    if (!orbRef.current) return
    const rect = orbRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const vw = window.innerWidth

    let newSide: Side = "center"
    if (centerX < vw * 0.4) newSide = "left"
    else if (centerX > vw * 0.6) newSide = "right"

    setSide((prev) => {
      if (prev !== newSide) {
        // Perbarui rect juga karena posisi berubah
        updateOrbRect()
        return newSide
      }
      return prev
    })
  }, [updateOrbRect])

  /* ------------------------------- */
  /* Hitung sudut item berdasarkan sisi */
  /* ------------------------------- */
  const getAngle = useCallback(
    (index: number, total: number): number => {
      if (total === 1) return side === "left" ? 0 : side === "right" ? Math.PI : 0

      const spread = Math.PI * 0.9 // 162°

      if (side === "left") {
        // Buka ke kanan: sudut antara -spread/2 hingga spread/2
        const start = -spread / 2
        return start + (index / (total - 1)) * spread
      } else if (side === "right") {
        // Buka ke kiri: sudut antara PI - spread/2 hingga PI + spread/2
        const start = Math.PI - spread / 2
        return start + (index / (total - 1)) * spread
      } else {
        // Tengah: lingkaran penuh
        return (index / total) * Math.PI * 2
      }
    },
    [side]
  )

  /* ------------------------------- */
  /* Hitung radius aman berdasarkan orbRect dan side */
  /* ------------------------------- */
  const safeRadius = useMemo((): number => {
    // Jika orbRect belum tersedia, gunakan nilai aman sementara (60)
    if (!orbRect) return 60

    const centerX = orbRect.left + orbRect.width / 2
    const centerY = orbRect.top + orbRect.height / 2
    const vw = window.innerWidth
    const vh = window.innerHeight
    const itemHalfSize = 24 // w-12 = 48px, setengahnya 24
    const maxRadius = 140

    if (side === "left") {
      // Item hanya di kanan orb → batasi oleh jarak ke tepi kanan
      const distanceToRight = vw - centerX - itemHalfSize
      return Math.min(maxRadius, Math.max(60, distanceToRight))
    } else if (side === "right") {
      // Item hanya di kiri orb → batasi oleh jarak ke tepi kiri
      const distanceToLeft = centerX - itemHalfSize
      return Math.min(maxRadius, Math.max(60, distanceToLeft))
    } else {
      // Item ke segala arah → batasi oleh jarak terpendek ke semua tepi
      const distances = [
        centerX - itemHalfSize,
        vw - centerX - itemHalfSize,
        centerY - itemHalfSize,
        vh - centerY - itemHalfSize,
      ]
      const minDistance = Math.min(...distances)
      return Math.min(maxRadius, Math.max(60, minDistance))
    }
  }, [orbRect, side])

  /* ------------------------------- */
  /* Hitung posisi tiap item berdasarkan safeRadius dan angle */
  /* ------------------------------- */
  const itemPositions = useMemo(() => {
    return items.map((_, i) => {
      const angle = getAngle(i, items.length)
      const x = Math.cos(angle) * safeRadius
      const y = Math.sin(angle) * safeRadius
      return { x, y }
    })
  }, [items, safeRadius, getAngle])

  /* ------------------------------- */
  /* Setup Draggable (tanpa snap paksa) */
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
        detectSide() // update side saat drag
      },
      onRelease() {
        updateMenuPosition()
        detectSide() // pastikan side terbaru setelah berhenti
        updateOrbRect() // perbarui rect untuk perhitungan radius
      },
    })

    draggableInstance.current = draggableArray[0] ?? null

    // Bersihkan instance saat unmount
    return () => {
      draggableInstance.current?.kill()
      draggableInstance.current = null
    }
  }, [detectSide, updateMenuPosition, updateOrbRect])

  /* ------------------------------- */
  /* Inisialisasi pertama: baca posisi dan side (DI LAYOUT EFFECT, BUKAN RENDER) */
  /* ------------------------------- */
  useLayoutEffect(() => {
    // ✅ Inilah tempat yang AMAN untuk membaca ref dan mengupdate state
    if (orbRef.current) {
      // Set initial orbRect
      setOrbRect(orbRef.current.getBoundingClientRect())
      // Set initial side
      const rect = orbRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const vw = window.innerWidth
      let initialSide: Side = "center"
      if (centerX < vw * 0.4) initialSide = "left"
      else if (centerX > vw * 0.6) initialSide = "right"
      setSide(initialSide)
      
      // Posisikan menu
      updateMenuPosition()
    }

    // Handler resize
    const handleResize = () => {
      updateOrbRect()
      detectSide()
      updateMenuPosition()
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [detectSide, updateMenuPosition, updateOrbRect]) // Kosong karena hanya sekali di mount

  /* ------------------------------- */
  /* Animasi buka/tutup menu */
  /* ------------------------------- */
  useEffect(() => {
    if (!menuRef.current) return

    const items = menuRef.current.children

    if (open) {
      gsap.fromTo(
        items,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.04,
          duration: 0.35,
          ease: "back.out(1.6)",
        }
      )
      gsap.to(menuRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      })
    } else {
      gsap.to(menuRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
      })
    }
  }, [open])

  /* ------------------------------- */
  /* Klik orb (buka/tutup, hanya jika tidak drag) */
  /* ------------------------------- */
  const handleClick = () => {
    if (dragMoved.current) return
    // Pastikan side dan posisi terbaru sebelum membuka
    detectSide()
    updateOrbRect()
    setOpen((v) => !v)
  }

  /* ------------------------------- */
  /* Render */
  /* ------------------------------- */
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 md:hidden"
    >
      {/* ORB */}
      <div
        ref={orbRef}
        onClick={handleClick}
        className="pointer-events-auto absolute bottom-10 right-10 w-16 h-16 bg-linear-to-br from-white to-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing backdrop-blur-sm border border-white/20"
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
      {items.length > 0 && (
        <div
          ref={menuRef}
          className="absolute pointer-events-none"
          style={{
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0,
          }}
        >
          {items.map((item, i) => {
            const { x, y } = itemPositions[i]
            const Icon = item.icon

            return (
              <a
                key={item.name}
                href={item.link}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute w-12 h-12 bg-zinc-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-110 shadow-xl pointer-events-auto group"
              >
                <Icon size={20} />
                {/* Tooltip sederhana (opsional) */}
                <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.name}
                </span>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}