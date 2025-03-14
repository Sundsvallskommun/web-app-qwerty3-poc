import { createSortedList } from "../../../utils/create-sorted-list.util";
import { Button, Divider, Icon, SearchField, Tabs } from "@sk-web-gui/react";
import { ArrowLeft } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useListStore } from "../../../services/list-store";
import { useSpaceAssistants } from "../../../services/use-space-assistants";
import { useShallow } from "zustand/shallow";
import { AISearchFieldAssistantPickerList } from "./AI-search-field-assistantpicker-list.component";

interface AISearchFieldAssistantPickerProps {
  onClose?: () => void;
}
export const AISearchFieldAssistantPicker: React.FC<
  AISearchFieldAssistantPickerProps
> = (props) => {
  const { onClose } = props;
  const [value, setValue] = useState("");

  const [
    assistants,
    spaces,
    refreshSpaces,
    setSearchAssistantId,
    setAssistants,
  ] = useListStore(
    useShallow((state) => [
      state.assistants,
      state.spaces,
      state.refreshSpaces,
      state.setSearchAssistantId,
      state.setAssistants,
    ])
  );

  const { assistants: spaceAssistants } = useSpaceAssistants(
    spaces.map((space) => space.id)
  );

  useEffect(() => {
    refreshSpaces();
  }, []);

  const allAssistants = Object.values({
    ...spaceAssistants,
    ...assistants,
  });

  const handleSelectAssistant = (id: string) => {
    setAssistants({
      ...assistants,
      [id]: allAssistants.find((ass) => ass.settings.assistantId === id),
    });
    setTimeout(() => {
      setSearchAssistantId(id);
      onClose();
    }, 100);
  };

  return (
    <>
      <div className="px-24">
        <h2 className="text-h3-md mx-6">Välj din favoritassistent</h2>
      </div>
      <div className="flex flex-col px-24 pb-6 gap-12 grow-0 overflow-hidden">
        <SearchField
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          showSearchButton={false}
          onReset={() => setValue("")}
        />
        <Tabs underline className="list-modal-list-tabs">
          <Tabs.Item>
            <Tabs.Button>Alla</Tabs.Button>
            <Tabs.Content>
              <AISearchFieldAssistantPickerList
                onSelectAssistant={handleSelectAssistant}
                list={createSortedList(
                  allAssistants.filter((ass) =>
                    ass.info.name.toLowerCase().includes(value.toLowerCase())
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
                <AISearchFieldAssistantPickerList
                  key={`list-${space.id}`}
                  onSelectAssistant={handleSelectAssistant}
                  list={createSortedList(
                    allAssistants.filter(
                      (ass) =>
                        ass.info.space_id === space.id &&
                        ass.info.name
                          .toLowerCase()
                          .includes(value.toLowerCase())
                    )
                  )}
                />
              </Tabs.Content>
            </Tabs.Item>
          ))}
        </Tabs>
      </div>
      <ul className="flex flex-col gap-12 grow"></ul>
      <Divider className="grow-0" />
      <footer className="flex justify-start px-24 py-12 grow-0 shrink-0">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Icon icon={<ArrowLeft />} />}
          onClick={onClose}
        >
          {"Tillbaka"}
        </Button>
      </footer>
    </>
  );
};
