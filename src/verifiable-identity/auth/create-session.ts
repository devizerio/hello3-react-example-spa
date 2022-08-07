import { io, Socket } from "socket.io-client";
import { DEFAULT_CONNECTOR, DEFAULT_PROTOCOL } from "./constants";
import { Config } from "./types";

export const getDefaultDomain = () => {
  return window?.location?.hostname;
};

export const createSession = (config?: Config): Socket => {
  const connector = config?.connector ?? DEFAULT_CONNECTOR;
  const protocol = config?.connectorProtocol ?? DEFAULT_PROTOCOL;
  const socket = io(`${protocol}://${connector}`);
  // @ts-ignore: we need this config for the
  socket._verifiableIdentityConfig = config;
  return socket;
};
