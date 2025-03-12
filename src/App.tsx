import { ColorSchemeMode, GuiProvider } from "@sk-web-gui/react";
import React, { Suspense, useEffect, useState } from "react";
import { StartBar } from "./components/startbar.component";
import {
  setAssistantStoreName,
  useAssistantStore,
} from "./services/assistant-store";
import { EnterApiKey } from "./components/EnterApiKey/enter-apikey.component";

function App() {
  const [setStream, setApiBaseUrl, apikey] = useAssistantStore((state) => [
    state.setStream,
    state.setApiBaseUrl,
    state.apikey,
  ]);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAssistantStoreName(`sk-qwerty-3`);

    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

    setLoaded(true);
  }, []);

  return (
    <GuiProvider htmlFontSize={16} colorScheme={ColorSchemeMode.System}>
      <Suspense fallback="loading">
        {loaded && <>{!apikey ? <EnterApiKey /> : <StartBar />}</>}
      </Suspense>
    </GuiProvider>
  );
}

export default App;
