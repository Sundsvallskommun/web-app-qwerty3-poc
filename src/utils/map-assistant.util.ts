import {
  Assistant,
  AssistantPublic,
  AssistantSparse,
  DefaultAssistant,
} from "../types";
import avatar1 from "../assets/beslutscoachen.png";
import avatar2 from "../assets/datakirurgen.png";
import avatar3 from "../assets/paragrafryttaren.png";
import avatar4 from "../assets/qwerty.png";
import avatar5 from "../assets/qwerty2.png";
import avatar6 from "../assets/qwerty3.png";
import avatar7 from "../assets/user.png";
import avatar8 from "../assets/varumarkesvaktaren.png";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

/**
 * Maps an AssistantPublic object to an Assistant object.
 *
 * @param assistant - The Assistant object to be mapped.
 * @param spaceId - Optional space ID to override the assistant's space ID.
 * @param pinned - Optional boolean indicating if the assistant should be pinned.
 * @returns An Assistant object with mapped properties from the AssistantPublic input.
 */

export const mapIntricAssistantToAssistant = (
  assistant: AssistantPublic | AssistantSparse | DefaultAssistant,
  spaceId?: string,
  pinned?: boolean
): Assistant => {
  const space_id = () => {
    if ("space_id" in assistant) {
      return spaceId ?? assistant?.space_id ?? null;
    } else {
      return spaceId ?? null;
    }
  };
  const avatarIndex = Math.floor(Math.random() * (0 - 7) + 7);
  return {
    info: {
      avatar: avatars[avatarIndex],
      name: assistant.name,
      shortName: assistant.name[0],
      title: !!assistant?.description
        ? assistant.description.split("\n")[0].split(".")[0]
        : `Assistenten ${assistant.name}`,
      description:
        assistant?.description ??
        `Assistenten ${assistant.name} saknar beskrivning. Du kan fråga mig vad jag kan hjälpa dig med.`,
      id: assistant.id,
      space_id: space_id(),
      permissions: assistant.permissions,
    },
    settings: {
      assistantId: assistant.id,
      pinned: pinned ?? false,
    },
  };
};
