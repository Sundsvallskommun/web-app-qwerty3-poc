import { Accordion, cx } from "@sk-web-gui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAssistant } from "../../services/use-assistant";
import { PartialAssistantUpdatePublic } from "../../types";
import { AISettingsDatasets } from "./components/ai-settings-datasets.component";
import { AISettingsInstructions } from "./components/ai-settings-instructions.component";
import { AISettingsProfile } from "./components/ai-settings-profile.component";

interface AISettingsProps extends React.ComponentPropsWithoutRef<"form"> {
  assistantId: string;
}

export const AISettings: React.FC<AISettingsProps> = (props) => {
  const { assistantId, className, ...rest } = props;
  const { data, loaded } = useAssistant(assistantId);

  const form = useForm<PartialAssistantUpdatePublic>({});

  const { reset } = form;

  useEffect(() => {
    if (data && loaded) {
      reset({
        ...data,
        groups: data.groups.map((group) => ({ id: group.id })),
        prompt: {
          text: data.prompt.text,
          description: data.prompt.description,
        },
        completion_model: { id: data.completion_model.id },
      });
    }
  }, [data, loaded]);

  return (
    <FormProvider {...form}>
      <form className={cx("flex flex-col", className)} {...rest}>
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
      </form>
    </FormProvider>
  );
};
