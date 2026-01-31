const AdmissionDecisions = () => {
  const processSteps = [
    {
      title: "Admission Decision",
      content:
        "Admission decisions will be released on March 10. Applicants will be able to view their decision on their Admission Portal. For admitted students, there will be several opportunities to get to know Pamavambo even better in March and April.",
    },
    {
      title: "Discovery Days",
      content:
        "For admitted students, there will be several opportunities to get to know Pamavambo even better in March and April. The main event is a visit to campus with the chance to attend class, meet future classmates, teachers, and coaches, and learn about what life is like as a Laurentian.",
    },
    {
      title: "Enrollment Notification",
      content:
        "We ask families to confirm their enrollment at Pamavambo by April 10, as we welcome another incoming class of Laurentians!",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-20 lg:px-32">
      {/* Background Image - NO OPACITY, LOCAL IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/academic/background.jpg')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Three-Column Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
          {processSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-6">
              {/* Gold Decorative Icon */}
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="text-[#C5A059] fill-current"
                >
                  <path
                    d="M12 2L4 10h16L12 2zm0 18l8-8H4l8 8z"
                    className="opacity-50"
                  />
                  <path d="M12 6l-4 4h8l-4-4zm0 12l4-4H8l4 4z" />
                </svg>
              </div>

              <h3 className="font-serif text-2xl text-gray-900 leading-tight">
                {step.title}
              </h3>

              <p className="text-sm font-light text-gray-700 leading-relaxed px-4">
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionDecisions;
