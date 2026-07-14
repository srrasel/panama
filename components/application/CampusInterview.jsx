"use client";

const CampusInterviewSection = () => {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      {/* Background Image - FIXED: using url() with proper syntax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/academic/background.jpg')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-6 sm:mb-8 md:mb-12">
          Interview and Campus Visit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-20 gap-y-8 sm:gap-y-10 md:gap-y-12">
          {/* Left Column: Inquiry and Process */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-700 font-light leading-relaxed text-sm sm:text-base">
              Once you've submitted your{" "}
              <span className="font-bold">Inquiry Form</span>, you'll receive a
              link to sign up for an interview. Interviews are offered over the
              summer, and then typically conducted from September through
              January. On the interview date you select, you'll meet with one of
              our Admission Counselors either on campus or a meeting online.
            </p>
            <p className="text-gray-700 font-light leading-relaxed text-sm sm:text-base">
              Before your interview, you'll receive communication and
              instruction from our office and have opportunities to learn more
              about Pamavambo.
            </p>
          </div>

          {/* Right Column: Deadlines and International Info */}
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            <p className="text-gray-700 font-light leading-relaxed text-sm sm:text-base">
              If you've scheduled a{" "}
              <span className="font-bold">campus tour</span>, you'll have the
              opportunity to see our campus through the eyes of a student tour
              guide and to connect with other members of our community.
            </p>

            <div className="space-y-4">
              <p className="text-gray-700 font-light leading-relaxed">
                Day student interviews must be completed by{" "}
                <span className="font-bold">November 14, 2025</span>, while
                boarding student interviews must be completed by{" "}
                <span className="font-bold text-gray-900">
                  January 15, 2026.
                </span>
              </p>
            </div>

            <p className="text-gray-700 font-light leading-relaxed text-sm">
              All international students attending school abroad who are
              interested in applying to Pamavambo must{" "}
              <span className="font-bold">
                schedule their interview through Vericant
              </span>
              , a trusted video interview service. We are proud to join the list
              of top colleges and universities as well as peer independent
              schools utilizing Vericant to provide you with this personal touch
              to your application. Please note your Vericant session carries the
              full weight of fulfilling our interview requirement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusInterviewSection;
