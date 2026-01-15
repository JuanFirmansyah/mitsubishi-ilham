'use client'

import { FiArrowLeft, FiSave } from 'react-icons/fi'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Customer {
  _id: string
  name: string
  email: string
  phone: string
}

export default function EditCustomerPage() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState<Customer>({
    _id: '',
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:3000/customers/${id}`)
        if (!response.ok) {
          throw new Error('Customer not found')
        }
        const data = await response.json()
        setFormData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch customer')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      router.push('/admin/customers')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update customer')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-2xl mx-auto">
          <p>{error}</p>
          <Link 
            href="/admin/customers"
            className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FiArrowLeft className="mr-1" /> Back to Customers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Customer</h1>
        <Link 
          href="/admin/customers"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft /> Back to Customers
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {loading ? 'Saving...' : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}