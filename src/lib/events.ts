import matter from "gray-matter";
import { Event, EventFrontmatter, DatePrecision } from "@/types/event";

const eventFiles = import.meta.glob("../content/events/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseDatePrecision(dateStr: string): {
  date: Date;
  precision: DatePrecision;
} {
  const parts = dateStr.split("-");

  if (parts.length === 1) {
    // YYYY
    return {
      date: new Date(`${dateStr}-01-01`),
      precision: "year",
    };
  } else if (parts.length === 2) {
    // YYYY-MM
    return {
      date: new Date(`${dateStr}-01`),
      precision: "month",
    };
  } else {
    // YYYY-MM-DD
    return {
      date: new Date(dateStr),
      precision: "day",
    };
  }
}

function extractSlugFromPath(path: string): string {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, "");
}

export function loadEvents(): Event[] {
  const events: Event[] = [];

  console.log("Event files found:", Object.keys(eventFiles));

  for (const [path, content] of Object.entries(eventFiles)) {
    console.log("Loading event from:", path);
    const { data, content: markdownContent } = matter(content as string);
    const frontmatter = data as EventFrontmatter;

    const { date, precision } = parseDatePrecision(frontmatter.date);
    const slug = extractSlugFromPath(path);

    events.push({
      slug,
      title: frontmatter.title,
      country: frontmatter.country,
      date: frontmatter.date,
      dateValue: date,
      datePrecision: precision,
      summary: frontmatter.summary,
      cover: frontmatter.cover,
      media: frontmatter.media,
      content: markdownContent,
    });
  }

  return events.sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
}

export function getEventBySlug(
  country: string,
  slug: string,
): Event | undefined {
  const events = loadEvents();
  const countryName = country === "germany" ? "Germany" : "USA";
  return events.find((e) => e.slug === slug && e.country === countryName);
}
