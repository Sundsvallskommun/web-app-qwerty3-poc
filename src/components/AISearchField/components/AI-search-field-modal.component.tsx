import { AIFeed, Bubble } from "@sk-web-gui/ai";
import { cx } from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useSessions } from "../../../services/session-store";
import { useMe } from "../../../services/user-service";
import { Assistant, ChatHistory } from "../../../types";
import { AssistantAvatar } from "../../AssistantAvatar/assistant-avatar";
import { Modal } from "../../Modal/modal.component";
import { AISearchFieldPresentation } from "./AI-search-field-presentation.component";
import { AISearchFieldAssistantPicker } from "./AI-search-field-assistantpicker.component";

interface AISearchFieldModalProps
  extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  onClose?: () => void;
  history?: ChatHistory;
  assistant?: Assistant;
  onChangeSession?: (sessionId: string) => void;
}

export const AISearchFieldModal: React.FC<AISearchFieldModalProps> = (
  props
) => {
  const {
    className,
    open,
    onClose,
    history,
    assistant,
    onChangeSession,
    ...rest
  } = props;
  const { data } = useMe();
  const [allSessions, refreshSessions] = useSessions(
    useShallow((state) => [state.sessions, state.refreshSessions])
  );
  const [showSelector, setShowSelector] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const sessions = allSessions?.[assistant?.info?.id]
    ? Object.values(allSessions?.[assistant?.info?.id])
        ?.filter((session) => !!session?.name && !session.isNew)
        ?.slice(0, 5)
    : [];

  useEffect(() => {
    refreshSessions(assistant?.settings?.assistantId);
  }, []);

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  useEffect(() => {
    handleAutoScroll();
  }, [history, open]);

  const isActive = history?.length > 0;

  return (
    <Modal
      className={cx(
        "bottom-[100%] mb-12",
        history?.length > 0 || showSelector ? "max-h-[640px]" : "max-h-[570px]",
        className
      )}
      {...rest}
      label={
        isActive
          ? `${assistant?.info?.name} - snabbhjälp`
          : `👋 Hej ${data?.username}!`
      }
      open={open}
      onClose={onClose}
      header={{ className: history?.length > 0 ? "bg-background-200" : "" }}
    >
      {showSelector ? (
        <AISearchFieldAssistantPicker onClose={() => setShowSelector(false)} />
      ) : (
        <div
          className="flex flex-col gap-12 pb-4 px-24 overflow-y-auto grow"
          ref={scrollRef}
        >
          {isActive ? (
            <AIFeed
              history={history}
              avatars={{
                assistant: (
                  <AssistantAvatar assistant={assistant?.info} size={"sm"} />
                ),
              }}
              titles={{
                assistant: { title: assistant?.info?.name, show: true },
                system: { title: assistant?.info?.name, show: false },
                user: { title: "Du", show: true },
              }}
            />
          ) : (
            <>
              <h2 className="text-h3-md mx-6">
                Ta hjälp från din favoritassistent!
              </h2>
              <AISearchFieldPresentation
                assistant={assistant}
                onChangeAssistant={() => setShowSelector(true)}
              />
              <div className="grow pb-8">
                <p>
                  Din assistent kan guida dig genom både små och stora problem.
                  Tveka aldrig att fråga om hjälp!
                </p>
              </div>
              {sessions?.length > 0 && (
                <div className="flex flex-col gap-12 mb-28">
                  <h3 className="text-label-medium">Dina senaste frågor</h3>
                  <div className="flex flex-wrap gap-12">
                    {sessions?.map((session, index) => (
                      <Bubble
                        key={`session-${index}-${session.id}`}
                        onClick={() => onChangeSession(session.id)}
                      >
                        <span className="max-w-[220px] overflow-hidden whitespace-nowrap text-ellipsis">
                          {session.name}
                        </span>
                      </Bubble>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Modal>
  );
};
