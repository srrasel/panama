"use client";

import DualActionCards from "@/components/common/DualActionCards";
import SchoolNewsCarousel from "@/components/common/SchoolNewsCarousel";
import ThirdHero from "@/components/common/ThirdHero";
import SocialFeed from "@/components/news/SocialFeed";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

const heroData = {
  backgroundImage:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Student Life", href: "/life/student-life" },
    { label: "News and Events" },
  ],
  title: "News and Media",
  description:
    "Welcome to the Pamavambo community! Read stories about what matters to us and what's happening on campus.",
  tintColor: "#1F2A44",
  tintOpacity: 80,
};

const cardsData = [
  {
    title: "18:10 Podcast",
    description:
      "A Pamavambo graduate is ready. Ready to embrace higher education and engage in the professional world; to create cultures of belonging; to enter any conversation with confidence and an open mind. In 18 minutes and 10 seconds, we explore the future of education with insights from bright-minded individuals, inspiring new ways of thinking. Stay tuned for future episodes and email us at communication@pamavambo.org to get in touch.",
    buttonText: "Listen Now",
    href: "/podcasts",
    backgroundImage:
      "/new/Picture10.png",
  },
  {
    title: "Photo Albums",
    description:
      "When participating in co-curriculars, students learn through shared experience, varying perspectives, and a mutual accountability that encourages tenacity, resilience, empathy, and compassionate objectivity. The vibrant community at the Pamavambo Private School is documented in the albums on our Flickr account. Updated throughout the year, our photo albums are full of beautiful, high-resolution, professional photographs that are available for download.",
    buttonText: "Take a Look",
    href: "/life/campus",
    backgroundImage:
      "/new/image5.jpeg",
  },
];

const blogFallbackImages = [
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
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

export default function News() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [podcastPosts, setPodcastPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        const posts = (data.posts || []).map((b, index) => ({
          id: b.id,
          title: b.title,
          date: formatDate(b.createdAt),
          image:
            b.coverImage?.startsWith("/new/")
              ? b.coverImage
              : blogFallbackImages[index % blogFallbackImages.length],
          description: b.excerpt || "",
          href: `/news/${b.slug}`,
        }));
        setBlogPosts(posts);
      })
      .catch(() => {});

    fetch("/api/podcasts")
      .then((r) => r.json())
      .then((data) => {
        const pods = (data.podcasts || []).map((p) => ({
          id: p.id,
          title: p.title,
          date: formatDate(p.createdAt),
          image:
            p.coverImage ||
            "/new/image27.jpeg",
          description: p.description || "",
          href: `/podcasts/${p.slug}`,
        }));
        setPodcastPosts(pods);
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <Navbar />
      <ThirdHero {...heroData} />

       {blogPosts.length > 0 && (
        <SchoolNewsCarousel
          title="Latest Blog Posts"
          description="Insights, reflections, and perspectives from across the Pamavambo Private School community."
          buttonText="View All Blog Posts"
          newsPosts={blogPosts}
          buttonLink="/news"
        />
      )}

      {podcastPosts.length > 0 && (
        <SchoolNewsCarousel
          title="Latest Podcasts"
          description="Listen to inspiring conversations and stories from our community."
          buttonText="View All Podcasts"
          newsPosts={podcastPosts}
          buttonLink="/podcasts"
        />
      )}

      <SocialFeed />
      <DualActionCards cardData={cardsData} />
      <Footer />
    </>
  );
}
