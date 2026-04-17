"use client";

import MetricCard from "./MetricCard";

interface SectionCardItem {
  title: string;
  value: string | number;
  subtitle?: string;
}

interface SectionCardsGridProps {
  title?: string;
  items: SectionCardItem[];
}

const SectionCardsGrid = ({ title, items }: SectionCardsGridProps) => {
  return (
    <div className="space-y-4">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <MetricCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCardsGrid;