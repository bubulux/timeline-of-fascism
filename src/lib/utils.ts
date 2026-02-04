import { format } from "date-fns";
import { DatePrecision } from "@/types/event";

export function formatEventDate(
  date: string,
  precision: DatePrecision,
): string {
  const dateObj = new Date(date);

  switch (precision) {
    case "year":
      return format(dateObj, "yyyy");
    case "month":
      return format(dateObj, "MMMM yyyy");
    case "day":
      return format(dateObj, "MMMM d, yyyy");
    default:
      return date;
  }
}

export function countryToSlug(country: "Germany" | "USA"): string {
  return country === "Germany" ? "germany" : "usa";
}

export function slugToCountry(slug: string): "Germany" | "USA" {
  return slug === "germany" ? "Germany" : "USA";
}
