import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";

class LocalityService extends BaseApiService {
  /** 301.厚街--学习资源--管理工具学习集合--保存新增/修改信息 */
  public deleteById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/deleteById', qs.stringify({ id }))
  }

  /** 325.厚街--学习资源--典型案例库--保存新增修改信息 */
  public addOrUpdate(
    params: {
      id?: string | number,
      actionType: 0 | 1,
      [p: string]: any
    }
  ) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/addOrUpdate', params)
  }

  /** 321.厚街--学习资源--典型案例库--获取主列表数据（分页查询） */
  public queryPageList(
    query: {
      medicalSubject: string, //科室（专科），取值 ：内科、外科、儿科、妇产科、综合病例
      collectTimeBegin: string, //搜集时间-开始
      collectTimeEnd: string, //搜集时间-结束
      pageIndex: number,
      pageSize: number,
      keyWord: string,
    }
  ) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/queryPageList', query)
  }

  /** 331.厚街--学习资源--典型案例库--导出表单 */
  public exportById(id: string | number) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/exportById', qs.stringify({ id }))
  }

  /** 330.厚街--学习资源--典型案例库--审核表单 */
  public auditForm(params: {
    taskId: string, //任务id
    auditResult: 1 | -1, //审核结果（1审核通过；-1退回）
    auditRemark: string //审核意见
  }) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/auditForm', params)
  }

  /** 329.厚街--学习资源--典型案例库--获取典型案例库申请表单的流程任务历史(审核历史) */
  public getFlowTaskHisByCetpId(formId: string | number) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/getFlowTaskHisByCetpId', qs.stringify({ formId }))
  }

  /** 328.厚街--学习资源--典型案例库--获取我已审核任务列表 */
  public queryAuditedPageList(query: {
    submitTimeBegin: string, //提交日期-开始
    submitTimeEnd: string, //提交日期-结束 
    medicalSubject: string, //科室（专科）取值：内科、外科、儿科、妇产科、综合病例
    keyWord: string, //搜索关键字
  }) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/queryAuditedPageList', query)
  }

  /** 327.厚街--学习资源--典型案例库--获取待我审核任务列表 */
  public queryToAuditPageList(query: {
    submitTimeBegin: string, //提交日期-开始
    submitTimeEnd: string, //提交日期-结束 
    medicalSubject: string, //科室（专科）取值：内科、外科、儿科、妇产科、综合病例
    keyWord: string, //搜索关键字
  }) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/queryToAuditPageList', query)
  }

  /** 324.厚街--学习资源--典型案例库--获取字段简要说明（名称、类型、取值说明等） */
  public queryFieldRemarks() {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/queryFieldRemarks')
  }

  /** 322.厚街--学习资源--典型案例库--获取完整信息（用于修改） */
  public queryFormContent(id: string | number) {
    return this.post('/studyAndTrain/studyResources/typicalCaseLibraryManage/queryFormContent', qs.stringify({ id }))
  }
}

export const localityService = new LocalityService()