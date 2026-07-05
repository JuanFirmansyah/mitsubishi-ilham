// components/ui/Social.tsx
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Social() {
  return (
    <div className="fixed right-10 bottom-10 flex-col gap-4 z-50 hidden lg:flex">
      <a
        href="https://www.instagram.com/aicocreative/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-400 transition-colors"
        aria-label="Instagram"
      >
        <FaInstagram size={28} />
      </a>
      <a
        href="https://wa.me/6285256092725?text=Halo%20AICO%20Creative%2C%20saya%20tertarik%20untuk%20berkolaborasi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-400 transition-colors"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
      <a
        href="https://www.youtube.com/@aicocreativetv"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-400 transition-colors"
        aria-label="YouTube"
      >
        <FaYoutube size={28} />
      </a>
    </div>
  );
}