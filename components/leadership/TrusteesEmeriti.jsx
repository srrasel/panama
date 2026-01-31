const TrusteesEmeriti = () => {
  const emeriti = [
    {
      name: "WILLIAM G. BARDEL '57 P'93",
      location: "WASHINGTON DEPOT, CONNECTICUT",
    },
    { name: "GLENN H. HUTCHINS '73", location: "RYE, NEW YORK" },
    {
      name: "WHITNEY HAILAND BROWN '91 P'23 '25",
      location: "BEDFORD, NEW YORK",
    },
    {
      name: "LYNN D. JOHNSTON H'54 P'92 '94",
      location: "PRINCETON, NEW JERSEY",
    },
    {
      name: "ARTHUR H. BUNN '74 P'04 '06 '08",
      location: "SPRINGFIELD, ILLINOIS",
    },
    {
      name: "PETER LAWSON-JOHNSTON '45 GP'95 '98 '15 '18",
      location: "HOBE SOUND, FLORIDA",
    },
    {
      name: "WILLARD BUNN III '62 P'93 '01 '07 GP'23 '25",
      location: "LAKE FOREST, ILLINOIS",
    },
    { name: "JOHN A. LUETKEMEYER JR. '59", location: "BALTIMORE, MARYLAND" },
    { name: "THOMAS L. CARTER JR. '70 P'01 '05", location: "HOUSTON, TEXAS" },
    { name: "CLARK F. MACKENZIE '59 P'81", location: "COCKEYSVILLE, MARYLAND" },
    { name: "MICHAEL S. CHAE '86", location: "NEW YORK, NEW YORK" },
    {
      name: "JEREMY K. MARIO '88 P'16 '20",
      location: "DURHAM, NORTH CAROLINA",
    },
    {
      name: "MELANIE C. CLARKE P'02 '05 '07 '10",
      location: "PRINCETON, NEW JERSEY",
    },
    {
      name: "CHARLES E. MURPHY III, M.D. '66 P'90 '95 GP'21",
      location: "BERKELEY, CALIFORNIA",
    },
    {
      name: "JUDITH-ANN CORRENTE '01 H'01 P'98 '01 GP'29",
      location: "NEW YORK, NEW YORK",
    },
    {
      name: "DAVID B. OTTAWAY '57 P'86 '91 GP'24",
      location: "WASHINGTON, DISTRICT OF COLUMBIA",
    },
    { name: "PETER A. DOW '50", location: "GROSSE POINTE FARMS, MICHIGAN" },
    { name: "RONALD S. ROLFE '63 P'21", location: "NEW YORK, NEW YORK" },
    {
      name: "EDITH BAIRD EGLIN H'52 '65 '66 '67 '70 GP'19",
      location: "PALM BEACH, FLORIDA",
    },
    { name: "CHRISTINA SEIX DOW P'08", location: "TUXEDO PARK, NEW YORK" },
    { name: "DARRELL A. FITZGERALD '68", location: "ATLANTA, GEORGIA" },
    { name: "TRUMAN T. SEMANS '45 P'87", location: "BROOKLANDVILLE, MARYLAND" },
    {
      name: "MORTIMER B. FULLER III '60 P'89 '01",
      location: "WAVERLY, PENNSYLVANIA",
    },
    {
      name: "DANIEL M. TAPIERO '86 P'20 '22",
      location: "GREENWICH, CONNECTICUT",
    },
    { name: "BERT A. GETZ JR. '85 P'18 '20", location: "NAPLES, FLORIDA" },
    { name: "RAYMOND G. VIAULT '63 P'96", location: "JUPITER, FLORIDA" },
    { name: "LUTHER T. GRIFFITH '71 P'04", location: "ATLANTA, GEORGIA" },
    { name: "JOHN E. WALDRON '87", location: "NEW YORK, NEW YORK" },
    { name: "MARTIN D. GRUSS '60", location: "PALM BEACH, FLORIDA" },
    { name: "SETH H. WAUGH '76 P'19 '21", location: "NEW YORK, NEW YORK" },
    {
      name: "LEITA VOSS HAMILL H'65 '88 '99 P'96 '99",
      location: "PRINCETON, NEW JERSEY",
    },
    { name: "JONATHAN G. WEISS '75", location: "NEW YORK, NEW YORK" },
    {
      name: "LAWRENCE D. HOWELL II '71 P'11 '13",
      location: "ZURICH, SWITZERLAND",
    },
    { name: "JOHN C. WELLEMEYER '55 P'18", location: "PRINCETON, NEW JERSEY" },
  ];

  return (
    <section className="max-w-7xl mx-auto py-24 px-6 md:px-20 lg:px-32">
      <div className="">
        {/* Section Title */}
        <h2 className="font-serif text-3xl text-gray-900 mb-16">
          Trustees Emeriti
        </h2>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">
          {emeriti.map((trustee, idx) => (
            <div key={idx} className="space-y-1">
              {/* Emeriti Name */}
              <p className="text-[11px] font-bold text-gray-900 tracking-wider uppercase">
                {trustee.name}
              </p>

              {/* Location */}
              <p className="text-[10px] font-medium text-[#C5A059] tracking-widest uppercase">
                {trustee.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrusteesEmeriti;
