import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /**284.厚街--学习资源--网站链接--删除记录 */
  public deleteById(id: number | string) {
    return this.post('/studyAndTrain/studyResources/webSideLinkManage/deleteById', qs.stringify({ id }))
  }

  /**283.厚街--学习资源--网站链接--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: number | string,
      name: string,
      websideUrl: string,
      briefIntroduction: string,
      sort: number,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/webSideLinkManage/addOrUpdate', params)
  }

  /**281.厚街--学习资源--网站链接--获取主列表数据（分页查询） */
  public queryPageList(
    query: {
      pageIndex: number,
      pageSize: number,
      keyWord?: string
    }
  ) {
    return this.post('/studyAndTrain/studyResources/webSideLinkManage/queryPageList', query)
  }
}

export const localityService = new LocalityService()