import { useEffect, useState } from "react";
import { getAssistantById } from "./assistant-service";
import { AssistantPublic } from "../types";

export const useAssistant = (
  assistantId: string
): { data: AssistantPublic | null; loaded: boolean } => {
  const [data, setData] = useState<AssistantPublic | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (data?.id !== assistantId) {
      setData(null);
      setLoaded(false);
      getAssistantById({ assistantId }).then((res) => {
        setData(res);
        setLoaded(true);
      });
    }
  }, [assistantId]);

  return { data, loaded };
};
