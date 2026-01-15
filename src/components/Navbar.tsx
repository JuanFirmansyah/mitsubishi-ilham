// src/components/Navbar.tsx - VERSI FIXED HYDRATION ERROR

"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Car, 
  Home, 
  Shield, 
  Star, 
  Tag, 
  Calculator,
  ChevronDown,
  MapPin,
  PhoneCall,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // 🔥 FIX: Pastikan hanya render di client
  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { 
      name: 'Beranda', 
      href: '/', 
      icon: <Home className="w-4 h-4" />
    },
    { 
      name: 'Mobil Baru', 
      href: '#inventory',
      icon: <Car className="w-4 h-4" />,
      dropdown: [
        { name: 'Semua Model', href: '#inventory' },
        { name: 'Xforce', href: '#xforce' },
        { name: 'Xpander', href: '#xpander' },
        { name: 'Pajero Sport', href: '#pajero' },
        { name: 'Triton', href: '#triton' },
        { name: 'L300', href: '#l300' },
      ]
    },
    { 
      name: 'Mobil Bekas', 
      href: '#used-cars',
      icon: <Car className="w-4 h-4" />
    },
    { 
      name: 'Layanan', 
      href: '#services',
      icon: <Shield className="w-4 h-4" />,
      dropdown: [
        { name: 'Service & Maintenance', href: '#service' },
        { name: 'Sparepart Original', href: '#sparepart' },
        { name: 'Test Drive', href: '#test-drive' },
      ]
    },
    { 
      name: 'Promo', 
      href: '#promo',
      icon: <Tag className="w-4 h-4" />,
      highlight: true
    },
    { 
      name: 'Testimoni', 
      href: '#testimonials',
      icon: <Star className="w-4 h-4" />
    },
  ];

  const whatsappNumber = "+6282343057060";

  // 🔥 FIX: Gunakan warna solid untuk background gradient di server
  const getBackgroundColor = () => {
    if (!isClient) return 'bg-blue-600'; // Warna solid untuk SSR
    return 'bg-gradient-to-br from-blue-600 to-cyan-500'; // Gradient untuk client
  };

  // 🔥 FIX: Conditional render untuk gradient
  if (!isClient) {
    return (
      <nav className="fixed w-full z-50 bg-white shadow-md py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Skeleton untuk SSR */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl"></div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-gray-900">MitsubishiWithJuan</div>
                <div className="text-xs text-gray-500">Konsultan Sales</div>
              </div>
            </div>
            <button className="lg:hidden p-2.5 bg-gray-50 rounded-xl">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl py-2 border-b border-blue-100' 
        : 'bg-white py-3 shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* 🔥 FIX: Gunakan conditional gradient */}
                <div className={`w-10 h-10 ${getBackgroundColor()} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-shadow`}>
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-gray-900 leading-tight">
                  Mitsubishi<span className="text-blue-600">WithJuan</span>
                </div>
                <div className="text-xs text-gray-500">Konsultan Sales Resmi</div>
              </div>
            </Link>

            {/* Location Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Makassar</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <motion.a
                  href={item.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30' 
                      : scrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </motion.a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {subItem.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              <motion.a
                href={`tel:${whatsappNumber.replace('+', '')}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="font-semibold text-sm">Telepon</span>
              </motion.a>

              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold text-sm">WhatsApp</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden bg-white shadow-2xl border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Juan Profile */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Juan</div>
                  <div className="text-sm text-blue-600">Konsultan Mitsubishi</div>
                  <div className="text-xs text-gray-500">Siap membantu Anda!</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        item.highlight
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`p-2 rounded-lg ${
                        item.highlight ? 'bg-white/20' : 'bg-blue-100'
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </a>
                  </motion.div>
                ))}

                {/* Calculator CTA */}
                <motion.a
                  href="#hitung-cicilan"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Hitung Cicilan</div>
                    <div className="text-xs opacity-90">Simulasi kredit mudah</div>
                  </div>
                </motion.a>
              </div>

              {/* Contact Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-3">Hubungi Juan via:</div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.a
                    href={`tel:${whatsappNumber.replace('+', '')}`}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-xs font-medium text-blue-700">Telepon</span>
                  </motion.a>
                  
                  <motion.a
                    href={`https://wa.me/${whatsappNumber}`}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="w-5 h-5 text-green-600 mb-1" />
                    <span className="text-xs font-medium text-green-700">WhatsApp</span>
                  </motion.a>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-4 text-center text-xs text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Dealer Resmi Mitsubishi</span>
                  <Sparkles className="w-3 h-3" />
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