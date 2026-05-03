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
  tintColor: "#4A6FA5",
  tintOpacity: 90,
};

const cardsData = [
  {
    title: "18:10 Podcast",
    description:
      "A Pamavambo graduate is ready. Ready to embrace higher education and engage in the professional world; to create cultures of belonging; to enter any conversation with confidence and an open mind. In 18 minutes and 10 seconds, we explore the future of education with insights from bright-minded individuals, inspiring new ways of thinking. Stay tuned for future episodes and email us at communication@pamavambo.org to get in touch.",
    buttonText: "Listen Now",
    href: "/podcasts",
    backgroundImage:
      "/new/image4.jpeg",
  },
  {
    title: "Photo Albums",
    description:
      "When participating in co-curriculars, students learn through shared experience, varying perspectives, and a mutual accountability that encourages tenacity, resilience, empathy, and compassionate objectivity. The vibrant community at the Pamavambo School is documented in the albums on our Flickr account. Updated throughout the year, our photo albums are full of beautiful, high-resolution, professional photographs that are available for download.",
    buttonText: "Take a Look",
    href: "/life/campus",
    backgroundImage:
      "/new/image5.jpeg",
  },
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
        const posts = (data.posts || []).map((b) => ({
          id: b.id,
          title: b.title,
          date: formatDate(b.createdAt),
          image:
            b.coverImage ||
            "/new/image26.jpeg",
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

      <SchoolNewsCarousel
        title="School Blogs"
        description="Insights, reflections, and perspectives from across the Pamavambo School community."
        buttonText="Read All Blog Posts"
        newsPosts={blogPosts}
      />

      {podcastPosts.length > 0 && (
        <SchoolNewsCarousel
          title="Latest Podcasts"
          description="Listen to inspiring conversations and stories from our community."
          buttonText="View All Podcasts"
          newsPosts={podcastPosts}
        />
      )}

      <SocialFeed />
      <DualActionCards cardData={cardsData} />
      <Footer />
    </>
  );
}
