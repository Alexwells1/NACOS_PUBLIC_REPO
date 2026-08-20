"use client";

import { useRef, useState, useEffect } from "react";
import {  AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event, SLIDE_GAP } from "./types";
import { EventCard } from "./EventCard";

interface EventSliderProps {
  events: Event[];
}

export function EventSlider({ events }: EventSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[0]?.clientWidth ?? 0;
    sliderRef.current.scrollTo({
      left: index * (cardWidth + SLIDE_GAP),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const handleScroll = () => {
      const cardWidth = slider.children[0]?.clientWidth ?? 0;
      const idx = Math.round(slider.scrollLeft / (cardWidth + SLIDE_GAP));
      setCurrentIndex(Math.max(0, Math.min(idx, events.length - 1)));
    };
    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [events.length]);

  return (
    <div className="lg:hidden w-full relative">
      <AnimatePresence>
        {currentIndex > 0 && (
          <button
            onClick={() => scrollTo(currentIndex - 1)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#168706]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < events.length - 1 && (
          <button
            onClick={() => scrollTo(currentIndex + 1)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#168706]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </AnimatePresence>

      <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4">
        {events.map((event) => (
          <div key={event.id} className="flex-shrink-0 w-[90vw] px-4 snap-center">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-[#168706] w-8" : "bg-[#B7DAB2] w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}