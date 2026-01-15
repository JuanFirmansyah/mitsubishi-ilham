// src\app\page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import CicilanCalculator from '../components/CicilanCalculator';
import { ShieldCheck, CheckCircle, Tag, ChevronLeft, ChevronRight, MessageCircle, Calendar, Wrench, MapPin } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Home() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentUsedCarIndex, setCurrentUsedCarIndex] = useState(0);
  const [currentSparepartIndex, setCurrentSparepartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const usedCarsRef = useRef<HTMLDivElement>(null);
  const sparepartRef = useRef<HTMLDivElement>(null);
  const usedCarsCarouselRef = useRef<HTMLDivElement>(null);
  const sparepartCarouselRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+6282343057060";

  const mitsubishiCars = [
    {
      name: 'Mitsubishi Xforce Ultimate CVT 2025',
      image: '/xforce.png',
      price: 'Rp 389.800.000',
      tag: 'SUV Baru',
      passengers: 5,
      reviews: 35,
      features: ['Apple CarPlay', 'Safety Shield', 'LED Headlights']
    },
    {
      name: 'Mitsubishi Pajero Sport Dakar 4x2 AT 2025',
      image: '/pajero.png',
      price: 'Rp 645.400.000',
      tag: 'SUV Premium',
      passengers: 7,
      reviews: 50,
      features: ['4WD System', 'Premium Leather', '360 Camera']
    },
    {
      name: 'Mitsubishi Xpander Cross Premium 2025',
      image: '/xpander-cross.png',
      price: 'Rp 354.300.000',
      tag: 'Crossover',
      passengers: 7,
      reviews: 55,
      features: ['Cross Design', 'Roof Rails', 'All-Terrain']
    },
    {
      name: 'Mitsubishi Xpander Ultimate CVT 2025',
      image: '/xpander-ultimate.png',
      price: 'Rp 348.800.000',
      tag: 'Best Seller',
      passengers: 7,
      reviews: 70,
      features: ['Smart Key', 'Push Start', 'Rear Camera']
    },
    {
      name: 'Mitsubishi Xpander GLS MT 2025',
      image: '/xpander-gls.jpg',
      price: 'Rp 261.800.000',
      tag: 'MPV Entry',
      passengers: 7,
      reviews: 25,
      features: ['Fuel Efficient', 'Spacious', 'Affordable']
    },
    {
      name: 'Mitsubishi Triton Exceed 4x4 MT 2025',
      image: '/triton.png',
      price: 'Rp 460.000.000',
      tag: 'Double Cabin',
      passengers: 5,
      reviews: 30,
      features: ['4x4 Drive', 'Towing Package', 'Off-Road']
    },
    {
      name: 'Mitsubishi L300 Euro4 2025',
      image: '/l300.png',
      price: 'Rp 250.000.000',
      tag: 'Niaga',
      passengers: 3,
      reviews: 20,
      features: ['Commercial', 'Euro 4', 'Durable']
    },
  ];

  const usedCars = [
    {
      name: 'Mitsubishi Pajero Sport 2022',
      image: '/pajero-used.jpg',
      price: 'Rp 420.000.000',
      mileage: '25.000 km',
      year: '2022',
      condition: 'Bekas Terawat'
    },
    {
      name: 'Mitsubishi Xpander 2023',
      image: '/xpander-used.jpg',
      price: 'Rp 280.000.000',
      mileage: '15.000 km',
      year: '2023',
      condition: 'Like New'
    },
    {
      name: 'Mitsubishi Outlander Sport 2021',
      image: '/outlander-used.jpg',
      price: 'Rp 320.000.000',
      mileage: '30.000 km',
      year: '2021',
      condition: 'Bekas Premium'
    },
    {
      name: 'Mitsubishi Mirage 2020',
      image: '/mirage-used.jpg',
      price: 'Rp 180.000.000',
      mileage: '20.000 km',
      year: '2020',
      condition: 'Bekas Terawat'
    }
  ];

  const spareparts = [
    {
      name: 'Oli Mesin Mitsubishi Genuine',
      image: '/oli.png',
      price: 'Rp 416.000',
      category: 'Maintenance',
      description: 'Oli mesin original untuk performa optimal'
    },
    {
      name: 'Filter Udara Original',
      image: '/filterUdara.png',
      price: 'Rp 106.000',
      category: 'Sparepart',
      description: 'Filter udara genuine Mitsubishi'
    },
    {
      name: 'Kampas Rem Depan',
      image: '/kampasRem.png',
      price: 'Rp 450.000',
      category: 'Brake System',
      description: 'Kampas rem depan original'
    },
    {
      name: 'Air Cleaner',
      image: '/airCleaner.png',
      price: 'Rp 49.000',
      category: 'Sparepart',
      description: 'Mitsubishi Motors AIR CLEANER ELEMENT Filter Udara Kuda Bensin 1600 '
    },
    {
      name: 'Busher Stabilizer',
      image: '/busherStabilizer.png',
      price: 'Rp 78.000',
      category: 'Suspension',
      description: 'Busher stabilizer original'
    },
    {
      name: 'Cover Assy Clutch',
      image: '/coverAssy.png',
      price: 'Rp 506.000',
      category: 'Sparepart',
      description: 'Clutch cover atau tutup kopling '
    }
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Owner Pajero Sport 2024',
      image: '/customer-1.jpg',
      rating: 5,
      comment: 'Pelayanan Juan sangat memuaskan! Proses pembelian mudah dan setelah sales-nya excellent. Recommended!',
      date: '15 Jan 2024'
    },
    {
      name: 'Sari Dewi',
      role: 'Owner Xpander Cross',
      image: '/customer-2.jpg',
      rating: 5,
      comment: 'Juan sangat profesional dan membantu memilih mobil yang tepat untuk keluarga. Mobil sampai tepat waktu!',
      date: '2 Feb 2024'
    },
    {
      name: 'Ahmad Rizki',
      role: 'Owner Triton 2024',
      image: '/customer-3.jpg',
      rating: 5,
      comment: 'Servis rutin dengan rekomendasi Juan selalu memuaskan. Mekaniknya handal dan sparepart selalu original.',
      date: '28 Feb 2024'
    }
  ];

  // Intersection Observer untuk animasi scroll
  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        // No-op: previously setIsVisible(true) here, but isVisible is now removed
      },
      { threshold: 0.1 }
    );

    if (usedCarsRef.current) observer.observe(usedCarsRef.current);
    if (sparepartRef.current) observer.observe(sparepartRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);

    return () => observer.disconnect();
  }, []);
  // Enhanced carousel dengan touch support untuk mobil baru
  const nextCar = useCallback(() => {
    setCurrentCarIndex((prev) => (prev + 1) % mitsubishiCars.length);
    setIsAutoPlaying(false);
  }, [mitsubishiCars.length]);

  const prevCar = useCallback(() => {
    setCurrentCarIndex((prev) => (prev - 1 + mitsubishiCars.length) % mitsubishiCars.length);
    setIsAutoPlaying(false);
  }, [mitsubishiCars.length]);

  // Carousel untuk mobil bekas (mobile)
  const nextUsedCar = useCallback(() => {
    setCurrentUsedCarIndex((prev) => (prev + 1) % usedCars.length);
  }, [usedCars.length]);

  const prevUsedCar = useCallback(() => {
    setCurrentUsedCarIndex((prev) => (prev - 1 + usedCars.length) % usedCars.length);
  }, [usedCars.length]);

  // Carousel untuk sparepart (mobile)
  const nextSparepart = useCallback(() => {
    setCurrentSparepartIndex((prev) => (prev + 1) % spareparts.length);
  }, [spareparts.length]);

  const prevSparepart = useCallback(() => {
    setCurrentSparepartIndex((prev) => (prev - 1 + spareparts.length) % spareparts.length);
  }, [spareparts.length]);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Touch events untuk mobile
  const handleTouchStart = (e: React.TouchEvent, type: 'car' | 'usedCar' | 'sparepart' | 'testimonial') => {
    const touchStartX = e.targetTouches[0].clientX;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchEndX = moveEvent.targetTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe kiri
          if (type === 'car') nextCar();
          else if (type === 'usedCar') nextUsedCar();
          else if (type === 'sparepart') nextSparepart();
          else if (type === 'testimonial') nextTestimonial();
        } else {
          // Swipe kanan
          if (type === 'car') nextCar();
          else if (type === 'usedCar') nextUsedCar();
          else if (type === 'sparepart') nextSparepart();
          else if (type === 'testimonial') nextTestimonial();
        }
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  // Auto-play effects
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % mitsubishiCars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, mitsubishiCars.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
        {/* Navigation */}
        <Navbar />

        {/* Enhanced Hero Section dengan Branding mitsubishiwithjuan */}
        <section className="relative h-80 md:h-screen flex items-center justify-center pt-16 overflow-hidden">
          {/* Background Images untuk Desktop & Mobile */}
          <div className="absolute inset-0 h-80 md:h-auto mt-16 md:mt-16">
            <div className="hidden md:block">
              <Image
                src="/car-banner.png"
                alt="Mitsubishi Hero Banner"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="md:hidden h-28 w-full">
              <Image
                src="/car-banner2.png"
                alt="Mitsubishi Hero Banner"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black/20 animate-gradient-x hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/0 animate-gradient-x md:hidden block"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          {/* Hero Content dengan Branding Juan */}
          <div className="relative z-10 container mx-auto px-4 text-center hidden md:block">
            <div className="space-y-8">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl animate-fade-in">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Makassar, Tanjung Bunga</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 animate-fade-in-up">
                MITSUBISHI{' '}
                <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                  WITH JUAN
                </span>
              </h1>
              
              <div className="animate-fade-in-up delay-200">
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                  Konsultan Sales Mitsubishi Terpercaya di Makassar
                  <span className="block mt-4 text-primary-200 font-semibold">
                    Pelayanan Personal • Cicilan Terbaik • After-Sales Premium
                  </span>
                </p>
              </div>

              <div className="animate-fade-in-up delay-400">
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Hi, saya <span className="text-primary-300 font-bold">Juan</span> - siap membantu Anda menemukan Mitsubishi impian dengan pelayanan terbaik dan penawaran spesial!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-600">
                <a
                  href="#inventory"
                  className="group bg-primary-500 hover:bg-primary-600 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden"
                >
                  <span className="relative z-10">Lihat Stok Mobil</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  <div className="absolute inset-0 border-2 border-primary-400 rounded-2xl animate-pulse-slow"></div>
                </a>
                
                <a
                  href="#hitung-cicilan"
                  className="group bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10">Simulasi Kredit</span>
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </a>
              </div>
            </div>
            {/* // Tambah trust badges di hero */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: "🏆", text: "Dealer Resmi" },
                { icon: "⭐", text: "Rating 4.9/5" },
                { icon: "🚗", text: "500+ Terjual" },
                { icon: "💎", text: "Garansi Resmi" }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <span>{badge.icon}</span>
                  <span className="text-black text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-indicator"></div>
            </div>
          </div>
        </section>

        {/* // Tambah trust badges di hero */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[
            { icon: "🏆", text: "Dealer Resmi" },
            { icon: "⭐", text: "Rating 4.9/5" },
            { icon: "🚗", text: "500+ Terjual" },
            { icon: "💎", text: "Garansi Resmi" }
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <span>{badge.icon}</span>
              <span className="text-black text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Enhanced Keunggulan - Compact untuk Mobile */}
        <section className="py-12 md:py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-3 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full animate-fade-in">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base">Mengapa Memilih Juan?</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black dark:text-white">
                Keunggulan <span className="text-blue-500">Layanan Juan</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Sebagai konsultan sales Mitsubishi profesional, saya memberikan pengalaman berbelanja mobil yang berbeda dan memuaskan
              </p>
            </div>
            
            {/* Grid untuk Semua Device - Compact di Mobile */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                {[
                    {
                        icon: <ShieldCheck className="w-8 h-8 md:w-10 lg:w-12 lg:h-12" />,
                        title: "Konsultan Profesional",
                        description: "Juan sebagai sales consultant berpengalaman siap memberikan rekomendasi terbaik sesuai kebutuhan Anda.",
                        features: ["Berpengalaman", "Profesional", "Terpercaya"],
                    },
                    {
                        icon: <CheckCircle className="w-8 h-8 md:w-10 lg:w-12 lg:h-12" />,
                        title: "Pelayanan Personal",
                        description: "Layanan one-on-one dengan pendekatan personal untuk memastikan Anda mendapatkan mobil yang tepat.",
                        features: ["Personal Approach", "Flexible", "Support 24/7"],
                    },
                    {
                        icon: <Tag className="w-8 h-8 md:w-10 lg:w-12 lg:h-12" />,
                        title: "Harga Terbaik",
                        description: "Penawaran harga kompetitif dengan cicilan ringan dan promo eksklusif dari Juan.",
                        features: ["Harga Terbaik", "DP Ringan", "Promo Eksklusif"],
                    }
                ].map((item, index) => (
                    <div 
                        key={index}
                        // Padding dan shadow disesuaikan agar lebih ringkas di layar kecil
                        className="group bg-white dark:bg-gray-800 p-3 md:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="text-blue-500 mb-2 md:mb-4 lg:mb-6 flex justify-center">
                            {item.icon}
                        </div>
                        
                        {/* Judul: Font dikecilkan agar muat di 3 kolom mobile */}
                        <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 text-black dark:text-white text-center">
                            {item.title}
                        </h3>
                        
                        {/* DESKRIPSI: Disembunyikan di layar kecil (sm:hidden) dan Tampil di MD ke atas (md:block) */}
                        <p className="hidden md:block text-gray-600 dark:text-gray-300 text-center text-xs md:text-sm leading-snug mb-2 md:mb-3">
                            {item.description}
                        </p>
                        
                        {/* Fitur Tags: Tetap ada di semua ukuran */}
                        <div className="flex flex-wrap justify-center gap-0.5 md:gap-2 mt-1">
                            {/* Batasi jumlah fitur di mobile/kecil (gunakan slice) */}
                            {item.features.slice(0, 2).map((feature, idx) => (
                                <span 
                                    key={idx}
                                    // Ukuran font fitur sangat kecil di mobile/kecil
                                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1 md:px-2 py-0.5 rounded-full text-[8px] sm:text-xs md:text-sm font-medium whitespace-nowrap"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Enhanced Car Inventory dengan Semua Data Mitsubishi */}
        <section id="inventory" className="py-24 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 mask-repeating-linear"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Mobil <span className="text-primary-500">Mitsubishi</span> 2025
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Temukan berbagai pilihan mobil Mitsubishi terbaru dengan teknologi canggih dan desain modern
              </p>
            </div>

            {/* Enhanced Carousel untuk Mobil Baru */}
            <div className="relative max-w-7xl mx-auto">
              {/* Navigation Buttons */}
              <button 
                onClick={prevCar}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl group -translate-x-2 hover:translate-x-0"
              >
                <ChevronLeft className="w-7 h-7 transform group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={nextCar}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl group translate-x-2 hover:translate-x-0"
              >
                <ChevronRight className="w-7 h-7 transform group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Main Carousel */}
              <div 
                ref={carouselRef}
                className="flex overflow-hidden rounded-3xl shadow-2xl"
                onTouchStart={(e) => handleTouchStart(e, 'car')}
              >
                {mitsubishiCars.map((car, index) => (
                  <div
                    key={index}
                    className={`min-w-full transition-all duration-700 ease-out ${
                      index === currentCarIndex ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                    style={{
                      transform: `translateX(${(index - currentCarIndex) * 100}%)`
                    }}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
                        {/* Car Image */}
                        <div className="relative h-96 xl:h-auto">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-105"
                          />
                          
                          {/* Tags */}
                          <div className="absolute top-6 left-6">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl transform hover:scale-105 transition-transform">
                              {car.tag}
                            </div>
                          </div>
                          
                          <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                            {car.passengers} Penumpang
                          </div>
                        </div>

                        {/* Car Details */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                          <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-black dark:text-white leading-tight">
                            {car.name}
                          </h3>
                          
                          {/* Rating */}
                          <div className="flex items-center mb-8">
                            <div className="flex text-yellow-400 mr-3">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="w-6 h-6" />
                              ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 text-lg">
                              ({car.reviews} Review)
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mb-8">
                            <div className="text-4xl lg:text-5xl font-black text-primary-500 mb-3">
                              {car.price}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-lg">
                              Harga OTR Makassar
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-8">
                            <h4 className="font-bold text-xl mb-4 text-black dark:text-white">Fitur Utama:</h4>
                            <div className="flex flex-wrap gap-3">
                              {car.features.map((feature, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden group">
                            <span className="relative z-10">Lihat Detail</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>
                          <button className="flex-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                            Test Drive
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Carousel Indicators */}
              <div className="flex justify-center mt-12 gap-3">
                {mitsubishiCars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentCarIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index === currentCarIndex 
                        ? 'bg-primary-500 w-12 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* See All Button */}
            <div className="text-center mt-16">
              <Link 
                href="/mobil-baru"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-800 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Lihat Semua Mobil Baru
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Used Cars Section dengan Carousel Mobile */}
        <section 
          ref={usedCarsRef}
          className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Mobil <span className="text-primary-500">Second</span> Tangan Pertama
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Pilihan mobil bekas berkualitas dengan kondisi terawat dan harga terjangkau
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 opacity-100 translate-y-0">
              {usedCars.map((car, index) => (
                <div 
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                      Second Premium
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                      {car.year}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-primary-600 transition-colors">
                      {car.name}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Tahun</span>
                        <span className="font-semibold text-black dark:text-white">{car.year}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Kilometer</span>
                        <span className="font-semibold text-black dark:text-white">{car.mileage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Kondisi</span>
                        <span className="font-semibold text-green-600">{car.condition}</span>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-black text-primary-500 mb-6">{car.price}</div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Lihat Detail
                      </button>
                      <button className="px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                        ♡
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <button 
                onClick={prevUsedCar}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={nextUsedCar}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div 
                ref={usedCarsCarouselRef}
                className="flex overflow-hidden rounded-3xl"
                onTouchStart={(e) => handleTouchStart(e, 'usedCar')}
              >
                {usedCars.map((car, index) => (
                  <div
                    key={index}
                    className={`min-w-full transition-all duration-500 ease-out ${
                      index === currentUsedCarIndex ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl mx-2">
                      <div className="relative h-64">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                          Second Premium
                        </div>
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                          {car.year}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                          {car.name}
                        </h3>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Tahun</span>
                            <span className="font-semibold text-black dark:text-white">{car.year}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Kilometer</span>
                            <span className="font-semibold text-black dark:text-white">{car.mileage}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Kondisi</span>
                            <span className="font-semibold text-green-600">{car.condition}</span>
                          </div>
                        </div>
                        
                        <div className="text-2xl font-black text-primary-500 mb-6">{car.price}</div>
                        
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {usedCars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentUsedCarIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentUsedCarIndex 
                        ? 'bg-primary-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link 
                href="/mobil-bekas"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Lihat Semua Mobil Second
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Spareparts Section dengan Carousel Mobile */}
        <section 
          ref={sparepartRef}
          className="py-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                <span className="text-primary-500">Sparepart</span> & Aksesoris
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Suku cadang original Mitsubishi dengan garansi resmi dan kualitas terjamin
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 opacity-100 translate-y-0">
              {spareparts.map((part, index) => (
                <div 
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={part.image}
                      alt={part.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-xl text-xs font-bold">
                      {part.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-black dark:text-white group-hover:text-primary-600 transition-colors">
                      {part.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {part.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-primary-500">{part.price}</span>
                      <button 
                        onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya ingin pesan ${part.name}`, '_blank')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Pesan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <button 
                onClick={prevSparepart}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={nextSparepart}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div 
                ref={sparepartCarouselRef}
                className="flex overflow-hidden rounded-3xl"
                onTouchStart={(e) => handleTouchStart(e, 'sparepart')}
              >
                {spareparts.map((part, index) => (
                  <div
                    key={index}
                    className={`min-w-full transition-all duration-500 ease-out ${
                      index === currentSparepartIndex ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl mx-2">
                      <div className="relative h-48">
                        <Image
                          src={part.image}
                          alt={part.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-xl text-xs font-bold">
                          {part.category}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                          {part.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                          {part.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-black text-primary-500">{part.price}</span>
                          <button 
                            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya ingin pesan ${part.name}`, '_blank')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Pesan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {spareparts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSparepartIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSparepartIndex 
                        ? 'bg-primary-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* View All & WhatsApp Button */}
            <div className="text-center mt-12 space-y-6">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  href="/sparepart"
                  className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-gray-200 dark:border-gray-700"
                >
                  Lihat Semua Sparepart
                  <Wrench className="w-5 h-5" />
                </Link>
                
                <button 
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Konsultasi dengan Juan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Service Reservation Banner - Fixed with Standard Tailwind Colors */}
        <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden border-t border-b border-gray-200 dark:border-gray-700">
          {/* Background Pattern - Using only standard colors */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-gray-800"></div>
          
          {/* Simple Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-400 rounded-lg rotate-45"></div>
          </div>

          {/* Simple Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Header dengan Icon */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg mb-6">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Reservasi <span className="text-blue-600">Service Mobil</span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Jangan tunggu sampai rusak! Jadwalkan service berkala Anda sekarang dan dapatkan penawaran spesial dari Juan
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto">
                {[
                  {
                    icon: "🔧",
                    title: "Free Pengecekan Komprehensif",
                    description: "Pemeriksaan menyeluruh gratis untuk semua komponen kendaraan"
                  },
                  {
                    icon: "💰", 
                    title: "Biaya Service Terjangkau",
                    description: "Harga kompetitif dengan kualitas terjamin"
                  },
                  {
                    icon: "👨‍🔧",
                    title: "Mekanik Berpengalaman",
                    description: "Dilayani oleh teknisi Mitsubishi bersertifikat"
                  },
                  {
                    icon: "🛡️",
                    title: "Garansi Service 6 Bulan",
                    description: "Jaminan kepuasan dengan garansi resmi"
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{benefit.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                          {benefit.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="text-center bg-blue-600 rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Siap Service Mobil Anda?
                </h3>
                <p className="text-blue-100 mb-6 text-sm md:text-base">
                  Booking sekarang dan dapatkan penawaran spesial untuk pelanggan pertama!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button 
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya ingin reservasi service mobil`, '_blank')}
                    className="bg-white hover:bg-gray-100 text-blue-600 px-6 md:px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm md:text-base"
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    Reservasi Service Sekarang
                  </button>
                  
                  <button 
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya ingin konsultasi tentang service mobil`, '_blank')}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Konsultasi Gratis
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-blue-100 text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Respon Cepat 24 Jam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Free Pick-up & Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span>Sparepart Original</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-gray-600 dark:text-gray-400">
                {[
                  { icon: "🏆", text: "Bersertifikat" },
                  { icon: "⭐", text: "Rating 4.9/5" },
                  { icon: "🚗", text: "500+ Mobil" },
                  { icon: "💎", text: "Pelayanan Premium" }
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs md:text-sm">
                    <span className="text-lg">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section 
          ref={testimonialRef}
          className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Apa Kata <span className="text-primary-500">Pelanggan</span> Juan?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Pengalaman nyata dari pelanggan yang telah mempercayakan kendaraan mereka kepada Juan
              </p>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative max-w-4xl mx-auto">
              {/* Navigation */}
              <button 
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white dark:bg-gray-800 hover:bg-primary-500 text-gray-800 dark:text-white hover:text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 -translate-x-2 hover:translate-x-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white dark:bg-gray-800 hover:bg-primary-500 text-gray-800 dark:text-white hover:text-white w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 translate-x-2 hover:translate-x-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Testimonial Content */}
              <div 
                ref={testimonialRef}
                className="overflow-hidden rounded-3xl"
                onTouchStart={(e) => handleTouchStart(e, 'testimonial')}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`min-w-full transition-all duration-700 ease-out ${
                      index === currentTestimonialIndex ? 'opacity-100 block' : 'opacity-0 hidden'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Customer Photo */}
                        <div className="flex-shrink-0">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500 shadow-lg">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="flex-1 text-center md:text-left">
                          {/* Rating */}
                          <div className="flex justify-center md:justify-start text-yellow-400 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="w-6 h-6" />
                            ))}
                          </div>

                          {/* Comment */}
                          <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                            &quot;{testimonial.comment}&quot;
                          </blockquote>

                          {/* Customer Info */}
                          <div>
                            <div className="font-bold text-lg text-black dark:text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-primary-500 font-semibold mb-2">
                              {testimonial.role}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                              {testimonial.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentTestimonialIndex 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Calculator Section */}
        <CicilanCalculator />

        {/* // WhatsApp Float Button dengan Psikologi yang Tepat */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col items-end space-y-3">
            
            {/* Notification Bubble - Muncul secara natural */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-2xl shadow-2xl transform transition-all duration-700 ease-out hover:scale-105 cursor-pointer"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}>
              
              <div className="flex items-center gap-3">
                {/* Avatar Juan */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    J
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                </div>
                
                {/* Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">Juan</span>
                    <span className="text-blue-100 text-xs">• Sekarang</span>
                  </div>
                  <p className="text-blue-50 text-sm truncate">Ada yang bisa saya bantu? 😊</p>
                </div>
                
                {/* WhatsApp Icon */}
                <div className="text-green-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                  </svg>
                </div>
              </div>
              
              {/* Typing Indicator - Muncul setelah beberapa detik */}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-blue-500/30">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
                <span className="text-blue-200 text-xs">Juan mengetik...</span>
              </div>
            </div>

            {/* Main WhatsApp Button */}
            <button 
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 hover:rotate-12 group relative"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
              </svg>
              
              {/* Pulse Effect */}
              <div className="absolute inset-0 border-2 border-green-400 rounded-2xl animate-ping opacity-50"></div>
              
              {/* Online Badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full">
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </button>

          </div>
        </div>

        {/* // Versi Simple dengan Psikologi yang Baik */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col items-end space-y-3">
            
            {/* Social Proof Notification - Muncul setelah user scroll */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 shadow-2xl transform transition-all duration-1000 ease-out hover:scale-105 cursor-pointer"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}>
              
              <div className="flex items-center gap-3">
                {/* Customer Avatars */}
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      {i}
                    </div>
                  ))}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    <span className="text-green-600 font-bold">3 orang</span> lagi konsultasi
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">dari Makassar</p>
                </div>
              </div>
            </div>

            {/* Main WhatsApp Button dengan Personal Touch */}
            <div className="relative group">
              <button 
                onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 group-hover:shadow-2xl relative overflow-hidden"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                </svg>

                {/* Online Indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </button>

              {/* Tooltip yang muncul natural */}
              <div className="absolute right-16 bottom-1/2 transform translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Juan siap membantu
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
              </div>
            </div>

          </div>
        </div>

        {/* // Letakkan SEBELUM section Calculator atau SETELAH Testimonial */}

        {/* Blog/Artikel Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                Tips & Informasi Mitsubishi
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Artikel bermanfaat untuk membantu Anda memilih Mitsubishi terbaik
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Review Mitsubishi Xforce 2025: Fitur & Harga Terbaru",
                  excerpt: "Simak review lengkap Mitsubishi Xforce 2025 dengan fitur terbaru Safety Shield dan harga OTR Makassar.",
                  image: "/xforce-review.jpg",
                  slug: "/blog/review-mitsubishi-xforce-2025",
                  readTime: "5 min read"
                },
                {
                  title: "Cara Kredit Mitsubishi Xpander DP 10% di Makassar",
                  excerpt: "Panduan lengkap kredit Mitsubishi Xpander dengan DP ringan mulai 10% dan cicilan terjangkau.",
                  image: "/kredit-xpander.jpg", 
                  slug: "/blog/kredit-mitsubishi-xpander-dp-10",
                  readTime: "4 min read"
                },
                {
                  title: "Perbandingan Mitsubishi Pajero Sport vs Fortuner",
                  excerpt: "Analisis detail perbandingan Mitsubishi Pajero Sport dengan Toyota Fortuner untuk SUV premium.",
                  image: "/pajero-vs-fortuner.jpg",
                  slug: "/blog/perbandingan-pajero-sport-vs-fortuner",
                  readTime: "6 min read"
                }
              ].map((article, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-600">
                    {/* Placeholder untuk image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      📝 Artikel Image
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <button 
                      onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya tertarik baca artikel: ${article.title}`, '_blank')}
                      className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Halo Juan, saya mau konsultasi tentang Mitsubishi`, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                📞 Konsultasi Gratis dengan Juan
              </button>
            </div>
          </div>
        </section>

        {/* Footer dengan struktur SEO */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4 text-primary-400">Mitsubishi With Juan</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Konsultan Sales Mitsubishi profesional di Makassar dengan komitmen memberikan pengalaman terbaik dalam kepemilikan kendaraan, dari pembelian hingga after-sales service.
                </p>
                <div className="flex items-center gap-3 text-gray-400 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>Makassar, Tanjung Bunga</span>
                </div>
                <div className="flex gap-4">
                  <div 
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                    className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="bg-blue-500 hover:bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <span className="font-bold">f</span>
                  </div>
                  <div className="bg-pink-500 hover:bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <span className="font-bold">in</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Menu Utama</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Tentang Kami', href: '/tentang' },
                    { name: 'Layanan & Servis', href: '/layanan-servis' },
                    { name: 'Kontak Kami', href: '/kontak' },
                    { name: 'Kebijakan Privasi', href: '/kebijakan-privasi' }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link 
                        href={item.href} 
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Kontak Juan</h4>
                <div className="space-y-4 text-gray-400">
                  <div>
                    <div className="font-semibold text-white">WhatsApp</div>
                    <a 
                      href={`https://wa.me/${whatsappNumber}`}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {whatsappNumber}
                    </a>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Alamat</div>
                    <div>Makassar, Tanjung Bunga</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Jam Operasional</div>
                    <div>Senin - Minggu: 08:00 - 17:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Mitsubishi With Juan. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Styles untuk Animasi */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scroll-indicator {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 1s;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }

        .mask-repeating-linear {
          mask-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            black 10px,
            black 20px
          );
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </>
  );
}