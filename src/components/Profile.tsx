import _ from 'lodash'
import React from 'react'
import { Gallery } from './Gallery'
import { useNFTs } from './Profile.utils'

import './Profile.css'
import { Button } from './Button'
import { MoonLoader } from 'react-spinners'
import { useHello3 } from '@hello3/react'

export const Profile: React.FC = () => {
  const { user, clearSession } = useHello3()

  const { loading, domains, alias, nfts } = useNFTs(user?.token)
  const name = alias ?? _.first(domains) ?? `0x${user?.address.slice(11, 15)}..${user?.address.slice(-4)}`

  if (loading) {
    return (
      <div className="loader">
        <MoonLoader size={24} />
      </div>
    )
  }

  return (
    <div>
      <div className="welcome">Welcome, {name}!</div>
      <div className="buttons">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(user?.token ?? '')
          }}
        >
          Copy token
        </Button>
        <Button onClick={clearSession}>Sign out</Button>
      </div>
      <Gallery nfts={nfts} />
    </div>
  )
}
