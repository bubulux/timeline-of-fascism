export type TEvent = {
  title: string;
  date: string;
  time?: string;
  description: string;
  sources: string[];
  country: "germany" | "usa";
};

export type TYear = {
  january?: TEvent[];
  february?: TEvent[];
  march?: TEvent[];
  april?: TEvent[];
  may?: TEvent[];
  june?: TEvent[];
  july?: TEvent[];
  august?: TEvent[];
  september?: TEvent[];
  october?: TEvent[];
  november?: TEvent[];
  december?: TEvent[];
};
