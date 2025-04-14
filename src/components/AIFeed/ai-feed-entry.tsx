import { Disclosure } from "@sk-web-gui/accordion";
import { Link } from "@sk-web-gui/link";
import { cx } from "@sk-web-gui/utils";
import React from "react";
import { ChatHistoryEntry } from "../../types";
import { MarkdownRendered, TypingBubble } from "@sk-web-gui/ai";
import { useAssistantStore } from "../../services/assistant-store";
import { Icon } from "@sk-web-gui/react";
import { File, FileImage, FileText } from "lucide-react";

interface AIFeedEntryProps extends React.ComponentPropsWithoutRef<"li"> {
  avatar?: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  showReferences?: boolean;
  referenceTitle?: string;
  entry: ChatHistoryEntry;
  loadingMessage?: string;
  loadingComponent?: React.ReactNode;
  sessionId?: string;
  /**
   * @default true
   */
  tabbable?: boolean;
  onGiveFeedback?: (value: -1 | 1) => void;
  size?: "sm" | "lg";
  inverted?: boolean;
  /**
   * @default true
   */
  showFiles?: boolean;
}

export const AIFeedEntry = React.forwardRef<HTMLLIElement, AIFeedEntryProps>(
  (props, ref) => {
    const {
      avatar,
      entry,
      className,
      title: _title,
      showTitle,
      loadingMessage = "Inväntar svar",
      showReferences,
      referenceTitle = "Kunskapskällor",
      sessionId,
      tabbable,
      onGiveFeedback,
      size,
      inverted,
      loadingComponent = <TypingBubble inverted={inverted} />,
      showFiles = true,
      ...rest
    } = props;
    const info = useAssistantStore((state) => state.info);
    const { done } = entry;
    const [loading, setLoading] = React.useState<boolean>(false);
    const title = _title ?? (entry.origin === "user" ? "Du" : info?.name || "");
    const timeout = React.useRef(setTimeout(() => {}));

    React.useEffect(() => {
      if (!done) {
        timeout.current = setTimeout(() => {
          setLoading(true);
        }, 3500);
      } else {
        clearTimeout(timeout.current);
        setLoading(false);
      }
    }, [done]);

    const FileIcon = ({ type }: { type: string }) => {
      if (type?.includes("image")) {
        return <FileImage />;
      }
      if (type?.includes("application")) {
        return <FileText />;
      }

      return <File />;
    };

    return (
      <>
        <li
          ref={ref}
          className={cx("sk-ai-feed-entry", className)}
          data-origin={entry.origin}
          data-size={size}
          {...rest}
        >
          <div className="sk-ai-feed-entry-avatar" aria-hidden="true">
            {avatar}
          </div>
          <div className="sk-ai-feed-entry-container">
            <div className="sk-ai-feed-entry-content">
              {!done && !entry.text ? (
                <>{loadingComponent}</>
              ) : (
                <>
                  <span
                    className={cx("sk-ai-feed-entry-heading")}
                    data-showtitle={showTitle}
                  >
                    {title}
                  </span>
                  <MarkdownRendered
                    text={entry.text}
                    messageId={entry.id}
                    hideElements={!entry.done}
                    tabbable={tabbable}
                  />
                </>
              )}
            </div>
            {showFiles && entry?.files && entry.files?.length > 0 ? (
              <ul aria-label="filer" className="flex flex-row flex-wrap gap-16">
                {entry.files?.map((file, index) =>
                  file ? (
                    <li
                      className="flex items-center gap-8 p-16 text-label-small rounded-groups border-1 border-divider bg-background-100"
                      key={`file-${index}`}
                    >
                      <Icon icon={<FileIcon type={file?.mimetype} />} />
                      {file?.name}
                    </li>
                  ) : (
                    <></>
                  )
                )}
              </ul>
            ) : (
              <></>
            )}
            {showReferences &&
            entry?.references &&
            entry.references?.length > 0 ? (
              <Disclosure
                size="sm"
                className="sk-ai-feed-entry-references"
                inverted={inverted}
                header={
                  <span
                    className="sk-ai-feed-entry-references-header"
                    data-inverted={inverted}
                  >
                    {referenceTitle} ({entry.references?.length || 0})
                  </span>
                }
              >
                <ul
                  aria-label={referenceTitle}
                  className="sk-ai-feed-entry-references-list"
                >
                  {entry.references?.map((reference, refIndex) => (
                    <li
                      className="sk-ai-feed-entry-references-list-item"
                      key={`ref-${refIndex}`}
                    >
                      <small>
                        <Link external href={reference.url} inverted={inverted}>
                          {reference.title}
                        </Link>
                      </small>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ) : null}
          </div>
        </li>
        <span className="sk-ai-feed-live-wrapper" aria-live="polite">
          {loading && !done && loadingMessage}
        </span>
      </>
    );
  }
);
