import AboutSection from "@/components/home/About";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";
import ImageSection from "@/components/home/ImageSection";

import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <AboutSection />
      <ImageSection />
      <Footer />
    </>
  );
}
