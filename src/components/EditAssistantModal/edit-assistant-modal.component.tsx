import { FormProvider, useForm } from "react-hook-form";
import { useAssistant } from "../../services/use-assistant";
import { AISettingsProfile } from "../AISettings/components/ai-settings-profile.component";
import { Modal } from "../Modal/modal.component";
import {
  CreateSpaceAssistantRequest,
  PartialAssistantUpdatePublic,
} from "../../types/data-contracts";
import { useEffect, useState } from "react";
import { Accordion, Button, Spinner, useSnackbar } from "@sk-web-gui/react";
import { AISettingsInstructions } from "../AISettings/components/ai-settings-instructions.component";
import { AISettingsDatasets } from "../AISettings/components/ai-settings-datasets.component";
import { useListStore } from "../../services/list-store";
import {
  createAssistant,
  getMySpace,
  updateAssistant,
} from "../../services/assistant-service";
import { mapIntricAssistantToAssistant } from "../../utils/map-assistant.util";
import { shallow, useShallow } from "zustand/shallow";

interface EditAssistantModalProps {
  open?: boolean;
  onClose?: () => void;
  assistantId?: string;
}

export const EditAssistantModal: React.FC<EditAssistantModalProps> = ({
  open,
  onClose,
  assistantId,
}) => {
  const { data, loaded } = useAssistant(assistantId);
  const [id, setId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const form = useForm<PartialAssistantUpdatePublic>({});
  const message = useSnackbar();

  const [updateListStoreAssistant, addAssistant] = useListStore(
    useShallow((state) => [state.updateAssistant, state.addAssistant])
  );

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
  } = form;

  const max_files = data?.allowed_attachments.limit?.max_files;

  useEffect(() => {
    const setNew = async () => {
      setId(null);
      const mySpace = await getMySpace();
      reset({
        attachments: [],
        name: "",
        description: "",
        space_id: mySpace.id,
        groups: [],
        websites: [],
        prompt: {
          text: "",
          description: "",
        },
        completion_model: { id: "" },
      });
      setFormLoaded(true);
    };

    if (!assistantId) {
      setNew();
    } else if (data && loaded && !formLoaded) {
      setId(data.id);
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

  const handleClose = () => {
    setFormLoaded(false);
    reset({});
    onClose();
  };

  const handleUpdateAssistant = (
    data: PartialAssistantUpdatePublic,
    id: string
  ) => {
    setSaving(true);
    updateAssistant(id, data)
      .then((res) => {
        updateListStoreAssistant(id, mapIntricAssistantToAssistant(res));

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
  };
  const handleCreateAssistant = (data: PartialAssistantUpdatePublic) => {
    setSaving(true);
    createAssistant(data.space_id, { name: data.name })
      .then((res) => {
        addAssistant(mapIntricAssistantToAssistant(res));
        setId(res.id);
        handleUpdateAssistant(data, res.id);
      })
      .catch((e) => {
        console.log(e);
        message({ message: "Kunde inte skapa assistent", status: "error" });
      })
      .finally(() => setSaving(false));
  };

  const onSubmit = (data: PartialAssistantUpdatePublic) => {
    const errorMessage = `Max ${max_files} bifogade fil(er) tillåtna`;
    if (data?.attachments?.length > max_files) {
      setError("attachments", { type: "max", message: errorMessage });
    } else {
      if (isValid) {
        if (assistantId) {
          handleUpdateAssistant(data, assistantId);
        } else {
          handleCreateAssistant(data);
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="w-[1000px] max-w-[90vw] mb-12"
      label={!!id ? `Redigerar assistent` : "Ny assistent"}
    >
      <FormProvider {...form}>
        <form
          className="grow h-full w-full flex flex-col overflow-y-hidden max-h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!formLoaded ? (
            <div className="w-full h-full flex justify-center items-center grow">
              <Spinner />
            </div>
          ) : (
            <div className="px-20 overflow-y-auto grow shrink">
              <Accordion size="md" allowMultipleOpen>
                <Accordion.Item header="Profil" initalOpen={true}>
                  <AISettingsProfile />
                </Accordion.Item>
                <Accordion.Item header="Instruktioner" initalOpen={true}>
                  <AISettingsInstructions />
                </Accordion.Item>
                <Accordion.Item header="Datakällor" initalOpen={true}>
                  <AISettingsDatasets
                    attachments={data?.attachments ?? []}
                    allowed_attachments={data?.allowed_attachments}
                  />
                </Accordion.Item>
              </Accordion>
            </div>
          )}
          <footer className="px-20 pt-20 pb-10 w-full flex justify-end shrink-0 grow-0 border-t-1 border-t-divider">
            <Button
              color="vattjom"
              disabled={!isDirty || !formLoaded}
              type="submit"
              loading={saving}
            >
              Spara
            </Button>
          </footer>
        </form>
      </FormProvider>
    </Modal>
  );
};
