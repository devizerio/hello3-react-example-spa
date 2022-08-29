import axios from "axios";
import { useEffect, useState } from "react";

const GET_NFT_ENDPOINT = "https://nft-api.verifiableidentity.xyz/nfts";

type Response = {
  alias?: string;
  ens: string[];
  nfts: {
    title: string;
    image: string;
  }[];
};

export const getNFTs = async (token: string): Promise<Response> => {
  const resp = await axios.get(GET_NFT_ENDPOINT, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(resp.data);
  return { ...resp.data.assets, alias: resp.data.alias };
};

export const useNFTs = (token?: string | null) => {
  const [loading, setLoading] = useState(false);

  const [domains, setDomains] = useState<string[]>([]);
  const [nfts, setNFTs] = useState<{ title: string; image: string }[]>([]);
  const [alias, setAlias] = useState<string | undefined>();

  useEffect(() => {
    setLoading(true);
    getNFTs(token ?? "")
      .then(({ ens, nfts, alias }) => {
        console.log(alias);
        setDomains(ens);
        setNFTs(nfts);
        setAlias(alias);
      })
      .catch((exc) => {
        console.error(exc);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return { loading, domains, alias, nfts };
};
