import React from 'react';

const OurLocation = ({ 
  jumpLinks = [
    "HOUSES",
    "CLASSROOMS AND LIBRARY",
    "ATHLETICS FACILITIES",
    "ARTS SPACES",
    "DINING AND COMMUNITY",
    "CAMPUS MAP"
  ]
}) => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-20 lg:px-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Geographic Stats */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h2 className="font-serif text-5xl text-gray-900 mb-10 leading-tight">
              Our <br /> Location
            </h2>
            
            <div className="space-y-6">
              {[
                { l: "5 minutes from", v: "PRINCETON" },
                { l: "40 miles north of", v: "PHILADELPHIA" },
                { l: "55 miles south of", v: "NEW YORK CITY" }
              ].map((stat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-1.5 h-10 bg-[#C5A059] shrink-0" />
                  <p className="text-gray-700 font-light pt-1 text-lg">
                    {stat.l} <span className="font-bold text-gray-900">{stat.v}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transit Info */}
          <div className="flex gap-4">
            <div className="w-1.5 h-44 bg-[#C5A059] shrink-0" />
            <div className="space-y-4">
              <div>
                <p className="font-bold text-[#00A3A1]">4 international AIRPORTS:</p>
                <p className="italic text-gray-500 text-sm">Philadelphia, Newark, JFK, LaGuardia</p>
              </div>
              <p className="text-gray-700 font-light">10-min drive to <span className="font-bold text-[#00A3A1]">NJ Transit Train Station</span></p>
              <p className="text-gray-700 font-light">12-min drive to <span className="font-bold text-[#00A3A1]">Amtrak Train Station</span></p>
            </div>
          </div>
        </div>

        {/* Center: Regional SVG Map */}
        <div className="lg:col-span-5 flex justify-center py-10">
          <svg 
            viewBox="0 0 400 600" 
            className="w-full max-w-87.5 h-auto text-[#C5A059]"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Simplified NJ Outline */}
            <path d="M180,50 L220,70 L250,150 L280,180 L250,250 L260,350 L220,550 L180,580 L140,550 L170,450 L150,380 L110,320 L130,220 L120,150 L150,80 Z" />
            
            {/* Map Markers */}
            <circle cx="200" cy="220" r="8" fill="#333" stroke="none" /> {/* Princeton Area */}
            <path d="M190,240 L210,240 L200,220 Z" fill="#00A3A1" stroke="none" transform="translate(-15, 10)" /> {/* Transit Diamond */}
            <path d="M200,210 L205,225 L220,225 L210,235 L215,250 L200,240 L185,250 L190,235 L180,225 L195,225 Z" fill="#9b031f" stroke="none" /> {/* School Star */}
          </svg>
        </div>

        {/* Right: Sidebar Sidebar */}
        <div className="lg:col-span-3 bg-[#D9F2F1] p-10 md:p-12 shadow-sm">
          <h3 className="font-serif text-4xl text-gray-900 mb-8 leading-tight">
            Jump to...
          </h3>
          <ul className="space-y-6">
            {jumpLinks.map((link) => (
              <li key={link} className="cursor-pointer group">
                <span className="text-[11px] font-bold tracking-[0.2em] text-gray-800 group-hover:text-[#00A3A1] transition-colors block">
                  {link}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default OurLocation;