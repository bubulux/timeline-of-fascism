import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ThemeProvider } from "./themeProvider.tsx";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
