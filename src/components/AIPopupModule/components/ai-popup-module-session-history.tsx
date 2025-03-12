import { Button } from "@sk-web-gui/button";
import { Divider } from "@sk-web-gui/divider";
import { Icon } from "@sk-web-gui/icon";
import { cx } from "@sk-web-gui/utils";
import React from "react";
import { SessionHistory } from "../../../types";
import { MessageCircle } from "lucide-react";
export interface AIPopupModuleSessionHistoryProps
  extends React.ComponentPropsWithoutRef<"div"> {
  sessions: SessionHistory;
  title: string;
  /**
   * Id of the current (opened) session
   */
  current?: string;

  onSelectSession?: (sessionId: string) => void;
  onKeyNext?: (currentId: string) => void;
  onKeyPrev?: (currentId: string) => void;
}

export const AIPopupModuleSessionHistory = React.forwardRef<
  HTMLDivElement,
  AIPopupModuleSessionHistoryProps
>((props, ref) => {
  const {
    sessions,
    title,
    className,
    onSelectSession,
    current,
    onKeyNext,
    onKeyPrev,
    ...rest
  } = props;
  const idPrefix = "sk-ai-session-item-";
  const focusable = current ? current : sessions[0].id;

  const handleKeyboardNavigation = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        onKeyNext?.(id);
        break;
      case "ArrowUp":
        event.preventDefault();
        onKeyPrev?.(id);
        break;
    }
  };

  return (
    <div
      ref={ref}
      className={cx("sk-ai-corner-module-sessions-history", className)}
      {...rest}
    >
      <Divider.Section size="sm">{title}</Divider.Section>
      <ul
        role="group"
        aria-label={title}
        className="sk-ai-corner-module-sessions-history-list"
      >
        {sessions.map((session, index) => (
          <li
            key={index + session.id}
            className="sk-ai-corner-module-sessions-history-list-entry"
            role="none"
          >
            <Button
              aria-current={current === session.id}
              tabIndex={focusable === session.id ? 0 : -1}
              size="sm"
              variant="tertiary"
              role="menuitem"
              id={`sk-ai-session-item-${session.id}`}
              onClick={() => onSelectSession && onSelectSession(session.id)}
              leftIcon={<Icon icon={<MessageCircle />} />}
              onKeyDown={(e) =>
                handleKeyboardNavigation(e, idPrefix + session.id)
              }
            >
              {session.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AIPopupModuleSessionHistory;
