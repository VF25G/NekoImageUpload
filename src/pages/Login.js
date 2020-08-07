import React, { useRef } from 'react'
import { observer} from 'mobx-react'
import { useStores} from '../stores'

const Component = observer(() =>{
  const { AuthStore } = useStores();
  const inputRef = useRef()

  const bingChange = e => {
    console.log(inputRef.current.value)
    AuthStore.setUsername(inputRef.current.value)
  }

  return (
    <>
      <h1>Login:{AuthStore.values.username}</h1>
      <input onChange={bingChange} ref={inputRef} />
    </>
  )
})

export default Component;