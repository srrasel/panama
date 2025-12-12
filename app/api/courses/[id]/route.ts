const catalog: Record<string, any> = {
  "1": {
    id: 1,
    title: "Advanced JavaScript & ES6+",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 1230,
    price: "$129",
    description:
      "Master modern JavaScript with ES6+ features, async programming, and advanced patterns.",
    duration: "6 weeks",
    level: "Intermediate",
    modules: [
      { title: "Module 1: ES6 Fundamentals", lessons: 5, duration: "2 hours" },
      { title: "Module 2: Async Programming", lessons: 6, duration: "2.5 hours" },
      { title: "Module 3: Advanced Patterns", lessons: 7, duration: "3 hours" },
      { title: "Module 4: Tooling & Bundlers", lessons: 4, duration: "1.5 hours" },
    ],
    about: [
      "Use modern ES6+ syntax confidently",
      "Handle async flows with Promises and async/await",
      "Apply advanced patterns for scalable apps",
      "Improve developer experience with modern tooling",
    ],
  },
  "2": {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Mike Chen",
    rating: 4.8,
    students: 2847,
    price: "$99",
    description:
      "Complete guide to HTML, CSS, JavaScript, and responsive design.",
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    modules: [
      { title: "Module 1: Introduction to Web", lessons: 5, duration: "2 hours" },
      { title: "Module 2: HTML & CSS", lessons: 8, duration: "3.5 hours" },
      { title: "Module 3: JavaScript Basics", lessons: 10, duration: "4 hours" },
      { title: "Module 4: Responsive Design", lessons: 6, duration: "3 hours" },
    ],
    about: [
      "Build semantic HTML",
      "Style with modern CSS techniques",
      "Write clean JavaScript",
      "Create responsive layouts",
    ],
  },
  "3": {
    id: 3,
    title: "React Mastery",
    instructor: "Emily Davis",
    rating: 4.9,
    students: 2100,
    price: "$149",
    description:
      "Advanced React patterns, state management, performance, and real-world architectures.",
    duration: "7 weeks",
    level: "Intermediate to Advanced",
    modules: [
      { title: "Module 1: Component Patterns", lessons: 6, duration: "2.5 hours" },
      { title: "Module 2: State Management", lessons: 7, duration: "3 hours" },
      { title: "Module 3: Performance", lessons: 5, duration: "2 hours" },
      { title: "Module 4: Testing & Quality", lessons: 5, duration: "2 hours" },
    ],
    about: [
      "Compose robust UI with advanced component patterns",
      "Manage complex state effectively",
      "Optimize performance and user experience",
      "Test components and flows",
    ],
  },
}

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params
  const course = catalog[id] || {
    id,
    title: "Course",
    instructor: "Instructor",
    rating: 4.7,
    students: 1000,
    price: "$99",
    description: "Course description",
    duration: "6 weeks",
    level: "Beginner",
    modules: [
      { title: "Module 1", lessons: 5, duration: "2 hours" },
      { title: "Module 2", lessons: 6, duration: "2.5 hours" },
    ],
    about: ["Learning outcomes available"],
  }
  return Response.json({ course })
}
