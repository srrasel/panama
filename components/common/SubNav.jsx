import Link from "next/link";

const SubNav = ({ subNavItems = [] }) => {
  if (!Array.isArray(subNavItems)) {
    console.error("subNavItems must be an array");
    return null;
  }

  return (
    <nav className="border-t border-b border-[#b89149]/30 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6">
        <ul className="flex flex-wrap justify-center sm:justify-center md:justify-between gap-3 sm:gap-4 md:gap-4 lg:gap-6">
          {subNavItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[10px] sm:text-[10px] md:text-xs lg:text-xs font-bold tracking-wider sm:tracking-widest text-gray-800 hover:text-[#bc1a31] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-xs font-bold tracking-wider sm:tracking-widest text-gray-800 cursor-default">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Make sure to export as default
export default SubNav;
