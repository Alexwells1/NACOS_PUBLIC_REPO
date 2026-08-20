// components/TabButton.tsx
interface TabButtonProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const TabButton = ({ id, title, isActive, onClick }: TabButtonProps) => (
  <button
    key={id}
    onClick={() => onClick(id)}
    className={`py-4 font-bold border-2 border-[#168706] transition-all duration-300 cursor-pointer whitespace-nowrap text-sm sm:text-base ${
      isActive
        ? "bg-[#168706] text-white transform scale-105 shadow-lg"
        : "bg-white text-[#168706] hover:bg-gray-50"
    }`}
    role="tab"
    aria-selected={isActive}
    aria-controls={`${id}-tab`}
  >
    {title}
  </button>
);
