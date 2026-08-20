import { Department, DepartmentKey } from "@/constants/types";


interface DepartmentTabProps {
  deptKey: DepartmentKey; 
  department: Department; 
  isActive: boolean;
  onClick: (key: DepartmentKey) => void;
}

export const DepartmentTab = ({
  deptKey,
  department,
  isActive,
  onClick,
}: DepartmentTabProps) => {
  const Icon = department.icon;

  return (
    <button
      onClick={() => onClick(deptKey)}
      className={`flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap ${
        isActive ? "bg-white shadow-md scale-105 border-[#168706]" : "bg-transparent"
      }`}
      aria-pressed={isActive}
    >
      <div
        className="w-2.5 h-2.5 rounded-full hidden md:block"
        style={{ backgroundColor: isActive ? department.color : "#D4CDCD" }}
      />
      <span
        className={`font-bold hidden md:block text-[10px] uppercase tracking-widest ${
          isActive ? "text-black" : "text-gray-400"
        }`}
      >
        {department.name}
      </span>
      <Icon size={16} color={isActive ? department.color : "#D4CDCD"} />
    </button>
  );
};