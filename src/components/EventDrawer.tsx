import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Event, MediaItem } from "@/types/event";
import { formatEventDate } from "@/lib/utils";

interface EventDrawerProps {
  event: Event | null;
  onClose: () => void;
}

export function EventDrawer({ event, onClose }: EventDrawerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (event) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [event, onClose]);

  if (!event) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-background border-l border-border z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold truncate pr-4">{event.title}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date and Country */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span>{formatEventDate(event.date, event.datePrecision)}</span>
            <span>•</span>
            <span>{event.country}</span>
          </div>

          {/* Cover Image */}
          {event.cover && (
            <div className="mb-6">
              <img
                src={event.cover.src}
                alt={event.cover.alt}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Credit:{" "}
                {event.cover.creditUrl ? (
                  <a
                    href={event.cover.creditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent"
                  >
                    {event.cover.credit}
                  </a>
                ) : (
                  event.cover.credit
                )}
              </p>
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {event.content}
            </ReactMarkdown>
          </div>

          {/* Media Gallery */}
          {event.media && event.media.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Media</h3>
              <div className="space-y-6">
                {event.media.map((item: MediaItem, idx: number) => (
                  <div key={idx}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-lg"
                    />
                    {item.caption && (
                      <p className="mt-2 text-sm text-foreground">
                        {item.caption}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      Credit:{" "}
                      {item.creditUrl ? (
                        <a
                          href={item.creditUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-accent"
                        >
                          {item.credit}
                        </a>
                      ) : (
                        item.credit
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
