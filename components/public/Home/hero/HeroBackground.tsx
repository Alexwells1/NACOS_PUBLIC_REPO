import Image from "next/image";
import { motion, MotionValue } from "framer-motion";

const bgOverlay = "/images/csc.jpg";

interface BackgroundProps {
  circleOneY: MotionValue<number>;
  circleTwoY: MotionValue<number>;
}

export function HeroBackground({ circleOneY, circleTwoY }: BackgroundProps) {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src={bgOverlay}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover opacity-10 mix-blend-soft-light"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082F02]/70 via-[#082F02]/40 to-[#082F02]/70" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ y: circleOneY }}
          className="absolute -left-1/4 -top-32 w-[600px] lg:w-[800px] aspect-square rounded-full border-[30px] lg:border-[40px] border-[#DCEDDA] opacity-[0.03] mix-blend-overlay motion-reduce:transform-none"
        />
        <motion.div
          style={{ y: circleTwoY }}
          className="absolute -right-1/4 -bottom-32 w-[400px] lg:w-[600px] aspect-square rounded-full border-[20px] lg:border-[25px] border-[#E8F3E6] opacity-[0.02] mix-blend-overlay motion-reduce:transform-none"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#DCEDDA] rounded-full opacity-15 motion-reduce:!animate-none"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animation: `particleFloat ${3 + i * 0.4}s ease-in-out ${i * 0.5}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
  );
}