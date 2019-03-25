import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'

const authApiService = new AuthApiService()
const userApiService = new UserApiService()

const service = {
  userApiService,
  authApiService
}

export default service
