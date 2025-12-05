'use client'

import { useState } from 'react'
import { projects } from '@/lib/data'

const categories = [
  'All',
  'Infrastructure',
  'Education',
  'Health',
  'Water',
  'Youth Empowerment',
  'Legislative'
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            OUR ACHIEVEMENTS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Projects & Legislative Impact
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A comprehensive list of projects delivered by Hon. Suleiman Abdu Kwari across Kaduna North Senatorial District (2019–2023).
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-green-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    project.category === 'Legislative' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {project.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {project.titleEN}
                </h3>
                <h4 className="text-sm font-medium text-green-700 mb-4 italic">
                  {project.titleHA}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.shortDesc}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{project.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Impact: {project.impact}</span>
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <a
                  href={`https://wa.me/?text=Hon.%20Suleiman%20Kwari%20delivered%20${encodeURIComponent(project.titleEN)}!%20See%20details%20%26%20more%20projects:%20https://suleimankwari.vercel.app/projects`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Checklist Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-green-800 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">fact_check</span>
              Project Verification Checklist
            </h2>
            <p className="text-green-100 mt-2">
              Detailed tracking of project status, verification IDs, and beneficiary confirmation.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-700 text-sm">ID</th>
                  <th className="p-4 font-bold text-gray-700 text-sm">Project Title</th>
                  <th className="p-4 font-bold text-gray-700 text-sm hidden sm:table-cell">Category</th>
                  <th className="p-4 font-bold text-gray-700 text-sm hidden md:table-cell">Beneficiaries</th>
                  <th className="p-4 font-bold text-gray-700 text-sm">Status</th>
                  <th className="p-4 font-bold text-gray-700 text-sm">Verify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 font-mono">#{project.id.toString().padStart(3, '0')}</td>
                    <td className="p-4 text-sm font-medium text-gray-900">
                      <div>{project.titleEN}</div>
                      <div className="text-xs text-gray-500 sm:hidden">{project.location}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden sm:table-cell">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded-md text-xs">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">{project.impact}</td>
                    <td className="p-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Verified
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <button className="text-green-700 hover:text-green-900 font-medium text-xs border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all">
                        View Proof
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-center">
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-700 font-medium transition-colors">
              <span className="material-symbols-outlined">print</span>
              <span>Print Verification Report</span>
            </button>
          </div>
        </div>

        {/* Global Share Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <a
            href="https://wa.me/?text=Check%20out%20Hon.%20Suleiman%20Kwari's%20legacy%20projects:%20https://suleimankwari.vercel.app/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            title="Share Website"
          >
            <i className="fab fa-whatsapp text-3xl"></i>
          </a>
        </div>

      </div>
    </div>
  )
}
