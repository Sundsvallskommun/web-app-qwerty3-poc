import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../services/app-store";
import { useAssistantStore } from "../services/assistant-store";
import { useListStore } from "../services/list-store";
import { AIPopupModule } from "./AIPopupModule/ai-popup-module.component";
import { AISearchField } from "./AISearchField/AI-search-field.component";
import { BarAssistantContainer } from "./Bar/bar-assistant-container.component";
import { BarAssistantList } from "./Bar/bar-assistant-list.component";
import { Bar } from "./Bar/bar.components";
import { EditAssistantModal } from "./EditAssistantModal/edit-assistant-modal.component";
import { ListModal } from "./ListModal/list-modal.component";

interface StartBarProps {}

export const StartBar: React.FC<StartBarProps> = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [assistantList, assistantsMap, refresh] = useListStore(
    useShallow((state) => [
      state.list,
      state.assistants,
      state.refreshAssistants,
    ])
  );

  const [remove, setRemove] = useState<string>("");
  const isPWA = useAppStore(useShallow((state) => state.isPWA));
  const [activeAssistantId, setActiveAssistantId] = useListStore(
    useShallow((state) => [state.activeAssistantId, state.setActiveAssistantId])
  );

  const [setSettings, setInfo] = useAssistantStore(
    useShallow((state) => [state.setSettings, state.setInfo])
  );

  const active = activeAssistantId;

  useEffect(() => {
    refresh();
  }, []);

  const setActive = (id: string) => {
    if (!!id) {
      setSettings(assistantsMap?.[id]?.settings);
      setInfo(assistantsMap?.[id]?.info);
      setActiveAssistantId(id);
    } else {
      setActiveAssistantId(null);
    }
  };

  const handleCloseAssistant = (remove?: boolean) => {
    if (remove && !assistantsMap?.[activeAssistantId]?.settings?.pinned) {
      setRemove(activeAssistantId);
    }
    setActive("");
  };

  useEffect(() => {
    if (remove) {
      setTimeout(() => {
        setRemove("");
      }, 150);
    }
  }, [remove]);

  return (
    assistantList && (
      <>
        <div className="flex justify-center items-end fixed bottom-[56px] left-0 right-0 h-fit">
          <ListModal
            className="mb-12"
            open={active === "menu"}
            onClose={() => setActive("")}
            onOpenAssistant={setActive}
            onEditAssistant={setEditId}
            onCreateNewAssistant={() => setCreateNew(true)}
          />
          {assistantList
            .filter((ass) => !!ass)
            .map((ass) => (
              <AIPopupModule
                key={ass?.settings?.assistantId}
                assistant={ass}
                open={active === ass?.settings?.assistantId}
                onClose={handleCloseAssistant}
              />
            ))}
          <EditAssistantModal
            open={createNew || !!editId}
            onClose={() => {
              setEditId(null);
              setCreateNew(false);
            }}
            assistantId={editId}
          />
        </div>
        <Bar>
          <BarAssistantContainer>
            {!isPWA && <AISearchField />}
            <BarAssistantList remove={remove} />
          </BarAssistantContainer>
        </Bar>
      </>
    )
  );
};
