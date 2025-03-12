import { SortedAssistantList } from "@/src/types/assistant-list";
import { Avatar, Button, cx, Icon } from "@sk-web-gui/react";
import { AssistantButton } from "../../AssistantButton/assistant-button.component";
import { Pencil, Pin, PinOff } from "lucide-react";
import { useListStore } from "../../../services/list-store";
import { useShallow } from "zustand/shallow";
import { Assistant } from "../../../types";
import { ResourcePermission } from "../../../types/data-contracts";
import { useState } from "react";
import { ListModalListItem } from "./list-modal-list-item.component";

interface ListModalListProps extends React.ComponentPropsWithoutRef<"ul"> {
  list: SortedAssistantList[];
  onOpenAssistant?: (id: string) => void;
}

export const ListModalList: React.FC<ListModalListProps> = (props) => {
  const { list, className, onOpenAssistant, ...rest } = props;
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
                  />
                  //   <li key={assistant.settings.assistantId} className="grow">
                  //     <AssistantButton
                  //       size="md"
                  //       className="w-full"
                  //       label={assistant.info.name}
                  //       onClick={() => onOpenAssistant(assistant.info.id)}
                  //       image={
                  //         <Avatar
                  //           imageUrl={
                  //             typeof assistant.info.avatar === "string"
                  //               ? assistant.info.avatar
                  //               : undefined
                  //           }
                  //           imageElement={
                  //             typeof assistant.info.avatar !== "string"
                  //               ? assistant.info.avatar
                  //               : undefined
                  //           }
                  //           size="md"
                  //           className="rounded-button-sm"
                  //         />
                  //       }
                  //       showLabel
                  //     >
                  //       {assistant.info.permissions?.includes(
                  //         ResourcePermission.Edit
                  //       ) && (
                  //         <Button
                  //           size="lg"
                  //           showBackground={false}
                  //           variant="tertiary"
                  //           iconButton
                  //           className={cx(
                  //             "rounded-0 max-h-full h-full focus-visible:bg-background-content"
                  //           )}
                  //         >
                  //           <Icon icon={<Pencil />} />
                  //         </Button>
                  //       )}
                  //       <Button
                  //         onMouseEnter={() => setHover(true)}
                  //         onMouseLeave={() => setHover(false)}
                  //         size="lg"
                  //         showBackground={false}
                  //         variant="tertiary"
                  //         iconButton
                  //         className={cx(
                  //           assistant.settings?.pinned
                  //             ? "opacity-100"
                  //             : "opacity-50 hover:opacity-100",
                  //           "rounded-l-0 rounded-r-button-lg max-h-full h-full focus-visible:bg-background-content"
                  //         )}
                  //         onClick={() => handlePin(assistant)}
                  //       >
                  //         <Icon
                  //           icon={
                  //             assistant.settings?.pinned && hover ? (
                  //               <PinOff />
                  //             ) : (
                  //               <Pin />
                  //             )
                  //           }
                  //         />
                  //       </Button>
                  //     </AssistantButton>
                  //   </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};
