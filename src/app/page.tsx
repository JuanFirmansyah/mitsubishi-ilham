"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    titleTop: "KAMI HADIR",
    titleMain: "UNTUK SUMATRA",
    desc: "Gratis Towing, Program Servis & Bodi Cat khusus wilayah Sumatra.",
    cta1: "Cari Dealer",
    cta2: "Layanan Darurat",
    image: "/hero/hero-1.png", // ganti dengan gambar kamu
  },
  {
    id: 2,
    titleTop: "LIFE'S ADVENTURE",
    titleMain: "Drive Your Ambition",
    desc: "Temukan kendaraan yang siap menaklukkan segala medan.",
    cta1: "Test Drive",
    cta2: "Lihat Model",
    image: "/hero/hero-2.png",
  },
  {
    id: 3,
    titleTop: "MITSUBISHI CARE",
    titleMain: "Always With You",
    desc: "Layanan purna jual & darurat 24 jam di seluruh Indonesia.",
    cta1: "Booking Servis",
    cta2: "Selengkapnya",
    image: "/hero/hero-3.jpg",
  },
];

const CAR_MODELS = [
  {
    id: 1,
    name: "L300",
    price: "Mulai dari Rp239.100.000",
    image: "/cars/l3002.png",
  },
  {
    id: 2,
    name: "DESTINATOR",
    price: "Mulai dari Rp395.000.000",
    image: "/cars/dst.webp",
    isNew: true,
    award: "/icons/award.png",
  },
  {
    id: 3,
    name: "XFORCE",
    price: "Mulai dari Rp582.700.000",
    image: "/cars/xforce.png",
  },
  {
    id: 4,
    name: "PAJERO SPORT",
    price: "Mulai dari Rp582.700.000",
    image: "/pajero.png",
  },
  {
    id: 5,
    name: "TRITON",
    price: "Mulai dari Rp582.700.000",
    image: "/cars/triton2.png",
  },
];


