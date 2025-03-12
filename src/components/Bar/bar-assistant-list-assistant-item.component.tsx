import { Assistant } from "@/src/types";
import { Avatar } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useSessions } from "../../services/session-store";
import { AssistantButton } from "../AssistantButton/assistant-button.component";
import { BarAssistantListItem } from "./bar-assistant-list-item.component";

interface BarAssistantListAssistantItemProps {
  current?: string;
  remove?: string;
  setCurrent?: (id: string) => void;
  assistant: Assistant;
}

export const BarAssistantListAssistantItem: React.FC<
  BarAssistantListAssistantItemProps
> = (props) => {
  const { setCurrent, current, remove, assistant } = props;
  const [callout, setCallout] = useState<boolean>(false);

  const session = useSessions(
    useShallow(
      (state) =>
        state.sessions?.[assistant?.settings?.assistantId]?.[
          assistant?.settings?.activeSession
        ]
    )
  );

  useEffect(() => {
    if (!current && session?.history?.length > 0) {
      setCallout(true);
    }
  }, [session?.history]);

  useEffect(() => {
    if (current === assistant?.settings?.assistantId) {
      setCallout(false);
    }
  }, [current]);

  return (
    <BarAssistantListItem
      current={current === assistant.settings.assistantId}
      key={assistant.settings.assistantId}
      active={!!assistant.settings.activeSession}
      remove={remove === assistant.settings.assistantId}
      callout={callout}
      button={
        <AssistantButton
          size="sm"
          label={assistant.info.name}
          active={current === assistant.settings.assistantId}
          onClick={() =>
            setCurrent(
              current === assistant.settings.assistantId
                ? ""
                : assistant.settings.assistantId
            )
          }
          image={
            <Avatar
              imageUrl={
                typeof assistant.info.avatar === "string"
                  ? assistant.info.avatar
                  : undefined
              }
              imageElement={
                typeof assistant.info.avatar !== "string"
                  ? assistant.info.avatar
                  : undefined
              }
              size="sm"
              className="rounded-utility"
            />
          }
        ></AssistantButton>
      }
    />
  );
};
