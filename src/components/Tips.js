import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const StyledTips = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  border-radius: 4px;
`

const Component = observer(({children}) => {
  const {UserStore} = useStores()
  return (
    <>
      {
        UserStore.currentUser ? null : <StyledTips>{children}</StyledTips>
      }
    </>
  )
})
export default Component