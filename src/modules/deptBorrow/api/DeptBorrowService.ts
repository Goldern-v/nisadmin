import BaseApiService from 'src/services/api/BaseApiService'

export default class DeptBorrowService extends BaseApiService {
  //获取全部科室单元
  public async getDeptList() {
    return this.get(`/user/nursingUnit/all`);
  }
  //借出列表
  public async getBorrowOut(params: any) {
    return this.post(`/schDeptTransfer/getByDeptCodeTransferTo`, params)
  }
  //借入列表
  public async getBorrowIn(params: any) {
    return this.post(`/schDeptTransfer/getByDeptCodeTransferFrom`, params)
  }
  //新增或修改
  public async setBorrow(params: any) {
    return this.post(`/schDeptTransfer/saveOrUpdate`, params)
  }
  //删除
  public async deleteBorrow(id: string) {
    return this.get(`/schDeptTransfer/delete/${id}`)
  }
  //审核通过
  public async allowBorrow(params: any) {
    return this.post(`/schDeptTransfer/success`, params)
  }
  //审核不通过
  public async refuseBorrow(params: any) {
    return this.post(`/schDeptTransfer/fail`, params)
  }
  //获取当前科室护士列表
  public async getDeptEmpList(deptCode: string) {
    return this.get(`/schDeptTransfer/getAllOnDutyUser/${deptCode}`)
  }
}