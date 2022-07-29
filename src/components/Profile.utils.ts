import axios from "axios";

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

  console.log("jaaaaa");

  const ens = resp.data.nfts.ownedNfts
    .filter((nft: any) => nft.title.endsWith(".eth"))
    .map((nft: any) => nft.title);

  const nfts = resp.data.nfts.ownedNfts
    .filter((nft: any) => !nft.title.endsWith(".eth"))
    .map((nft: any) => ({
      title: nft.title,
      image: nft.media[0].gateway,
    }));

  console.log({ ens, nfts });

  return { ens, nfts };
};
