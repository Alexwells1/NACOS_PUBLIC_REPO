import { MessageCircle, ExternalLink } from "lucide-react";
import { SupportOfficer } from "./support.types";

export function OfficerCard({ officer }: { officer: SupportOfficer }) {
  return (
    <div className="group bg-white border border-black/5 rounded-tr-3xl rounded-bl-3xl p-6 hover:shadow-2xl transition-all duration-500">
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-[#168706] uppercase tracking-tighter opacity-60">
            [{officer.id}]
          </span>
          <h3 className="text-lg font-black text-[#082F02] uppercase tracking-tight">
            {officer.name}
          </h3>
          <p className="text-xs font-bold text-[#168706] uppercase tracking-widest">
            {officer.role}
          </p>
        </div>
        <div className="w-10 h-10 rounded-tr-lg rounded-bl-lg bg-[#168706]/10 flex items-center justify-center text-[#168706]">
          <MessageCircle className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {officer.expertise.map((skill) => (
          <span key={skill} className="text-[9px] font-black uppercase bg-gray-50 text-gray-400 px-2 py-1 border border-gray-100">
            {skill}
          </span>
        ))}
      </div>

      <a
        href={officer.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-3 bg-[#082F02] text-white rounded-tr-xl rounded-bl-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#168706] transition-all"
      >
        Contact
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}