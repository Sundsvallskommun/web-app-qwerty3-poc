import {
  Button,
  Checkbox,
  CustomOnChangeEventUploadFile,
  cx,
  FileUpload,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Snackbar,
  Spinner,
  useSnackbar,
} from "@sk-web-gui/react";
import { BookType, Globe, Info, Link, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useSpace } from "../../../services/use-space";
import {
  FilePublic,
  FileRestrictions,
  PartialAssistantUpdatePublic,
} from "../../../types";
import { FileIcon } from "../../FileIcon/file-icon.component";
import { useEffect, useState } from "react";
import { uploadFile } from "../../../services/assistant-service";

interface AISettingsDatasetsProps {
  attachments?: FilePublic[];
  allowed_attachments?: FileRestrictions;
}

export const AISettingsDatasets: React.FC<AISettingsDatasetsProps> = ({
  attachments = [],
  allowed_attachments,
}) => {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<PartialAssistantUpdatePublic>();
  const spaceID = watch("space_id");
  const groupIds = watch("groups")?.map((group) => group.id);
  const websiteIds = watch("websites")?.map((website) => website.id);
  const [newFiles, setNewFiles] = useState<FilePublic[]>([]);
  const { data, loaded } = useSpace(spaceID);
  const message = useSnackbar();
  const formAttachments = watch("attachments");
  const attached = formAttachments?.map((file) => file?.id);

  const handleChangeAttachment = (id: string) => {
    if (attached.includes(id)) {
      if (attached.length - 1 <= allowed_attachments?.limit?.max_files) {
        clearErrors("attachments");
      }
      setValue(
        "attachments",
        formAttachments.filter((file) => file.id !== id),
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
    } else {
      setValue("attachments", [...formAttachments, { id }], {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };
  const handleChangeGroup = (id: string) => {
    if (groupIds.includes(id)) {
      setValue(
        "groups",
        groupIds
          .filter((groupId) => groupId !== id)
          .map((groupId) => ({ id: groupId })),
        { shouldDirty: true, shouldTouch: true }
      );
    } else {
      setValue(
        "groups",
        [...groupIds, id].map((groupId) => ({ id: groupId })),
        { shouldDirty: true, shouldTouch: true }
      );
    }
  };
  const handleChangeWebsite = (id: string) => {
    if (websiteIds.includes(id)) {
      setValue(
        "websites",
        websiteIds
          .filter((websiteId) => websiteId !== id)
          .map((websiteId) => ({ id: websiteId })),
        { shouldDirty: true, shouldTouch: true }
      );
    } else {
      setValue(
        "websites",
        [...websiteIds, id].map((websiteId) => ({ id: websiteId })),
        { shouldDirty: true, shouldTouch: true }
      );
    }
  };

  const handleFiles = (event: CustomOnChangeEventUploadFile) => {
    for (let index = 0; index < event.target.value.length; index++) {
      const file = event.target.value?.[index]?.file;
      uploadFile(file)
        .then((res) => {
          setNewFiles((files) => [...files, res]);
          handleChangeAttachment(res.id);
        })
        .catch(() => {
          message({ message: "Kunde inte ladda upp fil", status: "error" });
        });
    }
  };

  return !loaded ? (
    <Spinner />
  ) : (
    <div className="pt-8 px-8 pb-40 flex flex-col gap-20 w-full">
      <Snackbar
        status="info"
        message="Välj eller lägg till datakällor som assistenten kan träna sig på."
        className="max-w-full bg-vattjom-surface-accent text-vattjom-text-primary font-normal"
        closeable={false}
        icon={Info}
      ></Snackbar>
      <FormControl className="w-full" fieldset>
        <FormLabel className="inline">
          Bifogade datakällor{" "}
          <span
            className={cx({
              "text-error-text-primary": !!errors?.attachments,
            })}
          >
            ({attached?.length} / {allowed_attachments?.limit?.max_files})
          </span>
        </FormLabel>
        {[...attachments, ...newFiles]?.map((file) => (
          <Checkbox
            key={file.id}
            value={file.id}
            checked={attached?.includes(file.id)}
            name="attachements"
            onChange={() => handleChangeAttachment(file.id)}
            size="sm"
          >
            <span className="inline-flex gap-4 ellipsis whitespace-nowrap items-center">
              <Icon icon={<FileIcon mimetype={file.mimetype} />} />
              {file.name}
            </span>
          </Checkbox>
        ))}
        {!!errors?.attachments && (
          <FormErrorMessage>{errors?.attachments?.message}</FormErrorMessage>
        )}
        <FileUpload
          className="py-6"
          maxFileSizeMB={allowed_attachments?.limit?.max_size / 1024 / 1024}
          accept={allowed_attachments?.accepted_file_types.map(
            (filetype) => filetype.mimetype
          )}
          onChange={handleFiles}
        >
          <Button
            variant="tertiary"
            size="sm"
            leftIcon={<Icon icon={<Plus />} />}
          >
            Lägg till
          </Button>
        </FileUpload>
      </FormControl>
      <FormControl className="w-full" fieldset>
        <FormLabel>Generella datakällor</FormLabel>
        {[...data.knowledge.groups.items, ...data.knowledge.websites.items]
          ?.length < 1 && (
          <span className="text-small">Inga datakällor tillgängliga</span>
        )}
        {data.knowledge.groups?.items?.map((dataset) => (
          <Checkbox
            size="sm"
            key={dataset.id}
            value={dataset.id}
            checked={groupIds?.includes(dataset.id)}
            onChange={() => handleChangeGroup(dataset.id)}
          >
            <span className="inline-flex gap-4 ellipsis whitespace-nowrap items-center">
              <Icon icon={<BookType />} />
              {dataset.name}
            </span>
          </Checkbox>
        ))}
        {data.knowledge.websites?.items?.map((website) => (
          <Checkbox
            size="sm"
            key={website.id}
            value={website.id}
            checked={websiteIds?.includes(website.id)}
            onChange={() => handleChangeWebsite(website.id)}
          >
            <span className="inline-flex gap-4 ellipsis whitespace-nowrap items-center">
              <Icon icon={<Globe />} />
              {website?.name ?? website?.url}
            </span>
          </Checkbox>
        ))}
      </FormControl>
    </div>
  );
};
