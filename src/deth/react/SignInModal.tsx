import React from "react";
import Modal from "react-modal";
import QRCode from "react-qr-code";

import icon from "./SignInModal.logo.png";

type Props = {
  uri?: string;
  show: boolean;
  onClose: () => void;
};

export const SignInModal: React.FC<Props> = (props) => {
  const { show, onClose, uri = "" } = props;

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          backgroundColor: "white",
          borderRadius: "4px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          padding: "24px",
          paddingLeft: "56px",
          paddingRight: "56px",
          bottom: "auto",
          right: "auto",
          border: "0px",
          maxWidth: "90%",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 12,
        }}
      >
        <img
          style={{ margin: 12, marginBottom: 32 }}
          width={50}
          src={icon}
          alt="Logo"
        />
        <a href={uri}>
          <QRCode size={256} value={uri} />
        </a>
        <div
          style={{
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 24,
            marginTop: 32,
            fontSize: 12,
            width: 256,
          }}
        >
          Scan this QR code with your deth app or tap it to sign in with the app
          on this device.
        </div>
      </div>
    </Modal>
  );
};
