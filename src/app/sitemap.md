// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mitsubishiwithjuan.com'
  
  // Tanggal update (bisa dinamis nanti)
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/kontak`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}