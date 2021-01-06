import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 290.厚街--学习资源--循证护理实践证据集合--删除记录 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/contingencyPlanManage/deleteById', qs.stringify({ id }))
  }

  /** 307.厚街--学习资源--应急预案学习--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      planName: string,
      briefIntroduction: string,
      deptCode: string,
      detailContent: string,
      articleUrl: string,
      status: 0 | 2,
      attachmentList: any[]
    }
  ) {
    return this.post('/studyAndTrain/studyResources/contingencyPlanManage/addOrUpdate', params)
  }

  /**
   * 306.厚街--学习资源--应急预案学习--上传附件
   * /file/uploadAttachment/lat_sr_contingency_plan
   */

  /** 305.厚街--学习资源--应急预案学习--获取完整信息（用于修改） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/contingencyPlanManage/getCompleteInfo', qs.stringify({ id }))
  }

  /** 304.厚街--学习资源--应急预案学习--获取详情内容（富文本内容） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/contingencyPlanManage/getDetailContent', qs.stringify({ id }))
  }

  /** 303.厚街--学习资源--应急预案学习--获取主列表数据（分页查询） */
  public queryPageList(
    query: {
      pageIndex: number,
      pageSize: number,
      keyWord: string,
      deptcode: string | number,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/contingencyPlanManage/queryPageList', query)
  }
}

export const localityService = new LocalityService()