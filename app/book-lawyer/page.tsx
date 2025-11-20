import { Header } from '@/components/header'
import { LawyerFilterBar } from "@/components/lawyer-filter-bar"
import { LawyerSidebarFilters } from "@/components/lawyer-sidebar-filters"
import { LawyerCard } from "@/components/lawyer-card"

// Demo data for lawyers
const lawyers = [
  {
    id: 1,
    name: "Adv. Sarah Rahman",
    title: "Senior Advocate, Supreme Court",
    image: "/professional-lawyer-woman.jpg",
    experience: "12 Years Practice",
    court: "Supreme Court of Bangladesh",
    languages: ["Bangla", "English"],
    rating: 4.9,
    reviews: 84,
    price: "৳1500 BDT",
    isVerified: true,
    isPremium: true,
  },
  {
    id: 2,
    name: "Adv. Kamal Hossain",
    title: "District & Sessions Judge Court",
    image: "/professional-lawyer-man.jpg",
    experience: "8 Years Practice",
    court: "Dhaka District Court",
    languages: ["Bangla"],
    rating: 4.7,
    reviews: 52,
    price: "৳1000 BDT",
    isVerified: true,
    isPremium: false,
  },
  {
    id: 3,
    name: "Adv. Nusrat Jahan",
    title: "Family Law Specialist",
    image: "/professional-lawyer-woman-2.jpg",
    experience: "15 Years Practice",
    court: "Dhaka Family Court",
    languages: ["Bangla", "English", "Urdu"],
    rating: 5.0,
    reviews: 120,
    price: "৳2000 BDT",
    isVerified: true,
    isPremium: true,
  },
  {
    id: 4,
    name: "Adv. Rafiqul Islam",
    title: "Criminal Defense Attorney",
    image: "/professional-lawyer-man-2.jpg",
    experience: "20 Years Practice",
    court: "High Court Division",
    languages: ["Bangla", "English"],
    rating: 4.8,
    reviews: 210,
    price: "৳2500 BDT",
    isVerified: true,
    isPremium: true,
  },
  {
    id: 5,
    name: "Adv. Farhana Ahmed",
    title: "Civil Litigation Expert",
    image: "/professional-lawyer-woman-3.jpg",
    experience: "6 Years Practice",
    court: "Dhaka District Court",
    languages: ["Bangla"],
    rating: 4.5,
    reviews: 34,
    price: "৳800 BDT",
    isVerified: true,
    isPremium: false,
  },
  {
    id: 6,
    name: "Adv. Moinul Hasan",
    title: "Property Law Consultant",
    image: "/professional-lawyer-man-3.jpg",
    experience: "10 Years Practice",
    court: "Land Survey Tribunal",
    languages: ["Bangla", "English"],
    rating: 4.6,
    reviews: 45,
    price: "৳1200 BDT",
    isVerified: true,
    isPremium: false,
  },
]

export default function BookLawyerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900">
      <Header />
      <LawyerFilterBar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile, visible on large screens */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-36">
              <LawyerSidebarFilters />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Verified Panel Lawyers in Dhaka</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Found {lawyers.length} legal experts available for consultation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {lawyers.map((lawyer) => (
                <LawyerCard key={lawyer.id} {...lawyer} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