export default function Home() {
  const [cookieAccepted, setCookieAccepted] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCar, setActiveCar] = useState(1);

  const prevCar = () => {
    setActiveCar((p) => (p === 0 ? CAR_MODELS.length - 1 : p - 1));
  };

  const nextCar = () => {
    setActiveCar((p) => (p === CAR_MODELS.length - 1 ? 0 : p + 1));
  };  

  /* Cookie */
  useEffect(() => {
    const v = localStorage.getItem("mm_cookie_ok");
    setCookieAccepted(v === "1");
  }, []);

  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  const onAcceptCookies = () => {
    localStorage.setItem("mm_cookie_ok", "1");
    setCookieAccepted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white">
      {/* Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl">
              Kami menggunakan cookies untuk mengumpulkan informasi mengenai bagaimana pengunjung menggunakan website kami. 
              Cookies membantu kami untuk memberikan pengalaman terbaik kepada Anda.
            </p>
            <button
              onClick={onAcceptCookies}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
            >
              Terima Cookies
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/logo.svg" alt="Mitsubishi Logo" width={48} height={48} />
              </div>
              <div className="min-w-0">
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <a href="#dealer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase">Model</a>
              <a href="#dealer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase">Purna Jual</a>
              <a href="#dealer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase">Kepemilikan</a>
              <a href="#dealer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase">Promotor</a>
              <a href="#adventure" className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase">Berita & Aktivitas</a>
            </nav>

            <a
              href="#dealer"
              className="px-5 py-2.5 border border-slate-600/50 rounded-full text-sm font-semibold bg-slate-800/50 hover:bg-slate-700/50 transition-all backdrop-blur-sm hidden md:inline-flex"
            >
              Temukan Dealer
            </a>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* /* Hero Carousel */ }
      <section className="relative h-[75vh] md:h-screen overflow-hidden">
        {/* Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out
              ${index === activeSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"}
            `}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.titleMain}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-6xl mx-auto px-4">
                <p
                  className={`text-slate-300 tracking-[0.3em] text-sm md:text-base mb-6 transition-all duration-700
                  ${index === activeSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  {slide.titleTop}
                </p>

                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 transition-all duration-700 delay-100
                  ${index === activeSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  {slide.titleMain}
                </h1>

                <p
                  className={`text-lg md:text-xl text-slate-300 max-w-xl mb-10 transition-all duration-700 delay-200
                  ${index === activeSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  {slide.desc}
                </p>

                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300
                  ${index === activeSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  <a className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold shadow-2xl text-center">
                    {slide.cta1}
                  </a>
                  <a className="px-8 py-4 border-2 border-white/40 hover:border-white rounded-2xl text-white text-center">
                    {slide.cta2}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-3 h-3 rounded-full transition-all
                ${i === activeSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"}
              `}
            />
          ))}
        </div>
      </section>

      {/* Model Showcase */}
      <section className="relative py-24 md:py-32 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative">

          {/* Slider */}
          <div className="relative flex items-center justify-center">
            {CAR_MODELS.map((car, index) => {
              const offset = index - activeCar;

              return (
                <div
                  key={car.id}
                  className={`absolute transition-all duration-700 ease-out
                    ${offset === 0 ? "scale-100 opacity-100 z-20" : ""}
                    ${offset === -1 ? "-translate-x-[320px] scale-90 opacity-40 z-10" : ""}
                    ${offset === 1 ? "translate-x-[320px] scale-90 opacity-40 z-10" : ""}
                    ${Math.abs(offset) > 1 ? "opacity-0 scale-75" : ""}
                  `}
                >
                  {/* Badge */}
                  {car.isNew && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                      <span className="px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                        BARU
                      </span>
                    </div>
                  )}

                  {/* Award */}
                  {car.award && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                      <Image src={car.award} alt="award" width={90} height={90} />
                    </div>
                  )}

                  {/* Car Image */}
                  <div className="w-[280px] md:w-[360px] lg:w-[420px]">
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={420}
                      height={240}
                      className="object-contain"
                      priority={offset === 0}
                    />
                  </div>

                  {/* Text */}
                  <div className="text-center mt-6">
                    <h3 className="text-lg md:text-xl font-black tracking-wide">
                      {car.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2">
                      {car.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <button
            onClick={prevCar}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-black/30 rounded-full hover:bg-black hover:text-white transition"
          >
            ←
          </button>

          <button
            onClick={nextCar}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-black/30 rounded-full hover:bg-black hover:text-white transition"
          >
            →
          </button>
        </div>
      </section>

      {/* Contact Sales */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-black to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.15),transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <span className="inline-block mb-6 px-5 py-2 bg-red-600/20 border border-red-600/40 rounded-full text-xs tracking-[0.35em] uppercase text-red-300">
                HUBUNGI SALES
              </span>

              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Konsultasi & Pemesanan
                <br />
                <span className="text-red-500">Mobil Mitsubishi</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed max-w-xl mb-10">
                Dapatkan informasi promo terbaru, simulasi kredit, hingga booking test drive
                langsung dengan sales resmi Mitsubishi.
              </p>
            </div>

            {/* RIGHT – SALES CARD */}
            <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-3xl backdrop-blur">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-2xl font-black">
                  <Image
                    src="/ilham.png"
                    alt="Ilham"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Ilham</h3>
                  <p className="text-slate-400 text-sm">Sales Resmi Mitsubishi</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Promo & Diskon Terbaru
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Simulasi Kredit & Cash
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Booking Test Drive
                </div>
              </div>

              <a
                href="https://wa.me/6281242789123"
                target="_blank"
                className="block w-full text-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
              >
                💬 Hubungi via WhatsApp
                <div className="text-sm font-normal opacity-90 mt-1">
                  0812-4278-9123
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Empowering Every Journey */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-gradient-to-br from-white via-slate-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT – Single Clean Journey Visual */}
            <div className="lg:col-span-8 relative group">
              <div className="relative rounded-3xl overflow-hidden border border-slate-100/50 shadow-2xl shadow-slate-200/50 backdrop-blur-sm bg-white/90 hover:shadow-3xl hover:shadow-slate-300/60 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02]">
                
                {/* Subtle Background Pattern */}
                {/* <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-20 h-20 border border-slate-200 rounded-full -rotate-12" />
                  <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-slate-200/50 rounded-full rotate-6" />
                </div> */}

                {/* Single Image Container - Fixed Size */}
                <div className="relative z-20 flex items-center justify-center h-[28rem] md:h-[32rem] lg:h-[36rem]">
                  <div className="relative w-full h-full md:w-full md:h-full">
                    <Image
                      src="/lifes-adventure.webp"
                      alt="Life's Adventure"
                      fill
                      className="object-cover rounded-3xl shadow-3xl shadow-slate-300/50 group-hover:shadow-4xl group-hover:shadow-slate-400/60 transition-all duration-700 hover:scale-[1.05] origin-center"
                      priority
                    />
                    
                    {/* Dynamic Glow Effect */}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-12 left-8 w-24 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent group-hover:translate-x-2 transition-transform duration-700" />
                  <div className="absolute bottom-16 right-12 w-32 h-px bg-gradient-to-l from-transparent via-slate-400/50 to-transparent group-hover:-translate-x-2 transition-transform duration-700 delay-200" />
                  <div className="absolute top-1/2 left-6 w-px h-24 bg-gradient-to-b from-red-500/40 via-transparent to-transparent rotate-[-15deg] group-hover:h-32 transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* RIGHT – Premium Black Panel */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="h-full bg-gradient-to-b from-slate-900 via-black to-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 md:p-12 lg:p-14 shadow-3xl shadow-black/30 hover:shadow-4xl hover:shadow-black/40 transition-all duration-500 hover:-translate-y-1 group/card">
                
                {/* Category Badge */}
                <div className="mb-10">
                  <span className="inline-block px-5 py-2.5 bg-red-600/20 border border-red-600/40 rounded-full text-xs uppercase tracking-[0.4em] font-medium text-red-200 hover:bg-red-600/30 transition-all duration-300">
                    LIFE&apos;S ADVENTURE
                  </span>
                </div>

                {/* Main Heading */}
                <div className="flex-1 flex flex-col justify-center mb-12">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.88] tracking-tight mb-8 bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Empowering
                    <br />
                    <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">Every Journey</span>
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg md:text-xl max-w-md font-light tracking-wide">
                    Komitmen kami untuk selalu hadir mendampingi setiap perjalanan Anda dengan pelayanan terbaik.
                  </p>
                </div>

                {/* Enhanced CTA */}
                <a
                  href="#adventure"
                  className="group/link inline-flex items-center gap-4 text-xl font-bold tracking-wider uppercase text-white hover:text-red-400 transition-all duration-500 hover:-translate-y-1"
                >
                  SELENGKAPNYA
                  <div className="relative w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-white/20">
                    <svg 
                      className="w-6 h-6 text-white group-hover/link:translate-x-1 transition-transform duration-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Life's Adventure */}
      <section id="adventure" className="py-24 md:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                Life&apos;s Adventure
              </h2>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                Komitmen kami untuk selalu hadir mendampingi setiap perjalanan Anda.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-slate-700/50 rounded-2xl backdrop-blur hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-3">Komitmen Perjalanan</h3>
                  <p className="text-slate-400">Selengkapnya</p>
                </div>
                <div className="p-6 bg-white/5 border border-slate-700/50 rounded-2xl backdrop-blur hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-3">Siap Medan Apapun</h3>
                  <p className="text-slate-400">Pelajari lebih lanjut</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-red-500/20 to-slate-800/50 rounded-3xl border-2 border-slate-700/50 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Layanan Purna Jual */}
      <section id="aftersales" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-slate-800/50 to-red-500/20 rounded-3xl border-2 border-slate-700/50 shadow-2xl order-2 md:order-1" />
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                Layanan Purna Jual
              </h2>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                Kami menawarkan solusi mobilitas yang lengkap. Nikmati layanan darurat 24 jam, program perawatan berkala yang fleksibel.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-4 p-6 bg-white/5 border border-slate-700/50 rounded-2xl backdrop-blur hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Layanan Darurat 24 Jam</h3>
                    <p className="text-slate-400">Akses bantuan kapan saja.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/5 border border-slate-700/50 rounded-2xl backdrop-blur hover:bg-white/10 transition-all">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Perawatan Berkala</h3>
                    <p className="text-slate-400">Jadwal servis fleksibel.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#dealer"
                  className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl text-center transition-all"
                >
                  Booking Servis
                </a>
                <a
                  href="#"
                  className="flex-1 px-8 py-4 border-2 border-slate-500/50 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-slate-800/30 transition-all text-center"
                >
                  Selengkapnya
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <Image src="/logo.svg" alt="Mitsubishi Logo" width={48} height={48} />
              </div>
              <div>
                <div className="font-bold text-xl">MITSUBISHI MOTORS</div>
                <div className="text-sm text-slate-500">© {year}</div>
              </div>
            </div>
            <nav className="flex flex-wrap gap-6 md:gap-8 justify-center md:justify-end text-sm text-slate-400">
              <a href="#dealer" className="hover:text-white transition-color font-medium">Model</a>
              <a href="#dealer" className="hover:text-white transition-color font-medium">Dealer</a>
              <a href="#adventure" className="hover:text-white transition-color font-medium">Kepemilikan</a>
              <a href="#aftersales" className="hover:text-white transition-color font-medium">Promosi</a>
              <a href="#aftersales" className="hover:text-white transition-color font-medium">Berita & Aktivitas</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
