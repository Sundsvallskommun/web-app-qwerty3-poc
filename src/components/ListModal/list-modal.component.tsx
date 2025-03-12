import { Button, cx, Divider, Icon, SearchField } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useListStore } from "../../services/list-store";
import { ListModalListAll } from "./components/list-modal-list-all.component";
import { ListModalList } from "./components/list-modal-list.component";

interface ListModalProps extends React.ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onClose: () => void;
  onOpenAssistant?: (assistantId: string) => void;
}

export const ListModal: React.FC<ListModalProps> = (props) => {
  const [trueOpen, setTrueOpen] = useState<boolean>(false);
  const { open, onClose, className, onOpenAssistant, ...rest } = props;
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
    if (!open && !trueOpen) {
      setValue("");
      setShowAll(false);
    }
  }, [open, trueOpen]);

  const handleShowAll = () => {
    if (value) {
      setValue("");
      setShowAll(false);
    } else {
      setShowAll(!showAll);
    }
  };

  useEffect(() => {
    setTimeout(
      () => {
        setTrueOpen(open);
      },
      open ? 20 : 150
    );
  }, [open]);

  return (
    <div
      className={cx(
        "rounded-groups flex-col px-12 py-8 shadow-200 bg-background-100 absolute w-[600px] border-1 border-divider max-h-[calc(100vh-68px)] ",
        open && trueOpen ? "opacity-100" : "h-0 opacity-0",
        trueOpen || open ? "flex" : "hidden",
        {
          ["h-[50em]"]: open && trueOpen && showAll,
          ["h-[40em]"]: open && trueOpen && !showAll,
        },
        "transition-all duration-300",
        className
      )}
      {...rest}
    >
      <header className="flex w-full grow-0 justify-between items-center ">
        <h1 className="m-0 px-14 py-12 text-label-large">Assistenter</h1>
        <Button
          onClick={onClose}
          variant="tertiary"
          showBackground={false}
          iconButton
          title="Stäng"
        >
          <Icon icon={<X />} />
        </Button>
      </header>
      <div className="flex flex-col p-6 gap-12 grow-0">
        <SearchField
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          showSearchButton={false}
          onReset={() => setValue("")}
        />
      </div>
      <div className="flex flex-col p-6 gap-12 grow shrink overflow-hidden">
        {showAll ? (
          <ListModalListAll
            filterQuery={value}
            onOpenAssistant={onOpenAssistant}
          />
        ) : (
          <ListModalList
            onOpenAssistant={onOpenAssistant}
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
      <Divider className="grow-0" />
      <footer className="flex justify-between px-6 py-12 grow-0 shrink-0">
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
        >
          Ny assistent
        </Button>
      </footer>
    </div>
  );
};
