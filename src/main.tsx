import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/api/store.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider"
import RouteProvider from "@/middleware";
import { TooltipProvider } from "@/pages/site-management/registry/new-york/ui/tooltip"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Router>
          <RouteProvider>
          <TooltipProvider delayDuration={0}>
            <App />
          </TooltipProvider>
          </RouteProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
