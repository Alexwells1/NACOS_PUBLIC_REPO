import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Event } from "./types";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const month = MONTH_LABELS[eventDate.getMonth()];
  const day = eventDate.getDate();

  return (
    <div className="group relative flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm border border-[#168706]/10 rounded-tr-2xl rounded-bl-2xl hover:bg-white hover:shadow-xl transition-all duration-500">
      {/* Image or Date Block */}
      {event.imageUrl ? (
        <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-tr-xl rounded-bl-xl">
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center bg-[#168706] rounded-tr-xl rounded-bl-xl text-white">
          <span className="text-[10px] font-black uppercase opacity-60">{month}</span>
          <span className="text-xl font-black leading-none">{day}</span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#168706]">
            {event.category}
          </span>
        </div>
        <h3 className="text-sm font-bold text-[#082F02] truncate group-hover:text-[#168706] transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-[#082F02]/50 font-medium">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/events/${event.id}`}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#168706]/10 text-[#168706] group-hover:bg-[#168706] group-hover:text-white transition-all"
      >
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
