// Run: node scripts/restore-blog-images.js
// Restores original Unsplash cover images for blog posts
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const originals = [
  {
    slug: "great-zimbabwe-the-stone-city-of-the-sky",
    coverImage:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80",
  },
  {
    slug: "the-great-migration-cradle-of-humanity",
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
  },
  {
    slug: "amazing-african-animals-with-superpowers",
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
  },
  {
    slug: "the-secret-science-of-bridges",
    coverImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
  },
  {
    slug: "the-pyramid-king-sudan",
    coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
  },
  {
    slug: "the-3000-year-old-snack",
    coverImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
  },
  {
    slug: "dr-ketchups-miracle-medicine",
    coverImage: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
  },
  {
    slug: "the-mini-country-vatican-city",
    coverImage: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800",
  },
  {
    slug: "russias-11-breakfasts",
    coverImage: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800",
  },
  {
    slug: "the-brain-janitors-why-you-sleep",
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
  },
  {
    slug: "space-smells-like-steak",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
  },
  {
    slug: "the-million-pound-cloud",
    coverImage: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800",
  },
  {
    slug: "teaspoon-of-a-star",
    coverImage: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800",
  },
  {
    slug: "the-27-ton-computer-meet-eniac",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
  },
]

async function main() {
  let updated = 0
  for (const item of originals) {
    const post = await prisma.blogPost.findFirst({ where: { slug: item.slug } })
    if (!post) {
      console.log(`Not found: ${item.slug}`)
      continue
    }
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { coverImage: item.coverImage },
    })
    console.log(`Restored: ${post.title}`)
    updated++
  }
  console.log(`Done. Restored ${updated} blog cover images.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
