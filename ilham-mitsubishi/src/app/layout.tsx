// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 OPTIMIZED METADATA UNTUK SALES PROFESIONAL MITSUBISHI
export const metadata: Metadata = {
  title: {
    default: "Promo Mitsubishi Makassar 2025 | Xpander, Xforce, Pajero, Destinator - Mitsubishi with Juan",
    template: "%s | Sales Mitsubishi Makassar"
  },
  description: "Juan - Sales Profesional Mitsubishi Makassar. Promo Mitsubishi Xpander, Xforce, Pajero Sport 2025. Kredit DP Ringan, Test Drive Gratis, Konsultasi Gratis!",
  keywords: "sales mitsubishi makassar, promo mitsubishi makassar 2025, mitsubishi xpander makassar, juan sales mitsubishi, kredit mitsubishi makassar, test drive mitsubishi makassar",
  authors: [{ name: "Juan - Sales Mitsubishi" }],
  creator: "Juan - Sales Mitsubishi",
  publisher: "Mitsubishi with Juan",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://mitsubishiwithjuan.com'),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
    },
  },
  openGraph: {
    title: "Juan - Sales Profesional Mitsubishi Makassar | Promo 2025",
    description: "Konsultan Mitsubishi profesional di Makassar. Bantu Anda dapatkan Mitsubishi impian dengan harga terbaik dan pelayanan premium.",
    url: 'https://mitsubishiwithjuan.com',
    siteName: 'Mitsubishi with Juan',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Juan - Sales Profesional Mitsubishi Makassar',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Juan - Sales Mitsubishi Makassar",
    description: "Sales Profesional Mitsubishi di Makassar - Promo Terbaik 2025",
    images: ['/og-image.jpg'],
    creator: '@mitsubishiwithjuan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Automotive',
  // Verification codes akan diisi nanti setelah setup Search Console
  verification: {
    google: 'G-XXXXXXXXXX', // Akan diganti setelah dapat dari Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* 🔥 PERSON SCHEMA - UTAMA UNTUK SALES PROFESIONAL */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Juan",
              "jobTitle": "Sales Profesional Mitsubishi",
              "worksFor": {
                "@type": "Organization", 
                "name": "Mitsubishi Motors Indonesia",
                "url": "https://www.mitsubishi-motors.co.id"
              },
              "description": "Juan - Sales Profesional Mitsubishi di Makassar dengan pengalaman 5+ tahun. Spesialis penjualan Mitsubishi Xpander, Xforce, Pajero Sport dengan pelayanan terbaik dan after-sales support.",
              "telephone": "+6282343057060",
              "email": "juan@mitsubishiwithjuan.com",
              "url": "https://mitsubishiwithjuan.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Makassar",
                "addressRegion": "Sulawesi Selatan",
                "addressCountry": "ID"
              },
              "image": "https://mitsubishiwithjuan.com/juan-profile.jpg",
              "sameAs": [
                "https://www.instagram.com/mitsubishiwithjuan",
                "https://www.facebook.com/mitsubishiwithjuan"
              ],
              "knowsAbout": [
                "Mitsubishi Xpander",
                "Mitsubishi Xforce", 
                "Mitsubishi Pajero Sport",
                "Mitsubishi Triton",
                "Kredit Mobil",
                "Automotive Sales"
              ],
              "award": "Top Sales Mitsubishi Makassar 2024"
            })
          }}
        />

        {/* 🔥 LOCAL BUSINESS SCHEMA - Disesuaikan untuk Sales */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Mitsubishi with Juan",
              "description": "Layanan Sales Profesional Mitsubishi di Makassar - Konsultasi Gratis, Test Drive, dan Pendampingan Kredit",
              "url": "https://mitsubishiwithjuan.com",
              "telephone": "+6282343057060",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Makassar",
                "addressRegion": "Sulawesi Selatan",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-5.147665",
                "longitude": "119.432731"
              },
              "openingHours": [
                "Mo-Su 08:00-17:00"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Makassar"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Konsultasi Pembelian Mitsubishi"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Test Drive Mitsubishi"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Pendampingan Kredit Mobil"
                  }
                }
              ]
            })
          }}
        />

        {/* 🔥 BREADCRUMB SCHEMA - Untuk navigasi yang lebih baik */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mitsubishiwithjuan.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Mobil Baru Mitsubishi Makassar",
                  "item": "https://mitsubishiwithjuan.com/mobil-baru"
                },
                {
                  "@type": "ListItem", 
                  "position": 3,
                  "name": "Mitsubishi Xpander 2025",
                  "item": "https://mitsubishiwithjuan.com/mobil-baru/xpander"
                }
              ]
            })
          }}
        />

        {/* 🔥 WEBSITE SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mitsubishi with Juan",
              "url": "https://mitsubishiwithjuan.com",
              "description": "Juan - Sales Profesional Mitsubishi Makassar. Layanan konsultasi pembelian Mitsubishi Xpander, Xforce, Pajero Sport dengan harga terbaik.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://mitsubishiwithjuan.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* 🔥 PRODUCT SCHEMA UNTUK MOBIL POPULER */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Mitsubishi Xpander Ultimate CVT 2025",
                "image": "/xpander-ultimate.png",
                "description": "Mitsubishi Xpander Ultimate CVT 2025 - MPV keluarga terbaik dengan fitur lengkap dan desain modern. Harga OTR Makassar mulai Rp 348.800.000",
                "brand": {
                  "@type": "Brand",
                  "name": "Mitsubishi"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "https://mitsubishiwithjuan.com/mobil-baru/xpander-ultimate",
                  "priceCurrency": "IDR",
                  "price": "348800000",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Person",
                    "name": "Juan"
                  }
                }
              },
              {
                "@context": "https://schema.org/",
                "@type": "Product", 
                "name": "Mitsubishi Xforce Ultimate CVT 2025",
                "image": "/xforce.png",
                "description": "Mitsubishi Xforce Ultimate CVT 2025 - SUV compact dengan Safety Shield dan desain sporty. Harga OTR Makassar Rp 389.800.000",
                "brand": {
                  "@type": "Brand",
                  "name": "Mitsubishi"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "https://mitsubishiwithjuan.com/mobil-baru/xforce-ultimate",
                  "priceCurrency": "IDR", 
                  "price": "389800000",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Person",
                    "name": "Juan"
                  }
                }
              }
            ])
          }}
        />

        {/* 🔥 FAVICON & ICONS */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* 🔥 PRELOAD CRITICAL RESOURCES */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
      </body>
    </html>
  );
}