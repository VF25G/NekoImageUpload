import {observable, action} from 'mobx'
import {Auth} from '../models'
import UserStore from './user'
import HistoryStore from './history'
import ImageStore from './image'
import { message } from 'antd'

class AuthStore {
  @observable values = {
    username: '',
    password: ''
  }

  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          UserStore.resetUser()
          message.error('登录失败')
          reject(error)
        })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        })
        .catch(error => {
          if (error.toString().indexOf("Username has already been taken")) {
            message.error('账户已存在')
          } else {
            message.error('注册失败')
          }
          UserStore.resetUser()
          reject(error)
        })
    })
  }

  @action logout() {
    Auth.logout()
    UserStore.resetUser()
    HistoryStore.reset()
    ImageStore.reset()
  }
}

export default new AuthStore()
