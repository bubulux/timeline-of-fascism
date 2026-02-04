import { useState } from "react";
import { TimelineEvent } from "@/types/event";
import { formatEventDate } from "@/lib/utils";

interface EventMarkerProps {
  event: TimelineEvent;
  isSelected: boolean;
  onClick: () => void;
  lanePadding: number;
}

export function EventMarker({
  event,
  isSelected,
  onClick,
  lanePadding,
}: EventMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const y = lanePadding + event.lane * 20;
  const isCluster =
    event.clustered && event.clusterCount && event.clusterCount > 1;

  return (
    <div
      className="absolute"
      style={{
        left: `${event.x}px`,
        top: `${y}px`,
        transform: "translateX(-50%)",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`relative w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
          isSelected
            ? "bg-accent ring-2 ring-accent/50 scale-125"
            : "bg-primary hover:bg-accent hover:scale-110"
        }`}
      >
        {isCluster && (
          <span className="absolute -top-1 -right-1 bg-accent text-background text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {event.clusterCount}
          </span>
        )}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-50">
          <div className="bg-secondary border border-border rounded-lg shadow-lg p-3 min-w-[200px] max-w-[300px]">
            {event.cover && (
              <img
                src={event.cover.src}
                alt={event.cover.alt}
                className="w-full h-24 object-cover rounded mb-2"
              />
            )}
            <div className="text-xs text-muted-foreground mb-1">
              {formatEventDate(event.date, event.datePrecision)}
            </div>
            <div className="text-sm font-semibold">{event.title}</div>
            {isCluster && event.clusterEvents && (
              <div className="mt-2 text-xs text-muted-foreground">
                {event.clusterCount} events
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
