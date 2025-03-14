import { Button, cx, Icon, Spinner } from "@sk-web-gui/react";
import { Assistant } from "../../../types";
import { AssistantAvatar } from "../../AssistantAvatar/assistant-avatar";
import { useEffect, useState } from "react";
import ColorThief from "../../../utils/colorpicker/colorpicker";
import { ArrowLeftRight } from "lucide-react";

interface AISearchFieldPresentationProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onChangeAssistant?: () => void;
  assistant?: Assistant;
}

export const AISearchFieldPresentation: React.FC<
  AISearchFieldPresentationProps
> = (props) => {
  const { assistant, onChangeAssistant, className, ...rest } = props;

  const [color, setColor] = useState<string>("");

  const colorThief = new ColorThief();
  const avatarimage = new Image();

  avatarimage.src =
    typeof assistant?.info?.avatar === "string" ? assistant.info.avatar : "";

  useEffect(() => {
    if (!color && !!avatarimage.src && avatarimage.complete) {
      const rgb = colorThief?.getColor(avatarimage);
      if (rgb) {
        setColor(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.35)`);
      }
    }
  }, [avatarimage, colorThief]);

  return (
    <div
      className={cx(
        "bg-primitives-green-200 text-dark-primary rounded-groups flex flex-row px-20 py-12 gap-20 items-center",
        className
      )}
      {...rest}
      style={{
        backgroundColor: color,
      }}
    >
      <AssistantAvatar
        assistant={assistant?.info}
        size="lg"
        className="w-72 h-72 shrink-0 shadow-chatelement"
      />
      <div className="flex flex-col py-8 gap-2 grow shrink">
        <h3>{assistant?.info?.name}</h3>

        {!!assistant?.info?.description &&
        typeof assistant?.info?.description === "string" ? (
          <p>{assistant?.info?.description}</p>
        ) : (
          !!assistant?.info?.description &&
          Object.keys(assistant.info.description).map((lang, index) => (
            <p key={`${index}-${lang}`} lang={lang}>
              {assistant.info.description?.[lang]}
            </p>
          ))
        )}
      </div>
      <Button iconButton onClick={() => onChangeAssistant?.()}>
        <Icon icon={<ArrowLeftRight />} />
      </Button>
    </div>
  );
};
