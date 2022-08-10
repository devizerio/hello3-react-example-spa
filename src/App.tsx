import { useState } from "react";
import { useIdentity, UserContext } from "./verifiable-identity/hooks";
import { QRCodeModal } from "./verifiable-identity/qr-code-modal";
import { Profile } from "./components/Profile";

import "./App.css";
import { Button } from "./components/Button";

import logo from "./logo.png";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { uri, token, user, logout } = useIdentity();

  if (user) {
    return (
      <UserContext.Provider value={{ user, token, logout }}>
        <div className="app">
          <img className="logo" src={logo} alt="NFT Viewer App" />
          <h2 className="title">Verifiable Identity</h2>
          <Profile />
        </div>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ user, token, logout }}>
      <div className="app">
        <div className="login">
          <img className="logo" src={logo} alt="NFT Viewer App" />
          <h2 className="title">Verifiable Identity</h2>
          <h3 className="subtitle">NFT Viewer</h3>
          <p className="description">
            This is an example application to demo the functionalities of
            authentication based on verifiable identities. That means you do{" "}
            <b>not</b> need your original private key to log in. Read more about
            this on{" "}
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://verifiableidentity.xyz"
            >
              verifiableidentity.xyz
            </a>
            .
          </p>
          <div className="signin-button">
            <Button onClick={() => setShowLogin(true)}>Sign in</Button>
          </div>
        </div>
        <QRCodeModal
          uri={uri ?? ""}
          open={showLogin}
          isSignedIn={!!token}
          onClose={() => setShowLogin(false)}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
