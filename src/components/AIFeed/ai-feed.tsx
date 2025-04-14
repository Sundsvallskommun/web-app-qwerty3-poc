import { useForkRef } from "@sk-web-gui/utils";
import React from "react";
import { ChatHistory, ChatHistoryEntry } from "../../types";
import { AIFeedAvatarMap } from "../../types/avatar";
import { AIFeedEntry } from "./ai-feed-entry";
import { AIFeedWrapper } from "./ai-feed-wrapper";
import { OriginTitleMap } from "../../types/titles";

export interface AIFeedProps extends React.ComponentPropsWithoutRef<"ul"> {
  history: ChatHistory;
  showReferences?: boolean;
  sessionId?: string;
  avatars?: AIFeedAvatarMap;
  showFeedback?: boolean;
  showTitles?: boolean;
  onGiveFeedback?: (value: -1 | 1) => void;
  size?: "sm" | "lg";
  inverted?: boolean;
  titles?: OriginTitleMap;
}

export const AIFeed = React.forwardRef<HTMLUListElement, AIFeedProps>(
  (props, ref) => {
    const [lastMessage, setLastMessage] = React.useState<
      ChatHistoryEntry | undefined
    >(undefined);
    const [lastOwnMessage, setLastOwnMessage] = React.useState<
      ChatHistoryEntry | undefined
    >(undefined);
    const internalRef = React.useRef<HTMLUListElement>(null);
    const {
      history,
      onGiveFeedback,
      showReferences = true,
      avatars,
      className,
      showFeedback = true,
      showTitles = true,
      sessionId,
      size,
      inverted,
      titles,
      ...rest
    } = props;

    const assistantHistory = React.useMemo(
      () => history.filter((message) => message.origin !== "user"),
      [history]
    );
    const userHistory = React.useMemo(
      () => history.filter((message) => message.origin === "user"),
      [history]
    );

    React.useEffect(() => {
      const latest = assistantHistory.at(-1);

      if (latest?.done && latest.id !== lastMessage?.id) {
        setLastMessage(latest);
      }
    }, [assistantHistory]);

    React.useEffect(() => {
      const latest = userHistory.at(-1);

      if (latest?.done && latest.id !== lastOwnMessage?.id) {
        setLastOwnMessage(latest);
      }
    }, [userHistory]);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.scrollTop = internalRef.current.scrollHeight;
      }
    }, [history]);

    return (
      <>
        <AIFeedWrapper
          ref={useForkRef(ref, internalRef)}
          className={className}
          {...rest}
        >
          {history?.map((entry, index) => (
            <AIFeedEntry
              key={`${index}-${entry.id}`}
              showReferences={showReferences}
              entry={entry}
              avatar={avatars ? avatars[entry.origin] : undefined}
              showTitle={titles?.[entry.origin]?.show ?? showTitles}
              title={titles?.[entry.origin]?.title}
              onGiveFeedback={onGiveFeedback}
              size={size}
              sessionId={sessionId}
              inverted={inverted}
            ></AIFeedEntry>
          ))}
        </AIFeedWrapper>
        <div
          className="sk-ai-feed-live-wrapper"
          aria-live="polite"
          aria-atomic={false}
        >
          {lastMessage && (
            <AIFeedEntry
              showReferences={false}
              entry={lastMessage}
              showTitle={true}
              title={titles?.[lastMessage.origin]?.title}
              tabbable={false}
            />
          )}
        </div>
        <div
          className="sk-ai-feed-live-wrapper"
          aria-live="polite"
          aria-atomic={false}
        >
          {lastOwnMessage && (
            <AIFeedEntry
              showReferences={false}
              entry={lastOwnMessage}
              title={titles?.[lastOwnMessage.origin]?.title}
              showTitle={true}
              tabbable={false}
            />
          )}
        </div>
      </>
    );
  }
);
