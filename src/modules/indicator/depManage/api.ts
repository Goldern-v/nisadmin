import BaseApiService from "src/services/api/BaseApiService"

class Api extends BaseApiService {
  // 获取列表
  getList() {
    return this.get(`/dictTree/cnq_ward/getList`)
  }

  // 获取列表
  saveItem(data: any) {
    const params = { ...data }
    if (!params.id) delete params.id
    return this.post(`/dictTree/cnq_ward/saveOrUpdate`, params)
  }


  // 获取列表
  deleteItem(id: number) {
    return this.get(`/dictTree/{dictCode}/delete/${id}`)
  }
}

export default new Api()
