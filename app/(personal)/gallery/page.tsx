'use client'

import Image from 'next/image'

const galleryItems = [
  {
    id: 1,
    title: 'Solar Borehole Installation',
    category: 'Water & Sanitation',
    image: '/ghaliphoto.jpg', // Placeholder
    description: 'Commissioning of 20 Solar-Powered Boreholes across Gaya, Ajingi, and Albasu. Ensuring clean water access for our communities.'
  },
  {
    id: 2,
    title: 'Fertilizer Distribution',
    category: 'Agriculture',
    image: '/ghaliphoto.jpg', // Placeholder
    description: 'Distribution of 1,800 bags of fertilizer to support our hardworking farmers for a bumper harvest.'
  },
  {
    id: 3,
    title: 'Motorcycle Empowerment',
    category: 'Youth Empowerment',
    image: '/ghaliphoto.jpg', // Placeholder
    description: 'Empowering youth with motorcycles to create self-sustaining businesses and improve local transportation.'
  },
  {
    id: 4,
    title: 'School Construction Projects',
    category: 'Education',
    image: '/ghaliphoto.jpg', // Placeholder
    description: 'Ongoing improved classroom blocks and new primary schools to provide a conducive learning environment.'
  },
  {
    id: 5,
    title: 'Streetlight Commissioning',
    category: 'Infrastructure',
    image: '/ghaliphoto.jpg', // Placeholder
    description: 'Lighting up our streets for safety and commerce with new solar streetlights in Gaya and environs.'
  }
]

export default function GalleryPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-red-900/90 dark:bg-red-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Media Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-red-100">
            Capturing the impact of our interventions across Gaya, Ajingi, and Albasu.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-sm mb-2">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
