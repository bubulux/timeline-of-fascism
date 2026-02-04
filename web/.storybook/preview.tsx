import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/themeProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
