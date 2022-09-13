import { Profile } from './components/Profile'
import { useHello3 } from '@hello3/react'

import './App.css'
import { Button } from './components/Button'

import logo from './logo.png'

function App() {
  const { user, showSignInModal } = useHello3()

  if (user) {
    return (
      <div className="app">
        <img className="logo" src={logo} alt="NFT Viewer App" />
        <h2 className="title">Hello3</h2>
        <Profile />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="login">
        <img className="logo" src={logo} alt="NFT Viewer App" />
        <h2 className="title">Hello3</h2>
        <h3 className="subtitle">NFT Viewer</h3>
        <p className="description">
          This is an example application to demo the authentication flow with the Hello3 app. That means you do <b>not</b> need your original private
          key to log in. Read more about this on{' '}
          <a className="link" target="_blank" rel="noreferrer" href="https://docs.hello3.io">
            docs.hello3.io
          </a>
          .
        </p>
        <div className="signin-button">
          <Button onClick={() => showSignInModal()}>Sign in</Button>
        </div>
      </div>
    </div>
  )
}

export default App
