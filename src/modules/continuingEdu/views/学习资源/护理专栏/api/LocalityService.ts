import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 320.厚街--学习资源--护理专栏--删除记录 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/nursingSpecialColumn/deleteById', qs.stringify({ id }))
  }

  /** 319.厚街--学习资源--护理专栏--保存新增/修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      type: string, // 类型(1护理教育；2护理科研；3护理动态；4优质护理专栏；5.健康教育；6团队风采；7护理前言；8质量安全；9中医护理；10成果展示；11循证护理)
      name: string, //名称
      briefIntroduction: string, //简介
      detailContent: string, //内容（富文本内容）
      status: 0 | 2, //状态（0编辑中；2发布）
      attachmentList: any[] //附件列表
    }
  ) {
    return this.post('/studyAndTrain/studyResources/nursingSpecialColumn/addOrUpdate', params)
  }

  /** 
   * 318.厚街--学习资源--护理专栏--上传附件 
   * /file/uploadAttachment/lat_sr_nursing_specialcolumn
  */

  /** 317.厚街--学习资源--护理专栏--获取完整信息（用于修改） */
  public getCompleteInfo(id: string | number) {
    return this.post('/studyAndTrain/studyResources/nursingSpecialColumn/getCompleteInfo', qs.stringify({ id }))
  }

  /** 316.厚街--学习资源--护理专栏--获取详情内容（富文本内容） */
  public getDetailContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/nursingSpecialColumn/getDetailContent', qs.stringify({ id }))
  }

  /** 315.厚街--学习资源--护理专栏--获取主列表数据（分页查询） */
  public queryPageList(
    query: {
      type: string, // 类型(1护理教育；2护理科研；3护理动态；4优质护理专栏；5.健康教育；6团队风采；7护理前言；8质量安全；9中医护理；10成果展示；11循证护理)
      pageIndex: number,
      pageSize: number,
      keyWord: string,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/nursingSpecialColumn/queryPageList', query)
  }
}

export const localityService = new LocalityService()