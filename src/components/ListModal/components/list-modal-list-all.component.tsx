import { useListStore } from "../../../services/list-store";
import { createSortedList } from "../../../utils/create-sorted-list.util";
import { ProgressBar, Tabs } from "@sk-web-gui/react";
import { useShallow } from "zustand/shallow";
import { ListModalList } from "./list-modal-list.component";
import { useEffect } from "react";
import { useSpaceAssistants } from "../../../services/use-space-assistants";

interface ListModalListAllProps {
  onOpenAssistant?: (assistantId: string) => void;
  onEditAssistant?: (id: string) => void;
  filterQuery?: string;
}

export const ListModalListAll: React.FC<ListModalListAllProps> = (props) => {
  const { onOpenAssistant, filterQuery, onEditAssistant } = props;

  const [assistants, setAssistants, spaces, refreshSpaces] = useListStore(
    useShallow((state) => [
      state.assistants,
      state.setAssistants,
      state.spaces,
      state.refreshSpaces,
    ])
  );

  const { assistants: spaceAssistants, loaded } = useSpaceAssistants(
    spaces.map((space) => space.id)
  );

  useEffect(() => {
    refreshSpaces();
  }, []);

  const allAssistants = Object.values({
    ...spaceAssistants,
    ...assistants,
  });

  const handleOpenAss = (id: string) => {
    if (!Object.keys(assistants).includes(id)) {
      setAssistants({
        ...assistants,
        [id]: spaceAssistants[id],
      });
    }
    onOpenAssistant(id);
  };

  return loaded < 100 ? (
    <div className="flex grow justify-center items-center p-18">
      <ProgressBar
        current={loaded}
        color={
          loaded < 33 ? "bjornstigen" : loaded < 66 ? "juniskar" : "gronsta"
        }
        className="w-full transition-all"
      ></ProgressBar>
    </div>
  ) : (
    <Tabs underline className="list-modal-list-tabs">
      <Tabs.Item>
        <Tabs.Button>Alla</Tabs.Button>
        <Tabs.Content>
          <ListModalList
            onOpenAssistant={handleOpenAss}
            onEditAssistant={onEditAssistant}
            list={createSortedList(
              allAssistants.filter((ass) =>
                ass.info.name.toLowerCase().includes(filterQuery.toLowerCase())
              )
            )}
          />
        </Tabs.Content>
      </Tabs.Item>
      {spaces.map((space) => (
        <Tabs.Item key={space.id}>
          <Tabs.Button>
            {space.name.endsWith("personal space")
              ? "Mina assistenter"
              : space.name}
          </Tabs.Button>
          <Tabs.Content>
            <ListModalList
              key={`list-${space.id}`}
              onOpenAssistant={handleOpenAss}
              onEditAssistant={onEditAssistant}
              list={createSortedList(
                allAssistants.filter(
                  (ass) =>
                    ass.info.space_id === space.id &&
                    ass.info.name
                      .toLowerCase()
                      .includes(filterQuery.toLowerCase())
                )
              )}
            />
          </Tabs.Content>
        </Tabs.Item>
      ))}
    </Tabs>
  );
};
