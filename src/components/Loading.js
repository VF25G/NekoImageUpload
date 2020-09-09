import React from 'react'
import styled from 'styled-components'

const StyledCenterDiv = styled.div`
  display: flex;
  justify-content: center;
`

function Loading () {
  return (
    <StyledCenterDiv>
      Loading...
    </StyledCenterDiv>
  )
}

export default Loading