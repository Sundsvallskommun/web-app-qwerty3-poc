import { SortedAssistantList } from "@/src/types/assistant-list";
import { cx } from "@sk-web-gui/react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../../services/list-store";
import { Assistant } from "../../../types";
import { ListModalListItem } from "./list-modal-list-item.component";

interface ListModalListProps extends React.ComponentPropsWithoutRef<"ul"> {
  list: SortedAssistantList[];
  onOpenAssistant?: (id: string) => void;
  onEditAssistant?: (id: string) => void;
}

export const ListModalList: React.FC<ListModalListProps> = (props) => {
  const { list, className, onOpenAssistant, onEditAssistant, ...rest } = props;
  const [pin, assistants, setAssistants] = useListStore(
    useShallow((state) => [
      state.pinAssistant,
      state.assistants,
      state.setAssistants,
    ])
  );

  const handlePin = (assistant: Assistant) => {
    if (!Object.keys(assistants).includes(assistant.settings.assistantId)) {
      setAssistants({
        ...assistants,
        [assistant.settings.assistantId]: assistant,
      });
    }
    pin(assistant.settings.assistantId, !assistant.settings.pinned);
  };

  return (
    <div className="h-full overflow-y-auto">
      <ul className={cx("flex flex-col gap-12 w-full", className)} {...rest}>
        {list
          .filter((group) => group.assistants.length > 0)
          .map((group) => (
            <li key={group.label} className="flex flex-col gap-12 w-full">
              <label className="text-label-medium">{group.label}</label>
              <ul className="flex flex-col gap-12 w-full">
                {group.assistants?.map((assistant) => (
                  <ListModalListItem
                    key={assistant.settings.assistantId}
                    assistant={assistant}
                    onPin={() => handlePin(assistant)}
                    onOpenAssistant={onOpenAssistant}
                    onEditAssistant={onEditAssistant}
                  />
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};
