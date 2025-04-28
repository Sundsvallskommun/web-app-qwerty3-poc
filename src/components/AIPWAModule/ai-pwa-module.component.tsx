import {
  AICornerModuleHeader,
  AssistantPresentation,
  InputSection,
} from "@sk-web-gui/ai";
import {
  Button,
  cx,
  FileUpload,
  Icon,
  MenuBar,
  useSnackbar,
} from "@sk-web-gui/react";
import { File, FileUp, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { uploadFile } from "../../services/assistant-service";
import { useListStore } from "../../services/list-store";
import { useChat } from "../../services/useChat";
import { Assistant, FilePublic, ResourcePermission } from "../../types";
import { AIFeed } from "../AIFeed";
import { AIPopupModuleSessions } from "../AIPopupModule/components/ai-popup-module-sessions";
import { AISettings } from "../AISettings/ai-settings.component";
import { AssistantAvatar } from "../AssistantAvatar/assistant-avatar";

interface AIPWAModuleProps {
  assistant: Assistant;
}

export const AIPWAModule: React.FC<AIPWAModuleProps> = ({ assistant }) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [files, setFiles] = useState<FilePublic[]>([]);
  const message = useSnackbar();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [setActiveSession] = useListStore(
    useShallow((state) => [state.setActiveSession])
  );

  const settings = assistant?.settings;
  const info = assistant?.info;

  const { history, session, newSession, sendQuery } = useChat({
    sessionId: settings?.activeSession,
    settings,
  });

  useEffect(() => {
    if (session?.id !== settings?.activeSession) {
      setActiveSession(settings.assistantId, session?.id);
    }
  }, [session?.id, settings?.activeSession, info?.id]);

  useEffect(() => {
    console.log("assistant: ", assistant);
    newSession();
  }, []);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      console.log("resize: ", event);
      if (event[0].contentRect.width < 600) {
        setFullscreen(false);
      } else {
        setFullscreen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendQuery = (query: string) => {
    if (query) {
      if (files?.length > 0) {
        sendQuery(query, files);
        setFiles([]);
      } else {
        sendQuery(query);
      }
    }
  };

  const handleFiles = (event: any) => {
    for (let index = 0; index < event.target.value.length; index++) {
      const file = event.target.value?.[index]?.file;
      uploadFile(file)
        .then((res) => {
          setFiles((files) => [...files, res]);
        })
        .catch(() => {
          message({ message: "Kunde inte ladda upp fil", status: "error" });
        });
    }
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
  }, [history]);

  return (
    !!settings && (
      <div
        className={cx(
          "sk-ai-corner-module-content overflow-hidden bg-background-content h-screen max-h-screen rounded-b-0"
        )}
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
                        !info.permissions.includes(ResourcePermission.Edit)
                      }
                    >
                      Inställningar
                    </Button>
                  </MenuBar.Item>
                </MenuBar>
              </div>
              {edit ? (
                <div className="py-8 px-24">
                  <AISettings assistantId={settings?.assistantId} />
                </div>
              ) : (
                <AIPopupModuleSessions
                  current={session?.isNew ? "" : session.id}
                  onSelectSession={(id) =>
                    setActiveSession(settings?.assistantId, id)
                  }
                  assistant={{ info, settings }}
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
          <div
            className={cx("flex justify-start w-full gap-8 text-small", {
              ["max-w-[50em]"]: fullscreen,
            })}
          >
            {files?.map((file) => (
              <span key={file.id} className="inline-flex gap-4">
                <Icon size={18} icon={<File />} /> {file.name}
              </span>
            ))}
          </div>
          <div
            className={cx(
              "flex gap-0 w-full justify-center items-center overflow-hidden shrink-0",
              {
                ["max-w-[50em]"]: fullscreen,
              }
            )}
          >
            {fullscreen && (
              <FileUpload onChange={handleFiles}>
                <Button
                  variant="tertiary"
                  iconButton
                  aria-label="Ladda upp fil"
                  className="ml-16"
                >
                  <Icon icon={<FileUp />} />
                </Button>
              </FileUpload>
            )}
            <InputSection
              placeholder={`Skriv till ${info?.name}`}
              shadow={!fullscreen}
              sessionId={session?.id}
              onSendQuery={handleSendQuery}
              className={cx({
                ["rounded-b-groups"]: !fullscreen,
                ["max-w-[45em]"]: fullscreen,
              })}
            />
          </div>
        </div>
      </div>
    )
  );
};
