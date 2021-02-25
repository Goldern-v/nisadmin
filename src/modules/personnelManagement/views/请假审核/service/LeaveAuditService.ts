import BaseApiService from "src/services/api/BaseApiService"

class LeaveAuditService extends BaseApiService {
  /**请假管理-请假审核-获取待我审批的请假流程 */
  public queryToAuditPageList(query: {
    queryBeginTime: string, //查询开始时间
    queryEndTime: string, //查询结束时间
    deptCode: string, //科室编号
    typeCode: string, //请假类型代码
    keyWord: string, //搜索关键字
    pageIndex: number, //第几页
    pageSize: number, //每页大小
    auditResult: number, //审核状态（1通过；-1驳回）
  }) {
    return this.post('/leaveManage/queryToAuditPageList', query)
  }

  /**请假管理-请假审核-获取我已审批的请假流程 */
  public queryAuditedPageList(query: {
    queryBeginTime: string, //查询开始时间
    queryEndTime: string, //查询结束时间
    deptCode: string, //科室编号
    typeCode: string, //请假类型代码
    keyWord: string, //搜索关键字
    pageIndex: number, //第几页
    pageSize: number, //每页大小
  }) {
    return this.post('/leaveManage/queryAuditedPageList', query)
  }

  /**请假管理-获取所有的请假类型 */
  public getAllLeaveTypes() {
    return this.get('/leaveManage/getAllLeaveTypes')
  }

  /**请假管理-请假申请-根据id获取请假单完整信息(用于修改) */
  public getCompleteInfo(id: number) {
    return this.post('/leaveManage/getCompleteInfo', { id })
  }

  /**请假管理-请假审核-获取请假单的流程任务历史(审核历史) */
  public getFlowTaskHisById(id: number) {
    return this.post('/leaveManage/getFlowTaskHisById', { id })
  }

  /**请假管理-请假审核-批量审批请假申请信息 */
  public batchAuditLeaveApplicationInfo(params: {
    taskIdList: string[], //审核任务id列表
    auditResult: number, //审核结果（1审核通过；-1审核拒绝）
    auditRemark: string, //备注
  }) {
    return this.post('/leaveManage/batchAuditLeaveApplicationInfo', params)
  }
}

export const leaveAuditService = new LeaveAuditService()