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
  content: React.ReactNode
  bills?: Bill[]
}

// ... (imports same)
// ... interfaces same

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function LegislativeWorkPage() {
  const [legislativeData] = useState<LegislativeData>({
    title: 'Legislative Work',
    content: (
      <>
        <p>
          Dr. Ghali's legislative actions are defined by a pro-people agenda. He fearlessly voices the
          concerns of the common man, particularly regarding economic policies that impact rural
          livelihoods. His priorities include agricultural support, infrastructural development, and
          equitable tax policies.
        </p>
        <p>
          He has been a vocal critic of poorly timed economic reforms that place undue burden on ordinary
          Nigerians without adequate safety nets.
        </p>
      </>
    ),
    bills: [
      {
        name: 'Opposition to Tax Reform Bills',
        status: 'Ongoing Debate',
        description: 'Strongly opposed the executive Tax Reform Bills, arguing they would increase hardship for the masses during an economic downturn.',
        date: 'Late 2024',
      },
      {
        name: 'Motion for Rural Electrification',
        status: 'In Committee',
        description: 'Moved a motion for urgent federal intervention to connect Gaya, Ajingi, and Albasu villages to the national grid.',
        date: '2024',
      },
      {
        name: 'Agricultural Support Bill',
        status: 'Proposed',
        description: 'Advocating for subsidized inputs and guaranteed minimum prices for rural farmers.',
        date: '2024',
      },
      {
        name: 'Education Infrastructure Motion',
        status: 'Passed',
        description: 'Secured House resolution for the rehabilitation of dilapidated primary schools in the constituency.',
        date: '2024',
      },
    ],
  })
  const loading = false

  // Policy positions based on the provided information
  const policyPositions = [
    {
      id: 1,
      title: 'Economic Justice',
      description:
        "Opposing anti-people tax policies and advocating for economic measures that protect the purchasing power of the poor.",
      icon: 'balance',
    },
    {
      id: 2,
      title: 'Rural Development',
      description:
        'Championing federal projects for rural roads, electrification, and water supply in Gaya, Ajingi, and Albasu.',
      icon: 'landscape',
    },
    {
      id: 3,
      title: 'Youth & Women Empowerment',
      description:
        'Legislating for funds and programs that provide capital and skills training for self-reliance.',
      icon: 'groups',
    },
    {
      id: 4,
      title: 'Education & Health',
      description:
        'Prioritizing budgetary allocations for healthcare facilities and scholarship schemes.',
      icon: 'school',
    },
  ]

  if (loading) {
    return (
      <div className="w-full py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        <p className="mt-4 text-gray-600">Loading legislative information...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="bg-red-900/90 dark:bg-red-900/95 py-12 sm:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">
            {legislativeData?.title || 'Legislative Work'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-red-100">
            Advocating for policies that transform communities and strengthen Nigeria's economy
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
              Key policy areas Hon. Dr. Ghali Mustapha Tijjani Panda championed in the House of Representatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policyPositions.map((position) => (
              <div
                key={position.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-red-700 dark:text-red-400">
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
              Current bills and initiatives Hon. Dr. Ghali Mustapha Tijjani Panda worked on during
              his time in the House of Representatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {legislativeData?.bills && legislativeData.bills.length > 0 ? (
                legislativeData.bills.map((bill, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-red-700"
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

      <section className="py-16 md:py-20 bg-red-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Community Development Vision
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mx-auto">
                <div>{legislativeData?.content}</div>
                <div className="bg-red-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <blockquote className="text-lg italic text-gray-900 dark:text-white">
                    "When we make it easier for goods to enter Nigeria, we reduce prices for
                    everyone. This is not just about my constituency, but about creating prosperity
                    for all Nigerians."
                  </blockquote>
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition duration-300 transform hover:scale-105"
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
