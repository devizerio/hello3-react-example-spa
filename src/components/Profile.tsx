import React, { useEffect, useState } from "react";
import { useUser } from "../deth/hooks";
import { Gallery } from "./Gallery";
import { getNFTs } from "./Profile.utils";

export const Profile: React.FC = () => {
  const { token } = useUser();

  const [loading, setLoading] = useState(false);

  const [domains, setDomains] = useState<string[]>([]);
  const [nfts, setNFTs] = useState<{ title: string; image: string }[]>([]);

  useEffect(() => {
    setLoading(true);
    getNFTs(token ?? "")
      .then(({ ens, nfts }) => {
        setDomains(ens);
        setNFTs(nfts);
      })
      .catch((exc) => {
        console.error(exc);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      {domains.length > 0 && (
        <div style={{ margin: 24 }}>
          <div style={{ fontSize: 18, fontWeight: "bold" }}>
            Your ENS names:
          </div>
          {domains.map((domain) => (
            <div style={{ fontSize: 18 }}>{domain}</div>
          ))}
        </div>
      )}
      <Gallery nfts={nfts} />
    </div>
  );
};
