'use client'

import {
  constituencyData as staticConstituencyData,
  initiatives as staticInitiatives,
  visionContent as staticVisionContent,
} from '@/lib/data'
import {useState} from 'react'
import Link from 'next/link'

interface Initiative {
  id: number
  title: string
  description: string
  icon: string
}

interface ConstituencyData {
  name: string
  representative: string
  party: string
  electionYear: string
  communities: string[]
  population: string
}

// ... (imports same)
// ... interfaces same

export default function ConstituencyPage() {
  const [constituencyData] = useState<ConstituencyData>(staticConstituencyData)
  const [initiatives] = useState<Initiative[]>(staticInitiatives)
  const [visionContent] = useState(staticVisionContent)
  // const [loading, setLoading] = useState(true) // Removed loading state
  const loading = false

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="bg-red-900/90 dark:bg-red-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            Constituency Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-red-100">
            Serving the people of Gaya, Ajingi & Albasu Federal Constituency with dedication and integrity
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Our Constituency
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  The {constituencyData.name} is represented in the House of Representatives by
                  {constituencyData.representative}, who was elected in{' '}
                  {constituencyData.electionYear} on the platform of the {constituencyData.party}.
                </p>
                <p className="mb-4">
                  Our constituency is home to hundreds of thousands of residents across{' '}
                  {constituencyData.communities.length} distinct communities, each
                  with its own unique cultural heritage and economic characteristics.{' '}
                  Dr. Ghali's representation focuses on addressing the
                  specific needs of these communities while advocating for policies that benefit all
                  Nigerians.
                </p>
                <p className="mb-6">
                  Since taking office, Dr. Ghali has championed initiatives that
                  focus on economic empowerment, infrastructure development, and improving access to
                  essential services. His legislative work emphasizes reducing dependency on
                  imports, improving transportation networks, and supporting local manufacturing to
                  create jobs and reduce the cost of living.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Key Policy Focus Areas
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Reducing import barriers to make essential goods more affordable</li>
                  <li>Improving transportation infrastructure to reduce costs</li>
                  <li>Supporting local manufacturing and entrepreneurship</li>
                  <li>Expanding access to healthcare and education</li>
                  <li>Creating employment opportunities for youth and women</li>
                </ul>

                <div className="bg-red-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <blockquote className="text-lg italic text-gray-900 dark:text-white">
                    "My representation is anchored in empowering youth, women, and families across
                    our constituency—delivering vital support such as food aid, education
                    infrastructure, and economic-opportunity programmes."
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Constituency Facts
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      location_on
                    </span>
                    <span>
                      <strong>Communities:</strong> {constituencyData.communities.join(', ')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">groups</span>
                    <span>
                      <strong>Population:</strong> {constituencyData.population}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">badge</span>
                    <span>
                      <strong>Representative:</strong> {constituencyData.representative}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">
                      calendar_today
                    </span>
                    <span>
                      <strong>Elected:</strong> {constituencyData.electionYear}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-symbols-outlined text-gold-400 mr-2">flag</span>
                    <span>
                      <strong>Party:</strong> {constituencyData.party}
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-block w-full text-center bg-red-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-800 transition duration-300"
                  >
                    Contact Our Office
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Initiatives
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Programs and policies championed by Hon. Dr. Ghali Mustapha Tijjani Panda for our
              constituency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-red-700"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
                    <span className="material-symbols-outlined text-red-700 dark:text-red-400">
                      {initiative.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {initiative.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-red-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Vision for the Future
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto">
                <p className="mb-4">{visionContent}</p>
                <Link
                  href="/legislative"
                  className="inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition duration-300 transform hover:scale-105"
                >
                  Learn About Legislative Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
