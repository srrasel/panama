// Run: node scripts/update-blog-images.js
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const localImages = [
  "/new/image22.jpeg",
  "/new/image18.jpeg",
  "/new/image11.jpeg",
  "/new/leadership.jpeg",
  "/new/image10.jpeg",
  "/new/image36.jpeg",
  "/new/build.jpeg",
  "/new/image15.jpeg",
  "/new/Picture16.jpeg",
  "/new/picture55.jpeg",
  "/new/image38.jpeg",
  "/new/image181.jpeg",
  "/new/bgoutdoor.jpeg",
  "/new/image5.jpeg",
]

async function main() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true, slug: true },
  })

  for (let i = 0; i < posts.length; i++) {
    const image = localImages[i % localImages.length]
    await prisma.blogPost.update({
      where: { id: posts[i].id },
      data: { coverImage: image },
    })
    console.log(`Updated: ${posts[i].title} → ${image}`)
  }

  console.log(`Done. Updated ${posts.length} blog cover images.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
