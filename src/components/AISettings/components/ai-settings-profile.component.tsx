import {
  FormControl,
  FormLabel,
  Input,
  Snackbar,
  Spinner,
  Textarea,
} from "@sk-web-gui/react";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PartialAssistantUpdatePublic } from "../../../types";

export const AISettingsProfile: React.FC = () => {
  const { register, watch, setValue } =
    useFormContext<PartialAssistantUpdatePublic>();

  const desc = watch("description");

  return typeof desc !== "string" ? (
    <Spinner />
  ) : (
    <div className="pt-8 px-8 pb-40 flex flex-col gap-20 w-full">
      <Snackbar
        status="info"
        message="Ge assistenten en unik profil."
        className="max-w-full bg-vattjom-surface-accent text-vattjom-text-primary font-normal"
        closeable={false}
        icon={Info}
      ></Snackbar>
      <FormControl className="w-full">
        <FormLabel>Assistentens namn</FormLabel>
        <Input {...register("name")} />
      </FormControl>

      <FormControl className="w-full">
        <FormLabel>Beskrivning</FormLabel>
        {/* NOTE: ...register not working. Why? */}
        <Textarea
          className="w-full"
          rows={6}
          value={desc}
          onChange={(e) =>
            setValue("description", e.target.value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </FormControl>
    </div>
  );
};
