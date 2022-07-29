import { SignInModal } from "./deth/react/SignInModal";

import "./App.css";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setShowLogin(true)}>Sign in</button>
        <SignInModal
          show={showLogin}
          onClose={() => setShowLogin(false)}
          uri="mqlksdfj"
        />
      </header>
    </div>
  );
}

export default App;
