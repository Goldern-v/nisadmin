import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 290.厚街--学习资源--循证护理实践证据集合--删除记录 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/deleteById', qs.stringify({ id }))
  }

  /** 289.厚街--学习资源--循证护理实践证据集合--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      title: string,
      detailContent: string,
      articleUrl: string,
      status: 0 | 1,
      attachmentList: any[]
    }
  ) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/addOrUpdate', params)
  }

  /** 
   * 288.厚街--学习资源--循证护理实践证据集合--上传附件 
   * /file/uploadAttachment/lat_ebn_practise_evidence
  */

  /** 287.厚街--学习资源--循证护理实践证据集合--获取完整信息（用于修改） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/getCompleteInfo', qs.stringify({ id }))
  }

  /** 286.厚街--学习资源--循证护理实践证据集合--获取详情内容（富文本内容） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/getDetailContent', qs.stringify({ id }))
  }

  /** 285.厚街--学习资源--循证护理实践证据集合--获取主列表数据（分页查询） */
  public queryPageList(
    query: {
      pageIndex: number,
      pageSize: number,
      keyWord: string,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/queryPageList', query)
  }
}

export const localityService = new LocalityService()