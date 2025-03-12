import { addDays, format } from "date-fns";
import React from "react";
import { cx } from "@sk-web-gui/utils";
import { Assistant, AssistantSession, SessionHistory } from "../../../types";
import {
  SessionStoreSession,
  useSessions,
} from "../../../services/session-store";
import {
  AIPopupModuleSessionHistory,
  type AIPopupModuleSessionHistoryProps,
} from "./ai-popup-module-session-history";
import { useShallow } from "zustand/shallow";

export interface AIPopupModuleSessionsProps
  extends Omit<
    AIPopupModuleSessionHistoryProps,
    "title" | "onKeyNext" | "onKeyPrev" | "sessions"
  > {
  sessions?: SessionHistory;
  itemsBefore?: React.JSX.Element[];
  itemsAfter?: React.JSX.Element[];
  focus?: boolean;
  assistant: Assistant;
}

export const AIPopupModuleSessions = React.forwardRef<
  HTMLDivElement,
  AIPopupModuleSessionsProps
>((props, ref) => {
  const {
    sessions: _propssessions,
    assistant,
    className,
    onSelectSession,
    current,
    itemsBefore: _itemsBefore,
    itemsAfter: _itemsAfter,
    focus,
    ...rest
  } = props;
  const [sessions, setSessions] = React.useState<
    Array<AssistantSession | SessionStoreSession>
  >([]);
  const [_sessions, refreshSessions] = useSessions(
    useShallow((state) => [state.sessions, state.refreshSessions])
  );
  const [itemsBefore, setItemsBefore] = React.useState<
    React.JSX.Element[] | undefined
  >(undefined);
  const [itemsAfter, setItemsAfter] = React.useState<
    React.JSX.Element[] | undefined
  >(undefined);
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (_propssessions) {
      setSessions(_propssessions);
    } else {
      setSessions(
        Object.values({ ..._sessions?.[assistant.settings.assistantId] })
          .filter((session) => !session.isNew)
          .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
      );
    }
  }, [_propssessions, _sessions]);

  React.useEffect(() => {
    if (assistant.settings.assistantId) {
      refreshSessions(assistant.settings.assistantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, assistant]);

  const autoId = React.useId();
  const idPrefix = "sk-ai-session-item-";

  const today = format(new Date(), "yyyyMMdd");
  const yesterday = format(addDays(new Date(), -1), "yyyyMMdd");

  const todaysSessions = sessions?.filter(
    (session) =>
      session.name &&
      (session?.updated_at ? format(session.updated_at, "yyyyMMdd") : "") ===
        today
  );
  const yesterdaysSessions = sessions?.filter(
    (session) =>
      session.name &&
      (session?.updated_at ? format(session.updated_at, "yyyyMMdd") : "") ===
        yesterday
  );
  const otherSessions = sessions?.filter((session) => {
    const date = session?.updated_at
      ? format(session.updated_at, "yyyyMMdd")
      : undefined;
    return session.name && date !== yesterday && date !== today;
  });

  const onNext = (currentId: string) => {
    const currentIndex = ids.findIndex((id) => id === currentId);

    let nextId = ids[currentIndex + 1];
    if (!nextId) {
      nextId = ids[0];
    }

    if (nextId) {
      const nextElement = document.getElementById(nextId);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const onPrev = (currentId: string) => {
    const currentIndex = ids.findIndex((id) => id === currentId);
    let prevId = ids[currentIndex - 1];
    if (!prevId) {
      prevId = ids[ids.length - 1];
    }

    if (prevId) {
      const prevElement = document.getElementById(prevId);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  const handleKeyboardNavigation = (
    event: React.KeyboardEvent<HTMLElement>,
    id: string
  ) => {
    switch (event.key) {
      case "ArrowDown":
        onNext(id);
        break;
      case "ArrowUp":
        onPrev(id);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const newIds: string[] = [];
    if (_itemsBefore) {
      const newItems: React.JSX.Element[] = [];
      _itemsBefore.forEach((item, index) => {
        const newId = item.props.id || `${idPrefix}before-${autoId}-${index}`;
        newItems.push(
          React.cloneElement(item, {
            ...item.props,
            role: "menuitem",
            id: newId,
          })
        );
        newIds.push(newId);
      });
      setItemsBefore(newItems);
    }

    if (sessions) {
      sessions.forEach((session) => {
        newIds.push(idPrefix + session.id);
      });
    }

    if (_itemsAfter) {
      const newItems: React.JSX.Element[] = [];
      _itemsAfter.forEach((item, index) => {
        const newId = item.props.id || `${idPrefix}after-${autoId}-${index}`;
        newItems.push(
          React.cloneElement(item, {
            ...item.props,
            role: "menuitem",
            id: newId,
          })
        );
        newIds.push(newId);
      });
      setItemsAfter(newItems);
    }

    setIds(newIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, _itemsBefore, _itemsAfter]);

  React.useEffect(() => {
    if (focus) {
      if (current) {
        const focusElement =
          document.getElementById(current) ||
          document.getElementById(idPrefix + current);
        if (focusElement) {
          focusElement.focus();
        }
      } else {
        document.getElementById(ids[0])?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  return (
    <div
      ref={ref}
      role="menubar"
      aria-label="Tidigare sessioner"
      aria-orientation="vertical"
      className={cx("sk-ai-corner-module-sessions", className)}
      {...rest}
    >
      {itemsBefore && itemsBefore?.length > 0 ? (
        <div className="sk-ai-corner-module-sessions-group" role="group">
          {itemsBefore.map((item, index) =>
            React.cloneElement(item, {
              ...item.props,
              key: item.props.id,
              "aria-current": item.props.id === current,
              tabIndex: current
                ? item.props.id === current
                  ? 0
                  : -1
                : index === 0
                ? 0
                : -1,
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) =>
                handleKeyboardNavigation(event, item.props.id),
            })
          )}
        </div>
      ) : (
        <></>
      )}
      {todaysSessions.length > 0 && (
        <AIPopupModuleSessionHistory
          key="today"
          sessions={todaysSessions}
          title="Idag"
          current={
            current || (itemsBefore && itemsBefore.length > 0 ? "nothing" : "")
          }
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {yesterdaysSessions.length > 0 && (
        <AIPopupModuleSessionHistory
          key="yesterday"
          sessions={yesterdaysSessions}
          title="Igår"
          current={current || (todaysSessions.length > 0 ? "nothing" : "")}
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {otherSessions.length > 0 && (
        <AIPopupModuleSessionHistory
          key="others"
          sessions={otherSessions}
          title="Tidigare"
          current={
            current ||
            ((itemsBefore && itemsBefore.length > 0) ||
            todaysSessions.length > 0 ||
            yesterdaysSessions.length > 0
              ? "nothing"
              : "")
          }
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {itemsAfter && itemsAfter?.length > 0 ? (
        <div
          className="sk-ai-corner-module-sidebar-sessions-group"
          role="group"
        >
          {itemsAfter.map((item) =>
            React.cloneElement(item, {
              ...item.props,
              key: item.props.id,
              "aria-current": item.props.id === current,
              tabIndex: item.props.id === current ? 0 : -1,
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) =>
                handleKeyboardNavigation(event, item.props.id),
            })
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});
