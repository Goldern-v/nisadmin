import { Obj } from "./../../../libs/types";
import BaseApiService from "src/services/api/BaseApiService";
import moment from "moment";
import qs from "qs";

/**护长/二值护士夜查房 by江门妇幼 */
class Api extends BaseApiService {
  /**
   * 改变前缀
   * @param type
   * @returns
   */
  getPrefix(type: string) {
    const list = ["", "/nurseRoundsRecord/", "/nurseSecondRoundsRecord/"];
    return list[type] || list[1];
  }
  /** 获取列表 */
  getList(data: Obj) {
    const { type, ...other } = data;
    const params = {
      ...other,
      beginDate: data.beginDate
        ? moment(data.beginDate).format("YYYY-MM-DD HH:mm")
        : "",
      endDate: data.endDate
        ? moment(data.endDate).format("YYYY-MM-DD HH:mm")
        : "",
    };
    return this.get(`${this.getPrefix(type)}list?${qs.stringify(params)}`);
  }

  /** 获取详情 */
  getItem(id: string, type: string) {
    return this.get(`${this.getPrefix(type)}pcDetail?id=${id}`);
  }

  /** 保存 */
  saveItem(params: Object, type: string) {
    return this.post(`${this.getPrefix(type)}pcHandleNode`, params);
  }
  
  /** 审核 */
  auditItem(params: Object) {
    return this.post(`/form/searchRoom/master/handleNode`, params);
  }
  /**导出 */
  exportTable(id: string, type: string) {
    return this.get(`${this.getPrefix(type)}pcDetail/export?id=${id}`, {
      responseType: "blob",
    });
  }
  /*查房记录列表导出*/
  getPageByUserDeptExport(params: any) {
    return this.post(
      `/form/searchRoom/master/getPageByUserDeptExport`,
      params,
      {
        responseType: "blob",
      }
    );
  }
  /**表格列表查询 */
  getDailySummaryList(data: Obj) {
    const params = {
      ...data,
      beginTime: data.beginTime
        ? moment(data.beginTime).format("YYYY-MM-DD")
        : "",
      endTime: data.endTime ? moment(data.endTime).format("YYYY-MM-DD") : "",
    };
    return this.get(`/roundsSummary/dailySummaryList?${qs.stringify(params)}`);
  }
  /**二值护士评分汇总/夜值班受表扬的护士名单 */
  /**获取二值护士评分汇总/夜值班受表扬的护士名单的地址 */
  getSummaryPrefix(type?: any) {
    const arr = [
      null,
      {
        list: '/roundsSummary/secondAnnuallySummary',
        export: '/roundsSummary/secondAnnuallySummary/export',
      },
      {
        list: '/roundsExcellentNurse/list',
        export: '/roundsExcellentNurse/export',
      },
    ];
    return arr[type] || arr[1];
  }
  /**查询 */
  getSummary(val: any) {
    const year = val.format("YYYY");
    return this.get(
      `${this.getSummaryPrefix()?.list}?${qs.stringify({ year })}`
    );
  }
  /**导出 */
  exportSummary(val: any) {
    const year = val.format("YYYY");
    return this.get(
      `${this.getSummaryPrefix()?.export}?${qs.stringify({ year })}`,
      {
        responseType: "blob",
      }
    );
  }

  /**夜查房月度汇总
   * 详情
   */
 monthlySummaryDetails(params: Obj) {
   return this.get(`/roundsSummary/monthlySummaryDetails?${qs.stringify(params)}`)
  }
  /**夜查房月度汇总
   * 导出
   */
 monthlySummaryDetailsExport(params: Obj) {
   return this.get(`/roundsSummary/monthlySummaryDetails/export?${qs.stringify(params)}`, {
    responseType: 'blob'
   })
  }
  /**夜查房月度汇总
   * 更新科室存在问题记录落实状态
   */
  monthlySummaryDetailsUpdate(params: Obj[]) {
    return this.post(`/roundsProblem/saveTrackStatus`, params)
  }

  /**每日夜查房汇总
   * 详情 */
  dailySummaryDetails(id: string) {
    return this.get(`/roundsSummary/dailySummaryDetails?summaryCode=${id}`)
  }
  /**每日夜查房汇总
   * 导出 */
  dailySummaryExport(id: string) {
    return this.get(`/roundsSummary/dailySummaryDetails/export?summaryCode=${id}`, {
      responseType: 'blob'
    })
  }
  
  /**每日夜查房汇总
   * 审核节点
   */
  dailySummaryHandleNode(params: Obj) {
    return this.post(`/roundsSummary/handleNode`, params)
  }
  /**每日夜查房汇总
   * 节点撤回
   */
  dailySummaryCancelCommit(summaryId: string) {
    return this.post(`/roundsSummary/cancelCommit?${qs.stringify({ summaryId })}`)
  }
  /**每日夜查房汇总
   * 暂存
   */
  stagingDailySummary(params: Obj) {
    return this.post(`/roundsSummary/stagingDailySummary`, params)
  }
}

export default new Api();
