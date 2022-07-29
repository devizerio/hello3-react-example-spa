import { useCallback, useEffect, useState } from "react";
import { createAuthDeepLink, createSession } from "../auth";
import { verifyToken } from "../verify-token";
import { DEFAULT_STORAGE_KEY } from "./constants";
import { DethInitConfig } from "./types";
import { useLocalStorage } from "./use-local-storage";

export const useDethAuth = (config?: DethInitConfig) => {
  const [user, setUser] = useState<string | null>(null);

  const storageKey = config?.storageKey ?? DEFAULT_STORAGE_KEY;
  const [token, setToken] = useLocalStorage(storageKey);

  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      verifyToken(token)
        .then((payload) => setUser(payload.issuer))
        .catch(console.error);
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setUri(null);
    } else {
      const socket = createSession(config);
      socket.on("connect", () => {
        setUri(createAuthDeepLink(socket));
      });
      socket.on("token", (token) => setToken(token));
      socket.on("disconnect", () => setUri(null));
      return () => {
        socket.off("connect");
        socket.off("token");
        socket.off("disconnect");
      };
    }
  }, [token]); // eslint-disable-line

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  return { uri, token, user, logout };
};
