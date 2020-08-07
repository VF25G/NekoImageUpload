import React from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101F
`
const Logo = styled.img`
  height: 30px;
`
// 修改子组件样式，需要将子组件传入
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;
  
  &.active {
    border-bottom: 1px solid #FFFFFF;
  }
`

function Header() {
  return (
    <StyledHeader>
      <Logo src={LogoUrl}/>
      <nav>
        <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
        <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
        <StyledLink to="/about" activeClassName="active">关于我</StyledLink>
      </nav>
    </StyledHeader>
  )
}

export default Header