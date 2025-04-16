import { useEffect, useState } from "react";
import { SpacePublic } from "../types";
import { getMySpace, getSpace } from "./assistant-service";

export const useSpace = (spaceId: string) => {
  const [data, setData] = useState<SpacePublic | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (spaceId === "my") {
      setLoaded(false);
      getMySpace().then((res) => {
        setData(res);
        setLoaded(true);
      });
      return;
    }
    if (data?.id !== spaceId) {
      setLoaded(false);
      getSpace(spaceId).then((res) => {
        setData(res);
        setLoaded(true);
      });
    }
  }, [spaceId]);

  return { data, loaded };
};
