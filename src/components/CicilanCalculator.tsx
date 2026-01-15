"use client";

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { FaMoneyBillWave, FaPercentage, FaCalendarAlt, FaWhatsapp, FaSyncAlt, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { Calculator, TrendingUp, CreditCard, Shield, DollarSign, FileText } from 'lucide-react';

type LeasingOption = {
  id: string;
  name: string;
  logo: string;
  minTenor: number;
  maxTenor: number;
  tenorStep: number;
  minBunga: number;
  maxBunga: number;
  tenorType: 'monthly' | 'annual';
  defaultBunga: number;
  features: string[];
  provisi: number;
  administrasi: number;
  asuransiPersen: number;
  polisAsuransi: number;
};

const CicilanCalculator = () => {
  // Loan parameters
  const [hargaMobil, setHargaMobil] = useState<number>(410000000);
  const [dpPersen, setDpPersen] = useState<number>(20);
  const [activeTab, setActiveTab] = useState<string>('maybank');
  const [calculationKey, setCalculationKey] = useState<number>(0);
  const [showTdpBreakdown, setShowTdpBreakdown] = useState<boolean>(false);

  // Enhanced leasing options data dengan semua biaya
  const leasingOptions: LeasingOption[] = [
    {
      id: 'maybank',
      name: 'Maybank Finance',
      logo: '/logo-maybank.png',
      minTenor: 11,
      maxTenor: 59,
      tenorStep: 12,
      minBunga: 3.5,
      maxBunga: 8.5,
      defaultBunga: 5.5,
      tenorType: 'monthly',
      features: ['Proses Cepat', 'Bunga Kompetitif', 'Tenor Fleksibel'],
      provisi: 1.5,
      administrasi: 1500000,
      asuransiPersen: 5.0,
      polisAsuransi: 150000
    },
    {
      id: 'dipo',
      name: 'DIPO Finance',
      logo: '/logo-dipo.png',
      minTenor: 11,
      maxTenor: 47,
      tenorStep: 12,
      minBunga: 4.0,
      maxBunga: 9.0,
      defaultBunga: 6.0,
      tenorType: 'monthly',
      features: ['DP Ringan', 'Approval Mudah', 'Jaringan Luas'],
      provisi: 1.2,
      administrasi: 1250000,
      asuransiPersen: 4.5,
      polisAsuransi: 125000
    },
    {
      id: 'mandiri',
      name: 'Mandiri Tunas Finance',
      logo: '/logo-mtf.jpg',
      minTenor: 11,
      maxTenor: 59,
      tenorStep: 12,
      minBunga: 4.5,
      maxBunga: 8.0,
      defaultBunga: 5.8,
      tenorType: 'monthly',
      features: ['Bunga Fixed', 'Asuransi Lengkap', 'Pelayanan Premium'],
      provisi: 1.8,
      administrasi: 1750000,
      asuransiPersen: 5.5,
      polisAsuransi: 175000
    },
    {
      id: 'special',
      name: 'Simulation',
      logo: '/logo-adira.png',
      minTenor: 11,
      maxTenor: 59,
      tenorStep: 12,
      minBunga: 6.0,
      maxBunga: 8.0,
      defaultBunga: 6.6,
      tenorType: 'monthly',
      features: ['Online Approval', 'Cashback', 'Promo Spesial'],
      provisi: 0.26,
      administrasi: 843000,
      asuransiPersen: 0.65,
      polisAsuransi: 150000
    }
  ];

  // Get current leasing option
  const currentLeasing = leasingOptions.find(option => option.id === activeTab) || leasingOptions[0];
  
  // Loan calculation state
  const [tenor, setTenor] = useState<number>(currentLeasing.minTenor);
  const [bunga, setBunga] = useState<number>(currentLeasing.defaultBunga);

  // Calculation function dengan semua komponen TDP
  const calculateLoan = useCallback(() => {
    // Calculate DP amount
    const dp = (hargaMobil * dpPersen) / 100;
    
    // Calculate loan principal
    const pokok = hargaMobil - dp;
    
    // Calculate semua biaya tambahan
    const provisi = (pokok * currentLeasing.provisi) / 100;
    const administrasi = currentLeasing.administrasi;
    const asuransi = (hargaMobil * currentLeasing.asuransiPersen) / 100;
    const polis = currentLeasing.polisAsuransi;
    
    // ADDM System calculation
    const bulanCicilan = tenor;
    const monthlyRate = (bunga / 100) / 12;
    
    // Calculate monthly payment menggunakan annuity formula
    let cicilanPerBulan = 0;
    if (monthlyRate > 0) {
      cicilanPerBulan = (pokok * monthlyRate * Math.pow(1 + monthlyRate, bulanCicilan)) / 
                       (Math.pow(1 + monthlyRate, bulanCicilan) - 1);
    } else {
      cicilanPerBulan = pokok / bulanCicilan;
    }
    
    const totalBungaAmount = (cicilanPerBulan * bulanCicilan) - pokok;
    
    // TDP LENGKAP dengan semua komponen
    const tdp = dp + cicilanPerBulan + asuransi + provisi + polis + administrasi;
    
    // Total pembayaran: TDP + sisa cicilan (n-1 bulan karena cicilan pertama sudah di TDP)
    const totalPembayaran = tdp + (cicilanPerBulan * (bulanCicilan - 1));

    return {
      dpAmount: dp,
      pokokPinjaman: pokok,
      biayaProvisi: provisi,
      biayaAdministrasi: administrasi,
      biayaAsuransi: asuransi,
      polisAsuransi: polis,
      cicilanPertama: cicilanPerBulan,
      cicilanBulanan: cicilanPerBulan,
      tdpAmount: tdp,
      totalBunga: totalBungaAmount,
      totalPembayaran: totalPembayaran
    };
  }, [hargaMobil, dpPersen, tenor, bunga, currentLeasing]);

  // Calculate results
  const results = calculateLoan();

  // Predefined car prices
  const carPrices = [
    { name: 'Xpander GLS', price: 285000000 },
    { name: 'Xpander Ultimate', price: 330000000 },
    { name: 'Xpander Cross', price: 360000000 },
    { name: 'Xforce Ultimate', price: 410000000 },
    { name: 'Triton Exceed', price: 460000000 },
    { name: 'Pajero Sport', price: 645000000 }
  ];

  // Format currency
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Generate WhatsApp message dengan detail lengkap
  const generateWhatsAppLink = () => {
    const tenorTahun = Math.floor(tenor / 12);
    const tenorBulan = tenor % 12;
    let tenorText = '';
    
    if (tenorTahun > 0 && tenorBulan > 0) {
      tenorText = `${tenorTahun} tahun ${tenorBulan} bulan`;
    } else if (tenorTahun > 0) {
      tenorText = `${tenorTahun} tahun`;
    } else {
      tenorText = `${tenorBulan} bulan`;
    }

    const pesan = `Halo Bosowa Dealership, saya tertarik dengan simulasi kredit mobil:

🏢 Leasing: ${currentLeasing.name}
🚗 Harga Mobil: ${formatRupiah(hargaMobil)}
💰 Uang Muka: ${dpPersen}% (${formatRupiah(results.dpAmount)})
💵 Total DP (TDP): ${formatRupiah(results.tdpAmount)}
📝 Pokok Pinjaman: ${formatRupiah(results.pokokPinjaman)}
⏰ Tenor: ${tenor} bulan (${tenorText})
📈 Bunga: ${bunga}% per tahun
💳 Estimasi Cicilan: ${formatRupiah(results.cicilanBulanan)}/bulan
🎯 Total Pembayaran: ${formatRupiah(results.totalPembayaran)}

*Breakdown TDP:*
• Uang Muka: ${formatRupiah(results.dpAmount)}
• Cicilan Pertama: ${formatRupiah(results.cicilanPertama)}
• Biaya Asuransi: ${formatRupiah(results.biayaAsuransi)}
• Biaya Provisi: ${formatRupiah(results.biayaProvisi)}
• Polis Asuransi: ${formatRupiah(results.polisAsuransi)}
• Biaya Administrasi: ${formatRupiah(results.biayaAdministrasi)}

Mohon informasi lebih lanjut untuk pengajuan kredit. Terima kasih!`;

    const nomor = "6282343057060";
    return `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  };

  // Handle leasing change
  const handleLeasingChange = (id: string) => {
    setActiveTab(id);
    const newLeasing = leasingOptions.find(option => option.id === id);
    if (newLeasing) {
      setTenor(newLeasing.minTenor);
      setBunga(newLeasing.defaultBunga);
    }
    setCalculationKey(prev => prev + 1);
  };

  // Reset calculator
  const resetCalculator = () => {
    setHargaMobil(410000000);
    setDpPersen(20);
    setTenor(currentLeasing.minTenor);
    setBunga(currentLeasing.defaultBunga);
    setCalculationKey(prev => prev + 1);
  };

  // Get tenor display text
  const getTenorDisplay = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} Thn ${remainingMonths} Bln`;
    } else if (years > 0) {
      return `${years} Tahun`;
    } else {
      return `${months} Bulan`;
    }
  };

  return (
    <section id="hitung-cicilan" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" key={calculationKey}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simulasi <span className="text-blue-600 dark:text-blue-400">Kredit</span> Mobil
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Hitung cicilan mobil impian Anda dengan sistem ADDM dan TDP lengkap
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Kalkulator Section */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Header dengan Quick Car Selection */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kalkulator Pembiayaan</h3>
                    <p className="text-blue-100 text-sm">Pilih mobil dan atur pembiayaan sesuai kebutuhan</p>
                  </div>
                  <button
                    onClick={resetCalculator}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaSyncAlt className="w-4 h-4" />
                    Reset
                  </button>
                </div>
                
                {/* Quick Car Selection */}
                <div className="mt-4">
                  <label className="text-white text-sm font-medium mb-2 block">Pilih Model Mobil:</label>
                  <div className="flex flex-wrap gap-2">
                    {carPrices.map((car, index) => (
                      <button
                        key={index}
                        onClick={() => setHargaMobil(car.price)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          hargaMobil === car.price
                            ? 'bg-white text-blue-600 shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {car.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Leasing Selection */}
                <div className="mb-8">
                  <label className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Pilih Leasing Partner
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {leasingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleLeasingChange(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          activeTab === option.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-8 mb-2 flex items-center justify-center">
                            {option.logo ? (
                              <Image
                                src={option.logo}
                                alt={option.name}
                                width={48}
                                height={32}
                                className="h-full object-contain"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            )}
                          </div>
                          <span className={`text-xs font-medium ${
                            activeTab === option.id 
                              ? 'text-blue-700 dark:text-blue-400' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {option.name.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Sections */}
                <div className="space-y-6">
                  {/* Harga Mobil */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                    <label className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                      <FaMoneyBillWave className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Harga Mobil
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="100000000"
                        max="1000000000"
                        step="1000000"
                        value={hargaMobil}
                        onChange={(e) => setHargaMobil(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Rp 100jt</span>
                        <span>Rp 1M</span>
                      </div>
                      <input
                        type="text"
                        value={formatRupiah(hargaMobil)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value) setHargaMobil(parseInt(value, 10));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-center font-bold text-lg"
                      />
                    </div>
                  </div>

                  {/* Uang Muka */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                    <label className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                      <FaPercentage className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Uang Muka (DP) - {dpPersen}%
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="10"
                        max="50"
                        value={dpPersen}
                        onChange={(e) => setDpPersen(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>10%</span>
                        <span>50%</span>
                      </div>
                      <input
                        type="text"
                        value={formatRupiah(results.dpAmount)}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white text-center font-semibold"
                      />
                    </div>
                  </div>

                  {/* Tenor dan Bunga dalam grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tenor */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                      <label className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                        <FaCalendarAlt className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Tenor - {getTenorDisplay(tenor)}
                      </label>
                      <div className="space-y-3">
                        <input
                          type="range"
                          min={currentLeasing.minTenor}
                          max={currentLeasing.maxTenor}
                          step={currentLeasing.tenorStep}
                          value={tenor}
                          onChange={(e) => setTenor(parseInt(e.target.value, 10))}
                          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-blue"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>{getTenorDisplay(currentLeasing.minTenor)}</span>
                          <span>{getTenorDisplay(currentLeasing.maxTenor)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bunga */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                      <label className="flex items-center text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Bunga - {bunga}% p.a.
                      </label>
                      <div className="space-y-3">
                        <input
                          type="range"
                          min={currentLeasing.minBunga}
                          max={currentLeasing.maxBunga}
                          step="0.1"
                          value={bunga}
                          onChange={(e) => setBunga(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-blue"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>{currentLeasing.minBunga}%</span>
                          <span>{currentLeasing.maxBunga}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hasil Kalkulasi - DENGAN SEMUA KOMPONEN TDP */}
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 rounded-2xl shadow-2xl">
                {/* Header Result */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    {currentLeasing.logo && (
                      <div className="w-12 h-8 bg-white rounded p-1">
                        <Image 
                          src={currentLeasing.logo}
                          alt={currentLeasing.name}
                          width={48}
                          height={32}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white">{currentLeasing.name}</h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {currentLeasing.features.map((feature, index) => (
                      <span key={index} className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Calculation Results */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-blue-100">Harga Mobil</span>
                    <span className="font-bold text-white text-right">{formatRupiah(hargaMobil)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-blue-400/30">
                    <span className="font-medium text-blue-100">Uang Muka ({dpPersen}%)</span>
                    <span className="font-bold text-white text-right">{formatRupiah(results.dpAmount)}</span>
                  </div>

                  {/* TDP Section LENGKAP */}
                  <div className="bg-white/10 rounded-lg p-3 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-100 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Total DP (TDP)
                      </span>
                      <span className="font-bold text-white text-lg">{formatRupiah(results.tdpAmount)}</span>
                    </div>
                    
                    <button
                      onClick={() => setShowTdpBreakdown(!showTdpBreakdown)}
                      className="w-full text-left text-xs text-blue-200 hover:text-blue-100 transition-colors flex items-center justify-between"
                    >
                      <span>Lihat detail komponen TDP</span>
                      <span>{showTdpBreakdown ? '▲' : '▼'}</span>
                    </button>

                    {showTdpBreakdown && (
                      <div className="mt-3 text-xs text-blue-200 space-y-2 border-t border-blue-400/30 pt-2">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <FaMoneyBillWave className="w-3 h-3" />
                            Uang Muka
                          </span>
                          <span>{formatRupiah(results.dpAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="w-3 h-3" />
                            Cicilan Pertama
                          </span>
                          <span>{formatRupiah(results.cicilanPertama)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <FaShieldAlt className="w-3 h-3" />
                            Biaya Asuransi ({currentLeasing.asuransiPersen}%)
                          </span>
                          <span>{formatRupiah(results.biayaAsuransi)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            Biaya Provisi ({currentLeasing.provisi}%)
                          </span>
                          <span>{formatRupiah(results.biayaProvisi)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <FaFileContract className="w-3 h-3" />
                            Polis Asuransi
                          </span>
                          <span>{formatRupiah(results.polisAsuransi)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            Biaya Administrasi
                          </span>
                          <span>{formatRupiah(results.biayaAdministrasi)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-blue-100">Pokok Pinjaman</span>
                    <span className="font-bold text-white text-right">{formatRupiah(results.pokokPinjaman)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-blue-400/30">
                    <span className="font-medium text-blue-100">Total Bunga</span>
                    <span className="font-bold text-white text-right">{formatRupiah(results.totalBunga)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-blue-100">Total Pembayaran</span>
                    <span className="font-bold text-white text-right">{formatRupiah(results.totalPembayaran)}</span>
                  </div>
                </div>

                {/* Monthly Installment Highlight */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <div className="text-center">
                    <p className="text-sm text-blue-100 mb-2">Estimasi Cicilan Per Bulan</p>
                    <p className="text-2xl font-extrabold text-white mb-1">{formatRupiah(results.cicilanBulanan)}</p>
                    <p className="text-xs text-blue-200">
                      untuk {tenor - 1} bulan (setelah cicilan pertama)<br />
                      <span className="text-xs text-blue-300">*Sistem ADDM: {tenor} bulan cicilan</span>
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 mt-4 shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Ajukan Kredit via WhatsApp
                </a>
              </div>

              {/* Info Box */}
              <div className="mt-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">
                      Sistem ADDM & TDP Lengkap
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">
                      • TDP termasuk: DP + Cicilan Pertama + Asuransi + Provisi + Polis + Administrasi<br/>
                      • Cicilan bulan 2-{tenor}: {formatRupiah(results.cicilanBulanan)}/bulan<br/>
                      • Total {tenor} bulan cicilan dengan sistem ADDM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-3xl mx-auto">
            * Simulasi ini menggunakan sistem ADDM dengan perhitungan TDP lengkap. 
            Perhitungan adalah estimasi dan dapat berubah sesuai kebijakan leasing dan hasil analisis kredit.
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button for Mobile */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 md:hidden"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      <style jsx>{`
        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider-blue::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default CicilanCalculator;