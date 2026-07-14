"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SecondHero from "@/components/common/SecondHero";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect, useMemo } from "react";
import { ChevronRight, Clock, FileText, MapPin } from "lucide-react";

const CATEGORIES = ["Academics", "Athletics", "Arts", "Community"] as const;
const INITIAL_VISIBLE_EVENTS = 5;
const LOAD_MORE_STEP = 3;

type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  category: string | null;
  location: string | null;
  startTime: string;
  endTime: string;
};

function formatTimeRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  const startStr = s.toLocaleTimeString("en-US", opts);
  const endStr = e.toLocaleTimeString("en-US", opts);
  if (startStr === "12:00 AM" && endStr === "11:59 PM") return "All Day";
  return `${startStr} – ${endStr}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(CATEGORIES)
  );
  const [visibleEvents, setVisibleEvents] = useState(INITIAL_VISIBLE_EVENTS);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter((ev) => {
        const evDate = new Date(ev.startTime);
        if (evDate < now) return false;
        if (selectedDate && !isSameDay(evDate, selectedDate)) return false;
        if (ev.category && !selectedCategories.has(ev.category)) return false;
        if (!ev.category) {
          const fallback = ev.type === "Exam" ? "Academics" : "Community";
          if (!selectedCategories.has(fallback)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [events, selectedDate, selectedCategories]);

  const displayedEvents = upcomingEvents.slice(0, visibleEvents);
  const hasMoreEvents = visibleEvents < upcomingEvents.length;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
    setVisibleEvents(INITIAL_VISIBLE_EVENTS);
  };

  const handleLoadMore = () => {
    setVisibleEvents((prev) => Math.min(prev + LOAD_MORE_STEP, upcomingEvents.length));
  };

  const eventDates = useMemo(
    () => events.map((ev) => new Date(ev.startTime)),
    [events]
  );

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
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white p-8 rounded-none shadow-sm border border-[#E5E7EB] sticky top-24">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-[#1F2A44] border-b border-[#D4A437]/30 pb-4 uppercase tracking-tight">
                  Select Date
                </h3>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      setVisibleEvents(INITIAL_VISIBLE_EVENTS);
                    }}
                    modifiers={{ hasEvent: eventDates }}
                    modifiersClassNames={{ hasEvent: "font-bold text-[#D4A437]" }}
                    className="rounded-none border border-[#E5E7EB] p-4 shadow-sm"
                  />
                </div>

                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => setSelectedDate(undefined)}
                    className="mt-4 w-full text-xs font-bold uppercase tracking-widest text-[#D4A437] hover:text-[#1F2A44] transition-colors"
                  >
                    Show All Upcoming
                  </button>
                )}

                <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                  <h4 className="font-bold text-[#1F2A44] mb-4 uppercase tracking-[0.1em] text-sm">
                    Filter by Category
                  </h4>
                  <div className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-[#D4A437] border-[#E5E7EB] rounded-none focus:ring-[#D4A437]"
                          checked={selectedCategories.has(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        <span className="text-[#222222] group-hover:text-[#D4A437] transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

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

            <div className="lg:w-2/3">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 border-b border-[#D4A437]/20 pb-6 gap-4">
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#1F2A44]">
                  Upcoming <span className="text-[#D4A437] italic">Events</span>
                </h2>
                <div className="text-[#222222]/60 text-xs uppercase tracking-[0.2em] font-semibold">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                    : "Discover your journey"}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16 text-[#222222]/60">Loading events...</div>
              ) : displayedEvents.length === 0 ? (
                <div className="text-center py-16 bg-white border border-[#E5E7EB]">
                  <p className="text-[#222222]/60 text-lg">No events found.</p>
                  <p className="text-[#222222]/40 text-sm mt-2">
                    {selectedDate ? "Try selecting a different date or category." : "Check back soon for upcoming events."}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {displayedEvents.map((ev) => {
                    const evDate = new Date(ev.startTime);
                    const category = ev.category || (ev.type === "Exam" ? "Academics" : "Community");
                    return (
                      <div
                        key={ev.id}
                        className="group flex flex-col sm:flex-row gap-8 bg-white p-8 rounded-none border-l-4 border-l-[#D4A437] shadow-sm hover:shadow-md transition-all duration-500 border border-[#E5E7EB]"
                      >
                        <div className="flex-shrink-0 w-full sm:w-28 h-28 bg-[#1F2A44] rounded-none flex flex-col items-center justify-center text-[#F7F6F3] group-hover:bg-[#D4A437] transition-colors duration-500">
                          <span className="text-3xl font-['Playfair_Display'] font-bold leading-none mb-1">
                            {evDate.getDate()}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.2em]">
                            {evDate.toLocaleDateString("en-US", { month: "short" })}
                          </span>
                        </div>

                        <div className="flex-grow">
                          <div className="inline-block px-3 py-1 bg-[#F7F6F3] text-[#D4A437] text-[10px] font-bold uppercase tracking-widest mb-4">
                            {category}
                          </div>
                          <h4 className="text-2xl font-['Playfair_Display'] font-bold text-[#1F2A44] mb-3 group-hover:text-[#D4A437] transition-colors duration-300">
                            {ev.title}
                          </h4>
                          <div className="flex flex-wrap gap-6 text-xs text-[#222222]/70 mb-4 font-bold tracking-wider uppercase">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-[#D4A437]" />
                              {formatTimeRange(ev.startTime, ev.endTime)}
                            </span>
                            {ev.location && (
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-[#D4A437]" />
                                {ev.location}
                              </span>
                            )}
                          </div>
                          {ev.description && (
                            <p className="text-[#222222]/80 leading-relaxed text-sm">{ev.description}</p>
                          )}
                        </div>

                        <div className="hidden sm:flex flex-col justify-center items-center pl-6 border-l border-[#E5E7EB]">
                          <div className="w-12 h-12 rounded-none bg-[#F7F6F3] flex items-center justify-center group-hover:bg-[#1F2A44] text-[#1F2A44] group-hover:text-[#D4A437] transition-all duration-300">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {hasMoreEvents && (
                <div className="mt-16 text-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="px-12 py-4 bg-[#1F2A44] text-[#F7F6F3] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#D4A437] transition-all duration-300 rounded-none shadow-lg"
                  >
                    Load More Events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
