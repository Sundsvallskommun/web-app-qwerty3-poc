import { ColorSchemeMode, GuiProvider } from "@sk-web-gui/react";
import { Suspense, useEffect, useState } from "react";
import { EnterApiKey } from "./components/EnterApiKey/enter-apikey.component";
import { StartBar } from "./components/startbar.component";
import { PWA } from "./PWA";
import { useAppStore } from "./services/app-store";
import {
  setAssistantStoreName,
  useAssistantStore,
} from "./services/assistant-store";
import { useShallow } from "zustand/shallow";

function App() {
  const [setStream, setApiBaseUrl, apikey] = useAssistantStore(
    useShallow((state) => [state.setStream, state.setApiBaseUrl, state.apikey])
  );
  const [isPWA, setIsPWA] = useAppStore(
    useShallow((state) => [state.isPWA, state.setIsPWA])
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches ||
      window.matchMedia("(display-mode: borderless)").matches ||
      !window.matchMedia("(display-mode: browser)").matches;

    console.log("isInStandaloneMode: ", isInStandaloneMode);

    setIsPWA(isInStandaloneMode);
    setAssistantStoreName(`sk-qwerty-3`);

    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

    setLoaded(true);
  }, []);

  return (
    <GuiProvider htmlFontSize={16} colorScheme={ColorSchemeMode.System}>
      <Suspense fallback="loading">
        {loaded && (
          <>
            {isPWA ? <PWA /> : <>{!apikey ? <EnterApiKey /> : <StartBar />}</>}
          </>
        )}
      </Suspense>
    </GuiProvider>
  );
}

export default App;
