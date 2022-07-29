import React from "react";
import { useUser } from "../deth/hooks";

export const Welcome: React.FC = () => {
  const { token, user, logout } = useUser();

  return (
    <div>
      <div>Hello, {user}!</div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(token ?? "");
        }}
      >
        copy token
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
};