// Run: node scripts/seed-blog.js
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const content = `Imagine walking through a valley and looking up to see a massive city made entirely of stone, perched high on a hill. There are no engines, no cement, and no metal cranes to help build it. Yet, the walls rise 36 feet into the air, curved and smooth like a work of art.

This is Great Zimbabwe, the capital of a vast African empire that ruled between the years 1100 and 1450. Located in the modern-day country of Zimbabwe (which actually takes its name from these ruins), it was once home to as many as 18,000 people.

## The Mystery of the "Dry" Walls

The most famous part of the city is the Great Enclosure. It is the largest ancient structure in Africa south of the Sahara Desert.

The builders were master engineers. They used a technique called dry-stone walling. This means they took blocks of granite and stacked them so perfectly that they stayed up without any mortar (glue or cement) to hold them together. If you tried to stick a needle between the stones today, you probably couldn't!

Inside the walls stands a 33-foot-tall Conical Tower. Archaeologists are still debating what it was for. Some think it was a place to store grain, while others believe it was a religious symbol to show the King's power.

## A Global Trading Empire

Great Zimbabwe wasn't just a fortress; it was a giant "shopping mall" for the ancient world. Because the empire sat right between gold mines and the Indian Ocean, it became incredibly wealthy.

Archaeologists have found items in the ruins that prove the Shona people traded with countries thousands of miles away:

- Chinese Pottery: Blue and white porcelain from the Ming Dynasty.
- Glass Beads: Colorful beads that came all the way from India.
- Persian Bowls: Beautifully decorated dishes from the Middle East.

The Kings of Great Zimbabwe traded their gold and ivory for these exotic treasures, making them some of the most powerful rulers of their time.

## The Eight Stone Birds

The most famous artifacts found at the site are eight birds carved out of soapstone. Each bird is unique and sits on top of a tall stone pillar. These birds are believed to represent the ancestors of the Kings. Today, the "Zimbabwe Bird" is so important that it is the national symbol of the country and appears on its flag!

## Word Watch

- Mortar: A mixture like cement used to stick bricks together.
- Dry-Stone Walling: Building walls by stacking stones without using any glue or wet materials.
- Conical: Shaped like a cone (round at the bottom and pointy at the top).
- Ivory: The hard, white material that comes from the tusks of elephants.
- Shona: The ethnic group of people who built and lived in Great Zimbabwe.`

  const quiz = JSON.stringify([
    {
      question: 'What does the word "Zimbabwe" mean in the local Shona language?',
      options: ["The Golden Hill", "Houses of Stone", "The King's Forest", "The Great River"],
      answer: 1,
    },
    {
      question: "How did the builders keep the stone walls from falling down?",
      options: [
        "They used a very strong ancient glue.",
        "They carved the stones to fit together perfectly (Dry-stone).",
        "They used metal rods inside the walls.",
        "They used mud and straw.",
      ],
      answer: 1,
    },
    {
      question: "Which of these items was NOT found in the ruins of Great Zimbabwe?",
      options: ["Chinese porcelain", "Indian glass beads", "iPhone parts", "Persian pottery"],
      answer: 2,
    },
    {
      question: 'What is the "Zimbabwe Bird" made out of?',
      options: ["Real feathers and gold", "Carved granite", "Carved soapstone", "Hardened clay"],
      answer: 2,
    },
    {
      question: "How tall is the massive outer wall of the Great Enclosure?",
      options: ["10 feet", "36 feet", "100 feet", "5 feet"],
      answer: 1,
    },
  ])

  const existing = await prisma.blogPost.findFirst({ where: { title: "Great Zimbabwe: The Stone City of the Sky" } })
  if (existing) {
    console.log("Blog post already exists, updating...")
    await prisma.blogPost.update({
      where: { id: existing.id },
      data: { content, quiz, status: "Published" },
    })
    console.log("Updated!")
  } else {
    await prisma.blogPost.create({
      data: {
        title: "Great Zimbabwe: The Stone City of the Sky",
        slug: "great-zimbabwe-the-stone-city-of-the-sky",
        content,
        excerpt:
          "Imagine walking through a valley and looking up to see a massive city made entirely of stone. This is Great Zimbabwe, the capital of a vast African empire that ruled between 1100 and 1450.",
        coverImage: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80",
        category: "History",
        quiz,
        status: "Published",
      },
    })
    console.log("Blog post created!")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
