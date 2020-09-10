import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #AAAAAA
`

const StyledP = styled.p`
  margin: 0;
`

function Footer() {
  return (
    <StyledFooter>
      <StyledP>请勿上传违法中国大陆法律的图片，违者后果自负。</StyledP>
      <StyledP>MIT Licensed | Copyright © 2020-present VF25G</StyledP>
    </StyledFooter>
  )
}

export default Footer;