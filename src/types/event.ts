export type Country = "Germany" | "USA";

export type DatePrecision = "year" | "month" | "day";

export interface MediaItem {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  credit: string;
  creditUrl?: string;
}

export interface CoverImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl?: string;
}

export interface EventFrontmatter {
  title: string;
  country: Country;
  date: string;
  summary?: string;
  cover?: CoverImage;
  media?: MediaItem[];
}

export interface Event {
  slug: string;
  title: string;
  country: Country;
  date: string;
  dateValue: Date;
  datePrecision: DatePrecision;
  summary?: string;
  cover?: CoverImage;
  media?: MediaItem[];
  content: string;
}

export interface TimelineEvent extends Event {
  x: number;
  lane: number;
  clustered?: boolean;
  clusterCount?: number;
  clusterEvents?: Event[];
}
