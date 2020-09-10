import React from 'react'
import List from '../components/List'
import styled from 'styled-components'


const StyledH1 = styled.h1`
  margin-bottom: 0;
`

function History() {
  return (
    <>
      <StyledH1>History</StyledH1>
      <List/>
    </>
  )
}

export default History;