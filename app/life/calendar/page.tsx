"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import Image from "next/image";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
    }
  ];

  return (
    <>
      <Navbar />
      <SecondHero
        title="School Calendar"
        subtitle="Stay updated with upcoming events, academic schedules, and community gatherings."
        backgroundImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Calendar", href: "/life/calendar" }]}
      />
      
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
             {/* Left Column: Calendar Widget & Filters */}
             <div className="lg:w-1/3 space-y-8">
               <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                 <h3 className="text-2xl font-serif mb-6 text-gray-900 border-b pb-4">Select Date</h3>
                 <div className="flex justify-center">
                   <Calendar
                     mode="single"
                     selected={date}
                     onSelect={setDate}
                     className="rounded-md border p-4 shadow-sm"
                   />
                 </div>
                 <div className="mt-6 pt-6 border-t border-gray-100">
                   <h4 className="font-bold text-gray-800 mb-3">Filter by Category</h4>
                   <div className="space-y-2">
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="checkbox" className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500" defaultChecked />
                       <span className="text-gray-700">Academics</span>
                     </label>
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="checkbox" className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500" defaultChecked />
                       <span className="text-gray-700">Athletics</span>
                     </label>
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="checkbox" className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500" defaultChecked />
                       <span className="text-gray-700">Arts</span>
                     </label>
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="checkbox" className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500" defaultChecked />
                       <span className="text-gray-700">Community</span>
                     </label>
                   </div>
                 </div>
               </div>
               
               {/* Quick Download Links */}
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4">Downloads</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-amber-700 hover:text-amber-900 hover:underline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        2025-2026 Academic Calendar (PDF)
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-amber-700 hover:text-amber-900 hover:underline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Athletics Schedule (PDF)
                      </a>
                    </li>
                  </ul>
               </div>
             </div>

             {/* Right Column: Events List */}
             <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                  <h2 className="text-3xl font-serif text-gray-900">Upcoming Events</h2>
                  <div className="text-gray-500 text-sm">Showing 5 upcoming events</div>
                </div>
                
                <div className="space-y-6">
                  {events.map((event) => (
                    <div key={event.id} className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                      {/* Date Box */}
                      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-amber-50 rounded-lg border border-amber-100 flex flex-col items-center justify-center text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                        <span className="text-2xl font-bold leading-none mb-1">{event.date.split(" ")[1]}</span>
                        <span className="text-sm font-semibold uppercase tracking-wider">{event.date.split(" ")[0]}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{event.title}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {event.location}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                      </div>
                      
                      {/* Action Arrow (Visible on Desktop) */}
                      <div className="hidden sm:flex flex-col justify-center items-center pl-4 border-l border-gray-100">
                         <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-100 text-gray-400 group-hover:text-amber-600 transition-colors">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors">
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
