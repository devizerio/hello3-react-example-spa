import _ from "lodash";
import React from "react";
import { useUser } from "../verifiable-identity/hooks";
import { Gallery } from "./Gallery";
import { useNFTs } from "./Profile.utils";

import "./Profile.css";
import { Button } from "./Button";
import { MoonLoader } from "react-spinners";

export const Profile: React.FC = () => {
  const { token, user, logout } = useUser();
  const { loading, domains, nfts } = useNFTs(token);
  const name =
    _.first(domains) ?? `0x${user?.slice(11, 15)}..${user?.slice(-4)}`;

  if (loading) {
    return (
      <div className="loader">
        <MoonLoader size={24} />
      </div>
    );
  }

  return (
    <div>
      <div className="welcome">Welcome, {name}!</div>
      <div className="buttons">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(token ?? "");
          }}
        >
          Copy token
        </Button>
        <Button onClick={logout}>Sign out</Button>
      </div>
      <Gallery nfts={nfts} />
    </div>
  );
};
