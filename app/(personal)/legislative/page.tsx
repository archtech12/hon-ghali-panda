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
    content: `<p>Hon. Suleiman Kwari's legislative tenure was defined by a commitment to fiscal discipline, anti-corruption, and rural development. His approach centered on ensuring that appropriations were realistic and capable of being funded, reducing the deficit and improving the nation's credit rating.</p>
    <p>Key to his vision was the establishment of a robust financial framework that supports both federal and state governments in delivering dividends of democracy. He championed bills that sought to block revenue leakages and enhance the efficiency of tax collection systems.</p>
    <p>Beyond finance, he was a vocal advocate for the agricultural sector, sponsoring legislation to improve rural access to credit and modern farming tools, recognizing that the majority of his constituents in Kaduna North are agrarian.</p>`,
    bills: [
      {
        name: 'Finance Act (Amendment) Bill',
        date: '2021',
        status: 'Passed',
        description: 'A critical bill aimed at enhancing revenue mobilization and clarifying tax statutes to improve the ease of doing business.',
      },
      {
        name: 'Public Procurement Act (Amendment) Bill',
        date: '2020',
        status: 'In Committee',
        description: 'Proposed amendments to streamline public procurement processes, ensuring transparency and reducing bottlenecks in project execution.',
      },
      {
        name: 'Rural Agricultural Credit Scheme Bill',
        date: '2022',
        status: 'Proposed',
        description: 'Legislation designed to provide low-interest credit facilities to smallholder farmers in rural constituencies like Kaduna North.',
      }
    ]
  })
  const loading = false

  // useEffect removed as we are using static data

  // Policy positions based on the provided information
  const policyPositions = [
    {
      id: 1,
      title: 'Fiscal Responsibility',
      description:
        "Advocating for transparent budgeting processes and strict adherence to fiscal rules to prevent waste and corruption.",
      icon: 'trending_up',
    },
    {
      id: 2,
      title: 'Rural Development',
      description:
        'Sponsoring bills that direct funding towards rural roads, electrification, and water projects in underserved areas.',
      icon: 'agriculture',
    },
    {
      id: 3,
      title: 'Anti-Corruption',
      description:
        'Strengthening institutions involved in the fight against financial crimes and ensuring public officials are accountable.',
      icon: 'gavel',
    },
    {
      id: 4,
      title: 'constituency Advocacy',
      description:
        'Strong representation for Kaduna North communities, ensuring their voices are heard in national debates.',
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
            Advocating for transparency, development, and fiscal discipline
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
              Key policy areas Hon. Suleiman Kwari championed in the Senate
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
              Current bills and initiatives Hon. Suleiman Kwari worked on during his time in the Senate
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
                Economic Reform Vision
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
