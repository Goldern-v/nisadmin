import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class QcZzwyApi extends BaseApiService{


  // 护理部质量检查汇总表
	public async getInspectionSummary(obj: any) {
		return this.post(`/qcItem/getInspectionSummary`,obj);
	}





	// 导出年度汇总表
public async exportSumYearTable(obj: any) {
	return this.post(`/goodEvent/manageIndicatorsDynamic/exportGatherByDeptCodeAndYear`, obj,
		{
			responseType: "blob"
		}
	);
}
// 护理质量管理指标  end

// 获取分析报告列表
public getTableDataWhole(obj?: any) {
	return this.get(`/goodEvent/qualityReportDynamic/getReportList?${qs.stringify(obj)}`, )
}

}
export const qcZzwyApi = new QcZzwyApi();