'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { news } from '@/lib/news'

interface NewsItem {
  _id: string
  title: string
  content: string
  category: string
  imageUrl?: string
  publishDate: string
}


export default function NewsPage() {
  // Use static data directly
  // const [news, setNews] = useState<NewsItem[]>([])
  const loading = false

  // useEffect removed as we are using static data

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'Community Engagement': 'bg-green-100 text-green-800',
      'Political': 'bg-blue-100 text-blue-800',
      'Social Welfare': 'bg-purple-100 text-purple-800',
      'Infrastructure': 'bg-orange-100 text-orange-800',
      'Education': 'bg-pink-100 text-pink-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Latest News & Updates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Stay informed about the latest developments, initiatives, and community updates from
            Hon. Dr. Ghali Mustapha Tijjani Phanda's office.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-2xl">article</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No news found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('')}}
                className="mt-4 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
                          article
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {item.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <span className="material-symbols-outlined text-white text-4xl">
                            play_arrow
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/news/${item._id}`}
                        className="text-green-700 dark:text-green-400 font-semibold hover:underline flex items-center gap-1 group"
                      >
                        Read More
                        <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </Link>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => shareArticle(item)}
                          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          title="Share"
                        >
                          <span className="material-symbols-outlined">share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-800 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="material-symbols-outlined text-5xl mb-4 text-green-300">email</span>
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important updates, events, and community news.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-3 bg-white text-green-800 font-bold rounded-lg hover:bg-green-50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <Link
              href="#"
              className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            
            <div className="flex items-center space-x-1">
              <Link
                href="#"
                className="px-4 py-2 rounded-md bg-green-700 text-white font-medium"
              >
                1
              </Link>
              <Link
                href="#"
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                2
              </Link>
              <Link
                href="#"
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                3
              </Link>
              <span className="px-2 py-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
              <Link
                href="#"
                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                10
              </Link>
            </div>
            
            <Link
              href="#"
              className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
