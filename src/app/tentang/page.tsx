// src/app/tentang/page.tsx
"use client";

import Navbar from "@/components/Navbar";
// import Image from "next/image";
import { MessageCircle, Phone, MapPin, Award, Users, Star } from "lucide-react";

const whatsappNumber = "+6282343057060";

export default function TentangPage() {
  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Tentang <span className="text-blue-600">Juan</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sales Profesional Mitsubishi di Makassar - Melayani dengan Hati, Mengutamakan Kepercayaan
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Juan - Sales Mitsubishi Profesional
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Halo! Saya <strong>Juan</strong>, sales profesional Mitsubishi yang berdedikasi 
                  melayani masyarakat Makassar dan sekitarnya dalam memiliki kendaraan Mitsubishi impian.
                </p>
                
                <p>
                  Dengan pengalaman lebih dari <strong>5 tahun</strong> di industri otomotif, 
                  saya memahami betul kebutuhan dan harapan setiap pelanggan. 
                  Komitmen saya adalah memberikan pelayanan terbaik dari proses awal 
                  hingga after-sales.
                </p>

                <p>
                  Saya bukan hanya menjual mobil, tetapi membangun hubungan jangka panjang 
                  dengan setiap pelanggan. Kepercayaan Anda adalah prioritas utama saya.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mobil Terjual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating Pelanggan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
              {/* Ganti dengan foto Juan */}
              <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <div className="text-center text-blue-600 dark:text-blue-400">
                  <Users className="w-20 h-20 mx-auto mb-4" />
                  <p className="font-semibold">Foto Juan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Me */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Mengapa Memilih Juan?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Profesional Berpengalaman",
                description: "Lebih dari 5 tahun membantu pelanggan memiliki Mitsubishi terbaik"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Pelayanan Personal",
                description: "Pendekatan personal sesuai kebutuhan dan budget Anda"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "After-Sales Support",
                description: "Pendampingan purna jual dan bantuan service berkala"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Siap Melayani Anda</h2>
          <p className="mb-6 text-blue-100">
            Hubungi Juan untuk konsultasi gratis, test drive, atau informasi promo terbaru
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Juan
            </button>
            
            <button 
              onClick={() => window.open(`tel:${whatsappNumber}`)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2 justify-center"
            >
              <Phone className="w-5 h-5" />
              Telepon Sekarang
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-blue-100">
            <MapPin className="w-4 h-4" />
            <span>Melayani Wilayah Makassar & Sekitarnya</span>
          </div>
        </div>
      </div>
    </div>
  );
}