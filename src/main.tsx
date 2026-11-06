
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  // Clarity City (Dewsbury Moor body font) — self-hosted, not on Google Fonts
  import "@fontsource/clarity-city/400.css";
  import "@fontsource/clarity-city/500.css";
  import "@fontsource/clarity-city/600.css";
  import "@fontsource/clarity-city/700.css";

  createRoot(document.getElementById("root")!).render(<App />);
  