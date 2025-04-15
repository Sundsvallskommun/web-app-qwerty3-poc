import { Accordion, Button, cx, Divider, useSnackbar } from "@sk-web-gui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAssistant } from "../../services/use-assistant";
import { PartialAssistantUpdatePublic } from "../../types";
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
  const message = useSnackbar();

  const form = useForm<PartialAssistantUpdatePublic>({});
  const updateListStoreAssistant = useListStore(
    (state) => state.updateAssistant
  );
  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    if (data && loaded) {
      reset({
        name: data.name,
        description: data.description,
        space_id: data.space_id,
        groups: data.groups.map((group) => ({ id: group.id })),
        prompt: {
          text: data.prompt?.text,
          description: data.prompt?.description,
        },
        completion_model: { id: data.completion_model.id },
      });
    }
  }, [data, loaded]);

  const onSubmit = (data: PartialAssistantUpdatePublic) => {
    updateAssistant(assistantId, data)
      .then((res) => {
        updateListStoreAssistant(
          assistantId,
          mapIntricAssistantToAssistant(res)
        );

        reset({
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
      });
  };
  return (
    <FormProvider {...form}>
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
            <AISettingsDatasets />
          </Accordion.Item>
        </Accordion>
        <Divider className="mb-16" />
        <Button type="submit" disabled={!isDirty}>
          Spara
        </Button>
      </form>
    </FormProvider>
  );
};
