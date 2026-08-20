import LevelFolder from "@/components/features/resources/LevelFolder";

export function AcademicLevels() {
  const levels = [
    { name: "100 Level", to: "/resources/100" },
    { name: "200 Level", to: "/resources/200" },
    { name: "300 Level", to: "/resources/300" },
    { name: "400 Level", to: "/resources/400" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 border-l-4 border-[#168706] pl-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#082F02] tracking-tighter uppercase">
            Course Folders
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mt-2 font-medium">
            Systematic access to lecture materials and past questions categorized by academic level.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {levels.map((lvl) => (
            <LevelFolder key={lvl.name} level={lvl.name} to={lvl.to} />
          ))}
        </div>
      </div>
    </section>
  );
}