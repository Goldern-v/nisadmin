import BaseApiService from "src/services/api/BaseApiService";
// import qs from 'qs'
import { starRatingReportEditModel } from "./../model/StarRatingReportEditModel";
import { appStore } from "src/stores";

const hospitalPath: string =
  appStore.hisMatch({
    map: {
      nys: 'schNightTotalContentNys',
      dghl: 'schNightTotalContentHl',
      default: 'schNightTotalContent',
    }
  })


export interface ListQuery {
  wardCode: string;
  year: string;
  month: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export default class StarRatingReportService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post("/schNightTotalModel/getList", query);
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post("/schNightTotalModel/saveOrUpdate", query);
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post(`/${hospitalPath}/getList`, query);
  }

  /**修改报告 */
  public editReport(query: any) {
    return this.post(`/${hospitalPath}/saveOrUpdate`, query);
  }

  /**更新夜班费上报表 */
  public update(query: any) {
    return this.post("/qcAnalysis/sr/update/workScheduleList", query);
  }

  /**删除 */
  public delete(query: any) {
    return this.get(`/schNightTotalModel/delete/${query.id}`);
  }

  /**提交报告 */
  public publish(query: any) {
    return this.post("/qcAnalysis/sr/publish", query);
  }

  /**撤销报告 */
  public cancelPublish(query: any) {
    return this.post("/qcAnalysis/sr/cancelPublish", query);
  }

  /** 更新报告名称 */
  public updateReportName(reportName?: any) {
    let { year, month, wardCode } = starRatingReportEditModel.report;
    let query = {
      year,
      month,
      wardCode,
      reportName
    };
    return this.post("/qcAnalysis/sr/update/report", query);
  }

  /** 更新夜班费上报表 */
  public updateStarRattingList(itemList: any[]) {
    let { year, month, wardCode } = starRatingReportEditModel.report;
    let query = {
      year,
      month,
      wardCode,
      itemList
    };

    return this.post("/qcAnalysis/sr/update/workScheduleList", query);
  }

  /**导出 */
  public export(query: any) {
    return this.post(`/${hospitalPath}/excel`, query, {
      responseType: "blob"
    });
  }

  /**获取标准 */
  public getSchNightStandard(deptCode: any) {
    return this.post("/schNightStandard/get", {
      deptCode
    });
  }

  /**修改标准 */
  public saveOrUpdateSchNightStandard(deptCode: any, standard: any) {
    return this.post("/schNightStandard/saveOrUpdate", {
      deptCode,
      standard
    });
  }
}

export const starRatingReportService = new StarRatingReportService();
