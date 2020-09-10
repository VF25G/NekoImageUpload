import React from 'react'
import styled from 'styled-components'
import LogoUrl from '../components/logo.svg'

const StyledH1 = styled.h1`
  margin-bottom: 0;
`

const Logo = styled.img`
  height: 120px;
  margin: 0 auto;
  display: block;
`

function About() {
  return (
    <>
      <StyledH1>About</StyledH1>
      <Logo src={LogoUrl}/>
      <p>Neko Image Upload基于React进行开发实现。</p>
      <p>依赖LeanCloud作为后台服务，使用Mobx进行数据管理。</p>
      <p>本图床作为学习React过程中所产生的副产物，并不保证图床链接长期有效。</p>
    </>
  )
}

export default About;