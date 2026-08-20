import Link from "next/link";

interface LevelFolderProps {
  level: string;
  to: string;
}

export default function LevelFolder({ level, to }: LevelFolderProps) {
  return (
    <Link href={to} className="group flex flex-col items-center">
      <div
        className="
          relative cursor-pointer origin-bottom
          w-[150px] h-[100px]
          sm:w-[180px] sm:h-[120px]
          md:w-[210px] md:h-[135px]
          lg:w-[230px] lg:h-[145px]
          [perspective:1200px]
        "
      >
        {/* Back folder */}
        <div
          className="
            absolute inset-0 bg-amber-600 rounded-2xl rounded-tl-none
            transition-all duration-300
            after:absolute after:bottom-[99%] after:left-0 after:w-14 after:h-3 after:bg-amber-600 after:rounded-t-2xl
          "
        />

        {/* Papers */}
        <div className="absolute inset-1 bg-zinc-400 rounded-xl hidden md:block group-hover:md:[transform:rotateX(-18deg)] transition" />
        <div className="absolute inset-1 bg-zinc-300 rounded-xl hidden md:block group-hover:md:[transform:rotateX(-26deg)] transition" />
        <div className="absolute inset-1 bg-zinc-200 rounded-xl hidden md:block group-hover:md:[transform:rotateX(-34deg)] transition" />

        {/* Front folder */}
        <div
          className="
            absolute bottom-0 w-full h-[90%]
            bg-gradient-to-t from-amber-500 to-amber-400
            rounded-2xl rounded-tr-none
            transition-all duration-300
            group-hover:md:[transform:rotateX(-35deg)]
          "
        />
      </div>

      {/* Label */}
      <p className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-[#168706] transition">
        {level}
      </p>
    </Link>
  );
}
