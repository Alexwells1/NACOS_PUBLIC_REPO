"use client";

import { EventCard } from "./EventCard";
import { EventsHeader } from "./EventsHeader";
import { EmptyEvents } from "./EmptyEvents";
import { usePublicEvents } from "@/hooks/use-community-events";

export default function Events() {
  const { data: events, isLoading, isError } = usePublicEvents();

  // Treat errors as waiting/loading state so visitors don't see panic/error UI
  const isWaitingForData = isLoading || isError;
  const allEvents = events ?? [];

  return (
    <section id="events" className="relative w-full bg-[#DCEDDA] py-12 lg:py-16 px-4 overflow-hidden border-y border-[#168706]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <EventsHeader />
          </div>

          <div className="lg:col-span-8">
            {/* LOADING & ERROR FALLBACK STATE */}
            {isWaitingForData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-white/40 animate-pulse rounded-tr-2xl rounded-bl-2xl" />
                ))}
              </div>
            ) : allEvents.length === 0 ? (
              /* EMPTY STATE */
              <EmptyEvents />
            ) : (
              /* DATA STATE */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={{
                      id: event._id,
                      title: event.title,
                      description: event.description,
                      date: event.date,
                      location: event.location,
                      category: event.category,
                      imageUrl: event.imageUrl,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}