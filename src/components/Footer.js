import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #AAAAAA
`

function Footer() {
  return (
    <StyledFooter>
      <p>Footer</p>
    </StyledFooter>
  )
}

export default Footer;