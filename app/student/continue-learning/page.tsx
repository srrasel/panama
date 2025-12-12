"use client"

import Link from "next/link"

export default function ContinueLearning() {
  const inProgressCourses = [
    {
      id: 1,
      title: "Advanced JavaScript & ES6+",
      instructor: "Sarah Johnson",
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      nextLesson: "Async/Await Patterns",
      estimatedTime: "45 mins",
      image: "/javascript-course.jpg",
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      instructor: "Mike Chen",
      progress: 48,
      completedLessons: 9,
      totalLessons: 19,
      nextLesson: "CSS Grid & Flexbox",
      estimatedTime: "50 mins",
      image: "/web-development-course.jpg",
    },
    {
      id: 3,
      title: "React Mastery",
      instructor: "Emily Davis",
      progress: 82,
      completedLessons: 16,
      totalLessons: 20,
      nextLesson: "Performance Optimization",
      estimatedTime: "55 mins",
      image: "/react-course.jpg",
    },
  ]

  const recommendedCourses = [
    {
      id: 4,
      title: "TypeScript Advanced",
      instructor: "Alex Kumar",
      difficulty: "Intermediate",
      rating: 4.8,
      reviews: 2345,
      students: "15K+",
      relevance: "92%",
    },
    {
      id: 5,
      title: "Node.js Backend Development",
      instructor: "David Wilson",
      difficulty: "Intermediate",
      rating: 4.9,
      reviews: 3120,
      students: "18K+",
      relevance: "88%",
    },
    {
      id: 6,
      title: "Next.js Full Stack",
      instructor: "Lisa Anderson",
      difficulty: "Advanced",
      rating: 4.7,
      reviews: 1890,
      students: "12K+",
      relevance: "95%",
    },
  ]

  const learningStreak = 23
  const totalHoursLearned = 156
  const coursesCompleted = 8
  const certificatesEarned = 5

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Continue Your Learning Journey</h1>
        <p className="text-muted-foreground">Pick up where you left off and unlock new skills</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Learning Streak</p>
          <p className="text-3xl font-bold text-foreground mt-2">{learningStreak} days</p>
          <p className="text-xs text-muted-foreground mt-1">Keep it up! 🔥</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Hours</p>
          <p className="text-3xl font-bold text-foreground mt-2">{totalHoursLearned}</p>
          <p className="text-xs text-muted-foreground mt-1">Hours invested</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Courses Completed</p>
          <p className="text-3xl font-bold text-foreground mt-2">{coursesCompleted}</p>
          <p className="text-xs text-muted-foreground mt-1">Finished courses</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Certificates</p>
          <p className="text-3xl font-bold text-foreground mt-2">{certificatesEarned}</p>
          <p className="text-xs text-muted-foreground mt-1">Earned badges</p>
        </div>
      </div>

      {/* In Progress Courses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">In Progress Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-muted h-32 flex items-center justify-center">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-foreground">Progress</p>
                    <p className="text-sm font-bold text-primary">{course.progress}%</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {course.completedLessons} of {course.totalLessons} lessons
                  </p>
                </div>

                {/* Next Lesson */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Next Lesson</p>
                  <p className="text-sm font-medium text-foreground">{course.nextLesson}</p>
                  <p className="text-xs text-muted-foreground mt-1">~{course.estimatedTime}</p>
                </div>

                <Link href={`/student/learning/${course.id}`}>
                  <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    Continue Course
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recommended For You</h2>
        <p className="text-muted-foreground mb-6">Based on your learning pattern and interests</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                </div>
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-3 py-1 rounded-full text-xs font-semibold">
                  {course.relevance} match
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="text-sm font-semibold text-foreground">{course.difficulty}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-sm font-semibold text-foreground">
                    ⭐ {course.rating} ({course.reviews.toLocaleString()})
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Enrolled Students</p>
                  <p className="text-sm font-semibold text-foreground">{course.students}</p>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Explore Course
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">💡 Pro Learning Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Consistent Practice</h3>
              <p className="text-sm text-muted-foreground">
                Study 30-45 minutes daily for optimal retention and skill development.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🎯</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Goal Setting</h3>
              <p className="text-sm text-muted-foreground">
                Set weekly milestones to maintain momentum and track your progress.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">📚</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Diverse Learning</h3>
              <p className="text-sm text-muted-foreground">
                Mix theory with hands-on projects to reinforce your understanding.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🤝</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Community Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Join discussion forums and learn from peers in the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
