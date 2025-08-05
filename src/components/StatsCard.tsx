import type { StatsCardProps } from '../utils/types';

function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex flex-col gap-5 w-full items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="text-gray-400">{icon}</div>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
