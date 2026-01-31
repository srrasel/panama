import { Mail } from "lucide-react";
import Image from "next/image";

const staffMembers = [
  {
    name: "David Bell",
    role: "Medical Director, Health and Wellness Center",
    image: "/path-to-bell.jpg", // Replace with actual image path
    isSeal: true, // First item uses the school seal instead of a photo
  },
  {
    name: "Etienne Bilodeau",
    role: "Acting Dean of Academics; Teacher, Mathematics Department",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    name: "Cameron Brickhouse",
    role: "Dean of Community and Belonging; Teacher, History Department",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=400",
  },
  {
    name: "Holly Burks Becker H'98 P'06 '09 '12",
    role: "Director, Office of College Counseling",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
  },
  {
    name: "Michaela Chipman",
    role: "Dean of Campus Wellbeing",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400",
  },
  {
    name: "Pete DeVine P'22",
    role: "Chief Operations Officer, Facilities Services",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    name: "Blake Eldridge '96, H'78, '12, P'25",
    role: "Assistant Head of School for Student Life; Dean of Students; Teacher, Religion and Philosophy Department",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
  },
  {
    name: "Ben Hammond P'23 '25",
    role: "Chief Financial and Administrative Officer, Secretary to the Board of Trustees",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
  },
];

const SeniorStaff = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <h2 className="font-serif text-5xl text-gray-900 mb-8">
            Senior Staff
          </h2>
          <p className="text-gray-700 font-light leading-relaxed text-lg">
            The Senior Staff group is the principal administrative committee
            representing all the major school departments. The group helps
            advise the Head of School and works on long-term planning for the
            school. Please click the names below to read biographies for our
            Senior Staff members.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
          {staffMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              {/* Profile Image with Crimson Border */}
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 border-[3px] border-[#9b031f] rounded-full -m-2" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                  {member.isSeal ? (
                    <div className="p-8 opacity-40 italic font-serif text-sm">
                      School Seal Placeholder
                    </div>
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 max-w-55">
                <h3 className="font-bold text-gray-900 text-sm border-b border-transparent group-hover:border-[#9b031f] transition-all cursor-pointer">
                  {member.name}
                </h3>
                <p className="text-[10px] font-medium text-gray-500 uppercase leading-tight tracking-wider">
                  {member.role}
                </p>
                {/* Email Icon */}
                <button className="pt-2 text-gray-400 hover:text-[#9b031f] transition-colors">
                  <Mail size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeniorStaff;
