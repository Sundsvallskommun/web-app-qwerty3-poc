import { useEffect, useMemo, useState } from "react";
import { Assistant } from "../types";
import { getSpaceApplications } from "./assistant-service";
import { mapIntricAssistantToAssistant } from "../utils/map-assistant.util";

export const useSpaceAssistants = (spaces: string[]) => {
  const [assistants, setAssistants] = useState<Record<string, Assistant>>({});
  const [loaded, setLoaded] = useState<number>(0);

  const stringedSpaces = useMemo(() => JSON.stringify(spaces), [spaces]);

  useEffect(() => {
    setLoaded(0);
    setAssistants({});
    for (let index = 0; index < spaces.length; index++) {
      getSpaceApplications(spaces[index]).then((res) => {
        const newAssistants = res.assistants.items.reduce(
          (assistants, assistant) => ({
            ...assistants,
            [assistant.id]: mapIntricAssistantToAssistant(
              assistant,
              spaces[index],
              false
            ),
          }),
          {}
        );

        setAssistants((old) => ({ ...old, ...newAssistants }));

        setLoaded((oldValue) => oldValue + 100 / spaces.length);
      });
    }
  }, [stringedSpaces]);

  return { assistants, loaded: Math.ceil(loaded) };
};
