import { useRef, useState, useEffect, useCallback } from "react";
import { Event, TimelineEvent } from "@/types/event";
import { EventMarker } from "./EventMarker";
import { TimeAxis } from "./TimeAxis";

interface TimelineProps {
  events: Event[];
  selectedEvent: Event | null;
  onEventClick: (event: Event) => void;
}

const MIN_ZOOM = 1; // Year level (most zoomed out)
const MAX_ZOOM = 365; // Day level (most zoomed in)
const PIXELS_PER_DAY = 2; // Base scale

const LANE_HEIGHT = 120;
const LANE_PADDING = 20;
const MAX_SUBLANES = 4;
const CLUSTER_THRESHOLD = 3;

export function Timeline({
  events,
  selectedEvent,
  onEventClick,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(12); // Start at month level
  const [pan, setPan] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, pan: 0 });

  const germanyEvents = events.filter((e) => e.country === "Germany");
  const usaEvents = events.filter((e) => e.country === "USA");

  const getEventX = useCallback(
    (event: Event): number => {
      const daysSinceEpoch = Math.floor(
        event.dateValue.getTime() / (1000 * 60 * 60 * 24),
      );
      return daysSinceEpoch * PIXELS_PER_DAY * zoom;
    },
    [zoom],
  );

  const processEventsForLane = useCallback(
    (laneEvents: Event[]): TimelineEvent[] => {
      const timelineEvents: TimelineEvent[] = [];
      const sublanes: Map<number, number[]> = new Map();

      for (const event of laneEvents) {
        const x = getEventX(event);
        let assignedLane = 0;
        let placed = false;

        // Try to find a sublane
        for (let lane = 0; lane < MAX_SUBLANES; lane++) {
          const lanePositions = sublanes.get(lane) || [];
          const hasCollision = lanePositions.some(
            (pos) => Math.abs(pos - x) < 30,
          );

          if (!hasCollision) {
            sublanes.set(lane, [...lanePositions, x]);
            assignedLane = lane;
            placed = true;
            break;
          }
        }

        timelineEvents.push({
          ...event,
          x,
          lane: assignedLane,
          clustered: !placed,
        });
      }

      // Handle clustering for events that couldn't be placed
      const clustered = timelineEvents.filter((e) => e.clustered);
      const unclustered = timelineEvents.filter((e) => !e.clustered);

      if (clustered.length > 0) {
        // Group clustered events by proximity
        const clusters: TimelineEvent[][] = [];
        let currentCluster: TimelineEvent[] = [];

        clustered.sort((a, b) => a.x - b.x);

        for (const event of clustered) {
          if (currentCluster.length === 0) {
            currentCluster.push(event);
          } else {
            const lastEvent = currentCluster[currentCluster.length - 1];
            if (event.x - lastEvent.x < 50) {
              currentCluster.push(event);
            } else {
              if (currentCluster.length >= CLUSTER_THRESHOLD) {
                clusters.push(currentCluster);
              } else {
                unclustered.push(...currentCluster);
              }
              currentCluster = [event];
            }
          }
        }

        if (currentCluster.length >= CLUSTER_THRESHOLD) {
          clusters.push(currentCluster);
        } else {
          unclustered.push(...currentCluster);
        }

        // Create cluster markers
        for (const cluster of clusters) {
          const avgX =
            cluster.reduce((sum, e) => sum + e.x, 0) / cluster.length;
          unclustered.push({
            ...cluster[0],
            x: avgX,
            lane: 0,
            clustered: true,
            clusterCount: cluster.length,
            clusterEvents: cluster,
          });
        }
      }

      return unclustered;
    },
    [getEventX],
  );

  const germanyTimelineEvents = processEventsForLane(germanyEvents);
  const usaTimelineEvents = processEventsForLane(usaEvents);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * delta)));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, pan });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const delta = e.clientX - dragStart.x;
        setPan(dragStart.pan + delta);
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-background"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <TimeAxis zoom={zoom} pan={pan} />

      <div className="relative" style={{ transform: `translateX(${pan}px)` }}>
        {/* Germany Lane */}
        <div
          className="relative border-b border-border"
          style={{ height: LANE_HEIGHT }}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm text-muted-foreground">
            Germany
          </div>
          <div className="absolute left-32 top-0 w-full h-full">
            {germanyTimelineEvents.map((event, idx) => (
              <EventMarker
                key={`${event.slug}-${idx}`}
                event={event}
                isSelected={selectedEvent?.slug === event.slug}
                onClick={() => onEventClick(event)}
                lanePadding={LANE_PADDING}
              />
            ))}
          </div>
        </div>

        {/* USA Lane */}
        <div
          className="relative border-b border-border"
          style={{ height: LANE_HEIGHT }}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm text-muted-foreground">
            USA
          </div>
          <div className="absolute left-32 top-0 w-full h-full">
            {usaTimelineEvents.map((event, idx) => (
              <EventMarker
                key={`${event.slug}-${idx}`}
                event={event}
                isSelected={selectedEvent?.slug === event.slug}
                onClick={() => onEventClick(event)}
                lanePadding={LANE_PADDING}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
