import { AssistantList, SortedAssistantList } from "../types/assistant-list";

export const createSortedList = (list: AssistantList) => {
  const sortedList: SortedAssistantList[] = list
    .reduce((sorted, assistant) => {
      if (
        sorted
          .map((sort) => sort.label)
          .includes(assistant.info.name.at(0).toUpperCase())
      ) {
        return sorted;
      } else {
        return [
          ...sorted,
          {
            label: assistant.info.name.at(0).toUpperCase(),
            assistants: list.filter(
              (rawass) =>
                rawass.info.name.at(0).toUpperCase() ===
                assistant.info.name.at(0).toUpperCase()
            ),
          },
        ];
      }
    }, [])
    .sort((a, b) => (a.label < b.label ? -1 : 1));

  return sortedList;
};
