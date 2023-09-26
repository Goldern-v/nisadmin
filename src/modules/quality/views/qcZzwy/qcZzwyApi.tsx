import BaseApiService from "src/services/api/BaseApiService";
import qs from "qs";

export default class QcZzwyApi extends BaseApiService {

    // 护理部质量检查汇总表
    public async getInspectionSummary(obj: any) {
        return this.post(`/qcItem/getInspectionSummary`, obj);
    }

    // 质控表项目问题分析汇总-获取模板列表
    public async getTemplateList(qcLevel: any) {
        return this.get(`/qcTemplateManage/templateList/${qcLevel}`);
    }

    // 质控表项目问题分析汇总
    public async getRectificationdeptSummary(obj: any) {
        return this.get(`/qcItem/getRectificationdeptSummary?${qs.stringify(obj)}`);
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
        return this.get(`/goodEvent/qualityReportDynamic/getReportList?${qs.stringify(obj)}`,)
    }

    /**质控检查反馈整改单汇总**/

    public getRectificationSummary(params: any) {
        return this.get(`/qcItem/getRectificationSummary?wardCode=${params.wardCode}&beginDate=${params.beginDate}&endDate=${params.endDate}&qcLevel=${params.qcLevel}`)
    }

    /**编辑整改措施和追踪评价**/
    public saveOrUpdateContent(params: any) {
        return this.post('/qcItem/rectificationSummary/saveOrUpdateContent', params)
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
    public saveQcReport(params: number) {
        return this.post(`/qcReport/saveQcReport`, params)
    }

    /**保存报告**/
    public upload(obj: any) {
        const trancePostData = new FormData();
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                trancePostData.append(key, obj[key]);
            }
        }
        // return this.post(`/file/uploadNurse`, trancePostData);
        return this.post(`/qcReport/upload`, trancePostData)
    }

    /**季度质量分析报告（一级、二级项目内容）
     * @param params.beginDate {string}
     * @param params.endDate {string}
     * @param params.wardCode {string}
     * @param params.qcCode {string}
     * @param params.qcItemLevel {string}
     *
     * **/
    public getQcItemDataList(params: any) {
        return this.post(`/qcReport/getQcItemDataList`, params)
    }

    /***删除
     *
     * {
     *     "reportId": "string",
     * }
     * **/
    public qcItemDeleteQcReport(params: any) {
        return this.post(`/qcReport/deleteQcReport`, params)
    }

    /**二级指标的上个月的数据与之比对
     * {
     *     "wardCode": "string",
     *     "startDate": "string",
     *     "endDate": "string",
     *     "reportLevel": "string",
     *     "qcItemCodeList": [
     *         "string"
     *     ]
     * }
     *
     **/

    /**根据报告表Code找到报告表下的二级项目 */
    public getReportTwoItem(qcCode: any) {
        return this.get(`/qcReport/getReportTwoItem/${qcCode}`)
    }

    /**二级指标的上个月的数据与之比对 */
    public getRatioByItemCode(params: any) {
        return this.post(`/qcReport/getRatioByItemCode`, params)
    }
   /** 护理部质量检查汇总表  导出
    *  "wardCode": "全院",
    *  "beginDate": "2023-01-20",
    *  "endDate": "2023-12-31",
    *  "pageIndex": 1,
    *  "pageSize": 20,
    *  "level": "1"
    * **/
   public inspectionSummary(params: any) {
       return this.post(`/qcItem/inspectionSummary/export`, params)
   }
}
export const qcZzwyApi = new QcZzwyApi();