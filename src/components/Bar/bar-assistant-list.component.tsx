import { cx, Icon, useGui } from "@sk-web-gui/react";
import { List } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useAssistantStore } from "../../services/assistant-store";
import { useListStore } from "../../services/list-store";
import { AssistantButton } from "../AssistantButton/assistant-button.component";
import { BarAssistantListAssistantItem } from "./bar-assistant-list-assistant-item.component";
import { BarAssistantListItem } from "./bar-assistant-list-item.component";

interface BarAssistantListProps extends React.ComponentPropsWithoutRef<"ul"> {
  remove?: string;
}

export const BarAssistantList: React.FC<BarAssistantListProps> = (props) => {
  const { className, remove, ...rest } = props;
  const [assistantsList, assistantsMap] = useListStore(
    useShallow((state) => [state.list, state.assistants])
  );
  const { colorScheme, preferredColorScheme } = useGui();

  const isLightMode =
    colorScheme === "light" ||
    (colorScheme === "system" && preferredColorScheme === "light");

  const [activeAssistantId, setActiveAssistantId] = useListStore(
    useShallow((state) => [state.activeAssistantId, state.setActiveAssistantId])
  );

  const [setSettings, setInfo] = useAssistantStore((state) => [
    state.setSettings,
    state.setInfo,
  ]);

  const active = activeAssistantId;

  const setActive = (id: string) => {
    if (!!id) {
      if (id === "menu") {
        setActiveAssistantId("menu");
      } else {
        setSettings(assistantsMap?.[id]?.settings);
        setInfo(assistantsMap?.[id]?.info);
        setActiveAssistantId(id);
      }
    } else {
      setActiveAssistantId(null);
    }
  };

  return (
    <>
      <ul
        role="menubar"
        className={cx(className, "flex gap-12 px-6 pt-6 pb-0")}
        {...rest}
      >
        <BarAssistantListItem
          current={active === "menu"}
          // inverted={isLightMode}
          button={
            <AssistantButton
              key="menu"
              active={active === "menu"}
              // inverted={isLightMode}
              label="Meny"
              onClick={() => setActive(active === "menu" ? "" : "menu")}
              image={
                <Icon.Padded
                  className="w-32"
                  inverted={
                    active !== "menu"
                    // (!isLightMode && active !== "menu") ||
                    // (isLightMode && active === "menu")
                  }
                  color="tertiary"
                  size={32}
                  icon={<List />}
                />
              }
            ></AssistantButton>
          }
        />
        {assistantsList
          ?.filter(
            (assistant) =>
              assistant.settings.pinned ||
              !!assistant.settings.activeSession ||
              assistant.settings.assistantId === remove
          )
          .map((assistant) => (
            <BarAssistantListAssistantItem
              key={assistant.settings.assistantId}
              assistant={assistant}
              current={active}
              setCurrent={setActive}
              remove={remove}
            />
          ))}
      </ul>
    </>
  );
};
