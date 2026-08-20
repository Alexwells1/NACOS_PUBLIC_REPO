import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  pronoun?: "his" | "her" | "their";
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  isMobile?: boolean;
  onMemberClick?: (member: TeamMember) => void;
}

export default function TeamSection({
  teamMembers,
  isMobile = false,
  onMemberClick,
}: TeamSectionProps) {
  const wrapperClass = isMobile
    ? "lg:hidden border-t border-[#B7DAB2]/50 pt-4 mb-4"
    : "hidden lg:block";

  return (
    <div className={wrapperClass}>
      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
        {teamMembers.map((member, index) => {
          const pronoun = member.pronoun ?? "their";

          return (
            <button
              key={index}
              type="button"
              onClick={() => onMemberClick?.(member)}
              aria-label={`View ${member.name}'s works`}
              className="relative flex items-center gap-3 bg-white/70 rounded-xl p-2
                         transition-all duration-300 hover:-translate-y-1 active:scale-95
                         cursor-pointer focus:outline-none focus-visible:ring-2
                         focus-visible:ring-[#168706] focus-visible:ring-offset-2
                         overflow-hidden group"
            >
              {/* Avatar */}
              <Image
                src={member.avatar}
                alt={member.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#B7DAB2]
                           transition-transform duration-200 group-hover:rotate-2"
              />

              {/* Info */}
              <div className="flex flex-col text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {member.name}
                </p>
                <p className="text-xs text-gray-700">{member.role}</p>
                <p className="text-[10px] text-[#168706] font-medium mt-0.5 italic">
                  click to see {pronoun} works →
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}