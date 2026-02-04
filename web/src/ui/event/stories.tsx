import type { Meta, StoryObj } from "@storybook/react";
import { EventCard } from "./index";

const meta: Meta<typeof EventCard> = {
  title: "UI/EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const GermanEvent: Story = {
  args: {
    event: {
      title: "Reichstag Fire",
      date: "February 27, 1933",
      time: "9:14 PM",
      country: "germany",
      parapgraphs: [
        "The Reichstag building, home to the German parliament, was set on fire. The fire was used as evidence by the Nazi government that Communists were plotting against the German government.",
        "The event is seen as pivotal in the establishment of Nazi Germany. The day after the fire, Hitler convinced President Paul von Hindenburg to pass the Reichstag Fire Decree, which suspended most civil liberties in Germany.",
      ],
      sources: [
        "https://encyclopedia.ushmm.org/content/en/article/the-reichstag-fire",
        "https://www.britannica.com/event/Reichstag-fire",
      ],
    },
  },
};

export const USAEvent: Story = {
  args: {
    event: {
      title: "Capitol Insurrection",
      date: "January 6, 2021",
      time: "2:11 PM EST",
      country: "usa",
      parapgraphs: [
        "A mob of supporters of President Donald Trump attacked the U.S. Capitol in an attempt to overturn his defeat in the 2020 presidential election.",
        "The attack was the culmination of a monthslong effort by Trump to remain in power after losing the election to Joe Biden.",
      ],
      sources: [
        "https://www.fbi.gov/wanted/capitol-violence",
        "https://www.justice.gov/usao-dc/capitol-breach-cases",
      ],
    },
  },
};

export const WithCoverImage: Story = {
  args: {
    event: {
      title: "Beer Hall Putsch",
      date: "November 8-9, 1923",
      country: "germany",
      cover:
        "https://images.unsplash.com/photo-1467703834117-04142f4a951f?w=800&auto=format&fit=crop",
      parapgraphs: [
        "Adolf Hitler and the Nazi Party led a coalition group in an attempted coup d'état of the government of Bavaria, a state in southern Germany.",
        "The putsch failed, and Hitler was arrested and sentenced to five years in prison, where he wrote Mein Kampf.",
      ],
      sources: [
        "https://www.britannica.com/event/Beer-Hall-Putsch",
        "https://encyclopedia.ushmm.org/content/en/article/beer-hall-putsch-munich-putsch",
      ],
    },
  },
};

export const WithMedia: Story = {
  args: {
    event: {
      title: "Charlottesville Rally",
      date: "August 11-12, 2017",
      country: "usa",
      parapgraphs: [
        "The Unite the Right rally was a white supremacist rally that took place in Charlottesville, Virginia.",
        "The rally turned violent, resulting in the death of counter-protester Heather Heyer.",
      ],
      media: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?w=800&auto=format&fit=crop",
          title: "Protest March",
          description: "Counter-protesters march in opposition",
        },
      ],
      sources: [
        "https://www.justice.gov/usao-wdva/united-states-v-james-alex-fields-jr",
      ],
    },
  },
};

export const Minimal: Story = {
  args: {
    event: {
      title: "Enabling Act",
      date: "March 23, 1933",
      country: "germany",
      parapgraphs: [
        "The Enabling Act gave Hitler's cabinet the power to enact laws without the consent of the Reichstag for four years.",
      ],
      sources: [
        "https://encyclopedia.ushmm.org/content/en/article/the-enabling-act",
      ],
    },
  },
};

export const WithAlternativeFlag: Story = {
  args: {
    event: {
      title: "Night of the Long Knives",
      date: "June 30 - July 2, 1934",
      country: "germany",
      alternativeFlag:
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=100&auto=format&fit=crop",
      parapgraphs: [
        "A purge that took place in Nazi Germany when the regime carried out extrajudicial killings intended to consolidate Hitler's absolute hold on power.",
      ],
      sources: [
        "https://encyclopedia.ushmm.org/content/en/article/night-of-the-long-knives",
      ],
    },
  },
};
