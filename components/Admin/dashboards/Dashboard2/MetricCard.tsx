"use client";

import CardBox from "../../shared/CardBox";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

const MetricCard = ({ title, value, subtitle }: MetricCardProps) => {
  return (
    <CardBox className="p-5 h-full">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
      {subtitle ? (
        <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
      ) : null}
    </CardBox>
  );
};

export default MetricCard;