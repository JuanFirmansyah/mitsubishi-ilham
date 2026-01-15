'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiTruck, FiDollarSign, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Types
interface Customer {
  _id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  vin: string
  price: number
  status: 'available' | 'sold' | 'maintenance'
  customerId?: string
}

const AdminDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [activeTab, setActiveTab] = useState('dashboard')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Simulate API calls
        const [customersRes, vehiclesRes] = await Promise.all([
          fetch('http://localhost:3000/customers'),
          fetch('http://localhost:3000/vehicles')
        ])
        
        const customersData = await customersRes.json()
        const vehiclesData = await vehiclesRes.json()
        
        setCustomers(customersData)
        setVehicles(vehiclesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiPieChart /> },
    { id: 'customers', label: 'Customers', icon: <FiUser /> },
    { id: 'vehicles', label: 'Vehicles', icon: <FiTruck /> },
    { id: 'sales', label: 'Sales', icon: <FiDollarSign /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ]

  // Stats data
  const stats = [
    { title: 'Total Vehicles', value: vehicles.length, change: '+12%' },
    { title: 'Available', value: vehicles.filter(v => v.status === 'available').length, change: '+5%' },
    { title: 'Sold', value: vehicles.filter(v => v.status === 'sold').length, change: '+8%' },
    { title: 'Customers', value: customers.length, change: '+15%' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        onClick={() => setMobileMenuOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <FiTruck className="text-indigo-600" size={24} />
                  <span className="text-xl font-bold">Bosowa Auto</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <FiX size={24} />
                </button>
              </div>

              <nav className="flex-1">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/admin/${item.id}`}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname.includes(item.id) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto">
                <button className="flex items-center w-full px-4 py-3 text-red-500 rounded-lg hover:bg-red-50">
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow">
        <div className="flex items-center justify-center h-16 px-4 border-b">
          <div className="flex items-center space-x-2">
            <FiTruck className="text-indigo-600" size={24} />
            <span className="text-xl font-bold">Bosowa Auto</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/${item.id}`}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname.includes(item.id) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center w-full px-4 py-3 text-red-500 rounded-lg hover:bg-red-50">
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold">
              {navItems.find(item => pathname.includes(item.id))?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search..."
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">AD</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
            {loading ? (
              <div className="text-center text-gray-500">Loading data...</div>
            ) : (
              <>
                {/* konten dashboard seperti sekarang */}
              </>
            )}
          {pathname.includes('dashboard') && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                      </div>
                      <div className="px-2 py-1 bg-green-50 rounded-md">
                        <p className="text-sm font-medium text-green-600">{stat.change}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {vehicles.slice(0, 5).map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                      <div className="p-2 rounded-full bg-indigo-50 mr-4">
                        <FiTruck className="text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                        <p className="text-sm text-gray-500">VIN: {vehicle.vin}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${vehicle.price.toLocaleString()}</p>
                        <p className={`text-xs px-2 py-1 rounded-full ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : vehicle.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {vehicle.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {pathname.includes('customers') && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Customers</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Add Customer
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">
                                {customer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pathname.includes('vehicles') && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Vehicle Inventory</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Add Vehicle
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {vehicles.map((vehicle) => (
                    <motion.div
                      key={vehicle.id}
                      whileHover={{ y: -5 }}
                      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-100 flex items-center justify-center">
                        <FiTruck className="text-gray-400" size={64} />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{vehicle.make} {vehicle.model}</h3>
                            <p className="text-gray-500">{vehicle.year}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : vehicle.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between">
                            <span className="text-gray-500">VIN</span>
                            <span className="font-medium">{vehicle.vin}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-500">Price</span>
                            <span className="font-medium text-indigo-600">${vehicle.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                            Edit
                          </button>
                          <button className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard