import axios from "axios";
import { useEffect, useState } from "react";

const GET_NFT_ENDPOINT = "https://api.example.verifiableidentity.xyz/nfts";

type Response = {
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
  return resp.data.assets;
};

export const useNFTs = (token?: string | null) => {
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

  return { loading, domains, nfts };
};
