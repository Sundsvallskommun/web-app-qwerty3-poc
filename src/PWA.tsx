import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { EnterApiKey } from "./components/EnterApiKey/enter-apikey.component";
import { PWAListView } from "./components/PWAListView/pwa-list-view.component";
import { useAssistantStore } from "./services/assistant-store";
import { AIPWAModule } from "./components/AIPWAModule/ai-pwa-module.component";
import { useListStore } from "./services/list-store";
import { Spinner } from "@sk-web-gui/react";
import { PWALogin } from "./components/PWALogin/pwa-login.component";

export const PWA = () => {
  const path: string[] = window.location.pathname
    .replace(import.meta.env.VITE_BASE_PATH, "")
    .split("/");

  const [
    activeAssistantId,
    setActiveAssistantId,
    assistantsMap,
    assistantList,
    refresh,
  ] = useListStore(
    useShallow((state) => [
      state.activeAssistantId,
      state.setActiveAssistantId,
      state.assistants,
      state.list,
      state.refreshAssistants,
    ])
  );

  const [setSettings, setInfo, apiKey, settings] = useAssistantStore(
    useShallow((state) => [
      state.setSettings,
      state.setInfo,
      state.apikey,
      state.settings,
    ])
  );

  useEffect(() => {
    if (apiKey && assistantList?.length < 1) {
      refresh();
    }
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey && path[0] !== "login") {
      console.log("Opening login window");
      console.log("window.location.origin: ", window.location.origin);

      window.open(
        `${window.location.origin}${import.meta.env.VITE_BASE_PATH}login`,
        "_blank",
        "toolbar=no, location=no, directories=no, status=no, menubar=no"
      );
    }
  }, [apiKey]);

  const currentAssistant = assistantsMap?.[activeAssistantId];

  useEffect(() => {
    if (path[0] === "assistant" && typeof path[1] === "string") {
      const id = path[1];
      console.log("🚀 ~ useEffect ~ id:", id);
      if (activeAssistantId !== id) {
        setActiveAssistantId(id);
      }
    } else {
      setActiveAssistantId(null);
    }
  }, [path]);

  // useEffect(() => {
  //   if (settings?.assistantId !== currentAssistant?.settings?.assistantId) {
  //     setSettings(currentAssistant?.settings);
  //     setInfo(currentAssistant?.info);
  //   }
  // }, [currentAssistant]);

  const PathComp = () => {
    const firstPath = path[0];
    switch (firstPath) {
      case "login":
        return <EnterApiKey />;
      case "assistant":
        return !currentAssistant ? (
          <Spinner />
        ) : (
          <AIPWAModule assistant={currentAssistant} />
        );
      default:
        return !apiKey ? <PWALogin /> : <PWAListView />;
    }
  };

  return <PathComp />;
};
