import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Garante tema claro (caso algum toggle anterior tenha salvo "dark")
document.documentElement.classList.remove("dark");
try {
  localStorage.removeItem("theme");
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
