import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 301.厚街--学习资源--管理工具学习集合--保存新增/修改信息 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/managementToolsManage/deleteById', qs.stringify({ id }))
  }

  /** 301.厚街--学习资源--管理工具学习集合--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      toolName: string, //工具名称
      briefIntroduction: string, //简介
      detailContent: string, //内容（富文本内容）
      status: 0 | 2, //状态（0编辑中；2发布）
      attachmentList: any[] //附件列表
    }
  ) {
    return this.post('/studyAndTrain/studyResources/managementToolsManage/addOrUpdate', params)
  }

  /** 
   * 300.厚街--学习资源--管理工具学习集合--上传附件
   * /file/uploadAttachment/lat_sr_management_tools
  */

  /** 299.厚街--学习资源--管理工具学习集合--获取完整信息（用于修改）） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/managementToolsManage/getCompleteInfo', qs.stringify({ id }))
  }

  /** 298.厚街--学习资源--管理工具学习集合--获取详情内容（富文本内容） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/managementToolsManage/getDetailContent', qs.stringify({ id }))
  }

  /** 297.厚街--学习资源--管理工具学习集合--获取主列表数据（分页查询）） */
  public queryPageList(
    query: {
      pageIndex: number,
      pageSize: number,
      keyWord: string,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/managementToolsManage/queryPageList', query)
  }
}

export const localityService = new LocalityService()