"use client";

export default function VideoSection() {
  // The YouTube ID from your URL
  const videoId = "wQMGRuVkip8";

  return (
    <section className="relative w-full py-24 bg-[#bc1a31] text-white overflow-hidden">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("/panel-red-background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />{" "}
      <div className="flex items-center w-full mb-8">
        <div className="grow h-0.5 bg-[#b89149]" />
        <h2 className="px-6 text-3xl md:text-4xl font-serif italic tracking-wide">
          ...Who Will You Become?
        </h2>
        <div className="grow h-0.5 bg-[#b89149]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Decorative Heading */}

        {/* Description */}
        <p className="max-w-2xl mb-12 text-sm md:text-base leading-relaxed font-light opacity-90">
          Through House and Harkness, Lawrenceville challenges a diverse
          community of promising young people to lead lives of learning,
          integrity, and high purpose. Our mission is to inspire the best in
          each to seek the best for all.
        </p>

        {/* Video Container - Shows YouTube directly */}
        <div className="relative w-full aspect-video shadow-2xl  overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/wQMGRuVkip8?si=FtcIRRYtWu4n64u-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
