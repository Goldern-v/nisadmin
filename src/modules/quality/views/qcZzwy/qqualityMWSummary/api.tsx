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

  // 获取模板列表
  public templateList() {
		return this.get(`/qcTemplateManage/templateList/1`);
	}

  // /api/qcReport/getMasterEvalRate 保存项目合格率
  public getMasterEvalRate(obj: any) {
		return this.post(`/qcReport/getMasterEvalRate`, obj);
	}

  // 保存报告
  public saveQcReport(obj: any) {
		return this.post(`/qcReport/saveQcReport`, obj);
	}

  // 查看
  public getQcReport(id: any) {
		return this.get(`/qcReport/getQcReport/${id}`);
	}

  // 删除报告
  public deleteQcReport(obj: any) {
		return this.post(`/qcReport/deleteQcReport`, obj);
	}

  // 修改报告
  public updateQcReport(obj: any) {
		return this.post(`/qcReport/updateQcReport`, obj);
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