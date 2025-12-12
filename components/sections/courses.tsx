"use client"

import Link from "next/link"
import { Star } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Development",
    rating: 4.9,
    students: 2847,
    price: "$99",
    image: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    category: "Development",
    rating: 4.8,
    students: 1923,
    price: "$149",
    image: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    rating: 4.9,
    students: 3124,
    price: "$129",
    image: "bg-gradient-to-br from-pink-50 to-pink-100",
  },
]

export default function Courses() {
  return (
    <section className="px-4 py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">Featured Courses</h2>
            <p className="text-foreground/60">Start learning from our most popular courses</p>
          </div>
          <Link href="/courses" className="hidden sm:inline-flex text-primary font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`}>
              <div className="group cursor-pointer h-full">
                <div className={`${course.image} aspect-video rounded-lg mb-4 group-hover:shadow-lg transition`} />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/60">{course.category}</p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-primary text-primary" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-foreground/60">({course.students.toLocaleString()} students)</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
