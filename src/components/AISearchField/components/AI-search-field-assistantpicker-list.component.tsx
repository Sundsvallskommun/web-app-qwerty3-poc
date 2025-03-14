import { SortedAssistantList } from "@/src/types/assistant-list";
import { cx, Icon } from "@sk-web-gui/react";
import { Check } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../../services/list-store";
import { AssistantAvatar } from "../../AssistantAvatar/assistant-avatar";
import { AssistantButton } from "../../AssistantButton/assistant-button.component";

interface AISearchFieldAssistantPickerListProps
  extends React.ComponentPropsWithoutRef<"ul"> {
  list: SortedAssistantList[];
  onSelectAssistant?: (id: string) => void;
}

export const AISearchFieldAssistantPickerList: React.FC<
  AISearchFieldAssistantPickerListProps
> = (props) => {
  const { list, className, onSelectAssistant, ...rest } = props;

  const searchAssistantId = useListStore(
    useShallow((state) => state.searchAssistantId)
  );

  return (
    <div className="h-full overflow-y-auto -mr-18">
      <ul
        className={cx("flex flex-col gap-12 w-full pr-18", className)}
        {...rest}
      >
        {list
          .filter((group) => group.assistants.length > 0)
          .map((group) => (
            <li key={group.label} className="flex flex-col gap-12 w-full">
              <label className="text-label-medium">{group.label}</label>
              <ul className="flex flex-col gap-12 w-full">
                {group.assistants?.map((assistant) => (
                  <li
                    key={assistant.settings.assistantId}
                    className={cx("grow")}
                  >
                    <AssistantButton
                      size="md"
                      className="w-full"
                      label={assistant.info.name}
                      onClick={() => onSelectAssistant(assistant.info.id)}
                      image={
                        <AssistantAvatar
                          assistant={assistant.info}
                          size="md"
                          className="rounded-button-sm"
                        />
                      }
                      showLabel
                      trailingIcon={
                        assistant.info.id === searchAssistantId && (
                          <Icon.Padded
                            color="success"
                            rounded
                            size="40"
                            icon={<Check />}
                          />
                        )
                      }
                      aria-current={assistant.info.id === searchAssistantId}
                    ></AssistantButton>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};
