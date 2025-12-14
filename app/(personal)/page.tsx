'use client'

import {HomePage} from '@/components/HomePage'
import {MediaGallery, mediaData} from '@/components/MediaGallery'
import {ContactSection} from '@/components/ContactSection'
import {useState, useEffect} from 'react'
import Link from 'next/link'

import {projects} from '@/lib/data'

export default function IndexRoute() {
  const [news, setNews] = useState<any[]>([
    {
      _id: '1',
      title: 'Senate Committee on Finance: Reviewing Fiscal Policy',
      category: 'Legislative',
      imageUrl: '/suleiman-action.jpg',
      excerpt: 'Hon. Suleiman Kwari leads discussions on the new fiscal policy to ensure economic stability.',
      createdAt: '2023-01-15',
    },
    {
      _id: '2',
      title: 'Empowering Kaduna North: Scholarship Distribution',
      category: 'Education',
      imageUrl: '/schorlaship.jpg',
      excerpt: 'Over 500 students received scholarships to pursue higher education in various fields.',
      createdAt: '2022-11-20',
    },
    {
      _id: '3',
      title: 'Commissioning of Solar Boreholes in Zaria',
      category: 'Infrastructure',
      imageUrl: '/borehole.jpg',
      excerpt: 'Providing clean drinking water to remote communities through solar-powered boreholes.',
      createdAt: '2022-09-10',
    },
  ])
  // const [projects, setProjects] = useState<any[]>([]) // Using imported data directly
  const [loading, setLoading] = useState(false)

  // useEffect removed as we are using static data

  const mockData = {
    title: 'Hon. Suleiman Abdu Kwari',
  }

  return (
    <div>
      <HomePage data={mockData} />

      {/* Featured Projects Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              OUR INITIATIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              Transforming Communities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Empowering lives through dedicated projects and programs across our constituencies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full text-xs font-semibold">
                        {project.category || 'Community Project'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {project.titleEN}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{new Date(project.date).getFullYear()}</span>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                      >
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-green-700 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 text-base sm:text-base touch-manipulation"
            >
              <span>View All Projects</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              LATEST UPDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
              News & Announcements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Stay informed with the latest developments and community updates
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <Link key={index} href={`/news/${item._id}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">
                    <div className="h-56 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-6xl">
                            article
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-xs font-semibold">
                          {item.category || 'News'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className="group-hover:text-blue-700 transition-colors font-medium">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 text-base sm:text-base touch-manipulation"
            >
              <span>View All News</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-700 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Making a Real Difference
            </h2>
            <p className="text-green-100 text-base sm:text-lg max-w-3xl mx-auto">
              Through dedicated service and community-focused initiatives, we're creating lasting
              positive change
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold mb-2">50K+</div>
              <div className="text-green-200 text-sm md:text-base">Lives Impacted</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold mb-2">60+</div>
              <div className="text-green-200 text-sm md:text-base">Projects Delivered</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold mb-2">8</div>
              <div className="text-green-200 text-sm md:text-base">LGAs Served</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-5xl md:text-6xl font-bold mb-2">4</div>
              <div className="text-green-200 text-sm md:text-base">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      <MediaGallery items={mediaData} />
      <ContactSection />
    </div>
  )
}
