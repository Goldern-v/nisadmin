import BaseApiService from "src/services/api/BaseApiService";

export default class qcApi extends BaseApiService {

    // 护理部质量检查汇总表
    public async getQcReportDetail(obj: any) {
        return this.post(`/qcReport/getQcReportDetail`, obj);
    }

    /**获取分页报告**/
    public qcReportGetPage(params: any) {
        return this.post('/qcReport/getPage', params)
    }

    /**创建分析报告**/
    public createQcReport(params: any) {
        return this.post('/qcReport/createQcReport', params)
    }

    /**删除报告**/
    public deleteQcReport(params: any) {
        return this.post('/qcReport/deleteQcReport', params)
    }

    /**修改报告**/
    public updateQcReport(params: any) {
        return this.post('/qcReport/updateQcReport', params)
    }

    /**查看报告**/
    public getQcReportById(reportId: number) {
        return this.get(`/qcReport/getQcReport/${reportId}`)
    }

    /**保存报告**/
    public saveQcReport(params: any) {
        return this.post(`/qcReport/saveQcReport`, params)
    }
  
}
export const qcYtllApi = new qcApi();