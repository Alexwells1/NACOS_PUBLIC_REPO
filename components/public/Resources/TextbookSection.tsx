import TextbookCard from "@/components/features/resources/TextbookCard";
import { textbooks } from "@/constants/resourcesData";

export function TextbookSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#168706]">
            Recommended
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#082F02] tracking-tighter">
            Digital Library
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {textbooks.map((textbook) => (
            <TextbookCard key={textbook.name} textbook={textbook} />
          ))}
        </div>
      </div>
    </section>
  );
}