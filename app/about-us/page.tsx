import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Lightbulb, Linkedin } from "lucide-react"
import Image from "next/image"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Abstract background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          ></div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-black tracking-tight leading-tight">
                Redefining Legal Trust.
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
                For too long, finding legal help in Bangladesh has felt like navigating a maze—full of middlemen,
                confusion, and uncertainty. At <span className="text-blue-900 font-bold lowercase">mamlaa.com</span>, we
                are rewriting that story. We believe that finding a verified lawyer should be as simple as booking a
                ride, and creating a legal document shouldn't take days. We aren't just building platform; we are
                building the direct line of trust that 170 million citizens have been waiting for.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Card */}
              <div className="bg-gray-50 p-10 lg:p-12 rounded-3xl space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Target className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-2xl font-bold text-black">Our Mission</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To strip away the complexity of the legal system and replace it with clarity, access, and trust.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-gray-50 p-10 lg:p-12 rounded-3xl space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Lightbulb className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-2xl font-bold text-black">Our Vision</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A Bangladesh where facing "a legal issue" is no longer a moment of panic, but a simple, confident next
                  step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-black mb-16">
              The Minds Behind <span className="text-blue-900 font-bold lowercase">mamlaa.com</span>.
            </h2>

            <div className="max-w-5xl mx-auto">
              {/* Top Row - 3 Members */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <TeamMember name="Zubaeerul Islam" role="CHIEF EXECUTIVE OFFICER" image="/team/zubaeerul-islam.jpeg" />
                <TeamMember name="Mir Jamiur Rahman" role="CHIEF OF STRATEGY" image="/team/mir-jamiur-rahman.jpeg" />
                <TeamMember name="Anil Wasif" role="CHIEF OF RESEARCH & INNOVATION" image="/team/anil-wasif.png" />
              </div>

              {/* Bottom Row - 2 Members Centered */}
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <TeamMember name="Farhim Zaman" role="CHIEF TECHNOLOGY OFFICER" image="/team/farhim-zaman.jpeg" />
                <TeamMember name="Sajjadul Ferdous" role="CHIEF OPERATING OFFICER" image="/team/sajjadul-ferdous.png" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="group flex flex-col items-center text-center space-y-4">
      <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden bg-gray-100 mb-2">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-black">{name}</h3>
        <p className="text-xs font-bold text-blue-900 tracking-widest uppercase">{role}</p>
      </div>
      <a href="#" className="text-slate-400 hover:text-[#0077b5] transition-colors">
        <Linkedin className="w-5 h-5" />
        <span className="sr-only">LinkedIn</span>
      </a>
    </div>
  )
}
