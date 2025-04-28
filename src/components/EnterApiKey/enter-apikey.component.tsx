import { Button, cx, FormControl, FormLabel, Input } from "@sk-web-gui/react";
import { useAssistantStore } from "../../services/assistant-store";
import { useEffect, useState } from "react";
import { useAppStore } from "../../services/app-store";

export const EnterApiKey: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const setApikey = useAssistantStore((state) => state.setApikey);
  const isPWA = useAppStore((state) => state.isPWA);
  const bc = new BroadcastChannel("qwerty_channel");

  useEffect(() => {
    if (isPWA) {
      window.resizeTo(500, 264);
    }
  }, [isPWA]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPWA) {
      bc.postMessage(key);
      window.close();
    } else {
      setApikey(key);
    }
  };
  return (
    <div
      className={cx(
        "fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center",
        { ["bg-background-100"]: isPWA }
      )}
    >
      <div
        className={cx("rounded-groups p-32", {
          ["bg-background-100 shadow-200"]: !isPWA,
        })}
      >
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
