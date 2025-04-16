import { Button, cx, Divider, Icon, SearchField } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../services/list-store";
import { ListModalListAll } from "./components/list-modal-list-all.component";
import { ListModalList } from "./components/list-modal-list.component";
import { Modal } from "../Modal/modal.component";

interface ListModalProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onClose: () => void;
  onOpenAssistant?: (assistantId: string) => void;
  onEditAssistant?: (assitantId: string) => void;
  onCreateNewAssistant?: () => void;
}

export const ListModal: React.FC<ListModalProps> = (props) => {
  const {
    open,
    onClose,
    className,
    onOpenAssistant,
    onEditAssistant,
    onCreateNewAssistant,
    ...rest
  } = props;
  const [value, setValue] = useState("");
  const [_showAll, setShowAll] = useState(false);
  const [assistants] = useListStore(useShallow((state) => [state.list]));
  const [pinnedAssistantIds, setPinnedAssistantIds] = useState<string[]>([]);

  const showAll = _showAll || value.length > 0;

  useEffect(() => {
    setPinnedAssistantIds(
      assistants
        .filter((assistant) => !!assistant.settings?.pinned)
        .map((assistant) => assistant.settings?.assistantId)
    );
  }, [open, showAll]);

  useEffect(() => {
    if (!open) {
      setValue("");
      setShowAll(false);
    }
  }, [open]);

  const handleShowAll = () => {
    if (value) {
      setValue("");
      setShowAll(false);
    } else {
      setShowAll(!showAll);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      label="Assistenter"
      className={cx(
        {
          ["!max-h-[50em]"]: showAll,
          ["!max-h-[40em]"]: !showAll,
        },
        className
      )}
      {...rest}
    >
      <div className={cx("flex flex-col overflow-y-hidden gap-8 px-18 grow")}>
        <div className="flex flex-col px-6 pb-6 gap-12 grow-0">
          <SearchField
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            showSearchButton={false}
            onReset={() => setValue("")}
          />
        </div>
        <div className="flex flex-col py-6 gap-12 grow shrink overflow-hidden">
          {showAll ? (
            <ListModalListAll
              filterQuery={value}
              onOpenAssistant={onOpenAssistant}
              onEditAssistant={onEditAssistant}
            />
          ) : (
            <ListModalList
              onOpenAssistant={onOpenAssistant}
              onEditAssistant={onEditAssistant}
              list={[
                {
                  label: "Fästa",
                  assistants: assistants.filter((assistant) =>
                    pinnedAssistantIds.includes(assistant.settings?.assistantId)
                  ),
                },
                {
                  label: "Rekommenderat",
                  assistants: assistants
                    .filter(
                      (assistant) =>
                        !pinnedAssistantIds.includes(
                          assistant.settings?.assistantId
                        ) && !!assistant.lastUse
                    )
                    .sort((a, b) =>
                      a.lastUse < b.lastUse ? 1 : a.lastUse > b.lastUse ? -1 : 0
                    )
                    .slice(0, 4),
                },
              ]}
            />
          )}
        </div>
      </div>

      <Divider className="grow-0" />
      <footer className="flex justify-between px-18 py-12 grow-0 shrink-0">
        <Button
          variant="secondary"
          size="sm"
          rightIcon={!showAll ? <Icon icon={<ArrowRight />} /> : undefined}
          leftIcon={showAll ? <Icon icon={<ArrowLeft />} /> : undefined}
          onClick={handleShowAll}
        >
          {showAll ? "Tillbaka till favoriter" : " Bläddra alla"}
        </Button>
        <Button
          variant="primary"
          color="vattjom"
          size="sm"
          leftIcon={<Icon icon={<Plus />} />}
          onClick={() => onCreateNewAssistant?.()}
        >
          Ny assistent
        </Button>
      </footer>
    </Modal>
  );
};
