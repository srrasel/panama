 
import Image from "next/image"

export default function Community() {
  return (
    <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 reveal-on-scroll is-visible">
                <h2 className="text-brand-900 font-bold tracking-wide uppercase text-sm mb-3">Community Highlights</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Student Wins &amp; Team Moments</h3>
                <p className="text-stone-600 text-lg max-w-3xl mx-auto">A snapshot of recent achievements, awards, and
                    campus life moments from across Panama School.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Leadership Hike */}
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://media.istockphoto.com/id/1047620596/photo/portrait-of-high-school-student-group-wearing-uniform-standing-outside-school-buildings.jpg?s=612x612&w=0&k=20&c=DNi5E3zpfF1l_JysQkDXcqR5qJOEST2wWjQBCXf0gps=">
                    <Image src="https://media.istockphoto.com/id/1047620596/photo/portrait-of-high-school-student-group-wearing-uniform-standing-outside-school-buildings.jpg?s=612x612&w=0&k=20&c=DNi5E3zpfF1l_JysQkDXcqR5qJOEST2wWjQBCXf0gps=" alt="Leadership hike" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Leadership Hike</p>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-white/80">
                            <span className="flex items-center gap-1">❤ 287</span>
                            <span>Outdoor Ed</span>
                        </div>
                    </div>
                </div>

                {/* Silver Award */}
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://media.istockphoto.com/id/904531424/photo/two-school-girls-holding-hands-on-way-to-school.jpg?s=612x612&w=0&k=20&c=tVchzRSVqQUD6N7iKUvLZ12PSFH_F0Ha7zghseGwDd8=">
                    <Image src="https://media.istockphoto.com/id/904531424/photo/two-school-girls-holding-hands-on-way-to-school.jpg?s=612x612&w=0&k=20&c=tVchzRSVqQUD6N7iKUvLZ12PSFH_F0Ha7zghseGwDd8=" alt="Silver award" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Silver Award</p>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-white/80">
                            <span>Duke of Edinburgh</span>
                            <span className="px-2 py-1 rounded-full bg-white/15 text-white">Silver</span>
                        </div>
                        <p className="text-xs text-white/85">Kelsey Pelham • Service, skills, expedition excellence</p>
                    </div>
                </div>

                {/* Team Zimbabwe */}
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://media.istockphoto.com/id/534576365/photo/elementary-school-children-wearing-blue-school-uniforms-raising-hands-in-classroom.jpg?s=612x612&w=0&k=20&c=LEdI0qaduUMsCWw32y0OASviPJvo8vrE1hYSE0GBEX8=,https://thumbs.dreamstime.com/b/students-holding-notebooks-wearing-school-uniforms-girl-students-holding-notebooks-wearing-school-uniforms-98786152.jpg">
                    <Image src="https://media.istockphoto.com/id/534576365/photo/elementary-school-children-wearing-blue-school-uniforms-raising-hands-in-classroom.jpg?s=612x612&w=0&k=20&c=LEdI0qaduUMsCWw32y0OASviPJvo8vrE1hYSE0GBEX8=" alt="Team Zimbabwe" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Team Zimbabwe</p>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-white/80">
                            <span>African Youth Games 2025</span>
                            <span>Luanda</span>
                        </div>
                        <p className="text-xs text-white/85">Congratulations to Callum &amp; Gugu for national selection.</p>
                    </div>
                </div>

                {/* Water Polo Team Photo */}
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://t3.ftcdn.net/jpg/02/77/89/92/360_F_277899237_BW70uPU1RSPIFgxRS4Ujst4Uc4KaHGSI.jpg">
                    <Image src="https://t3.ftcdn.net/jpg/02/77/89/92/360_F_277899237_BW70uPU1RSPIFgxRS4Ujst4Uc4KaHGSI.jpg" alt="Water polo team" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Zimbabwe Water Polo</p>
                        <p className="text-xs uppercase tracking-wide text-white/80">Panama representatives</p>
                    </div>
                </div>

                {/* Student Achievement */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://media.istockphoto.com/id/904531424/photo/two-school-girls-holding-hands-on-way-to-school.jpg?s=612x612&w=0&k=20&c=tVchzRSVqQUD6N7iKUvLZ12PSFH_F0Ha7zghseGwDd8=">
                    <Image src="https://media.istockphoto.com/id/904531424/photo/two-school-girls-holding-hands-on-way-to-school.jpg?s=612x612&w=0&k=20&c=tVchzRSVqQUD6N7iKUvLZ12PSFH_F0Ha7zghseGwDd8=" alt="Kunashe Katema" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Kunashe Katema</p>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-white/80">
                            <span>Bronze Award</span>
                            <span>Duke of Edinburgh</span>
                        </div>
                    </div>
                </div>

                {/* Campus Moment */}
                <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-lg reveal-on-scroll gallery-tile cursor-pointer is-visible" tabIndex={0} data-gallery-images="https://thumbs.dreamstime.com/b/students-holding-notebooks-wearing-school-uniforms-girl-students-holding-notebooks-wearing-school-uniforms-98786152.jpg">
                    <Image src="https://thumbs.dreamstime.com/b/students-holding-notebooks-wearing-school-uniforms-girl-students-holding-notebooks-wearing-school-uniforms-98786152.jpg" alt="Evening on campus" fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <p className="text-sm font-semibold">Evening on Campus</p>
                        <p className="text-xs uppercase tracking-wide text-white/80">Boarding Life</p>
                    </div>
                </div>

               

               

            </div>
        </div>
    </section>
  )
}
