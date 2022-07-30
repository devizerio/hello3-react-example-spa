import axios from "axios";
import { useEffect, useState } from "react";

const GET_NFT_ENDPOINT =
  "https://deth-nft-explorer-api-5npty.ondigitalocean.app/nfts";

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

  const ens = resp.data.nfts.ownedNfts
    .filter((nft: any) => nft.title.endsWith(".eth"))
    .map((nft: any) => nft.title);

  const nfts = resp.data.nfts.ownedNfts
    .filter((nft: any) => !nft.title.endsWith(".eth"))
    .map((nft: any) => ({
      title: nft.title,
      image: nft.media[0].gateway,
    }));

  return { ens, nfts };
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
