import { Button, cx, Divider, Icon, SearchField } from "@sk-web-gui/react";
import { useListStore } from "../../services/list-store";
import { ChangeEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { ListModalListAll } from "../ListModal/components/list-modal-list-all.component";
import { ListModalList } from "../ListModal/components/list-modal-list.component";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useAssistantStore } from "../../services/assistant-store";

export const PWAListView: React.FC = () => {
  const [value, setValue] = useState("");
  const [_showAll, setShowAll] = useState(false);
  const [assistants, refresh] = useListStore(
    useShallow((state) => [state.list, state.refreshAssistants])
  );
  const [pinnedAssistantIds, setPinnedAssistantIds] = useState<string[]>([]);

  const [apiKey] = useAssistantStore(useShallow((state) => [state.apikey]));

  const showAll = _showAll || value.length > 0;

  useEffect(() => {
    if (assistants?.length < 1) {
      refresh();
    }
  }, []);

  useEffect(() => {
    setPinnedAssistantIds(
      assistants
        .filter((assistant) => !!assistant.settings?.pinned)
        .map((assistant) => assistant.settings?.assistantId)
    );
  }, [assistants, showAll]);

  const handleOpenAssistant = (assistantId: string) => {
    window.open(
      `${window.location.origin}${
        import.meta.env.VITE_BASE_PATH
      }assistant/${assistantId}`,
      "_blank",
      "toolbar=no, location=no, directories=no, status=no, menubar=no"
    );
  };

  const handleEditAssisstant = (assistantId: string) => {};

  const handleCreateAssistant = () => {};

  const handleShowAll = () => {
    if (value) {
      setValue("");
      setShowAll(false);
    } else {
      setShowAll(!showAll);
    }
  };

  useEffect(() => {
    window.resizeTo(500, 800);
  }, []);

  return (
    <div className="bg-background-content py-32 max-h-screen h-screen overflow-hidden flex flex-col gap-8 pb-8">
      {!!apiKey && (
        <>
          <div
            className={cx("flex flex-col overflow-y-hidden gap-8 px-18 grow")}
          >
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
                  onOpenAssistant={handleOpenAssistant}
                  onEditAssistant={handleEditAssisstant}
                />
              ) : (
                <ListModalList
                  onOpenAssistant={handleOpenAssistant}
                  onEditAssistant={handleEditAssisstant}
                  list={[
                    {
                      label: "Fästa",
                      assistants: assistants.filter((assistant) =>
                        pinnedAssistantIds.includes(
                          assistant.settings?.assistantId
                        )
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
                          a.lastUse < b.lastUse
                            ? 1
                            : a.lastUse > b.lastUse
                            ? -1
                            : 0
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
              onClick={() => handleCreateAssistant()}
            >
              Ny assistent
            </Button>
          </footer>
        </>
      )}
    </div>
  );
};
