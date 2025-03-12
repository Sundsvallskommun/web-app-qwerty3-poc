import { FormControl, FormLabel, Input, Snackbar } from "@sk-web-gui/react";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PartialAssistantUpdatePublic } from "../../../types";

export const AISettingsProfile: React.FC = () => {
  const { register } = useFormContext<PartialAssistantUpdatePublic>();
  return (
    <div className="pt-8 px-8 pb-40 flex flex-col gap-20 w-full">
      <Snackbar
        status="info"
        message="Ge assistenten en unik profil."
        className="max-w-full"
        closeable={false}
        icon={Info}
      ></Snackbar>
      <FormControl className="w-full">
        <FormLabel>Assistentens namn</FormLabel>
        <Input {...register("name")} />
      </FormControl>
    </div>
  );
};
