import { useState } from "react";
import { useDethAuth, UserContext } from "./deth/hooks";
import { QRCodeModal } from "./deth/qr-code-modal";
import { Welcome } from "./components/Welcome";

import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { uri, token, user, logout } = useDethAuth();
  return (
    <UserContext.Provider value={{ user, token, logout }}>
      <div className="App">
        <header className="App-header">
          {user && <Welcome />}
          {!user && <button onClick={() => setShowLogin(true)}>Sign in</button>}
          <QRCodeModal
            uri={uri ?? ""}
            open={showLogin}
            isSignedIn={!!token}
            onClose={() => setShowLogin(false)}
          />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
