import {
  Accordion,
  Button,
  cx,
  Divider,
  Snackbar,
  useSnackbar,
} from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAssistant } from "../../services/use-assistant";
import { FilePublic, PartialAssistantUpdatePublic } from "../../types";
import { AISettingsDatasets } from "./components/ai-settings-datasets.component";
import { AISettingsInstructions } from "./components/ai-settings-instructions.component";
import { AISettingsProfile } from "./components/ai-settings-profile.component";
import { updateAssistant } from "../../services/assistant-service";
import { useListStore } from "../../services/list-store";
import { mapIntricAssistantToAssistant } from "../../utils/map-assistant.util";

interface AISettingsProps extends React.ComponentPropsWithoutRef<"form"> {
  assistantId: string;
}

export const AISettings: React.FC<AISettingsProps> = (props) => {
  const { assistantId, className, ...rest } = props;
  const { data, loaded } = useAssistant(assistantId);
  const [formLoaded, setFormLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const message = useSnackbar();

  const form = useForm<PartialAssistantUpdatePublic>({});
  const updateListStoreAssistant = useListStore(
    (state) => state.updateAssistant
  );
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isDirty, errors, isValid },
  } = form;

  const max_files = data?.allowed_attachments.limit?.max_files;

  useEffect(() => {
    if (data && loaded && !formLoaded) {
      reset({
        attachments: data.attachments.map((file) => ({ id: file.id })),
        name: data.name,
        description: data.description ?? "",
        space_id: data.space_id,
        groups: data.groups.map((group) => ({ id: group.id })),
        websites: data.websites.map((website) => ({ id: website.id })),
        prompt: {
          text: data.prompt?.text,
          description: data.prompt?.description,
        },
        completion_model: { id: data.completion_model.id },
      });
      setFormLoaded(true);
    }
  }, [data, loaded]);

  const onSubmit = (data: PartialAssistantUpdatePublic) => {
    const errorMessage = `Max ${max_files} bifogade fil(er) tillåtna`;
    if (data?.attachments?.length > max_files) {
      setError("attachments", { type: "max", message: errorMessage });
    } else {
      if (isValid) {
        setSaving(true);
        updateAssistant(assistantId, data)
          .then((res) => {
            updateListStoreAssistant(
              assistantId,
              mapIntricAssistantToAssistant(res)
            );

            reset({
              attachments: data.attachments.map((file) => ({ id: file.id })),
              name: res.name,
              description: res.description,
              space_id: res.space_id,
              groups: res.groups.map((group) => ({ id: group.id })),
              prompt: {
                text: res.prompt?.text,
                description: res.prompt?.description,
              },
              completion_model: { id: res.completion_model.id },
            });
            message({ message: "Sparade assistent", status: "success" });
          })
          .catch((e) => {
            console.log(e);
            message({ message: "Kunde inte spara assistent", status: "error" });
          })
          .finally(() => setSaving(false));
      }
    }
  };
  return (
    <FormProvider {...form}>
      {formLoaded && (
        <form
          className={cx("flex flex-col", className)}
          {...rest}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Accordion size="sm" className="settings-accordion">
            <Accordion.Item header={"Profil"}>
              <AISettingsProfile />
            </Accordion.Item>
            <Accordion.Item header={"Instruktioner"}>
              <AISettingsInstructions />
            </Accordion.Item>
            <Accordion.Item header={"Datakällor"}>
              <AISettingsDatasets
                attachments={data?.attachments ?? []}
                allowed_attachments={data?.allowed_attachments}
              />
            </Accordion.Item>
          </Accordion>
          <Divider className="mb-16" />
          <Button
            type="submit"
            disabled={!isDirty}
            aria-describedby="edit-button-errors"
            loading={saving}
          >
            Spara
          </Button>
          <ul id="edit-button-errors" className="flex flex-col gap-8 py-8">
            {Object.keys(errors)?.map((errorKey, index) => (
              <li key={`${index}-${errorKey}`}>
                <Snackbar
                  closeable={false}
                  className="max-w-full shrink !bg-error-surface-accent text-error-text-primary"
                  status="error"
                  message={errors?.[errorKey]?.message as string}
                />
              </li>
            ))}
          </ul>
        </form>
      )}
    </FormProvider>
  );
};
