import { base64ToBlob, fileTobase64 } from "../../../utils/image-base64.util";
import {
  Avatar,
  Button,
  CustomOnChangeEventUploadFile,
  FileUpload,
  FormControl,
  FormLabel,
  Input,
  Snackbar,
  Spinner,
  Textarea,
} from "@sk-web-gui/react";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { PartialAssistantUpdatePublic } from "../../../types";

export const AISettingsProfile: React.FC = () => {
  const { register, watch, setValue } =
    useFormContext<PartialAssistantUpdatePublic>();
  const metadata = watch("metadata_json") as { title: string; avatar: string };
  const title = metadata?.title ?? "";

  const image = metadata?.avatar
    ? base64ToBlob(JSON.parse(metadata?.avatar))
    : undefined;
  const imageUrl = image ? URL.createObjectURL(image) : undefined;

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      "metadata_json",
      { ...metadata, title: event.target.value },
      { shouldDirty: true }
    );
  };
  const desc = watch("description");

  const handleChangeImage = async (event: CustomOnChangeEventUploadFile) => {
    const file = event.target.value[0].file;
    const base64 = await fileTobase64(file);
    setValue(
      "metadata_json",
      { ...metadata, avatar: JSON.stringify(base64) },
      { shouldDirty: true }
    );
  };

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
        <FormLabel>Title</FormLabel>
        <Input name="title" value={title} onChange={handleTitle} />
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
            })
          }
        />
      </FormControl>
      <FormControl className="w-full">
        <FormLabel>Avatar</FormLabel>
        <div className="flex flex-row gap-8">
          <Avatar imageUrl={imageUrl} />
          <FileUpload
            allowMultiple={false}
            accept={["image/jpeg", "image/gif", "image/png"]}
            maxFileSizeMB={0.5}
            onChange={handleChangeImage}
          >
            <Button variant="secondary">
              {imageUrl ? "Byt bild" : "Välj bild"}
            </Button>
          </FileUpload>
        </div>
      </FormControl>
    </div>
  );
};
