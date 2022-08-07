import { getDeepLink } from "./get-deep-link";
import { createSession } from "./create-session";

export const main = async () => {
  const session = createSession();

  session.on("connect", () => {
    const uri = getDeepLink(session);
    console.log(uri);
  });

  session.on("token", (token) => {
    console.log(token);
  });

  session.on("disconnect", () => {
    console.log("disconnect");
  });
};