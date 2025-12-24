'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { projects2025 } from '@/lib/projects'
import Link from 'next/link'

// ... (Imports)

// Helper for Category Icons
const getCategoryIcon = (category: string) => {
  if (category.includes('Water')) return 'water_drop'
  if (category.includes('Electricity') || category.includes('Lighting') || category.includes('Infrastructure')) return 'bolt'
  if (category.includes('Education')) return 'school'
  if (category.includes('Agriculture') || category.includes('Food')) return 'agriculture'
  if (category.includes('Youth') || category.includes('Women') || category.includes('Empowerment')) return 'diversity_3'
  if (category.includes('Community') || category.includes('Health') || category.includes('Support')) return 'volunteer_activism'
  if (category.includes('Legislative')) return 'gavel'
  if (category.includes('Construction')) return 'engineering'
  return 'category'
}

// Category Colors for Badges (Updated to Red Theme mostly)
const getCategoryColor = (category: string) => {
  if (category.includes('Water')) return 'bg-blue-100 text-blue-700 border-blue-200'
  if (category.includes('Electricity') || category.includes('Lighting') || category.includes('Infrastructure')) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  if (category.includes('Education')) return 'bg-indigo-100 text-indigo-700 border-indigo-200'
  if (category.includes('Agriculture') || category.includes('Food')) return 'bg-green-100 text-green-700 border-green-200'
  if (category.includes('Youth') || category.includes('Women') || category.includes('Empowerment')) return 'bg-pink-100 text-pink-700 border-pink-200'
  if (category.includes('Community') || category.includes('Health') || category.includes('Support')) return 'bg-red-100 text-red-700 border-red-200'
  if (category.includes('Legislative')) return 'bg-purple-100 text-purple-700 border-purple-200'
  if (category.includes('Construction')) return 'bg-orange-100 text-orange-700 border-orange-200'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

// Helper for Share Links
// const shareUrl = typeof window !== 'undefined' ? window.location.href : '' // Removed to fix hydration mismatch

export default function ProjectsPage() {
  const [lang, setLang] = useState<'en' | 'ha'>('en')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [shareUrl, setShareUrl] = useState('') // Hydration-safe share URL

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])
  
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ha' : 'en')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Link copied to clipboard!')
  }

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects2025.map(p => p.category))
    return ['All', ...Array.from(cats)]
  }, [])

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return projects2025.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const searchContent = `${project.titleEN} ${project.titleHA} ${project.desc}`.toLowerCase()
      const matchesSearch = searchContent.includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-red-100 selection:text-red-800">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200 drop-shadow-sm">
            {lang === 'en' ? 'Transforming Our Community' : 'Canza Al\'ummarmu'}
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {lang === 'en' 
              ? 'Explore the impactful projects and initiatives delivering real change to Gaya, Ajingi, and Albasu.' 
              : 'Bincika muhimman ayyuka da tsare-tsaren da ke kawo sauyi na hakika ga Gaya, Ajingi, da Albasu.'}
          </p>
          
          <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            <button 
              onClick={toggleLang}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${lang === 'en' ? 'bg-white text-red-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
            >
              English
            </button>
            <button 
              onClick={toggleLang}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${lang === 'ha' ? 'bg-white text-red-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
            >
              Hausa
            </button>
          </div>
        </div>
      </div>

      {/* Controls Section (Sticky) */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          
          {/* Category Filter (Horizontal Scroll on Mobile) */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar mask-linear-fade">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat 
                    ? 'bg-red-700 text-white border-red-700 shadow-md ring-2 ring-red-200 ring-offset-1' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="text"
              placeholder={lang === 'en' ? "Search projects..." : "Nemi ayyuka..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-12">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('')}}
              className="mt-6 text-red-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  {project.photos && project.photos.length > 0 ? (
                    <div className={`grid h-full w-full ${project.photos.length > 1 ? 'grid-rows-2 md:grid-rows-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                      {project.photos.slice(0, 2).map((photo, pIndex) => (
                        <div key={pIndex} className="relative h-full w-full border-b md:border-b-0 md:border-l first:border-0 border-white/20">
                           <Image
                            src={photo}
                            alt={`${project.titleEN} - Image ${pIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {pIndex === 1 && project.photos.length > 2 && (
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                               +{project.photos.length - 2}
                             </div>
                          )}
                        </div>
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-red-50/50 transition-colors">
                      <span className="material-symbols-outlined text-6xl text-gray-300 mb-2 group-hover:text-red-300 transition-colors">
                        {getCategoryIcon(project.category)}
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm border backdrop-blur-md ${getCategoryColor(project.category)}`}>
                      <span className="material-symbols-outlined text-[14px]">{getCategoryIcon(project.category)}</span>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-400 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[16px] text-red-600">calendar_today</span>
                    {project.date}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-700 transition-colors">
                    {lang === 'en' ? project.titleEN : project.titleHA}
                  </h3>

                  <div className="w-12 h-1 bg-red-100 rounded-full mb-4 group-hover:w-20 group-hover:bg-red-500 transition-all duration-300"></div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                    {project.desc}
                  </p>

                  {/* Share Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Share Project</span>
                    
                    <div className="flex items-center gap-2">
                       <a 
                        href={`https://wa.me/?text=${encodeURIComponent(`Check out this project by Hon. Ghali Panda: ${lang === 'en' ? project.titleEN : project.titleHA} - ${shareUrl}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 mx-1"
                        title="Share on WhatsApp"
                      >
                        <i className="fab fa-whatsapp"></i>
                      </a>
                      
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${lang === 'en' ? project.titleEN : project.titleHA} via @GhaliPanda`)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 mx-1"
                        title="Share on X"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>

                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 mx-1"
                        title="Share on Facebook"
                      >
                        <i className="fab fa-facebook-f text-sm"></i>
                      </a>
                      
                      <button
                        onClick={() => copyToClipboard(`${lang === 'en' ? project.titleEN : project.titleHA}\n${project.desc}\n${shareUrl}`)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-700 hover:text-white transition-all duration-300 mx-1"
                        title="Copy Link"
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Call to Action Footer */}
        <div className="mt-20 relative rounded-3xl overflow-hidden bg-red-900 text-white text-center py-16 px-6">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
             <span className="material-symbols-outlined text-6xl mb-4 text-red-300">volunteer_activism</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {lang === 'en' ? 'Have an Idea for Your Community?' : 'Kuna da Shawara ga Al\'ummarku?'}
             </h2>
             <p className="text-red-100 mb-8 text-lg">
                {lang === 'en' 
                    ? "We are listening. Suggest a project or report an issue in your area."
                    : "Muna sauraro. Ba da shawarar aiki ko kawo kuka game da matsalar yankinku."}
             </p>
             <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-white text-red-900 px-8 py-4 rounded-full font-bold hover:bg-red-50 hover:scale-105 transition-all shadow-xl"
            >
                {lang === 'en' ? 'Contact Us Today' : 'Tuntube Mu Yau'}
                <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
