const mockUser = {
  listUser: () => Promise.resolve({
    users: [
      { id: 1, name: 'admin', age: 1, phone: '' },
      { id: 2, name: '张三', age: 36, phone: '13648572956' },
      { id: 3, name: '李四', age: 22, phone: '13869306948' },
      { id: 4, name: '王五', age: 52, phone: '15968478595' },
    ],
  }),
}

export default mockUser
