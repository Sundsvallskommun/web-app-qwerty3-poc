import { useEffect, useMemo, useState } from "react";
import { Assistant } from "../types";
import { getSpaceApplications } from "./assistant-service";
import avatar1 from "../assets/beslutscoachen.png";
import avatar2 from "../assets/datakirurgen.png";
import avatar3 from "../assets/paragrafryttaren.png";
import avatar4 from "../assets/qwerty.png";
import avatar5 from "../assets/qwerty2.png";
import avatar6 from "../assets/qwerty3.png";
import avatar7 from "../assets/user.png";
import avatar8 from "../assets/varumarkesvaktaren.png";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

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
            [assistant.id]: {
              info: {
                avatar: avatars[index],
                name: assistant.name,
                shortName: assistant.name[0],
                title: "En kort beskrivning av assistenten.",
                description:
                  "En lite längre beskrivning av assistenten, dess syfte och annat som är bra att veta.",
                id: assistant.id,
                space_id: spaces[index],
                permissions: assistant.permissions,
              },
              settings: {
                assistantId: assistant.id,
                pinned: false,
              },
            },
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
