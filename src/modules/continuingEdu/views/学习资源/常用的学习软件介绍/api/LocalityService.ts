import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 296.厚街--学习资源--常用的学习软件--删除记录 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/frequentlyUseLearnSoftwareManage/deleteById', qs.stringify({ id }))
  }

  /** 295.厚街--学习资源--常用的学习软件--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      softwareName: string, //软件名称
      briefIntroduction: string, //简介
      detailContent: string, //内容（富文本内容）
      officialWebsiteUrl: string, //官方网址/下载地址
      status: 0 | 2, //状态（0编辑中；2发布）
      attachmentList: any[] //附件列表
    }
  ) {
    return this.post('/studyAndTrain/studyResources/frequentlyUseLearnSoftwareManage/addOrUpdate', params)
  }

  /** 
   * 294.厚街--学习资源--常用的学习软件--传附件 
   * /file/uploadAttachment/lat_sr_frequentlyuse_learnsoftware
  */

  /** 287.厚街--学习资源--常用的学习软件介绍--获取完整信息（用于修改） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/getCompleteInfo', qs.stringify({ id }))
  }

  /** 286.厚街--学习资源--常用的学习软件介绍--获取详情内容（富文本内容） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/eBNPractiseEvidenceManage/getDetailContent', qs.stringify({ id }))
  }

  /** 285.厚街--学习资源--常用的学习软件介绍--获取主列表数据（分页查询） */
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