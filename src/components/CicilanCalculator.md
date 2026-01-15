"use client";

import { useState, useEffect } from 'react';
import { FaCalculator, FaMoneyBillWave, FaPercentage, FaCalendarAlt } from 'react-icons/fa';

const CicilanCalculator = () => {
  const [hargaMobil, setHargaMobil] = useState(150000000);
  const [dpPersen, setDpPersen] = useState(30);
  const [tenor, setTenor] = useState(36);
  const [bunga, setBunga] = useState(8);
  const [cicilan, setCicilan] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [dpAmount, setDpAmount] = useState(0);

  useEffect(() => {
    // Hitung DP amount
    const dp = (hargaMobil * dpPersen) / 100;
    setDpAmount(dp);
    
    // Hitung pokok pinjaman
    const pokokPinjaman = hargaMobil - dp;
    
    // Hitung bunga per bulan
    const bungaPerBulan = (pokokPinjaman * bunga / 100) / 12;
    
    // Hitung cicilan per bulan
    const cicilanPerBulan = (pokokPinjaman / tenor) + bungaPerBulan;
    setCicilan(cicilanPerBulan);
    
    // Hitung total pembayaran
    setTotalPembayaran(dp + (cicilanPerBulan * tenor));
  }, [hargaMobil, dpPersen, tenor, bunga]);

    const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
    };

    const generateWhatsAppLink = () => {
        const pesan = `Halo, saya tertarik dengan simulasi cicilan mobil:

        - Harga Mobil: ${formatRupiah(hargaMobil)}
        - Uang Muka (${dpPersen}%): ${formatRupiah(dpAmount)}
        - Pokok Pinjaman: ${formatRupiah(hargaMobil - dpAmount)}
        - Tenor: ${tenor} bulan
        - Bunga: ${bunga}% per tahun
        - Estimasi Cicilan per Bulan: ${formatRupiah(cicilan)}
        - Total Pembayaran: ${formatRupiah(totalPembayaran)}

        Mohon informasi lebih lanjut.`;

        const nomor = "6282343057060"; // ganti ini ke nomor WhatsApp kamu
        return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    };


  return (
    <section id="hitung-cicilan" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
            Hitung <span className="text-primary-500">Cicilan</span> Anda
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simulasikan pembiayaan mobil impian Anda dengan kalkulator cicilan kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Kalkulator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            <div className="mb-8">
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <FaMoneyBillWave className="mr-2 text-primary-500" />
                Harga Mobil
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="range"
                  min="50000000"
                  max="1000000000"
                  step="1000000"
                  value={hargaMobil}
                  onChange={(e) => setHargaMobil(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Rp 50jt</span>
                <span>Rp 1miliar</span>
              </div>
              <input
                type="text"
                value={formatRupiah(hargaMobil)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value) setHargaMobil(parseInt(value));
                }}
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>

            <div className="mb-8">
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <FaPercentage className="mr-2 text-primary-500" />
                Uang Muka (DP) - {dpPersen}%
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={dpPersen}
                  onChange={(e) => setDpPersen(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>10%</span>
                <span>50%</span>
              </div>
              <input
                type="text"
                value={formatRupiah(dpAmount)}
                readOnly
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
              />
            </div>

            <div className="mb-8">
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <FaCalendarAlt className="mr-2 text-primary-500" />
                Tenor - {tenor} bulan
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={tenor}
                  onChange={(e) => setTenor(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>12 bulan</span>
                <span>60 bulan</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                <FaPercentage className="mr-2 text-primary-500" />
                Suku Bunga - {bunga}%
              </label>
              <div className="flex items-center mb-1">
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.5"
                  value={bunga}
                  onChange={(e) => setBunga(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>5%</span>
                <span>15%</span>
              </div>
            </div>
          </div>

          {/* Hasil Kalkulasi */}
          <div className="bg-primary-500 text-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
            <div className="text-center mb-6">
              <FaCalculator className="text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Estimasi Pembiayaan</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-primary-400">
                <span className="font-medium">Harga Mobil</span>
                <span className="font-bold">{formatRupiah(hargaMobil)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-400">
                <span className="font-medium">Uang Muka ({dpPersen}%)</span>
                <span className="font-bold">{formatRupiah(dpAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-400">
                <span className="font-medium">Pokok Pinjaman</span>
                <span className="font-bold">{formatRupiah(hargaMobil - dpAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-400">
                <span className="font-medium">Bunga ({bunga}% p.a.)</span>
                <span className="font-bold">{formatRupiah(totalPembayaran - hargaMobil)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-primary-400">
                <span className="font-medium">Total Pembayaran</span>
                <span className="font-bold">{formatRupiah(totalPembayaran)}</span>
              </div>
              <div className="pt-4">
                <div className="text-center bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="text-sm mb-1">Perkiraan Cicilan Bulanan</p>
                  <p className="text-3xl font-extrabold">{formatRupiah(cicilan)}</p>
                  <p className="text-sm mt-1">untuk {tenor} bulan</p>
                </div>
              </div>
            </div>

            <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 bg-blue-300 text-primary-500 hover:bg-blue-500 py-3 rounded-lg font-bold transition-colors text-center block"
                >
                Ajukan Pembiayaan via WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            * Perhitungan ini adalah estimasi saja. Angka sebenarnya mungkin berbeda tergantung pada persetujuan kredit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CicilanCalculator;