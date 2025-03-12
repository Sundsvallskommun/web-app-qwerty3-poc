import {
  FormControl,
  FormLabel,
  Select,
  Snackbar,
  Spinner,
  Textarea,
} from "@sk-web-gui/react";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useSpace } from "../../../services/use-space";
import { PartialAssistantUpdatePublic } from "../../../types";

export const AISettingsInstructions: React.FC = () => {
  const { register, watch } = useFormContext<PartialAssistantUpdatePublic>();
  const spaceID = watch("space_id");
  const { data, loaded } = useSpace(spaceID);
  const modelCompanies = loaded
    ? data?.completion_models?.reduce((companies, model) => {
        if (companies.includes(model.org)) {
          return companies;
        }
        return [...companies, model.org];
      }, [])
    : [];

  return !loaded ? (
    <Spinner />
  ) : (
    <div className="pt-8 px-8 pb-40 flex flex-col gap-20 w-full">
      <Snackbar
        status="info"
        message="Ge sssistenten instruktioner på hur den ska uppföra sig."
        className="max-w-full"
        closeable={false}
        icon={Info}
      ></Snackbar>
      <FormControl className="w-full">
        <FormLabel>Språkmodell</FormLabel>
        <Select {...register("completion_model.id")} className="w-full">
          {modelCompanies.map((org, index) => (
            <Select.Optgroup key={`${index}-${org}`} label={org}>
              {data.completion_models
                .filter((model) => model.org === org)
                .map((model) => (
                  <Select.Option key={model.id} value={model.id}>
                    {model.nickname}
                  </Select.Option>
                ))}
            </Select.Optgroup>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-full">
        <FormLabel>Instruktioner</FormLabel>
        <Textarea {...register("prompt.text")} className="w-full" rows={6} />
      </FormControl>
    </div>
  );
};
