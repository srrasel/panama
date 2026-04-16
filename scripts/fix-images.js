const { PrismaClient } = require("@prisma/client")
const p = new PrismaClient()

async function main() {
  const updates = [
    { slug: "the-mini-country-vatican-city", coverImage: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800" },
    { slug: "space-smells-like-steak", coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800" },
    { slug: "the-27-ton-computer-meet-eniac", coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" },
  ]
  for (const u of updates) {
    const post = await p.blogPost.findFirst({ where: { slug: u.slug } })
    if (post) {
      await p.blogPost.update({ where: { id: post.id }, data: { coverImage: u.coverImage } })
      console.log("Updated: " + u.slug)
    } else {
      console.log("Not found: " + u.slug)
    }
  }
  await p.$disconnect()
}

main().catch((e) => { console.error(e); process.exit(1) })
