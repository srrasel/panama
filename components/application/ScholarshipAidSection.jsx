import Link from "next/link";
import React from "react";

const ScholarshipAidSection = ({
  // Background image
  backgroundImage = "/academic/background.jpg",

  // Content
  title = "Scholarship Aid",

  eligibilityText = "A family's eligibility for aid is determined through careful analysis of information provided on the scholarship aid application, Clarity, and through review of a family's current, complete, federal tax return. This analysis identifies the dollar amount of a family's discretionary income that is available for tuition and fees.",
  clarityText = "Clarity",

  encouragementText = "We strongly encourage families to apply for aid during the application process if they believe that, at any time during their child's tenure at Pamavambo, they will need scholarship aid. It is unlikely that a family's aid eligibility will change unless there is a significant change in their circumstances such as job loss, additional tuition expenses for other children, or the death of a parent. Families who come to Pamavambo as full-pay, should expect to be full-pay throughout their time at the School barring any significant life event such as previously described.",

  deadline = "January 15",

  buttonText = "Learn More About Scholarship Aid",
  buttonLink = "/scholarship-aid",
}) => {
  return (
    <section className="relative min-h-[500px] flex items-center py-24 px-6 md:px-20 lg:px-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Light overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-white/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="font-serif text-3xl text-gray-900 mb-10">{title}</h2>

        <div className="space-y-8">
          {/* Eligibility text with bold Clarity */}
          <p className="text-gray-800 font-light leading-relaxed text-lg">
            {eligibilityText.split(clarityText).map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="font-bold border-b border-gray-900">
                    {clarityText}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>

          {/* Encouragement */}
          <p className="text-gray-700 font-light leading-relaxed">
            {encouragementText}
          </p>

          {/* Deadline */}
          <p className="text-gray-900 font-medium pt-2">
            The deadline to apply for scholarship aid is{" "}
            <span className="font-bold">{deadline}</span>.
          </p>

          {/* CTA (Server-safe navigation) */}
          <div className="pt-6">
            <Link
              href={buttonLink}
              className="inline-block text-[#9b031f] font-bold text-sm tracking-widest uppercase border-b-2 border-[#9b031f] pb-1 hover:text-red-900 hover:border-red-900 transition-all"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipAidSection;
