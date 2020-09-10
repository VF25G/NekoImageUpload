import React from 'react'
import styled from 'styled-components'
import LogoUrl from '../components/logo.svg'

const StyledH1 = styled.h1`
  margin-bottom: 0;
`

const StyledP = styled.p`
  margin-bottom: 6px;
  font-size: 1rem;
  &:nth-child(3) {
    color: red;
  }
`

const Logo = styled.img`
  height: 120px;
  margin: 0 auto;
  display: block;
`

const StyledLink = styled.a`
  font-size: 1rem;
  text-align: center;
  display: block;
  padding-bottom: 1rem;
`

const CenterSection = styled.section`
  max-width: 567px;
  margin: 0 auto;
`

function About() {
  return (
    <>
      <StyledH1>About</StyledH1>
      <Logo src={LogoUrl}/>
      <StyledLink href="https://github.com/VF25G/NekoImageUpload">项目地址</StyledLink>
      <CenterSection>
        <StyledP>Neko Image Upload基于React进行开发实现。</StyledP>
        <StyledP>依赖LeanCloud作为后台服务，使用Mobx进行数据管理。</StyledP>
        <StyledP>本图床作为学习React过程中所产生的副产物，并不保证图床链接长期有效。</StyledP>
        <StyledP>联系方式：replybber@gmail.com</StyledP>
      </CenterSection>
    </>
  )
}

export default About;