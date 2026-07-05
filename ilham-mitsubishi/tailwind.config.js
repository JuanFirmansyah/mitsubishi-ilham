module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Jika menggunakan App Router
    './src/**/*.{js,ts,jsx,tsx}', // Scan semua file dalam src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
