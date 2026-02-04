export type TEvent = {
  title: string;
  date: string;
  time?: string;
  cover?: string;
  parapgraphs?: string[];
  media?: {
    type: "image" | "video";
    src: string;
    title: string;
    description?: string;
  }[];
  sources: string[];
  country: "germany" | "usa";
  alternativeFlag?: string;
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
