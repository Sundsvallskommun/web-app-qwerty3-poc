import { cx, Icon, useGui } from "@sk-web-gui/react";
import { AIFeedAvatar, AssistantInfo } from "../../../types";
import { AssistantAvatar } from "../../AssistantAvatar/assistant-avatar";
import { AICornerModuleHeaderMenu } from "@sk-web-gui/ai";
import { Maximize2, MessageCircle, Minimize2, Minus, X } from "lucide-react";

interface AIPopupModuleHeaderProps
  extends React.ComponentPropsWithoutRef<"header"> {
  fullscreen?: boolean;
  assistant: AssistantInfo;
  onToggleFullscreen?: (fullscreen: boolean) => void;
  onClose?: () => void;
  onMinimize?: () => void;
  avatar?: AIFeedAvatar;
  dragging?: boolean;
  draggable?: boolean;
  color?: string;
  sessionName?: string;
}

export const AIPopupModuleHeader: React.FC<AIPopupModuleHeaderProps> = (
  props
) => {
  const {
    className,
    fullscreen,
    assistant,
    onToggleFullscreen,
    onClose,
    onMinimize,
    avatar,
    dragging,
    draggable,
    color = "black",
    sessionName,
    ...rest
  } = props;

  return (
    <header
      className={cx(
        "sk-ai-corner-module-header bg-background-200 text-dark-primary",
        { ["rounded-t-groups"]: !fullscreen },
        draggable
          ? dragging
            ? "cursor-grabbing"
            : "cursor-grab"
          : "cursor-default",
        className
      )}
      {...rest}
    >
      <div
        className={cx("sk-ai-corner-module-header-title min-w-1/4", {
          ["grow"]: !fullscreen,
        })}
      >
        {!fullscreen && (
          <>
            <AssistantAvatar assistant={assistant} avatar={avatar} size="sm" />
            <div className="sk-ai-corner-module-header-heading">
              <span className="sk-ai-corner-module-header-heading-name">
                {assistant?.name}
              </span>
            </div>
          </>
        )}
      </div>
      {fullscreen && (
        <div className="sk-ai-corner-module-header-title grow justify-center min-w-1/4">
          <Icon icon={<MessageCircle />} />
          <span className="sk-ai-corner-module-header-heading-name text-dark-primary">
            {sessionName ? sessionName : "Ny fråga"}
          </span>
        </div>
      )}
      <AICornerModuleHeaderMenu>
        <AICornerModuleHeaderMenu.Item
          icon={fullscreen ? <Minimize2 /> : <Maximize2 />}
          label={fullscreen ? "Återställ storlek" : "Fullskärm"}
          onClick={() => onToggleFullscreen(!fullscreen)}
        />
        <AICornerModuleHeaderMenu.Item
          icon={<Minus />}
          label={"Minimera"}
          onClick={() => onMinimize()}
        />
        <AICornerModuleHeaderMenu.Item
          icon={<X />}
          label={"Stäng"}
          onClick={() => onClose()}
        />
      </AICornerModuleHeaderMenu>
    </header>
  );
};
