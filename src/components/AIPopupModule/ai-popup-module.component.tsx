import {
  AICornerModuleHeader,
  AIFeed,
  AssistantPresentation,
  InputSection,
} from "@sk-web-gui/ai";
import { Button, cx, Icon, MenuBar } from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../services/list-store";
import { useChat } from "../../services/useChat";
import { Assistant } from "../../types";
import { AssistantAvatar } from "../AssistantAvatar/assistant-avatar";
import { AIPopupModuleHeader } from "./components/ai-popup-module-header.component";
import { AIPopupModuleSessions } from "./components/ai-popup-module-sessions";
import { Pencil, Plus } from "lucide-react";
import { ResourcePermission } from "../../types/data-contracts";
import { AISettings } from "../AISettings/ai-settings.component";

interface AIPopupModuleProps extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  onClose?: (remove?: boolean) => void;
  assistant: Assistant;
}

export const AIPopupModule: React.FC<AIPopupModuleProps> = (props) => {
  const [trueOpen, setTrueOpen] = useState<boolean>(false);
  const [toClose, setToClose] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ bottom: number; left: number }>({
    bottom: 0,
    left: 0,
  });

  const [edit, setEdit] = useState<boolean>(false);

  const [dragging, setDragging] = useState<boolean>(false);
  const { className, onClose, open, assistant, ...rest } = props;

  const info = assistant?.info;
  const settings = assistant?.settings;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [setActiveSession] = useListStore(
    useShallow((state) => [state.setActiveSession])
  );

  const { history, session, newSession, sendQuery } = useChat({
    sessionId: settings?.activeSession,
    settings: settings,
  });

  useEffect(() => {
    if (session?.id !== settings?.activeSession && open) {
      setActiveSession(settings.assistantId, session?.id);
    }
  }, [session, open, assistant]);

  useEffect(() => {
    setTimeout(
      () => {
        setTrueOpen(open);
        if (toClose) {
          setActiveSession(settings.assistantId, undefined);
          onClose(true);
          setFullscreen(false);
          setPosition({ left: 0, bottom: 0 });
          newSession();
          setToClose(false);
        }
      },
      open ? 20 : 150
    );
  }, [open]);

  const handleClose = () => {
    setToClose(true);
    onClose();
  };

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

  const handleMouseDown = () => {
    setDragging(true);
  };
  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    //FIXME: Stop dragging when outside element
    if (dragging) {
      setPosition({
        left: position.left + e.movementX,
        bottom: position.bottom - e.movementY,
      });
    }
  };

  return (
    <div
      className="absolute w-screen flex justify-center h-fit"
      style={{
        bottom: fullscreen ? 0 : position.bottom,
        left: fullscreen ? 0 : position.left,
      }}
    >
      <div
        className={cx(
          "shadow-200 border-1 border-divider bg-background-content flex-col",
          { ["animate-dissappear"]: toClose, ["rounded-groups"]: !fullscreen },
          fullscreen ? "max-w-screen w-screen" : "max-w-[26em] w-[26em]",
          "transition-all duration-300",
          (!open || !trueOpen) && !toClose
            ? "h-0 opacity-0"
            : fullscreen
            ? "h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] opacity-100 rounded-0"
            : "max-h-[40em] h-[40em] opacity-100 mb-12 bottom-[100%]",

          open || trueOpen ? "flex" : "hidden",
          className
        )}
        {...rest}
        data-fullscreen={fullscreen}
      >
        <AIPopupModuleHeader
          assistant={info}
          onClose={handleClose}
          onMinimize={onClose}
          onToggleFullscreen={() => setFullscreen(!fullscreen)}
          fullscreen={fullscreen}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          draggable
          dragging={dragging}
          sessionName={session?.name}
        ></AIPopupModuleHeader>
        <div
          className={cx("sk-ai-corner-module-content  overflow-hidden", {
            ["rounded-b-groups"]: !fullscreen,
          })}
        >
          {fullscreen && (
            <div className="sk-ai-corner-module-content-row">
              <div className="sk-ai-corner-module-sidebar">
                <AICornerModuleHeader
                  variant="alt"
                  fullscreen
                  assistant={info}
                  // TODO: Fix this in Shared
                  // avatar={avatars?.assistant}
                  // title={title}
                  // subtitle={subtitle}
                />
                <div className="flex flex-col px-24 gap-16">
                  {/* {assistant?.info?.permissions?.includes(
                    ResourcePermission.Edit
                  ) && (
                    <Button
                      variant="secondary"
                      leftIcon={<Icon icon={<Pencil />} />}
                      onClick={() => setEdit(!edit)}
                    >
                      Anpassa assistenten
                    </Button>
                  )} */}
                  <Button
                    variant="primary"
                    color="vattjom"
                    leftIcon={<Icon icon={<Plus />} />}
                    onClick={() => newSession()}
                  >
                    Ny fråga
                  </Button>
                  <MenuBar
                    current={edit ? 1 : 0}
                    showBackground
                    className="w-full p-6 gap-8"
                  >
                    <MenuBar.Item className="grow">
                      <Button
                        size="md"
                        onClick={() => setEdit(false)}
                        className="w-full"
                      >
                        Historik
                      </Button>
                    </MenuBar.Item>
                    <MenuBar.Item className="grow">
                      <Button
                        size="md"
                        className="w-full"
                        onClick={() => setEdit(true)}
                        disabled={
                          !assistant.info.permissions.includes(
                            ResourcePermission.Edit
                          )
                        }
                      >
                        Inställningar
                      </Button>
                    </MenuBar.Item>
                  </MenuBar>
                </div>
                {edit ? (
                  <div className="py-8 px-24">
                    <AISettings assistantId={assistant.settings.assistantId} />
                  </div>
                ) : (
                  <AIPopupModuleSessions
                    current={session?.isNew ? "" : session.id}
                    // sessions={sessionHistory}
                    onSelectSession={(id) =>
                      setActiveSession(assistant.settings.assistantId, id)
                    }
                    assistant={assistant}
                  />
                )}
              </div>
            </div>
          )}
          <div
            className={cx(
              "sk-ai-corner-module-content-row sk-ai-corner-module-content-main"
            )}
          >
            <div
              className={cx("sk-ai-corner-module-feed", {
                ["w-full items-center"]: fullscreen,
              })}
              ref={scrollRef}
            >
              {!history || history.length < 1 ? (
                <>
                  {!!info?.description && (
                    <AssistantPresentation
                      size={fullscreen ? "lg" : "sm"}
                      assistant={info}
                      // NOTE: This should be like in the corner module
                      // avatar={avatars?.assistant}
                    />
                  )}
                  {/* TODO: add readmore link */}
                  {/* {readmore && (
                      <div className="sk-ai-corner-module-feed-readmore">
                        <Link external href={readmore.url}>
                          {readmore.description}
                        </Link>
                      </div>
                    )} */}

                  {/* TODO: add predefiened questions */}
                  {/* {questions && questions?.length > 0 && (
                      <div className="sk-ai-corner-module-feed-questions-wrapper">
                        {questionsTitle && (
                          <div className="sk-ai-corner-module-feed-questions-title">{questionsTitle}</div>
                        )}
                        <div className="sk-ai-corner-module-feed-questions">
                          {questions?.map((question, index) => (
                            <Bubble key={`q-bubble-${index}`} onClick={() => handleSelectQuestion(question)}>
                              {question}
                            </Bubble>
                          ))}
                        </div>
                      </div>
                    )} */}
                </>
              ) : (
                <AIFeed
                  history={history}
                  className={cx({ ["w-full max-w-[50em]"]: fullscreen })}
                  avatars={{
                    assistant: (
                      <AssistantAvatar
                        assistant={info}
                        size={fullscreen ? "md" : "sm"}
                      />
                    ),
                  }}
                  titles={{
                    assistant: { title: info.name, show: true },
                    system: { title: info.name, show: false },
                    user: { title: "Du", show: true },
                  }}
                />
              )}
            </div>
            <InputSection
              placeholder={`Skriv till ${info?.name}`}
              shadow
              sessionId={session?.id}
              onSendQuery={sendQuery}
              className={cx(
                {
                  ["rounded-b-groups"]: !fullscreen,
                  ["max-w-[50em]"]: fullscreen,
                },
                "overflow-hidden shrink-0"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
