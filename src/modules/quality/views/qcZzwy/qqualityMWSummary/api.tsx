import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

// 季度质量管理工作总结
export default class Api extends BaseApiService{

  // 分页查询报告
  public getPage(obj?: any) {
    return this.post(`/qcReport/getPage`, obj)
  }

  // 创建报告
	public createQcReport(obj: any) {
		return this.post(`/qcReport/createQcReport`, obj);
	}

	// 导出年度汇总表
  public async exportSumYearTable(obj: any) {
    return this.post(`/goodEvent/manageIndicatorsDynamic/exportGatherByDeptCodeAndYear`, obj,
      {
        responseType: "blob"
      }
    );
  }

  

}
export const api = new Api();