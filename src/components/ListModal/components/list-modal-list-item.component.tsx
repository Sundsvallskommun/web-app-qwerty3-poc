import { Avatar, Button, cx, Icon } from "@sk-web-gui/react";
import { type Assistant } from "../../../types/assistant";
import { Pencil, Pin, PinOff } from "lucide-react";
import { AssistantButton } from "../../AssistantButton/assistant-button.component";
import { useState } from "react";
import { ResourcePermission } from "../../../types/data-contracts";

interface ListModalListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  assistant: Assistant;
  onOpenAssistant: (id: string) => void;
  onPin: () => void;
}

export const ListModalListItem: React.FC<ListModalListItemProps> = (props) => {
  const { assistant, onOpenAssistant, className, onPin, ...rest } = props;
  const [hover, setHover] = useState(false);

  return (
    <li
      key={assistant.settings.assistantId}
      className={cx("grow", className)}
      {...rest}
    >
      <AssistantButton
        size="md"
        className="w-full"
        label={assistant.info.name}
        onClick={() => onOpenAssistant(assistant.info.id)}
        image={
          <Avatar
            imageUrl={
              typeof assistant.info.avatar === "string"
                ? assistant.info.avatar
                : undefined
            }
            imageElement={
              typeof assistant.info.avatar !== "string"
                ? assistant.info.avatar
                : undefined
            }
            size="md"
            className="rounded-button-sm"
          />
        }
        showLabel
      >
        {assistant.info.permissions?.includes(ResourcePermission.Edit) && (
          <Button
            size="lg"
            showBackground={false}
            variant="tertiary"
            iconButton
            className={cx(
              "rounded-0 max-h-full h-full focus-visible:bg-background-content"
            )}
          >
            <Icon icon={<Pencil />} />
          </Button>
        )}
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          size="lg"
          showBackground={false}
          variant="tertiary"
          iconButton
          className={cx(
            assistant.settings?.pinned
              ? "opacity-100"
              : "opacity-50 hover:opacity-100",
            "rounded-l-0 rounded-r-button-lg max-h-full h-full focus-visible:bg-background-content"
          )}
          onClick={() => onPin()}
        >
          <Icon
            icon={assistant.settings?.pinned && hover ? <PinOff /> : <Pin />}
          />
        </Button>
      </AssistantButton>
    </li>
  );
};
