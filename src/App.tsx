import { useState } from "react";
import { useDethAuth, UserContext } from "./deth/hooks";
import { QRCodeModal } from "./deth/qr-code-modal";
import { Profile } from "./components/Profile";

import "./App.css";
import { Button } from "./components/Button";

import logo from "./logo.png";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { uri, token, user, logout } = useDethAuth();

  if (user) {
    return (
      <UserContext.Provider value={{ user, token, logout }}>
        <div className="app">
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
          <h2 className="title">DETH NFT Viewer</h2>
          <Button onClick={() => setShowLogin(true)}>Sign in</Button>
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
