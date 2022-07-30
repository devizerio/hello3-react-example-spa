import React from "react";

import "./Gallery.css";

type Props = {
  nfts: { title: string; image: string }[];
};

export const Gallery: React.FC<Props> = (props) => {
  const { nfts } = props;
  return (
    <div className="gallery">
      {nfts.map((nft, idx) => (
        <div key={idx} className="nft">
          <img className="nft-image" src={nft.image} alt={nft.title} />
          <div className="nft-name">{nft.title}</div>
        </div>
      ))}
      {nfts.length < 1 && (
        <div className="empty-state">No NFTs found on this account.</div>
      )}
    </div>
  );
};
