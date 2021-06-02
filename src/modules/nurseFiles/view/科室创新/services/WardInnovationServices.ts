import BaseApiService from "src/services/api/BaseApiService";

export default class WardInnovationServices extends BaseApiService {

  /** 根据条件获取科室创新列表 */
  public getInnovationDeptList(params: {
    deptName: string,
    innovationTimeStart: string,
    innovationTimeEnd: string,
    regUnit: string,
    member: string,
    pageIndex: number,
    pageSize: number,
  }) {
    return this.post('/innovationDept/getInnovationDeptList', params)
  }

  /** 根据工号获取科室创新列表 */
  public getInnovationDeptListByEmpNo(params: {
    empNo: string,
    pageSize: number,
    pageIndex: number,
  }) {
    return this.post('/innovationDept/getInnovationDeptListByEmpNo', params)
  }
}

export const wardInnovationServices = new WardInnovationServices()