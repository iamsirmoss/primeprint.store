"use client";

import CardBox from "../../shared/CardBox";

type ActivityColor = "primary" | "secondary";

interface DailyActivityItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  color: ActivityColor;
  line: boolean;
}

interface DailyActivitiesProps {
  items: DailyActivityItem[];
}

const colorMap: Record<ActivityColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

const DailyActivities = ({ items }: DailyActivitiesProps) => {
  return (
    <CardBox className="pb-4 flex flex-col px-6">
      <h5 className="card-title">Daily activities</h5>

      <div className="mt-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity yet.</p>
        ) : (
          items.map((item) => (
            <div className="flex gap-x-3" key={item.id}>
              <div className="w-1/6 text-end">
                <span className="text-ld font-medium text-sm opacity-80">
                  {item.title}
                </span>
              </div>

              <div className="relative">
                <div className="relative z-10 w-7 h-5 flex justify-center items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${colorMap[item.color]}`}
                  ></div>
                </div>

                {item.line ? (
                  <div className="border-s border-ld h-full -mt-2 ms-3.5"></div>
                ) : (
                  <div className="border-0"></div>
                )}
              </div>

              <div className="w-1/4 grow pt-0.5 pb-5">
                <p className="text-ld font-semibold">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.meta}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </CardBox>
  );
};

export default DailyActivities;