import { Socket } from "socket.io-client";
import { DEFAULT_CONNECTOR } from "./constants";
import { Config } from "./types";

export const getDefaultDomain = () => {
  return window?.location?.hostname;
};

export const getDeepLink = (session: Socket): string => {
  // @ts-ignore: we saved the config of createSession on the socket as tmp hack
  const config: Config = session._verifiableIdentityConfig ?? {};
  const connector = config?.connector ?? DEFAULT_CONNECTOR;
  const domain = config?.domain ?? getDefaultDomain();
  return `hello3://auth?connector=${connector}&domain=${domain}&session=${session.id}`;
};
