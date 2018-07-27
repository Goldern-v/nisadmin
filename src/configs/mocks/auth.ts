const mockAuth = {
  login: (username: string, password: string) => {
    return username === 'admin' && password === '123456'
      ? Promise.resolve({ token: 'FAKE_TOKEN', user: { id: '1', name: 'admin', age: 1, phone: '' } })
      : Promise.reject(new Error('用户名或密码不正确'))
  },
}

export default mockAuth
