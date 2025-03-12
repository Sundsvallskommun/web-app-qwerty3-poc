import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Snackbar,
  Spinner,
  Textarea,
} from "@sk-web-gui/react";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PartialAssistantUpdatePublic } from "../../../types";
import { useSpace } from "../../../services/use-space";

export const AISettingsDatasets: React.FC = () => {
  const { register, watch, setValue } =
    useFormContext<PartialAssistantUpdatePublic>();
  const spaceID = watch("space_id");
  const groupIds = watch("groups")?.map((group) => group.id);

  const { data, loaded } = useSpace(spaceID);

  const handleChange = (id: string) => {
    if (groupIds.includes(id)) {
      setValue(
        "groups",
        groupIds
          .filter((groupId) => groupId !== id)
          .map((groupId) => ({ id: groupId }))
      );
    } else {
      setValue(
        "groups",
        [...groupIds, id].map((groupId) => ({ id: groupId }))
      );
    }
  };

  return !loaded ? (
    <Spinner />
  ) : (
    <div className="pt-8 px-8 pb-40 flex flex-col gap-20 w-full">
      <Snackbar
        status="info"
        message="Välj eller lägg till datakällor som assistenten kan träna sig på."
        className="max-w-full"
        closeable={false}
        icon={Info}
      ></Snackbar>
      <FormControl className="w-full" fieldset>
        <FormLabel>Generella datakällor</FormLabel>
        {data.knowledge.groups.items.map((dataset) => (
          <Checkbox
            key={dataset.id}
            value={dataset.id}
            checked={groupIds.includes(dataset.id)}
            onChange={() => handleChange(dataset.id)}
          >
            {dataset.name}
          </Checkbox>
        ))}
      </FormControl>
    </div>
  );
};
