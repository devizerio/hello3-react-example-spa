import React from "react";

type Props = {
  nfts: { title: string; image: string }[];
};

export const Gallery: React.FC<Props> = (props) => {
  const { nfts } = props;
  return (
    <div
      style={{
        width: 1000,
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {nfts.map((nft, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 6,
          }}
        >
          <img
            style={{
              width: 250,
              height: 250,
              borderRadius: 16,
              border: "2px solid black",
            }}
            src={nft.image}
            alt={nft.title}
          />
          <div style={{ textAlign: "center", fontSize: 12 }}>{nft.title}</div>
        </div>
      ))}
    </div>
  );
};
