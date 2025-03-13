import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AssistantSettings, UserPublic } from "../types";
import { getSkHeaders } from "./assistant-service";
import { useShallow } from "zustand/shallow";
import { useAssistantStore } from "./assistant-store";

export const getMe = async (
  options?: Partial<AssistantSettings>
): Promise<UserPublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error("No api url provided");
  }

  const url = `${apiBaseUrl}/users/me`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error("Error when fetching sessions");
    });
};

interface Data {
  data: UserPublic | null;
  loaded: boolean;
  loading: boolean;
}
interface Actions {
  setData: (data: UserPublic | null) => void;
  setLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const useMeStore = create(
  persist<Data & Actions>(
    (set) => ({
      data: null,
      loaded: false,
      loading: false,
      setData: (data) => set(() => ({ data })),
      setLoaded: (loaded) => set(() => ({ loaded })),
      setLoading: (loading) => set(() => ({ loading })),
    }),
    {
      name: "sk-qwerty-user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useMe = () => {
  const [data, setData, loaded, setLoaded, loading, setLoading] = useMeStore(
    useShallow((state) => [
      state.data,
      state.setData,
      state.loaded,
      state.setLoaded,
      state.loading,
      state.setLoading,
    ])
  );

  useEffect(() => {
    if ((!loaded || !data) && !loading) {
      setLoading(true);
      setLoaded(false);
      getMe()
        .then((res) => {
          if (res) {
            setData(res);
            setLoaded(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { data, loaded };
};
