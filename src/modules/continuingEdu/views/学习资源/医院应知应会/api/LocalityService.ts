import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 314.厚街--学习资源--医院应知应会--删除记录 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/hospitalShouldKnowManage/deleteById', qs.stringify({ id }))
  }

  /** 313.厚街--学习资源--医院应知应会--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      type: string, // 类型(1院感知识；2消防知识；3核心制度；4药学知识；5.十大安全目标)
      name: string, //名称
      briefIntroduction: string, //简介
      detailContent: string, //内容（富文本内容）
      status: 0 | 2, //状态（0编辑中；2发布）
      attachmentList: any[] //附件列表
    }
  ) {
    return this.post('/studyAndTrain/studyResources/hospitalShouldKnowManage/addOrUpdate', params)
  }

  /** 
   * 312.厚街--学习资源--医院应知应会--上传附件 
   * /file/uploadAttachment/lat_sr_hospital_shouldknow
  */

  /** 311.厚街--学习资源--应急预案学习--获取完整信息（用于修改） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/hospitalShouldKnowManage/getCompleteInfo', qs.stringify({ id }))
  }

  /** 310.厚街--学习资源--医院应知应会--获取详情内容（富文本内容）） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/hospitalShouldKnowManage/getDetailContent', qs.stringify({ id }))
  }

  /** 309.厚街--学习资源--医院应知应会--获取主列表数据（分页查询）） */
  public queryPageList(
    query: {
      type: string, //类型(1院感知识；2消防知识；3核心制度；4药学知识；5.十大安全目标)
      pageIndex: number,
      pageSize: number,
      keyWord: string,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/hospitalShouldKnowManage/queryPageList', query)
  }
}

export const localityService = new LocalityService()