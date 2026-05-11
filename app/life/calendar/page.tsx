"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Clock, FileText, MapPin } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const INITIAL_VISIBLE_EVENTS = 5;
  const LOAD_MORE_STEP = 3;

  useEffect(() => {
    setDate(new Date());
  }, []);

  // Dummy events data
  const events = [
    {
      id: 1,
      date: "OCT 12",
      title: "Fall Academic Symposium",
      time: "10:00 AM - 2:00 PM",
      location: "Main Auditorium",
      description: "Annual symposium showcasing student research and academic achievements across all disciplines."
    },
    {
      id: 2,
      date: "OCT 15",
      title: "Parents' Weekend",
      time: "All Day",
      location: "Campus Wide",
      description: "A special weekend for parents to visit campus, meet faculty, and participate in school activities."
    },
    {
      id: 3,
      date: "OCT 20",
      title: "Guest Speaker: Dr. Jane Smith",
      time: "4:00 PM - 5:30 PM",
      location: "Science Center Hall",
      description: "Distinguished lecture series featuring renowned scientist Dr. Jane Smith discussing climate change."
    },
    {
      id: 4,
      date: "OCT 25",
      title: "Fall Drama Production",
      time: "7:00 PM - 9:30 PM",
      location: "Kirby Arts Center",
      description: "The theater department presents 'The Crucible'. Tickets available at the box office."
    },
    {
      id: 5,
      date: "NOV 01",
      title: "College Fair",
      time: "1:00 PM - 4:00 PM",
      location: "Field House",
      description: "Representatives from over 100 colleges and universities will be available to answer questions."
    },
    {
      id: 6,
      date: "NOV 05",
      title: "Community Service Day",
      time: "9:00 AM - 12:00 PM",
      location: "City Outreach Center",
      description: "Students and staff join local partners for service projects focused on education, environment, and food security."
    },
    {
      id: 7,
      date: "NOV 10",
      title: "Winter Sports Tryouts",
      time: "3:30 PM - 6:00 PM",
      location: "Athletics Complex",
      description: "Open tryouts for basketball, swimming, and track. Students should arrive with completed participation forms."
    },
    {
      id: 8,
      date: "NOV 14",
      title: "Student Art Showcase",
      time: "5:00 PM - 7:00 PM",
      location: "Visual Arts Gallery",
      description: "An exhibition of student work across painting, digital design, photography, and mixed media."
    },
    {
      id: 9,
      date: "NOV 19",
      title: "STEM Innovation Night",
      time: "6:00 PM - 8:30 PM",
      location: "Innovation Lab",
      description: "Families are invited to explore robotics demos, coding challenges, and engineering prototypes created by students."
    },
    {
      id: 10,
      date: "NOV 22",
      title: "Cultural Heritage Festival",
      time: "11:00 AM - 3:00 PM",
      location: "Central Courtyard",
      description: "A celebration of global cultures through music, dance, storytelling, and food hosted by student organizations."
    }
  ];

  const [visibleEvents, setVisibleEvents] = useState(INITIAL_VISIBLE_EVENTS);
  const displayedEvents = events.slice(0, visibleEvents);
  const hasMoreEvents = visibleEvents < events.length;

  const handleLoadMore = () => {
    setVisibleEvents((prev) => Math.min(prev + LOAD_MORE_STEP, events.length));
  };

  return (
    <>
      <Navbar />
      <SecondHero
        title="School Calendar"
        subtitle="Stay updated with upcoming events, academic schedules, and community gatherings."
        backgroundImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Calendar", href: "/life/calendar" }]}
      />
      
      <main className="bg-[#F7F6F3] min-h-screen font-['Montserrat']">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Calendar Widget & Filters */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-none shadow-sm border border-[#E5E7EB] sticky top-24">
              <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-[#1F2A44] border-b border-[#D4A437]/30 pb-4 uppercase tracking-tight">
                Select Date
              </h3>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-none border border-[#E5E7EB] p-4 shadow-sm"
                />
              </div>

              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <h4 className="font-bold text-[#1F2A44] mb-4 uppercase tracking-[0.1em] text-sm">
                  Filter by Category
                </h4>
                <div className="space-y-3">
                  {["Academics", "Athletics", "Arts", "Community"].map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[#D4A437] border-[#E5E7EB] rounded-none focus:ring-[#D4A437]" 
                        defaultChecked 
                      />
                      <span className="text-[#222222] group-hover:text-[#D4A437] transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick Download Links */}
            <div className="bg-[#1F2A44] p-8 rounded-none border border-[#0F1B2D]">
              <h4 className="font-bold text-[#D4A437] mb-6 uppercase tracking-widest text-sm">
                Downloads
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center text-[#F7F6F3] hover:text-[#D4A437] transition-all group">
                    <FileText className="w-5 h-5 mr-3 text-[#D4A437]" />
                    <span className="text-sm font-medium tracking-wide">2025-2026 Academic Calendar (PDF)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-[#F7F6F3] hover:text-[#D4A437] transition-all group">
                    <FileText className="w-5 h-5 mr-3 text-[#D4A437]" />
                    <span className="text-sm font-medium tracking-wide">Athletics Schedule (PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Events List */}
          <div className="lg:w-2/3">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-[#D4A437]/20 pb-6 gap-4">
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44]">
                Upcoming <span className="text-[#D4A437] italic">Events</span>
              </h2>
              <div className="text-[#222222]/60 text-xs uppercase tracking-[0.2em] font-semibold">
                Discover your journey
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Event Card Example */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="group flex flex-col sm:flex-row gap-8 bg-white p-8 rounded-none border-l-4 border-l-[#D4A437] shadow-sm hover:shadow-md transition-all duration-500 border border-[#E5E7EB]">
                  {/* Date Box */}
                  <div className="flex-shrink-0 w-full sm:w-28 h-28 bg-[#1F2A44] rounded-none flex flex-col items-center justify-center text-[#F7F6F3] group-hover:bg-[#D4A437] transition-colors duration-500">
                    <span className="text-3xl font-['Playfair_Display'] font-bold leading-none mb-1">15</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">MAY</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <div className="inline-block px-3 py-1 bg-[#F7F6F3] text-[#D4A437] text-[10px] font-bold uppercase tracking-widest mb-4">
                      Academic
                    </div>
                    <h4 className="text-2xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-3 group-hover:text-[#D4A437] transition-colors duration-300">
                      Annual Founders Day Celebration
                    </h4>
                    <div className="flex flex-wrap gap-6 text-xs text-[#222222]/70 mb-4 font-bold tracking-wider uppercase">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#D4A437]" />
                        09:00 AM - 04:00 PM
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#D4A437]" />
                        Main Auditorium
                      </span>
                    </div>
                    <p className="text-[#222222]/80 leading-relaxed text-sm">
                      Join us as we celebrate the rich history and values of Pamavambo Private Schools. A day filled with heritage, community, and vision for the future.
                    </p>
                  </div>
                  
                  {/* Action Arrow */}
                  <div className="hidden sm:flex flex-col justify-center items-center pl-6 border-l border-[#E5E7EB]">
                     <div className="w-12 h-12 rounded-none bg-[#F7F6F3] flex items-center justify-center group-hover:bg-[#1F2A44] text-[#1F2A44] group-hover:text-[#D4A437] transition-all duration-300">
                        <ChevronRight className="w-6 h-6" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-16 text-center">
              <button
                type="button"
                className="px-12 py-4 bg-[#1F2A44] text-[#F7F6F3] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#D4A437] transition-all duration-300 rounded-none shadow-lg"
              >
                Load More Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}
