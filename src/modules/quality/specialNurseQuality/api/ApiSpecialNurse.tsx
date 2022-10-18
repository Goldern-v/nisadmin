import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";
export default class ApiSpecialNurse extends BaseApiService{

	public async getSpecialDeptList(obj: any) {
		return this.get(`/goodEvent/dynamicDeptConfig/getDeptListByType?${qs.stringify(obj)}`);
	}
	// 临床护理质量 start
  // 获取月度汇总表
	public async getMonthTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicatorsDynamic/getMonthlyForDeptCode?${qs.stringify(obj)}`);
	}
  // 保存月度汇总表
	public async saveMonthTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicatorsDynamic/saveMonthlyDto`,obj);
	}
// 月度汇总表导出
public async exportMonthTable(obj: any) {
  return this.get(`/goodEvent/clinicalIndicatorsDynamic/exportMonthlyForDeptCode?${qs.stringify(obj)}`, {
    responseType: "blob"
  });
}

// 获取年度汇总表
public async getYearTable(obj: any) {
  return this.get(`/goodEvent/clinicalIndicatorsDynamic/getYearlyForDeptCode?${qs.stringify(obj)}`);
}
// 导出年度汇总表
public async exportYearTable(obj: any) {
  return this.get(`/goodEvent/clinicalIndicatorsDynamic/exportYearlyForDeptCode?${qs.stringify(obj)}`, {
    responseType: "blob"
  });
}
// 临床护理质量 end

// 护理质量管理指标  start
// 保存质量管理月度汇总
public saveTableData(obj?: any) {
	return this.post(`/goodEvent/manageIndicatorsDynamic/saveDetail`, obj)
}
// 获取质量管理月度汇总 根据科室和年月获取
public getTableData(obj?: any) {
	return this.post(`/goodEvent/manageIndicatorsDynamic/getByDeptCodeAndYearMonth?${qs.stringify(obj)}`)
}
// 获取质量管理年度汇总
public getTableDataYear(obj?: any) {
	return this.post(`/goodEvent/manageIndicatorsDynamic/getGatherByDeptCodeAndYear?${qs.stringify(obj)}`, )
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

	// 全院 创建质量报告
	public async createNewReport(obj: any) {
		return this.post(`/goodEvent/qualityReportDynamic/createReport`,obj);
	}
	// 全院 保存质量报告接口
	public async saveNewReport(obj: any) {
		return this.post(`/goodEvent/qualityReportDynamic/saveReportContent`,obj);
	}
	// 根据主表Id获取信息
	public getReportById(obj?: any) {
    return this.get(`/goodEvent/qualityReportDynamic/getReportDetail?${qs.stringify(obj)}`, )
  }
	// 根据MasterId删除汇总报告
	public async delReportById(obj: any) {
		return this.post(`/goodEvent/qualityReportDynamic/deleteReport?${qs.stringify(obj)}`);
	}
}
export const apiSpecialNurse = new ApiSpecialNurse();