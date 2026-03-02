"use client";

import Navbar from "@/components/Navbar";
import SecondHero from "@/components/common/SecondHero";
import Footer from "@/components/footer";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

// ---------- Types ----------
interface RawEvent {
  date: string;
  primary: string[];
  secondary: string[];
}

interface ProcessedEvent {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  dateDisplay: string;
  primary: string[];
  secondary: string[];
}

export default function CalendarPage() {
  // State for the calendar widget
  const [date, setDate] = useState<Date | undefined>(new Date());

  const parseDate = (dateStr: string, year = 2026): Date | null => {
    if (!dateStr) return null;

    // Map of month abbreviations and full names to month index
    const monthMap: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const lower = dateStr.toLowerCase().trim();

    // Check if it's a month name (full or abbreviated)
    if (monthMap[lower] !== undefined) {
      return new Date(year, monthMap[lower], 1);
    }

    // Check for dd/mm/yy format
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = 2000 + parseInt(parts[2], 10);
      return new Date(y, m, d);
    }

    return null;
  };

  const rawEvents: RawEvent[] = [
    // Term 1
    {
      date: "14/01/26",
      primary: ["School Opening"],
      secondary: ["School Opening"],
    },
    { date: "30/01/26", primary: ["Civvies"], secondary: [] },
    { date: "06/02/26", primary: [], secondary: ["Civvies"] },
    { date: "13/02/26", primary: [], secondary: ["Inter house Athletics"] },
    { date: "20/02/26", primary: ["Inter house Athletics"], secondary: [] },
    {
      date: "25/02/26",
      primary: ["1. Consultation", "2. Parents Meeting"],
      secondary: ["1. Consultation Form 3 and 4", "2. Parents Meeting"],
    },
    { date: "26-27/02/26", primary: ["Exeat"], secondary: ["Exeat"] },
    {
      date: "06/03/26",
      primary: ["Inter School Athletics"],
      secondary: ["Colour Run"],
    },
    { date: "9-23/03/26", primary: [], secondary: ["Exams"] },
    { date: "13/03/26", primary: ["Career’s Day"], secondary: [] },
    { date: "19-26/03/26", primary: ["Exams"], secondary: [] },
    { date: "25/03/26", primary: [], secondary: ["Inter schools Athletics"] },
    {
      date: "01/04/26",
      primary: ["School Close"],
      secondary: ["School Close"],
    },

    // Term 2
    {
      date: "12/05/26",
      primary: ["School Opening"],
      secondary: ["School Opening"],
    },
    { date: "28/05/26", primary: [], secondary: ["Africa Day/Culture"] },
    { date: "29/05/26", primary: ["Culture Day"], secondary: [] },
    { date: "30/05/26", primary: [], secondary: ["Civvies"] },
    { date: "05/06/26", primary: ["Clean up"], secondary: [] },
    {
      date: "24/06/26",
      primary: ["Consultation"],
      secondary: ["Consultation"],
    },
    { date: "25-26/06/26", primary: ["Exeat"], secondary: ["Exeat"] },
    { date: "03/07/26", primary: ["Inter Schools ball games"], secondary: [] },
    { date: "10/07/26", primary: [], secondary: ["Inter Schools ball games"] },
    { date: "22-29/07/26", primary: ["Exams"], secondary: ["Exams"] },
    { date: "31/07/26", primary: ["Talent Show"], secondary: [] },
    { date: "03/08/26", primary: [], secondary: ["Talent show"] },
    { date: "03/08/26", primary: ["Gr 7 Trip"], secondary: [] },
    {
      date: "06/08/26",
      primary: ["School Close"],
      secondary: ["School Close"],
    },
    { date: "10-12/08/26", primary: [], secondary: ["Trip - Mutare"] },

    // Term 3
    {
      date: "08/09/26",
      primary: ["School Opening"],
      secondary: ["School Opening"],
    },
    { date: "25/09/26", primary: ["Civvies"], secondary: [] },
    {
      date: "30/09/26",
      primary: [],
      secondary: ["Civvies Consultation Form 4s"],
    },
    { date: "02/10/26", primary: ["Clean up"], secondary: [] },
    { date: "October", primary: ["Gr 7 Exams"], secondary: [] },
    { date: "22-23/10/26", primary: ["Exeat"], secondary: ["Exeat"] },
    { date: "30/10/26", primary: ["ECD - Gr 2 Trip"], secondary: ["Civvies"] },
    { date: "02-06/11/26", primary: ["Gr3-6 Trips"], secondary: [] },
    { date: "Oct - Nov", primary: [], secondary: ["O LEVEL EXAMS"] },
    { date: "11-25/11/26", primary: ["Exams"], secondary: ["Exams"] },
    { date: "30/11/26", primary: [], secondary: ["Pro Night Form 4s"] },
    { date: "01/12/26", primary: ["Prize Giving ECD-Gr2"], secondary: [] },
    { date: "02/12/26", primary: ["Prize Giving Gr 3-6"], secondary: [] },
    {
      date: "03/12/26",
      primary: ["School Close"],
      secondary: ["School Close"],
    },
  ];

  const events: ProcessedEvent[] = rawEvents.map((raw, index) => {
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    let dateDisplay = raw.date;

    const dateStr = raw.date;

    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      const left = parts[0].trim();
      const right = parts[1].trim();

      if (right.includes("/")) {
        // e.g. "26-27/02/26"
        startDate = parseDate(left);
        endDate = parseDate(right);
        const startDay = left.split("/")[0];
        const endDay = right.split("/")[0];
        const month = right.split("/")[1];
        const monthNames = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ];
        dateDisplay = `${startDay}-${endDay} ${monthNames[parseInt(month, 10) - 1]}`;
      } else {
        // e.g. "Oct - Nov"
        startDate = parseDate(left);
        endDate = parseDate(right);
        dateDisplay = `${left.toUpperCase()} - ${right.toUpperCase()}`;
      }
    } else {
      // Single date
      startDate = parseDate(dateStr);
      if (dateStr.includes("/")) {
        const [day, month] = dateStr.split("/");
        const monthNames = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ];
        dateDisplay = `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]}`;
      } else {
        dateDisplay = dateStr.toUpperCase();
      }
    }

    return {
      id: index + 1,
      startDate,
      endDate,
      dateDisplay,
      primary: raw.primary,
      secondary: raw.secondary,
    };
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents: ProcessedEvent[] = events
    .filter((e) => e.startDate && e.startDate >= today)
    .sort(
      (a, b) => (a.startDate?.getTime() || 0) - (b.startDate?.getTime() || 0),
    );

  const [visibleCount, setVisibleCount] = useState<number>(5);
  const displayed = upcomingEvents.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(upcomingEvents.length);

  return (
    <>
      <Navbar />
      <SecondHero
        title="School Calendar"
        subtitle="Stay updated with upcoming events, academic schedules, and community gatherings."
        backgroundImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Calendar", href: "/life/calendar" },
        ]}
      />

      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Calendar Widget & Filters */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-2xl font-serif mb-6 text-gray-900 border-b pb-4">
                  Select Date
                </h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-4 shadow-sm"
                  />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-3">
                    Filter by Category
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                        defaultChecked
                      />
                      <span className="text-gray-700">Academics</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                        defaultChecked
                      />
                      <span className="text-gray-700">Athletics</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                        defaultChecked
                      />
                      <span className="text-gray-700">Arts</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                        defaultChecked
                      />
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
                    <a
                      href="#"
                      className="flex items-center text-amber-700 hover:text-amber-900 hover:underline"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      2025-2026 Academic Calendar (PDF)
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-amber-700 hover:text-amber-900 hover:underline"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Athletics Schedule (PDF)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-serif text-gray-900">
                  Upcoming Events
                </h2>
                <div className="text-gray-500 text-sm">
                  Showing {displayed.length} of {upcomingEvents.length} upcoming
                  events
                </div>
              </div>

              <div className="space-y-6">
                {displayed.map((event) => (
                  <div
                    key={event.id}
                    className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Date Box */}
                      <div className="shrink-0 w-full sm:w-28 h-28 bg-amber-50 rounded-lg border border-amber-100 flex flex-col items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-amber-900 transition-colors duration-300">
                        <span className="text-xl font-bold leading-none mb-1 text-center px-1">
                          {event.dateDisplay}
                        </span>
                      </div>

                      {/* Two‑column Primary / Secondary content */}
                      <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Primary Column */}
                        <div>
                          <h5 className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">
                            Primary
                          </h5>
                          {event.primary.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {event.primary.map((item, i) => (
                                <li key={i} className="text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400 italic">—</p>
                          )}
                        </div>

                        {/* Secondary Column */}
                        <div>
                          <h5 className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">
                            Secondary
                          </h5>
                          {event.secondary.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {event.secondary.map((item, i) => (
                                <li key={i} className="text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-400 italic">—</p>
                          )}
                        </div>
                      </div>

                      {/* Decorative arrow */}
                      <div className="hidden sm:flex flex-col justify-center items-center pl-4 border-l border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-100 text-gray-400 group-hover:text-amber-600 transition-colors">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < upcomingEvents.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
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
