import { projects2025 } from '@/lib/projects'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: Promise<{
    id: string
  }>
}

// 1. Generate Metadata for Social Sharing (Server-Side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const projectId = parseInt(id)
  const project = projects2025.find(p => p.id === projectId)

  if (!project) {
    return {
      title: 'Project Not Found | Hon. Dr. Ghali Panda',
    }
  }

  const title = `${project.titleEN} - Hon. Dr. Ghali Panda`
  const description = project.desc
  // Use the first photo or a default fallback
  const image = project.photos[0] || 'https://hon-ghali-panda.vercel.app/ghaliphoto.jpg' 

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image.startsWith('http') ? image : `https://hon-ghali-panda.vercel.app${image}`,
          width: 1200,
          height: 630,
          alt: project.titleEN,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image.startsWith('http') ? image : `https://hon-ghali-panda.vercel.app${image}`],
    },
  }
}

// 2. Render the Project Details Page
export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params
  const projectId = parseInt(id)
  const project = projects2025.find(p => p.id === projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Navigation Back */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-red-700 transition-colors gap-2"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to All Projects
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full bg-gray-200">
           {project.photos && project.photos.length > 0 ? (
             <Image
               src={project.photos[0]}
               alt={project.titleEN}
               fill
               className="object-cover"
               priority
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400">
               <span className="material-symbols-outlined text-6xl">image</span>
             </div>
           )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
           {/* Date & Category */}
           <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase rounded-full tracking-wide">
                {project.category}
              </span>
              <span className="flex items-center text-gray-500 text-sm font-medium">
                 <span className="material-symbols-outlined text-lg mr-1 text-red-500">calendar_today</span>
                 {project.date}
              </span>
           </div>

           {/* Titles */}
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
             {project.titleEN}
           </h1>
           <h2 className="text-xl md:text-2xl font-semibold text-gray-500 mb-8 font-serif italic">
             {project.titleHA}
           </h2>

           {/* Divider */}
           <div className="w-20 h-1.5 bg-red-600 rounded-full mb-8"></div>

           {/* Description */}
           <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed">
             <p>{project.desc}</p>
           </div>

           {/* Additional Photos Grid (if any) */}
           {project.photos && project.photos.length > 1 && (
             <div className="mb-12">
               <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-red-500 pl-3">Gallery</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {project.photos.slice(1).map((photo, idx) => (
                   <div key={idx} className="relative h-40 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                     <Image
                       src={photo}
                       alt={`${project.titleEN} - ${idx + 2}`}
                       fill
                       className="object-cover hover:scale-105 transition-transform duration-500"
                     />
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Call to Action */}
           <div className="bg-red-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-red-100">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-red-900 mb-1">Passionate about this initiative?</h3>
                <p className="text-red-700/80 text-sm">Share it with your community to spread the word.</p>
              </div>
              <div className="flex gap-3">
                 {/* Simple Share Buttons requiring JS (client-side interactive would be better, but standard links work) */}
                 <a 
                   href={`https://wa.me/?text=${encodeURIComponent(`Check out: ${project.titleEN} - https://hon-ghali-panda.vercel.app/projects/${project.id}`)}`}
                   target="_blank"
                   className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm"
                 >
                   <i className="fab fa-whatsapp text-lg"></i>
                 </a>
                 <a 
                   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hon-ghali-panda.vercel.app/projects/${project.id}`)}`}
                   target="_blank"
                   className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                 >
                   <i className="fab fa-facebook-f"></i>
                 </a>
              </div>
           </div>

        </div>
      </div>
    </div>
  )
}
