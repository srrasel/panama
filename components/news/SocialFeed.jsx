import { Camera, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const SocialFeed = () => {
  // Updated posts with Unsplash images and descriptions
  const posts = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Students working on laptops",
      description:
        "Students collaborate on innovative projects in our new tech lab",
      platform: "Instagram",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Group shoveling snow",
      description: "Community comes together for annual winter service day",
      platform: "Instagram",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Winter weather announcement",
      description: "Campus transforms into a winter wonderland",
      platform: "Instagram",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Students around a campfire",
      description: "Evening gathering strengthens community bonds",
      platform: "Instagram",
    },
  ];

  return (
    <section className="bg-[#f2eade] py-16 px-4 md:px-12 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl text-[#002d24] mb-8 font-semibold">
          Social Media <span className="font-normal">@lvilleschool</span>
        </h2>

        {/* Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group overflow-hidden aspect-square rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Next.js Image Component */}
              <div className="relative w-full h-full">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={post.id === 1}
                />
              </div>

              {/* Hover Overlay with Description - FIXED: bg-linear-to-t → bg-gradient-to-t */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {/* Description */}
                <p className="text-white text-sm font-sans mb-2 line-clamp-3">
                  {post.description}
                </p>

                {/* Platform and Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-xs font-sans uppercase tracking-wider">
                    {post.platform}
                  </span>
                  <div className="text-white">
                    <Instagram size={18} className="drop-shadow-md" />
                  </div>
                </div>
              </div>

              {/* Static Instagram Icon (shown on non-hover) */}
              <div className="absolute bottom-3 right-3 text-white/80 group-hover:opacity-0 transition-opacity duration-300">
                <Instagram size={20} className="drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex flex-col items-end space-y-4">
          <p className="text-[#002d24] text-sm font-sans tracking-wide">
            Stay Connected with the Pamavambo Community
          </p>

          <div className="flex space-x-6 text-[#b08d57]">
            <a
              href="https://instagram.com/lvilleschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8c6d42] transition-colors duration-200 transform hover:scale-110"
            >
              <Instagram size={32} strokeWidth={1.5} />
            </a>
            <a
              href="https://flickr.com/lvilleschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8c6d42] transition-colors duration-200 transform hover:scale-110"
            >
              {/* Using Camera as a placeholder for the Flickr icon */}
              <Camera size={32} strokeWidth={1.5} />
            </a>
            <a
              href="https://youtube.com/lvilleschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8c6d42] transition-colors duration-200 transform hover:scale-110"
            >
              <Youtube size={32} strokeWidth={1.5} />
            </a>
            <a
              href="https://facebook.com/lvilleschool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8c6d42] transition-colors duration-200 transform hover:scale-110"
            >
              <Facebook size={32} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
