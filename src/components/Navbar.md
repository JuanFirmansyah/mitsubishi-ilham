"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Layanan', href: '#services' },
    { name: 'Stok Mobil', href: '#inventory' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'Promo', href: '/promo' },
    { name: 'Hubungi Kami', href: '#contact' },
    { name: 'Hitung Cicilan', href: '#hitung-cicilan' },
    { name: 'Tentang Juan', href: '/tentang' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center"
        >
          <Link href="/">
            <Image
              src="/logo-bosowa.png" // Pastikan logo memiliki warna yang sesuai
              alt="Bosowa Dealership"
              width={150}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              whileHover={{ 
                color: '#2563eb'
              }}
              className={`font-medium ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors relative group`}
            >
              {item.name}
              <span className={`absolute left-0 bottom-0 w-0 h-0.5 ${scrolled ? 'bg-blue-600' : 'bg-blue-500'} transition-all duration-300 group-hover:w-full`}></span>
            </motion.a>
          ))}
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-4 ml-6">
            <motion.a
              href="tel:+622112345678"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full"
            >
              <FaPhoneAlt className="text-sm" />
              <span className="text-sm font-semibold">0823-4305-7060</span>
            </motion.a>
            
            <motion.a
              href="https://wa.me/6282343057060"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full"
            >
              <FaWhatsapp className="text-sm" />
              <span className="text-sm font-semibold">WhatsApp</span>
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-gray-800 p-2 rounded-lg focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-4 py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      x: 5,
                      color: '#2563eb'
                    }}
                    className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4">
                  <motion.a
                    href="https://wa.me/6282343057060"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg"
                  >
                    <FaPhoneAlt />
                    <span className="font-semibold">Telepon Kami</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/628111234567"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg"
                  >
                    <FaWhatsapp />
                    <span className="font-semibold">Chat WhatsApp</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;