import { Avatar, Button, cx, Icon, Input } from "@sk-web-gui/react";
import { Send } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../services/list-store";
import { useChat } from "../../services/useChat";
import { Assistant } from "../../types";
import { AISearchFieldModal } from "./components/AI-search-field-modal.component";

interface AISearchFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  input?: React.ComponentPropsWithoutRef<typeof Input.Component>;
  button?: React.ComponentPropsWithoutRef<typeof Button.Component>;
  assistant: Assistant;
}

export const AISearchField: React.FC<AISearchFieldProps> = (props) => {
  const [sessionId, setSessionId] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { input, button, className, assistant, ...rest } = props;
  const { session, sendQuery, newSession, history } = useChat({
    settings: assistant?.settings,
    sessionId,
  });

  const [active, setActive] = useListStore(
    useShallow((state) => [state.activeAssistantId, state.setActiveAssistantId])
  );

  const open = active === "searchfield";

  useEffect(() => {
    if (session?.id && sessionId !== session?.id) {
      setSessionId(session.id);
    }
  }, [session?.id]);

  const handleOpen = () => {
    setActive("searchfield");
  };
  const handleClose = () => {
    setActive("");
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      sendQuery(query);
      setQuery("");
    }
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        newSession();
      }, 150);
    }
  }, [open]);

  return (
    <div className={cx("flex p-6", className)} {...rest}>
      <AISearchFieldModal
        open={open}
        onClose={handleClose}
        assistant={assistant}
        onChangeSession={setSessionId}
        history={history}
      />
      <form onSubmit={handleSubmit}>
        <Input.Group size="md" className="rounded-full" onClick={handleOpen}>
          <Input.LeftAddin className="pl-4">
            <Avatar
              rounded
              imageElement={
                typeof assistant?.info?.avatar !== "string"
                  ? assistant?.info.avatar
                  : undefined
              }
              imageUrl={
                typeof assistant?.info?.avatar === "string"
                  ? assistant?.info.avatar
                  : undefined
              }
              size="sm"
              className="w-32 h-32"
            ></Avatar>
          </Input.LeftAddin>
          <Input
            placeholder={`Fråga ${assistant?.info?.name}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            {...input}
          />
          <Input.RightAddin className="pr-4">
            <Button
              iconButton
              type="submit"
              rounded
              aria-label="Skicka"
              size="sm"
              variant="tertiary"
              showBackground={false}
            >
              <Icon icon={<Send />} />
            </Button>
          </Input.RightAddin>
        </Input.Group>
      </form>
    </div>
  );
};
