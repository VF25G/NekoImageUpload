import React, {useState} from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101F;
  color: #FFFFFF;
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

const StyledLogin = styled.div`
  margin-left: auto;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`

function Header() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <StyledHeader>
      <Logo src={LogoUrl}/>
      <nav>
        <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
        <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
        <StyledLink to="/about" activeClassName="active">关于我</StyledLink>
      </nav>
      <StyledLogin>
        {
          isLogin ?
            <>
              VF25G <StyledButton type="primary" onClick={()=>setIsLogin(false)}>注销</StyledButton>
            </> :
            <>
              <StyledButton type="primary" onClick={()=>setIsLogin(true)}>登陆</StyledButton>
              <StyledButton type="primary">注册</StyledButton>
            </>
        }
      </StyledLogin>
    </StyledHeader>
  )
}

export default Header