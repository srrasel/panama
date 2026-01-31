const BoardOfTrustees = () => {
  const trustees = [
    {
      name: "STEPHEN S. MURRAY H'54 '55 '63 '65 '16 P'16 '21",
      role: "HEAD OF SCHOOL",
      location: "LAWRENCEVILLE, NEW JERSEY",
    },
    {
      name: "CELESTE MARIE MELLET '94 P'27",
      role: "PRESIDENT",
      location: "NEW YORK, NEW YORK",
    },
    {
      name: "T. ROBERT ZOCHOWSKI JR. '82 P'13",
      role: "VICE PRESIDENT",
      location: "NEW YORK, NEW YORK",
    },
    {
      name: "BENJAMIN C. HAMMOND P'23 '25",
      role: "SECRETARY AND TREASURER",
      location: "LAWRENCEVILLE, NEW JERSEY",
    },
    { name: "PORTER BRASWELL '07", location: "WILTON, CONNECTICUT" },
    {
      name: "HYMAN J. BRODY '75 P'07 '08 '11",
      location: "GREENVILLE, NORTH CAROLINA",
    },
    { name: "RAJIB CHANDA '93", location: "CHEVY CHASE, MARYLAND" },
    {
      name: "MICHAEL P. CLIFFORD '83 P'26",
      location: "INDIAN RIVER SHORES, FLORIDA",
    },
    {
      name: "JEFFREY G. DISHNER '83 P'15",
      location: "OLD GREENWICH, CONNECTICUT",
    },
    { name: "JEAN S. FANG '90 P'27", location: "HONG KONG, CHINA" },
    { name: "JANE FERGUSON '04", location: "NEW YORK, NEW YORK" },
    { name: "JOSEPH B. FRUMKIN '76 P'11", location: "NEW YORK, NEW YORK" },
    { name: "GOODWIN GAW '87 P'21", location: "HONG KONG, CHINA" },
    { name: "BENJAMIN H. GRISWOLD '99 P'28", location: "PALM BEACH, FLORIDA" },
    {
      name: "JEFFERSON W. KIRBY '80 P'11 '12 '15 '18",
      location: "TELLURIDE, COLORADO",
    },
    { name: "MARCUS B. MABRY '85 P'27", location: "NEW YORK, NEW YORK" },
    { name: "NEIL MEHTA '02", location: "NEW YORK, NEW YORK" },
    { name: "KATE MOORE '95", location: "NEW YORK, NEW YORK" },
    { name: "JUAN A. PUJADAS '79", location: "MAMARONECK, NEW YORK" },
    { name: "IAN S. RICE '95", location: "AVON, CONNECTICUT" },
    { name: "WILLIAM L. ROBBINS '86", location: "SAN FRANCISCO, CALIFORNIA" },
    { name: "CORRENTE SCHANKLER '98 P'29", location: "NEW YORK, NEW YORK" },
    { name: "LEUCRETIA BROWN SHAW '94", location: "BLAIRSTOWN, NEW JERSEY" },
    { name: "MARC STERNBERG P'27", location: "BROOKLYN, NEW YORK" },
    { name: "JOSEPH C. TSAI '82", location: "HONG KONG, CHINA" },
    { name: "MEERA S. VISWANATHAN, PH.D", location: "WAKEFIELD, RHODE ISLAND" },
    {
      name: "KEVIN G. VOLPP, M.D. '85 P'24",
      location: "WYNNEWOOD, PENNSYLVANIA",
    },
    { name: "ALEXANDRA BUCKLEY VORIS '96", location: "NEW YORK, NEW YORK" },
    {
      name: "ELIZABETH GREENBERG WILKINSON '02",
      location: "BETHESDA, MARYLAND",
    },
  ];

  return (
    <section className="bg-[#141415] max-w-7xl mx-auto  py-24 px-6 md:px-20 lg:px-32">
      <div className="">
        {/* Header Section */}
        <h2 className="font-serif text-3xl text-white mb-16">
          The Pamavambo School Board of Trustees
        </h2>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">
          {trustees.map((trustee, idx) => (
            <div key={idx} className="space-y-1">
              {/* Trustee Name */}
              <p className="text-[11px] font-bold text-white tracking-wider uppercase">
                {trustee.name}
              </p>

              {/* Officer Role */}
              {trustee.role && (
                <p className="text-[10px] font-bold text-white tracking-widest uppercase opacity-90">
                  {trustee.role}
                </p>
              )}

              {/* Location */}
              <p className="text-[10px] font-medium text-[#C5A059] tracking-widest uppercase">
                {trustee.location}
              </p>

              {/* Horizontal Dividers for Officers */}
              {idx < 4 && (
                <div className="pt-2">
                  <div className="w-full h-px bg-white/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfTrustees;
