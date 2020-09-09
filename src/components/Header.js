import React, { useEffect } from 'react'
import LogoUrl from './logo.svg'
import {NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import { useStores} from '../stores'
import { observer } from 'mobx-react' // 监控组件数据变动

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

const Header = observer(() => {
  const history = useHistory()
  const { UserStore, AuthStore } = useStores()

  const handleLogout = () => {
    AuthStore.logout()
  }
  const handleLogin = () => {
    console.log('跳转到登录页面')
    history.push('/login')
  }
  const handleRegister = () => {
    console.log('跳转到注册页面')
    history.push('/register')
  }

  useEffect(() => {
    UserStore.pullUser()
    //eslint-disable-next-line
  }, [])

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
          UserStore.currentUser ?
            <>
              {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
            </> :
            <>
              <StyledButton type="primary" onClick={handleLogin}>登陆</StyledButton>
              <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
            </>
        }
      </StyledLogin>
    </StyledHeader>
  )
})

export default Header