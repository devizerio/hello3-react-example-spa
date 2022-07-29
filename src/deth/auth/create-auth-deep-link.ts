import { Socket } from "socket.io-client";
import { DEFAULT_CONNECTOR } from "./constants";
import { DethInitConfig } from "./types";

export const getDefaultDomain = () => {
  return window?.location?.hostname;
};

export const createAuthDeepLink = (session: Socket): string => {
  // @ts-ignore: we saved the config of createSession on the socket as tmp hack
  const config: DethInitConfig = session._dethConfig ?? {};
  const connector = config?.connector ?? DEFAULT_CONNECTOR;
  const domain = config?.domain ?? getDefaultDomain();
  return `deth://auth?connector=${connector}&domain=${domain}&session=${session.id}`;
};
