// components/StatsCard.tsx
interface StatsCardProps {
  value: string;
  label: string;
}

export const StatsCard = ({ value, label }: StatsCardProps) => (
  <div className="p-6">
    <div className="text-3xl md:text-4xl font-bold text-[#168706] mb-2">
      {value}
    </div>
    <div className="text-gray-600">{label}</div>
  </div>
);
