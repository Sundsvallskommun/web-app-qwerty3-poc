import { useShallow } from "zustand/shallow";
import { useAssistantStore } from "../../services/assistant-store";
import { Spinner } from "@sk-web-gui/react";
import { useEffect } from "react";

export const PWALogin: React.FC = () => {
  const [apiKey, setApiKey] = useAssistantStore(
    useShallow((state) => [state.apikey, state.setApikey])
  );

  const bc = new BroadcastChannel("qwerty_channel");
  bc.onmessage = (event) => {
    setApiKey(event.data);
  };

  useEffect(() => {
    if (!!apiKey) {
      bc.close();
    }
  }, [apiKey]);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-background-content">
      <Spinner />
    </div>
  );
};
