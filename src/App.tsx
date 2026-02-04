import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Timeline } from "./components/Timeline";
import { EventDrawer } from "./components/EventDrawer";
import { loadEvents, getEventBySlug } from "./lib/events";
import { Event } from "./types/event";
import { countryToSlug } from "./lib/utils";

function TimelineView() {
  const { country, slug } = useParams();
  const navigate = useNavigate();
  const [events] = useState<Event[]>(() => loadEvents());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Load event from URL on mount
  useEffect(() => {
    if (country && slug) {
      const event = getEventBySlug(country, slug);
      if (event) {
        setSelectedEvent(event);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [country, slug]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    navigate(`/${countryToSlug(event.country)}/${event.slug}`);
  };

  const handleCloseDrawer = () => {
    setSelectedEvent(null);
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b border-border bg-secondary/50 px-6 py-4">
        <h1 className="text-xl font-bold">Timeline of Fascism</h1>
      </header>

      <div className="flex-1 relative">
        <Timeline
          events={events}
          selectedEvent={selectedEvent}
          onEventClick={handleEventClick}
        />
        <EventDrawer event={selectedEvent} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimelineView />} />
        <Route path="/:country/:slug" element={<TimelineView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
