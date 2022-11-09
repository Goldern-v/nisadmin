import BaseApiService from "src/services/api/BaseApiService";

// 资质准入
class QualificationAdmittanceApiServices extends BaseApiService {
  private readonly basePath: string = `/audit/settings/`;
  // 审核管理模块
  /**
   * 获取审核管理模块
   * @returns
   */
  public getModuleByParent() {
    return Promise.resolve(this.get(`${this.basePath}getModuleByParent?parentModule=studyLearn`)).then(
      this.getResponseData
    );
  }
  /**
   * 根据模块获取父级列表
   * @param parentModule id
   * @returns
   */
  public getTreeByParent(parentModule: string) {
    return Promise.resolve(
      this.get(`${this.basePath}getTreeByParent?parentModule=${parentModule}`)
    ).then(this.getResponseData);
  }
  /**
   * 根据模块名获取可设置的模块流程化
   * @param moduleCode
   * @returns
   */
  public getDetailByModuleCode(moduleCode: string) {
    return Promise.resolve(
      this.get(`${this.basePath}getDetailByModuleCode?moduleCode=${moduleCode}`)
    ).then(this.getResponseData);
  }
}
const qualificationAdmittanceApiServices = new QualificationAdmittanceApiServices();
export default qualificationAdmittanceApiServices;
