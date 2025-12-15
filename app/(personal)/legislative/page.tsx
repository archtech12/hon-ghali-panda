'use client'

import {useState} from 'react'
import Link from 'next/link'

interface Bill {
  name: string
  date: string
  status: string
  description: string
}

interface LegislativeData {
  title: string
  content: string
  bills?: Bill[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function LegislativeWorkPage() {
  const [legislativeData] = useState<LegislativeData>({
    title: 'Legislative Work',
    content: `<p>Hon. Dr. Ghali Mustapha Tijjani Phanda's legislative tenure is defined by a commitment to community development, youth empowerment, and rapid infrastructure growth. His approach centers on ensuring that federal presence is felt in every ward of Ajingi, Albasu, and Gaya.</p>
    <p>Key to his vision is the establishment of a robust framework that supports rural communities in accessing education and healthcare. He champions bills that seek to bridge the gap between urban and rural development.</p>
    <p>Beyond infrastructure, he is a vocal advocate for the agricultural sector, sponsoring legislation to improve rural access to credit and modern farming tools for his constituents.</p>`,
    bills: [
      {
        name: 'Rural Youth Empowerment Bill',
        date: '2023',
        status: 'Proposed',
        description:
          'A critical bill aimed at establishing vocational training centers in rural constituencies to reduce youth unemployment.',
      },
      {
        name: 'Community Health Access Bill',
        date: '2023',
        status: 'In Committee',
        description:
          'Proposed legislation to mandate the upgrade of Primary Healthcare Centers in rural LGAs.',
      },
      {
        name: 'Agricultural Support Scheme Bill',
        date: '2024',
        status: 'Proposed',
        description:
          'Legislation designed to provide subsidized farming inputs to smallholder farmers in constituencies like Ajingi, Albasu, and Gaya.',
      },
    ],
  })
  const loading = false

  // useEffect removed as we are using static data

  // Policy positions based on the provided information
  const policyPositions = [
    {
      id: 1,
      title: 'Youth Empowerment',
      description:
        'Advocating for skills acquisition and job creation programs to engage the youth productively.',
      icon: 'school',
    },
    {
      id: 2,
      title: 'Rural Development',
      description:
        'Sponsoring bills that direct funding towards rural roads, electrification, and water projects.',
      icon: 'agriculture',
    },
    {
      id: 3,
      title: 'Healthcare Access',
      description:
        'Strengthening healthcare institutions to ensure basic medical services reach every community.',
      icon: 'local_hospital',
    },
    {
      id: 4,
      title: 'Constituency Advocacy',
      description:
        'Strong representation for Ajingi, Albasu, and Gaya communities, ensuring their voices are heard.',
      icon: 'groups',
    },
  ]

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        <p className="mt-4 text-gray-600">Loading legislative information...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="bg-green-900/90 dark:bg-green-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            {legislativeData?.title || 'Legislative Work'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-green-100">
            Advocating for community development, youth empowerment, and rapid infrastructure growth
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Policy Positions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Key policy areas Hon. Dr. Ghali Mustapha Tijjani Phanda championed in the Senate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policyPositions.map((position) => (
              <div
                key={position.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-green-700 dark:text-green-400">
                    {position.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {position.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{position.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Recent Legislative Actions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Current bills and initiatives Hon. Dr. Ghali Mustapha Tijjani Phanda worked on during
              his time in the Senate
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {legislativeData?.bills && legislativeData.bills.length > 0 ? (
                legislativeData.bills.map((bill, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-green-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {bill.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {bill.date || 'N/A'}
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            bill.status === 'Proposed'
                              ? 'bg-blue-100 text-blue-800'
                              : bill.status === 'In Committee'
                                ? 'bg-yellow-100 text-yellow-800'
                                : bill.status === 'Passed'
                                  ? 'bg-green-100 text-green-800'
                                  : bill.status === 'Rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {bill.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{bill.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No legislative actions available at this time.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-green-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Community Development Vision
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto">
                <div dangerouslySetInnerHTML={{__html: legislativeData?.content || ''}} />
                <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <blockquote className="text-lg italic text-gray-900 dark:text-white">
                    "When we make it easier for goods to enter Nigeria, we reduce prices for
                    everyone. This is not just about my constituency, but about creating prosperity
                    for all Nigerians."
                  </blockquote>
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition duration-300 transform hover:scale-105"
                >
                  Support These Initiatives
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
