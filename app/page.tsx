import AboutSection from "@/components/home/About";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";
import ImageSection from "@/components/home/ImageSection";
import VideoSection from "@/components/home/VideoSection";
import {  Nav } from "react-day-picker";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <ImageSection />
      <Footer />
    </>
  );
}
