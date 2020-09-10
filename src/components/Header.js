import React, {useEffect} from 'react'
import LogoUrl from './logo.svg'
import {NavLink, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {Button} from 'antd'
import {useStores} from '../stores'
import {observer} from 'mobx-react' // 监控组件数据变动

const StyledHeader = styled.header`
  background-color: #3F434B;
  color: white;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  
  @media (min-width: 576px) {
    max-width: 540px;
  }
  
  @media (min-width: 768px) {
    max-width: 720px;
  }
  
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  
  
  @media (max-width: 1470px) {
    max-width: 100%;
  }
`

const Logo = styled.img`
  height: 30px;
`
// 修改子组件样式，需要将子组件传入
const StyledLink = styled(NavLink)`
  color: #83868A;
  margin-left: 30px;
  font-size: 16px;
  &:hover{
   color:#ACAAA7;
  }
  &.active {
    color: white;
  }
`

const StyledLogin = styled.div`
  margin-left: auto;
`

const StyledButton = styled(Button)`
  margin-left: 10px;
    &.ant-btn-primary {
    background: #52565C;
    border-color: #52565C;
    border-radius: 4px;
    color: #B2B3B5;
  }
`

const Header = observer(() => {
  const history = useHistory()
  const {UserStore, AuthStore} = useStores()

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
      <StyledWrapper>
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
                {UserStore.currentUser.attributes.username} <StyledButton type="primary"
                                                                          onClick={handleLogout}>注销</StyledButton>
              </> :
              <>
                <StyledButton type="primary" onClick={handleLogin}>登陆</StyledButton>
                <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
              </>
          }
        </StyledLogin>
      </StyledWrapper>
    </StyledHeader>
  )
})

export default Header