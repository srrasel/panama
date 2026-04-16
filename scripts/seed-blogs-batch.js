// Run: node scripts/seed-blogs-batch.js
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const posts = [
  {
    title: "The Great Migration: Cradle of Humanity",
    slug: "the-great-migration-cradle-of-humanity",
    excerpt:
      "It is fascinating to think that every person on Earth today can trace their ultimate ancestry back to the same geographic starting line. Africa is called the Cradle of Humanity.",
    coverImage:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    category: "History",
    content: `It is fascinating to think that every person on Earth today can trace their ultimate ancestry back to the same geographic "starting line." Africa is called the "Cradle of Humanity" because it provided the perfect environment—rich in resources and diverse climates—for early humans to develop the physical and mental traits we have now.

For nearly 200,000 years, early humans lived primarily within Africa. However, roughly 60,000 to 90,000 years ago, a major wave of migration began. These early explorers didn't have maps or GPS; they likely followed migrating animal herds or searched for new water sources.

## How do we know?

Scientists use two main types of "clocks" to prove this:

**The Fossil Record:** Archaeologists have found the oldest Homo sapiens remains in places like Ethiopia and Morocco. As you move further away from Africa (into Europe or the Americas), the human fossils found there are much younger.

**The DNA Clock:** Geneticists have found that people living in Africa today have the highest amount of genetic diversity. This is a huge clue because it shows that human populations lived there the longest, allowing more time for small genetic variations to develop.

## Word Watch

- **Archaeologists:** Scientists who study human history by digging up and analyzing physical remains and artifacts.
- **Migrate:** To move from one region or habitat to another, especially according to the seasons or in search of better living conditions.
- **Homo sapiens:** The scientific name for modern humans (it means "wise man").`,
    quiz: JSON.stringify([
      {
        question: 'What does the phrase "Cradle of Humanity" mean?',
        options: [
          "The place where the first cities were built",
          "The region where modern humans first developed and grew",
          "A museum located in South Africa",
          "The name of the very first cave discovered by archaeologists",
        ],
        answer: 1,
      },
      {
        question: "What scientific name do experts give to modern humans?",
        options: [
          "Homo erectus",
          "Homo sapiens",
          "Australopithecus",
          "Neanderthal",
        ],
        answer: 1,
      },
      {
        question:
          "About how long ago did the first modern humans appear in Africa?",
        options: [
          "5,000 years ago",
          "50,000 years ago",
          "260,000 to 350,000 years ago",
          "1 million years ago",
        ],
        answer: 2,
      },
      {
        question:
          "What major discovery helped early humans survive cold nights and cook food?",
        options: ["The Wheel", "Fire", "Agriculture", "Iron Tools"],
        answer: 1,
      },
      {
        question:
          "According to DNA research, how much genetic material do all humans share?",
        options: ["50%", "75%", "Over 99.9%", "10%"],
        answer: 2,
      },
    ]),
  },
  {
    title: "Amazing African Animals With Superpowers",
    slug: "amazing-african-animals-with-superpowers",
    excerpt:
      "The African savanna is often called a battlefield, but it is actually more like a high-tech laboratory. Every animal has developed a superpower—a biological tool that allows it to survive.",
    coverImage:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    category: "Science",
    content: `The African savanna is often called a "battlefield," but it is actually more like a high-tech laboratory. Every animal you see has developed a "superpower"—a biological tool or behavior that allows it to survive in one of the toughest environments on Earth. Forget comic book heroes; these creatures have abilities that seem like science fiction.

## The Giraffe: The High-Pressure Engineer

The giraffe is the tallest land animal, but its true superpower is its circulatory system.

To get blood all the way up its long neck to its brain, the giraffe's heart has to be incredibly strong. It is two feet long and weighs about 25 pounds! But what happens when the giraffe puts its head down to drink? Why doesn't the blood rush to its head and cause it to faint?

Giraffes have a specialized "pressure valve" system at the base of their brain called the rete mirabile. This web of blood vessels regulates the flow, ensuring the pressure stays perfect whether they are standing tall or bending low.

## The Rhino: The Hair-Metal Armor

A Rhino's horn looks like a solid piece of bone, but it is actually made of keratin. This is the exact same protein that makes up your own hair and fingernails!

Unlike a deer's antlers, which are bone and can fall off, the rhino's horn is grown in tight layers of hair-like fibers. It is so strong it can flip a car, yet if it gets damaged, it can actually grow back over time. Their skin is another superpower: it is nearly two inches thick in some places, acting like a natural suit of armor against thorns and rival horns.

## The Cheetah: The Aerodynamic Jet

The cheetah is the fastest land animal, reaching speeds of 70 mph (112 km/h). Every part of its body is built for speed.

- **The Tail:** Acts like a rudder on a boat, allowing the cheetah to make sharp turns at high speeds without flipping over.
- **The Claws:** Unlike other cats, a cheetah's claws don't fully retract. They act like running spikes on an athlete's shoe, providing "traction" on the dirt.
- **The Tear Marks:** Those black lines running from their eyes aren't just for looks; they absorb sunlight to reduce glare, acting like natural sunglasses so they can hunt in the bright savanna.

## The Elephant: The Infrared Communicator

Elephants have the superpower of Infrasound. They can communicate with other herds miles away using sounds so low that human ears cannot hear them.

These vibrations travel through the ground. Elephants "hear" these messages through the sensitive skin on their feet and trunks. They can sense a rainstorm or a warning from a relative long before they can see or hear it with their ears.

## Word Watch

- **Circulatory System:** The system that moves blood and oxygen through the body.
- **Keratin:** The protein found in hair, nails, and rhino horns.
- **Traction:** The grip of a tire or foot on a surface to prevent sliding.
- **Infrasound:** Sound waves with frequencies below the lower limit of human audibility.
- **Retractable:** Capable of being drawn back or in (like most cat claws).`,
    quiz: JSON.stringify([
      {
        question: "What is a giraffe's horn or a rhino's horn made of?",
        options: [
          "Solid bone",
          "Hardened ivory",
          "Keratin (the same as hair)",
          "Packed sand",
        ],
        answer: 2,
      },
      {
        question:
          "How does a cheetah stay balanced when making high-speed turns?",
        options: [
          "Using its heavy head",
          "Using its long tail as a rudder",
          "By closing its eyes",
          "By slowing down",
        ],
        answer: 1,
      },
      {
        question:
          "What is the name of the special blood-pressure system in a giraffe's neck?",
        options: [
          "The Heart Valve",
          "The Rete Mirabile",
          "The Oxygen Pump",
          "The Gravity Stopper",
        ],
        answer: 1,
      },
      {
        question: 'How do elephants "hear" vibrations from miles away?',
        options: [
          "Through their large ears only",
          "Through the sensitive skin on their feet and trunks",
          "By using their tusks as antennas",
          "They cannot hear from miles away",
        ],
        answer: 1,
      },
      {
        question:
          'Why do cheetahs have black "tear marks" on their faces?',
        options: [
          "To look scary to predators",
          "To keep their face warm",
          "To absorb sunlight and reduce glare (like sunglasses)",
          "To help them hide in the grass",
        ],
        answer: 2,
      },
    ]),
  },
  {
    title: "The Secret Science of Bridges: Why They Don't Fall Down",
    slug: "the-secret-science-of-bridges",
    excerpt:
      "Every day, thousands of cars and heavy trucks drive over bridges. Have you ever wondered why they don't just snap in half? It's a constant battle between Tension and Compression.",
    coverImage:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    category: "Science",
    content: `Every day, thousands of cars and heavy trucks drive over bridges. Some bridges are made of wood, others of steel, and some are thousands of feet long. Have you ever wondered why they don't just snap in half?

Bridges are a constant battle between two invisible "monsters": Tension and Compression.

## The Tug-of-War: Tension vs. Compression

To understand bridges, you have to understand how they handle weight (also called the "load").

**Compression** is a force that pushes down or squeezes things together. Think of standing on an empty soda can; your weight is compressing it.

**Tension** is a force that pulls things apart. Think of a game of tug-of-war; the rope is under tension.

Every bridge in the world is designed to balance these two forces so they cancel each other out!

## The Arch Bridge: The Squeezer

The Arch bridge is one of the oldest designs. The Romans used them 2,000 years ago, and many are still standing!

**The Secret:** The arch shape is under pure compression. The weight of the cars on top is pushed outward along the curve of the arch and down into the ground at the ends (called abutments). Because stone is very good at being squeezed, these bridges last a long time.

## The Truss Bridge: The Power of Triangles

If you look at a railroad bridge, you'll see a lot of straight metal beams forming triangles. This is a Truss Bridge.

**The Secret:** The triangle is the strongest shape in geometry. When a heavy train goes over a truss, the triangles distribute the weight. Some beams get squeezed (compression) and others get pulled (tension), but the shape never changes!

## The Suspension Bridge: The Giant Puller

The most famous bridges, like the Golden Gate Bridge, are Suspension Bridges. They use massive cables to hang the road in mid-air.

**The Secret:** This bridge is all about tension. The long cables pull the weight of the road up and over the tall towers, which then push that weight straight down into the earth. This allows bridges to span huge distances where you can't build supports in the middle of the water.

## Word Watch

- **Load:** The total weight that a bridge has to support (cars, people, wind, and even snow).
- **Span:** The distance between two supports of a bridge.
- **Abutment:** The structure at the end of a bridge that supports it and connects it to the ground.
- **Engineer:** A person who uses math and science to design and build structures.
- **Rigid:** Something that is stiff and does not bend or change shape easily.`,
    quiz: JSON.stringify([
      {
        question: 'Which force is a "squeezing" force?',
        options: ["Tension", "Gravity", "Compression", "Magnetism"],
        answer: 2,
      },
      {
        question: "Why do engineers use triangles in Truss bridges?",
        options: [
          "They look better than circles",
          "Triangles are the strongest shape and don't change form easily",
          "They use less metal than squares",
          "They make the bridge lighter",
        ],
        answer: 1,
      },
      {
        question:
          "Which bridge is best for crossing a very long distance (like a wide bay)?",
        options: [
          "Beam Bridge",
          "Arch Bridge",
          "Suspension Bridge",
          "Wood Bridge",
        ],
        answer: 2,
      },
      {
        question:
          'What is the "tension" part of a Suspension bridge?',
        options: [
          "The stone towers",
          "The road itself",
          "The steel cables",
          "The water underneath",
        ],
        answer: 2,
      },
      {
        question:
          'True or False: Romans built bridges using "Dry-Stone" techniques without glue.',
        options: ["True", "False"],
        answer: 0,
      },
    ]),
  },
  {
    title: "The Pyramid King: Sudan and the Mystery of the Kushite Pyramids",
    slug: "the-pyramid-king-sudan",
    excerpt:
      "Egypt gets the fame, but Sudan has the numbers! Learn about the 200+ pyramids of the Kingdom of Kush and the Black Pharaohs who ruled the Nile.",
    coverImage:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    category: "History",
    content: `When someone says the word "pyramid," you probably picture the giant, sandy triangles in Egypt. But if you want to see the most pyramids in one place, you actually have to go to Sudan!

Thousands of years ago, a powerful civilization called the Kingdom of Kush ruled the lands south of Egypt. While they were neighbors and sometimes rivals with the Egyptians, the Kushites built over 200 pyramids—which is more than double the number found in all of Egypt!

## How are they different?

The pyramids in Sudan look quite different from the famous ones in Giza.

- **The Shape:** Sudanese pyramids are much smaller and have very steep, narrow sides.
- **The Purpose:** They were built as tombs for the Kings and Queens of Kush.
- **The Chapels:** Each pyramid has a small room at the front where people would come to pray and leave gifts for the royal family members buried inside.

## The "Black Pharaohs"

The Kushite kings were so powerful that they eventually conquered Egypt and ruled as the 25th Dynasty. History calls them the "Black Pharaohs." They brought wealth, iron-working technology, and a golden age of building to the Nile Valley that lasted for hundreds of years.

## Word Watch

- **Kingdom of Kush:** An ancient African kingdom located in what is now Sudan.
- **Dynasty:** A series of rulers from the same family.
- **Architecture:** The art and science of designing and building structures.
- **Kushites:** The people who lived in the Kingdom of Kush.
- **Meroe:** One of the capital cities of Kush where most of the pyramids are located today.`,
    quiz: JSON.stringify([
      {
        question:
          "Which country has the highest number of ancient pyramids?",
        options: ["Egypt", "Sudan", "Mexico", "Italy"],
        answer: 1,
      },
      {
        question:
          "How do Sudanese pyramids look different from Egyptian ones?",
        options: [
          "They are much wider and flatter",
          "They are made of blue glass",
          "They are smaller with very steep, narrow sides",
          "They are built underwater",
        ],
        answer: 2,
      },
      {
        question:
          "What was the name of the ancient empire that built these pyramids?",
        options: [
          "The Roman Empire",
          "The Kingdom of Kush",
          "The Mali Empire",
          "The Aztec Empire",
        ],
        answer: 1,
      },
      {
        question: "What were these pyramids used for?",
        options: [
          "Storing extra grain for the city",
          "Homes for the royal family",
          "Tombs for kings and queens",
          "Libraries for ancient scrolls",
        ],
        answer: 2,
      },
      {
        question:
          "What is the name of the city in Sudan where many of these pyramids are found?",
        options: ["Cairo", "Meroe", "Timbuktu", "Rome"],
        answer: 1,
      },
    ]),
  },
  {
    title: "The 3,000-Year-Old Snack: Nature's Eternal Gold",
    slug: "the-3000-year-old-snack",
    excerpt:
      "Honey never spoils. Archaeologists found honey in Egyptian tombs that is thousands of years old and still tastes perfectly fine. Discover the science behind this magic.",
    coverImage:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
    category: "Science",
    content: `Imagine finding a jar of food in a dusty, dark tomb that was sealed shut three thousand years ago. Most foods—like bread, meat, or fruit—would have turned to dust centuries ago. But if that jar is filled with honey, you could grab a spoon and eat it right now!

Archaeologists exploring ancient Egyptian tombs have actually found pots of honey that were 3,000 years old. After a little warming up, it was still sweet, safe, and perfectly edible. Honey is the only food in the world that truly never spoils.

## The Science of "Forever"

How does honey pull off this magic trick? It comes down to a perfect "triple threat" of science:

**Low Water Content:** Bacteria and mold need moisture to grow. Honey is mostly sugar and has very little water. It acts like a sponge that sucks the moisture out of any bacteria that tries to move in, essentially "mummifying" the germs before they can spoil the food.

**Natural Acidity:** Honey is quite acidic (it has a low pH). Most bacteria prefer a neutral environment, so the acid in honey acts like a "keep out" sign for germs.

**Bee Power:** When bees make honey, they flap their wings to dry out the nectar. They also add a special enzyme from their stomachs called glucose oxidase. This enzyme creates hydrogen peroxide, a natural disinfectant that kills off any tiny invaders.

## Word Watch

- **Edible:** Something that is safe and okay for humans to eat.
- **Preserve:** To keep something in its original state or prevent it from decaying.
- **Enzyme:** A natural substance produced by a living organism that speeds up a chemical reaction.
- **Acidity:** A measure of how much acid is in a substance (measured on the pH scale).
- **Archaeologist:** A scientist who studies human history by digging up sites and analyzing artifacts.`,
    quiz: JSON.stringify([
      {
        question:
          "Why did the honey found in ancient Egyptian tombs stay fresh for 3,000 years?",
        options: [
          "The tombs had refrigerators.",
          "Honey has very little water and is naturally acidic.",
          "The Egyptians added salt to the honey.",
          "Honey is made of plastic.",
        ],
        answer: 1,
      },
      {
        question:
          "What do bees add to honey that creates a natural disinfectant?",
        options: [
          "Extra sugar",
          "Water from flowers",
          "A special enzyme called glucose oxidase",
          "Sand from the desert",
        ],
        answer: 2,
      },
      {
        question:
          "Which of these is NOT a reason honey lasts forever?",
        options: [
          "It is very acidic.",
          "It has a very low water content.",
          "It is kept in glass jars.",
          "It contains natural hydrogen peroxide.",
        ],
        answer: 2,
      },
      {
        question:
          "What happens to bacteria if they try to grow in honey?",
        options: [
          "They grow faster because of the sugar.",
          "They turn into honey themselves.",
          "They lose their moisture and cannot survive.",
          "They sleep for 3,000 years.",
        ],
        answer: 2,
      },
      {
        question:
          'If you find a jar of honey that has turned hard and "crunchy," is it spoiled?',
        options: [
          "Yes, throw it away immediately.",
          'No, it has just "crystallized" and can be melted back into liquid.',
          "Yes, that means bacteria have taken over.",
          "No, but it will taste like salt.",
        ],
        answer: 1,
      },
    ]),
  },
  {
    title: "Dr. Ketchup's Miracle Medicine",
    slug: "dr-ketchups-miracle-medicine",
    excerpt:
      "In the 1830s, people thought tomatoes were a cure for stomach aches. Before ketchup was a condiment, it was sold as medicine in pharmacies!",
    coverImage:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    category: "History",
    content: `Today, if you have a stomach ache, your parents might give you an antacid or some ginger ale. But if you lived in the year 1834, you might have walked into a pharmacy and walked out with a bottle of ketchup pills!

Before it was the favorite topping for fries and burgers, ketchup was marketed as a powerful medicine. A doctor named John Cook Bennett claimed that tomatoes were a "superfood" that could cure almost any ailment, from indigestion to jaundice.

## From Pills to Plates

Dr. Bennett didn't just tell people to eat tomatoes; he turned them into concentrated pills. He sold them across the United States, and for a few years, "Tomato Pills" were a massive hit.

However, the "Ketchup Cure" didn't last forever. Here is how it changed:

**The Copycats:** Other people started making fake tomato pills that were just filled with flour and didn't help anyone feel better.

**The Science:** Doctors realized that while tomatoes are healthy, they weren't a magical cure for every sickness.

**The Condiment:** By the late 1800s, people realized they liked the taste of tomato sauce more than the medicine. Companies started adding sugar and vinegar, turning it into the sweet condiment we know today!

## Word Watch

- **Ailment:** A minor illness or a physical sickness.
- **Condiment:** A sauce or seasoning (like mustard or ketchup) added to food to improve its flavor.
- **Indigestion:** Pain or discomfort in the stomach caused by difficulty digesting food.
- **Pharmacy:** A store where medicinal drugs are prepared and sold.
- **Concentrated:** Something that has been made stronger by removing water or other liquids.`,
    quiz: JSON.stringify([
      {
        question:
          "Who was the doctor that first claimed ketchup could be used as medicine?",
        options: [
          "Dr. Heinz",
          "Dr. John Cook Bennett",
          "Dr. Tomato",
          "Dr. McFry",
        ],
        answer: 1,
      },
      {
        question:
          "In what form was ketchup sold at pharmacies in the 1830s?",
        options: [
          "Liquid in a squeeze bottle",
          "Dried powder",
          "Pills",
          "Gummy bears",
        ],
        answer: 2,
      },
      {
        question:
          "Which of these was a reason people stopped using ketchup as medicine?",
        options: [
          "People ran out of tomatoes.",
          "Fake pills were being sold that didn't work.",
          "Tomatoes were declared illegal.",
          "It was too expensive.",
        ],
        answer: 1,
      },
      {
        question: 'What does the word "condiment" mean?',
        options: [
          "A type of doctor",
          "A minor stomach illness",
          "A sauce used to add flavor to food",
          "A very old building",
        ],
        answer: 2,
      },
      {
        question:
          "What ailment did Dr. Bennett claim his tomato pills could cure?",
        options: [
          "Broken bones",
          "Stomach aches and indigestion",
          "Ear infections",
          "Sleepwalking",
        ],
        answer: 1,
      },
    ]),
  },
  {
    title: "The Mini-Country: Vatican City",
    slug: "the-mini-country-vatican-city",
    excerpt:
      "Vatican City is the smallest country on Earth. It is less than one square mile—smaller than many local city parks. You can walk across it in 20 minutes!",
    coverImage:
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800",
    category: "Geography",
    content: `Imagine a country so small that you could fit it inside a public park. You don't need a car or a train to travel from one side to the other—you just need a good pair of walking shoes!

Welcome to Vatican City. Located entirely inside the city of Rome, Italy, it is officially the smallest independent country in the entire world. It covers only about 0.17 square miles. To give you an idea of how tiny that is, you could walk across the entire nation in just about 20 minutes!

## A Country Within a City

Even though Vatican City is surrounded by Italy, it has its own government, its own flag, and even its own post office and radio station. It is a "city-state," meaning the city is the country.

## The Center of History and Art

Because Vatican City is the center of the Catholic Church, it is filled with some of the most famous art and buildings in human history:

- **St. Peter's Basilica:** One of the largest and most beautiful churches in the world.
- **The Sistine Chapel:** Famous for its ceiling painted by the artist Michelangelo.
- **The Swiss Guard:** The country's "army." You can recognize them by their famous bright blue, red, and orange striped uniforms. They have been protecting the Pope and the Vatican for over 500 years!

## Word Watch

- **Independent:** A country that rules itself and is not part of another country's government.
- **Vatican City:** A tiny country that serves as the headquarters of the Roman Catholic Church.
- **City-State:** An independent country that consists of a single city and its surrounding territory.
- **Swiss Guard:** The small group of soldiers responsible for the safety of the Pope.
- **Enclave:** A territory or country that is completely surrounded by the territory of another country.`,
    quiz: JSON.stringify([
      {
        question: "Where is Vatican City located?",
        options: [
          "In the middle of the ocean",
          "Entirely inside the city of Rome, Italy",
          "Between France and Spain",
          "In North Africa",
        ],
        answer: 1,
      },
      {
        question:
          "About how long does it take to walk across the entire country?",
        options: ["5 hours", "2 days", "20 minutes", "1 minute"],
        answer: 2,
      },
      {
        question:
          'What makes Vatican City an "independent" country?',
        options: [
          "It has the largest army in the world.",
          "It rules itself and is not part of Italy's government.",
          "It is older than any other country.",
          "Everyone there speaks a secret language.",
        ],
        answer: 1,
      },
      {
        question:
          "What is the name of the famous soldiers who protect Vatican City?",
        options: [
          "The Roman Legion",
          "The Italian Police",
          "The Swiss Guard",
          "The Vatican Knights",
        ],
        answer: 2,
      },
      {
        question:
          "Which famous artist painted the ceiling of the Sistine Chapel?",
        options: [
          "Leonardo da Vinci",
          "Michelangelo",
          "Pablo Picasso",
          "Vincent van Gogh",
        ],
        answer: 1,
      },
    ]),
  },
  {
    title: "Russia's 11 Breakfasts: The Country with 11 Time Zones",
    slug: "russias-11-breakfasts",
    excerpt:
      "Russia is so huge it spans 11 time zones. When a kid in the West is eating breakfast, a kid in the East is already going to bed.",
    coverImage:
      "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800",
    category: "Geography",
    content: `Imagine you have a friend who lives on the other side of your country. You decide to call them at 8:00 AM while you're eating your cereal. But when they pick up, they are wearing pajamas and brushing their teeth for bed!

In most countries, this would be impossible. But in Russia, it happens every single day. Russia is the largest country on Earth by land area—so large, in fact, that it spans 11 different time zones.

## What is a Time Zone?

Because the Earth is a sphere that rotates, the sun doesn't hit every part of the planet at once. To keep life organized, humans divided the world into vertical slices called time zones.

Usually, as you travel across a continent, the time changes by one hour every few hundred miles. Most countries fit into one or two of these slices. But Russia is so incredibly wide that it stretches across nearly half of the Northern Hemisphere!

## The Great Siberian Journey

If you hopped on the famous Trans-Siberian Railway (the longest train ride in the world) to travel from the capital, Moscow, all the way to the Pacific Ocean, your watch would be very confused.

- **The West:** In cities like St. Petersburg, it might be a sunny morning.
- **The Middle:** In the snowy mountains of the Urals, it's already lunchtime.
- **The East:** In Vladivostok, the sun is setting over the ocean.

By the time you reach the end of your trip, you will have changed your clock 10 times!

## Word Watch

- **Time Zone:** A geographic region where the same standard time is used.
- **Sphere:** A solid, round shape (like a ball or the Earth).
- **Rotate:** To turn or spin around a center point.
- **Hemisphere:** Half of the Earth (usually divided into Northern/Southern or Eastern/Western).
- **Span:** To extend across a certain amount of space.`,
    quiz: JSON.stringify([
      {
        question: "How many time zones does Russia have?",
        options: ["3", "24", "11", "5"],
        answer: 2,
      },
      {
        question:
          "Why do different parts of the world have different times?",
        options: [
          "Because the Earth is flat",
          "Because the Earth rotates and the sun hits different areas at different times",
          "Because kings and queens like different schedules",
          "To make traveling more difficult",
        ],
        answer: 1,
      },
      {
        question:
          "If a kid in Western Russia is eating breakfast, what might a kid in Eastern Russia be doing?",
        options: [
          "Eating breakfast at the same time",
          "Going to bed",
          "Just waking up",
          "It's always the same time in Russia",
        ],
        answer: 1,
      },
      {
        question:
          "What is the name of the famous long-distance train in Russia?",
        options: [
          "The Polar Express",
          "The Trans-Siberian Railway",
          "The Orient Express",
          "The Bullet Train",
        ],
        answer: 1,
      },
      {
        question:
          "Russia is the largest country in the world by...",
        options: [
          "Population (number of people)",
          "Number of oceans",
          "Land area",
          "Number of languages",
        ],
        answer: 2,
      },
    ]),
  },
  {
    title: "The Brain Janitors: Why You Sleep",
    slug: "the-brain-janitors-why-you-sleep",
    excerpt:
      "While you are dreaming, your brain is working hard at a night shift—sending in the janitors to clean up waste. Discover the Glymphatic System.",
    coverImage:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
    category: "Science",
    content: `Have you ever wondered why you spend about one-third of your life asleep? It's not just because your body is tired. While you are dreaming, your brain is actually working hard at a "night shift." It's basically sending in the janitors to clean up the mess left over from your day.

## The Brain's Secret Plumbing

For a long time, scientists didn't understand how the brain got rid of waste. Other parts of your body use a system called the "lymphatic system," but the brain is sealed off behind a protective wall.

In 2012, researchers discovered the Glymphatic System. Think of it as a plumbing system for your head.

**When you're awake:** Your brain cells are busy thinking, playing, and learning. This creates "trash" (proteins and chemicals) that builds up between the cells.

**When you're asleep:** Your brain cells actually shrink by about 60%! This creates extra space for a special fluid called Cerebrospinal Fluid (CSF) to rush through like a dishwasher, scrubbing away the trash.

## Cleaning for Clarity

If the "janitors" don't get enough time to clean (because you stayed up too late), the trash stays in your brain. This is why you feel "foggy," grumpy, and have a hard time remembering things the next day. A clean brain is a fast brain!

## Word Watch

- **Glymphatic System:** The waste clearance system in the brain.
- **Cerebrospinal Fluid (CSF):** The clear liquid that surrounds and protects the brain and spine.
- **Protein:** In this case, "waste" molecules that can be harmful if they build up too much.
- **Cognitive:** Anything related to thinking, knowing, and remembering.
- **Janitor:** A person (or in this case, a system) that cleans and maintains a building or organ.`,
    quiz: JSON.stringify([
      {
        question:
          "What happens to your brain cells while you are sleeping?",
        options: [
          "They grow larger",
          "They disappear",
          "They shrink to let fluid pass through",
          "They turn off completely",
        ],
        answer: 2,
      },
      {
        question:
          'What is the name of the "dishwasher fluid" that cleans the brain?',
        options: [
          "Apple Juice",
          "Cerebrospinal Fluid (CSF)",
          "Blood",
          "Oxygen",
        ],
        answer: 1,
      },
      {
        question:
          "What is the name of the system discovered in 2012 that cleans the brain?",
        options: [
          "The Digestive System",
          "The Glymphatic System",
          "The Solar System",
          "The Nervous System",
        ],
        answer: 1,
      },
      {
        question:
          'Why do you feel "foggy" or tired when you don\'t sleep enough?',
        options: [
          "Your brain is hungry for snacks.",
          "The trash molecules haven't been cleaned out.",
          "Your brain has too much air in it.",
          "You forgot to wash your hair.",
        ],
        answer: 1,
      },
      {
        question:
          "About how much of your life do you spend sleeping?",
        options: ["10%", "50%", "One-third (about 33%)", "90%"],
        answer: 2,
      },
    ]),
  },
  {
    title: "Space Smells Like Steak",
    slug: "space-smells-like-steak",
    excerpt:
      "Astronauts returning from space walks say their suits smell like a mix of hot metal, diesel fumes, and burnt steak. Discover the science behind the cosmic scent.",
    coverImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    category: "Science",
    content: `Space is a vacuum, which means there is no air to breathe and no way for smells to travel. Because of this, you might think space smells like absolutely nothing. But according to astronauts who have stepped outside the International Space Station (ISS), the universe actually has a very distinct—and very weird—scent.

When astronauts finish a space walk and re-enter the station, they notice a strange aroma clinging to their suits, helmets, and tools. They describe it as a metallic "tang" mixed with the smell of burnt steak, hot metal, and even diesel fumes!

## Why Does It Smell Like a BBQ?

Scientists have a few theories about why the "great outdoors" of the galaxy smells like a kitchen nightmare:

**Dying Stars:** When stars explode, they release high-energy molecules called Polycyclic Aromatic Hydrocarbons (PAHs). These molecules are found all over the universe, but on Earth, they are also found in things like coal, oil, and... charred meat!

**Atomic Oxygen:** Space is full of single atoms of oxygen. When an astronaut goes outside, these atoms can "stick" to the fabric of their suit. When they come back into the air-filled space station and the pressure changes, these atoms turn into a smell that reminds us of ozone or burning metal.

## Word Watch

- **Vacuum:** A space that is completely empty of matter or air.
- **Polycyclic Aromatic Hydrocarbons (PAHs):** Chemical compounds found in space (and burnt food) that create strong smells.
- **Aroma:** A distinctive, typically pleasant (or at least strong) smell.
- **International Space Station (ISS):** A giant laboratory orbiting Earth where astronauts live and work.
- **Ozone:** A gas that has a sharp, clean smell, often noticed after a lightning storm.`,
    quiz: JSON.stringify([
      {
        question:
          'What is a "vacuum" in the context of space?',
        options: [
          "A machine used to clean the space station",
          "A space that is completely empty of air or matter",
          "A type of engine used in rockets",
          "A dark hole in the middle of a galaxy",
        ],
        answer: 1,
      },
      {
        question:
          "What do astronauts say their suits smell like after a space walk?",
        options: [
          "Fresh flowers and rain",
          "Nothing at all",
          "Burnt steak and hot metal",
          "Chocolate and vanilla",
        ],
        answer: 2,
      },
      {
        question:
          "What are the smelly molecules found in both dying stars and charred meat?",
        options: [
          "H2O",
          "PAHs (Polycyclic Aromatic Hydrocarbons)",
          "Helium",
          "Dust mites",
        ],
        answer: 1,
      },
      {
        question:
          "Where do astronauts usually notice this smell?",
        options: [
          "While they are floating outside in the vacuum",
          "On their gear after they come back inside the space station",
          "Only when they are eating dinner",
          "On the moon's surface",
        ],
        answer: 1,
      },
      {
        question:
          "Why can't you smell space while you are actually outside?",
        options: [
          "Because you are wearing a pressurized helmet and breathing tanked oxygen",
          "Because there are no smells in space",
          "Because it is too cold to smell anything",
          "Because space is too big for smells to reach you",
        ],
        answer: 0,
      },
    ]),
  },
  {
    title: "The Million-Pound Cloud",
    slug: "the-million-pound-cloud",
    excerpt:
      "A fluffy white cloud looks light, but it can weigh 1.1 million pounds! It stays up because the air beneath it is even denser. Discover how clouds float.",
    coverImage:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800",
    category: "Science",
    content: `When you look up at a big, fluffy white cloud on a summer day, it looks like a pile of cotton candy or a light, airy pillow. You might think that if a cloud fell on you, it would feel like being hit by a giant marshmallow.

But science tells a much heavier story. An average "fair-weather" cumulus cloud—the kind that looks like a fluffy head of cauliflower—actually weighs about 1.1 million pounds! That is the same as 100 school buses or a giant blue whale floating right over your head.

## If it's so heavy, why doesn't it fall?

If a million-pound object were made of lead or stone, it would crash to the ground instantly. So, how does a cloud stay up?

**The "Mist" Factor:** A cloud isn't one solid object. It is made of billions of tiny water droplets or ice crystals. These droplets are so small that they are 1/10th the width of a human hair!

**Updrafts:** Warm air rising from the ground (called an updraft) acts like an invisible hand, pushing the tiny droplets upward.

**Density:** Even though the cloud weighs a million pounds, it is spread out over a massive space (about a cubic kilometer). The air underneath the cloud is actually denser than the cloud itself, allowing the cloud to "float" on top of the air like a boat on the ocean.

## Word Watch

- **Cumulus:** A type of cloud that looks puffy and rounded, often with a flat base.
- **Density:** How much mass is packed into a specific volume.
- **Updraft:** A current of rising warm air.
- **Water Vapor:** Water in the form of a gas.
- **Cubic Kilometer:** A measurement of volume equal to a cube that is 1 kilometer long, wide, and high.`,
    quiz: JSON.stringify([
      {
        question:
          "About how much does an average fluffy cumulus cloud weigh?",
        options: [
          "10 pounds",
          "1,000 pounds",
          "1.1 million pounds",
          "1 billion pounds",
        ],
        answer: 2,
      },
      {
        question: "What are clouds actually made of?",
        options: [
          "Cotton candy and gas",
          "Billions of tiny water droplets or ice crystals",
          "White smoke from factories",
          "Light and air only",
        ],
        answer: 1,
      },
      {
        question:
          "What helps keep a heavy cloud floating in the sky?",
        options: [
          "Magnets in the atmosphere",
          'Warm air "updrafts" pushing upward',
          "The wind blowing it around",
          "Helium gas inside the cloud",
        ],
        answer: 1,
      },
      {
        question:
          'Why doesn\'t a cloud feel heavy when you walk through a "ground cloud" (fog)?',
        options: [
          "Because the weight is spread out over a very large space",
          "Because fog isn't actually a cloud",
          "Because your body is stronger than the water",
          "Because the water is invisible",
        ],
        answer: 0,
      },
      {
        question:
          "1.1 million pounds is roughly the same weight as...",
        options: [
          "One bicycle",
          "100 school buses",
          "A single feather",
          "A laptop computer",
        ],
        answer: 1,
      },
    ]),
  },
  {
    title: "Teaspoon of a Star: The Heaviest Matter in the Universe",
    slug: "teaspoon-of-a-star",
    excerpt:
      "A Neutron Star is so dense that a single teaspoon of its matter would weigh 6 billion tons—as much as a mountain. Discover the heaviest matter in the universe.",
    coverImage:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800",
    category: "Science",
    content: `Imagine you have a tiny magic teaspoon. You fly a spaceship to a distant star, scoop up just one teaspoon of its surface, and try to fly back home. Suddenly, your ship crashes! Why? Because that tiny bit of star-stuff weighs 6 billion tons—the same as a massive mountain on Earth.

This isn't science fiction; it's the reality of a Neutron Star. These are the "ghosts" of giant stars that exploded long ago. When a star dies, it collapses inward, packing an entire sun's worth of weight into a ball only the size of a small city.

## The Secret of "Density"

How can something so small be so heavy? The answer is density.

Think of a piece of fluffy cotton candy. It's big, but very light because the molecules are spread far apart. Now imagine taking that cotton candy and squishing it until it's the size of a marble. It's the same amount of "stuff," but now it's incredibly dense.

Neutron stars are the "squished cotton candy" of the universe. They are packed so tightly that the atoms inside them have actually collapsed. This makes them the densest objects scientists can actually see in space!

## Word Watch

- **Neutron Star:** The super-dense remains of a collapsed giant star.
- **Density:** How much "stuff" or mass is packed into a certain amount of space.
- **Matter:** The physical substance that everything in the universe is made of.
- **Collapse:** To fall inward suddenly or shrink down under great pressure.
- **Supernova:** The massive explosion of a star that can lead to the creation of a neutron star.`,
    quiz: JSON.stringify([
      {
        question:
          "How much would a single teaspoon of a neutron star weigh?",
        options: [
          "1 pound",
          "1 ton",
          "6 billion tons (the weight of a mountain)",
          "The weight of a car",
        ],
        answer: 2,
      },
      {
        question: "What is a neutron star?",
        options: [
          "A planet made of gas",
          "The remains of a giant star that exploded and collapsed",
          "A moon that orbits the sun",
          "A type of comet",
        ],
        answer: 1,
      },
      {
        question:
          'Which word describes how much "stuff" is packed into a space?',
        options: ["Gravity", "Density", "Velocity", "Distance"],
        answer: 1,
      },
      {
        question:
          "About how big is a neutron star in diameter?",
        options: [
          "The size of the Earth",
          "The size of the Sun",
          "The size of a small city (about 12 miles)",
          "The size of a football field",
        ],
        answer: 2,
      },
      {
        question:
          "What happens to the atoms inside a neutron star?",
        options: [
          "They float away into space",
          "They turn into liquid water",
          "They are crushed together incredibly tightly",
          "They disappear completely",
        ],
        answer: 2,
      },
    ]),
  },
  {
    title: "The 27-Ton Computer: Meet ENIAC",
    slug: "the-27-ton-computer-meet-eniac",
    excerpt:
      "The ENIAC computer (1945) filled an entire room, weighed 27 tons, and was less powerful than a simple modern calculator. Discover the origin of computing.",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    category: "Technology",
    content: `Think about the phone in your pocket or the laptop on your desk. They are light, fast, and fit in a backpack. But the world's first general-purpose electronic computer, built in 1945, was a literal giant.

It was called ENIAC (which stands for Electronic Numerical Integrator and Computer). It didn't sit on a desk; it took up an entire room, weighed 27 tons (as much as five African elephants!), and was held together by 5 million hand-soldered joints.

## Why was it so big?

Today, we use microscopic "chips" to run our apps. In the 1940s, those didn't exist. Instead, ENIAC used vacuum tubes.

- **The Numbers:** It had 18,000 vacuum tubes. These glass tubes looked like lightbulbs and got very, very hot.
- **The Heat:** ENIAC produced so much heat that it needed its own massive cooling fans just so it wouldn't melt!
- **The Power:** It used enough electricity to light up a small town. Legend says that when ENIAC was turned on, the lights in the nearby city of Philadelphia would dim.

## The Human "Software"

Back then, there were no keyboards or mice. To "program" the computer, you had to physically pull out long cables and plug them into different holes, sort of like an old-fashioned telephone switchboard.

Most of the people who did this difficult work were women. These brilliant mathematicians were known as the "Original Programmers." They had to figure out how to translate complex math problems into a web of wires and plugs.

## Word Watch

- **ENIAC:** The first programmable, electronic, general-purpose digital computer.
- **Vacuum Tube:** A glass tube that controls the flow of electricity; the "ancestor" of the modern computer chip.
- **General-Purpose:** A machine that can be programmed to do many different tasks, not just one.
- **Programmer:** A person who writes the instructions that tell a computer what to do.
- **Soldered:** Joining metal pieces together using a melted filler metal.`,
    quiz: JSON.stringify([
      {
        question: "How much did the ENIAC computer weigh?",
        options: [
          "100 pounds",
          "27 tons (as much as 5 elephants)",
          "1 ton",
          "500 tons",
        ],
        answer: 1,
      },
      {
        question:
          "What did ENIAC use instead of modern computer chips?",
        options: [
          "AAA batteries",
          "Vacuum tubes that looked like lightbulbs",
          "Steam engines",
          "Magic crystals",
        ],
        answer: 1,
      },
      {
        question:
          "What happened to the city lights when ENIAC was turned on?",
        options: [
          "They turned blue.",
          "They got brighter.",
          "They would dim because the computer used so much power.",
          "Nothing happened.",
        ],
        answer: 2,
      },
      {
        question:
          "How did the first programmers give instructions to ENIAC?",
        options: [
          "By typing on a keyboard",
          "By speaking into a microphone",
          "By plugging and unplugging long cables",
          "By using a touch screen",
        ],
        answer: 2,
      },
      {
        question: "Where was ENIAC built?",
        options: [
          "London, England",
          "Philadelphia, USA",
          "Tokyo, Japan",
          "Cairo, Egypt",
        ],
        answer: 1,
      },
    ]),
  },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const post of posts) {
    const existing = await prisma.blogPost.findFirst({
      where: { slug: post.slug },
    })
    if (existing) {
      console.log(`  SKIP: "${post.title}" (already exists)`)
      skipped++
      continue
    }

    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        category: post.category,
        quiz: post.quiz,
        status: "Published",
      },
    })
    console.log(`  CREATED: "${post.title}"`)
    created++
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
