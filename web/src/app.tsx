import {
  MantineProvider,
  createTheme,
  type MantineColorsTuple,
} from "@mantine/core";

import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

import "@mantine/core/styles.css";

const myColor: MantineColorsTuple = [
  "#ffe8e9",
  "#ffd1d1",
  "#fba0a0",
  "#f76d6d",
  "#f44141",
  "#f22625",
  "#f21616",
  "#d8070b",
  "#c10007",
  "#a90003",
];

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: "myColor",
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
