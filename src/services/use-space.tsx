import { useEffect, useState } from "react";
import { SpacePublic } from "../types";
import { getSpace } from "./assistant-service";

export const useSpace = (spaceId: string) => {
  const [data, setData] = useState<SpacePublic | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
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
