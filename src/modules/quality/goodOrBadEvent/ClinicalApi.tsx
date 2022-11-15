import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";


export default class ClinicalApi extends BaseApiService {


	// 检查用户名和密码
	public async checkUser(query: any) {
		return this.post(`/form/checkUser`, query);
	}

	//获取医院科室信息
	public async getnursingAll() {
		return this.get(`/user/nursingUnit`);
	}
	// 获取月度汇总表
	public async getMonthTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/getMonthlyForDeptCode?${qs.stringify(obj)}`);
	}
	// 保存月度汇总表
	public async saveMonthTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/saveMonthlyDto`,obj);
	}

	// 月度汇总表导出
	public async exportMonthTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/exportMonthlyForDeptCode?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}

	// 获取年度汇总表
	public async getYearTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/getYearlyForDeptCode?${qs.stringify(obj)}`);
	}
	// 导出年度汇总表
	public async exportYearTable(obj: any) {
		return this.get(`/goodEvent/clinicalIndicators/exportYearlyForDeptCode?${qs.stringify(obj)}`, {
			responseType: "blob"
		});
	}

	// 全院季度
	// 获取全院季度汇总表
	public async getQuarterTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/getQuarterForAll`,obj);
	}
	// 导出年度汇总表
	public async exportQuarterTable(obj: any) {
		return this.post(`/goodEvent/clinicalIndicators/exportQuarterForAll`,obj, {
			responseType: "blob"
		});
	}

	// 保存质量管理月度汇总
  public saveTableData(obj?: any) {
    return this.post(`/goodEvent/manageIndicators/saveDetail`, obj)
  }
  // 获取质量管理月度汇总
  public getTableData(obj?: any) {
    return this.post(`/goodEvent/manageIndicators/getByDeptCodeAndYearMonth?${qs.stringify(obj)}`)
  }
	// 获取质量管理年度汇总
	public getTableDataYear(obj?: any) {
    return this.post(`/goodEvent/manageIndicators/getGatherByDeptCodeAndYear?${qs.stringify(obj)}`, )
  }
		// 导出年度汇总表
		public async exportSumYearTable(obj: any) {
			return this.post(`/goodEvent/manageIndicators/exportGatherByDeptCodeAndYear`, obj,
				{
					responseType: "blob"
				}
			);
		}

		// 获取质量管理年度汇总
	public getTableDataWhole(obj?: any) {
    return this.get(`/goodEvent/qualityReport/getReportList?${qs.stringify(obj)}`, )
  }
	public getTableDataWholeAysi(obj?: any) {
    return this.get(`/goodEvent/qualityReport/getReportAll?${qs.stringify(obj)}`, )
  }
	// 全院 创建质量报告
	public async createNewReport(obj: any) {
		return this.post(`/goodEvent/qualityReport/createReport`,obj);
	}
	// 全院 保存质量报告接口
	public async saveNewReport(obj: any) {
		return this.post(`/goodEvent/qualityReport/saveReportContent`,obj);
	}
	// 根据主表Id获取信息
	public getReportById(obj?: any) {
    return this.get(`/goodEvent/qualityReport/getReportDetail?${qs.stringify(obj)}`, )
  }
	// 根据MasterId删除汇总报告
	public async delReportById(obj: any) {
		return this.post(`/goodEvent/qualityReport/deleteReport?${qs.stringify(obj)}`);
	}

	//-导入教学计划课件
	public async exportSheetTemplate(obj: any) {
		return this.post(`/studyAndTrain/teachPlanAdvancedStu/saveOrUpdateYaXin`, obj);
	}
	
}
export const clinicalApi = new ClinicalApi();