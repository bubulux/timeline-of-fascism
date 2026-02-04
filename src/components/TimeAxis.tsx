import { useMemo } from "react";
import { format } from "date-fns";

interface TimeAxisProps {
  zoom: number;
  pan: number;
}

export function TimeAxis({ zoom, pan }: TimeAxisProps) {
  const ticks = useMemo(() => {
    const tickArray: {
      x: number;
      label: string;
      type: "year" | "month" | "day";
    }[] = [];

    // Determine tick interval based on zoom level
    let interval: "year" | "month" | "day" = "year";
    let stepDays = 365;

    if (zoom > 50) {
      interval = "day";
      stepDays = 7; // Weekly ticks at day level
    } else if (zoom > 10) {
      interval = "month";
      stepDays = 30;
    }

    const PIXELS_PER_DAY = 2;
    const visibleWidth = window.innerWidth;
    const startDay = Math.floor(-pan / (PIXELS_PER_DAY * zoom));
    const endDay = Math.floor((visibleWidth - pan) / (PIXELS_PER_DAY * zoom));

    // Start from year 1900
    const baseDate = new Date("1900-01-01");
    const baseDays = Math.floor(baseDate.getTime() / (1000 * 60 * 60 * 24));

    for (let day = startDay; day <= endDay; day += stepDays) {
      const date = new Date((baseDays + day) * 1000 * 60 * 60 * 24);
      const x = day * PIXELS_PER_DAY * zoom;

      let label = "";
      if (interval === "year") {
        label = format(date, "yyyy");
      } else if (interval === "month") {
        label = format(date, "MMM yyyy");
      } else {
        label = format(date, "MMM d");
      }

      tickArray.push({ x, label, type: interval });
    }

    return tickArray;
  }, [zoom, pan]);

  return (
    <div className="relative h-12 border-b border-border bg-secondary/50">
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${pan}px)` }}
      >
        {ticks.map((tick, idx) => (
          <div
            key={idx}
            className="absolute top-0 h-full"
            style={{ left: `${tick.x}px` }}
          >
            <div className="w-px h-3 bg-border" />
            <div className="mt-1 text-xs text-muted-foreground whitespace-nowrap -translate-x-1/2">
              {tick.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
