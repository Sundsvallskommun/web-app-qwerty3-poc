import { Button, FormControl, FormLabel, Input } from "@sk-web-gui/react";
import { useAssistantStore } from "../../services/assistant-store";
import { useState } from "react";

export const EnterApiKey: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const setApikey = useAssistantStore((state) => state.setApikey);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApikey(key);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="rounded-groups bg-background-100 shadow-200 p-32">
        <h1>Ange din Intricnyckel</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-16">
          <FormControl className="w-full">
            <FormLabel>Personlig api-nyckel</FormLabel>
            <Input value={key} onChange={(e) => setKey(e.target.value)} />
          </FormControl>
          <Button disabled={key.length < 68} color="gronsta" type="submit">
            Spara
          </Button>
        </form>
      </div>
    </div>
  );
};
