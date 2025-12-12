import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AboutSection from "@/components/sections/about"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl font-semibold mb-2">About Thornhill</h1>
                <p className="text-white/80">Academic excellence and holistic development</p>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
      </main>
      <Footer />
    </>
  )
}

