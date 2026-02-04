import type { TYear } from "../types";

// Timeline of fascism-related events: 10 from Germany, 10 from USA
// Events are distributed across years and months, using TYear and TEvent types
const timeline: Record<number, TYear> = {
  1919: {
    january: [
      {
        title: "Formation of the German Workers' Party",
        date: "1919-01-05",
        description:
          "The German Workers' Party (DAP), precursor to the Nazi Party, is founded in Munich.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1920: {
    february: [
      {
        title: "Hitler Joins the Nazi Party",
        date: "1920-02-24",
        description:
          "Adolf Hitler joins the DAP, which is soon renamed the National Socialist German Workers' Party (NSDAP).",
        sources: [],
        country: "germany",
      },
      {
        title: "Ku Klux Klan Resurgence",
        date: "1920-02-01",
        description:
          "The KKK experiences a resurgence, promoting white supremacist and fascist ideas.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1923: {
    november: [
      {
        title: "Beer Hall Putsch",
        date: "1923-11-08",
        description:
          "Failed coup attempt by Hitler and the Nazi Party in Munich.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1925: {
    july: [
      {
        title: "Publication of Mein Kampf",
        date: "1925-07-18",
        description:
          "Adolf Hitler publishes his manifesto, Mein Kampf, outlining his ideology.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1932: {
    july: [
      {
        title: "Nazi Party Becomes Largest in Reichstag",
        date: "1932-07-31",
        description:
          "The Nazi Party becomes the largest party in the German parliament.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1933: {
    january: [
      {
        title: "Hitler Appointed Chancellor",
        date: "1933-01-30",
        description: "Adolf Hitler is appointed Chancellor of Germany.",
        sources: [],
        country: "germany",
      },
    ],
    february: [
      {
        title: "Reichstag Fire and Enabling Act",
        date: "1933-02-27",
        description:
          "The Reichstag fire leads to the Enabling Act, giving Hitler dictatorial powers.",
        sources: [],
        country: "germany",
      },
      {
        title: "Rise of the Silver Legion of America",
        date: "1933-02-01",
        description:
          "The Silver Legion, a fascist organization, is founded by William Dudley Pelley.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1935: {
    september: [
      {
        title: "Nuremberg Laws Enacted",
        date: "1935-09-15",
        description:
          "Racist Nuremberg Laws institutionalize antisemitism in Nazi Germany.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1938: {
    november: [
      {
        title: "Kristallnacht (Night of Broken Glass)",
        date: "1938-11-09",
        description:
          "Coordinated attacks on Jews and their property throughout Nazi Germany.",
        sources: [],
        country: "germany",
      },
      {
        title: "House Un-American Activities Committee (HUAC) Formed",
        date: "1938-11-01",
        description:
          "HUAC is established to investigate alleged disloyalty and subversive activities.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1939: {
    february: [
      {
        title: "German American Bund Rally",
        date: "1939-02-20",
        description:
          "Pro-Nazi rally held by the German American Bund at Madison Square Garden, New York.",
        sources: [],
        country: "usa",
      },
    ],
    september: [
      {
        title: "Outbreak of World War II",
        date: "1939-09-01",
        description: "Germany invades Poland, starting World War II.",
        sources: [],
        country: "germany",
      },
    ],
  },
  1940: {
    june: [
      {
        title: "Smith Act Enacted",
        date: "1940-06-28",
        description:
          "The Smith Act makes it a criminal offense to advocate the violent overthrow of the government.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1942: {
    february: [
      {
        title: "Internment of Japanese Americans",
        date: "1942-02-19",
        description:
          "Over 100,000 Japanese Americans are forcibly relocated to internment camps during WWII.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1950: {
    february: [
      {
        title: "McCarthyism and Red Scare",
        date: "1950-02-09",
        description:
          "Senator Joseph McCarthy leads anti-communist witch hunts, stoking fear and repression.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1960: {
    may: [
      {
        title: "Civil Rights Movement Opposition",
        date: "1960-05-01",
        description:
          "Far-right groups violently oppose the Civil Rights Movement, echoing fascist tactics.",
        sources: [],
        country: "usa",
      },
    ],
  },
  1995: {
    april: [
      {
        title: "Oklahoma City Bombing",
        date: "1995-04-19",
        description:
          "A domestic terrorist attack by Timothy McVeigh, motivated by far-right extremism.",
        sources: [],
        country: "usa",
      },
    ],
  },
  2017: {
    august: [
      {
        title: "Charlottesville Unite the Right Rally",
        date: "2017-08-12",
        description:
          "A violent rally by white supremacists and neo-fascists in Charlottesville, Virginia.",
        sources: [],
        country: "usa",
      },
    ],
  },
};

export default timeline;
