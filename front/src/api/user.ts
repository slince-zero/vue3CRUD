import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 获取所有用户
export const getAllUsers = () => {
  return service.get('/user')
}

// 获取单个用户
export const getUserById = (id: number) => {
  return service.get(`/user/${id}`)
}

// 模糊查询用户
export const getUsersByName = (name: string) => {
  const newName = name.trim() // 去除字符串两边的空格
  return service.post('/user/search', { name: newName })
}

// 删除用户
export const deleteUser = (id: number) => {
  return service.delete(`/user/${id}`)
}

// 添加用户
export const addUser = (data: { name: string; description: string }) => {
  return service.post('/user', data)
}

// 更新用户信息
export const updateUser = (
  id: number,
  data: { name: string; description: string },
) => {
  return service.put(`/user/${id}`, data)
}
