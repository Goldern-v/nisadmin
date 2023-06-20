import BaseApiService from "src/services/api/BaseApiService";
import { starRatingReportEditModel } from "./../model/StarRatingReportEditModel";
import { appStore } from "src/stores";
import { Obj } from "src/libs/types";

const hospitalPath: string =
  appStore.hisMatch({
    map: {
      nys: 'schNightTotalContentNys',
      'dghl,fqfybjy,sdlj,nfsd,qzde': 'schNightTotalContentHl',
      //20210926暂时隐藏
      gzsrm: 'nightTotalContentSgy',
      default: 'schNightTotalContent',
    },
    vague: true,
  })

//查询删除
const hospitalPathGetList: string =
  appStore.hisMatch({
    map: {
      //20210926暂时隐藏
      gzsrm: 'schNightTotalModelSgy',
      default: 'schNightTotalModel',
    },
    vague: true,
  })


export interface ListQuery {
  wardCode: string;
  year: string;
  month: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

export interface ISgyParmas {
  deptCode?: string;//科室编码
  year?: string;
  month?: string;
  approvalStatus?: string;//测试
  pageIndex: number | 1;
  pageSize: number | 20;
}


export default class StarRatingReportService extends BaseApiService {
  /**列表接口 */
  public getPage(query: ListQuery) {
    return this.post(`/${hospitalPathGetList}/getList`, query);
  }

  /**新建编辑 */
  public createReport(query: any) {
    return this.post(`/${hospitalPathGetList}/saveOrUpdate`, query);
  }

  /**获取报告 */
  public getReport(query: any) {
    return this.post(`/${hospitalPath}/getList`, query);
  }

  /**福清妇幼获取报告 */
  public getReportFQ(query: any) {
    return this.post(`/schNightTotalContentFQ/getList`, query);
  }
  public getReportLJ(query: any) {
    return this.post(`/schNightTotalContentLJ/getList`, query);
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
    // gzsrm: 'schNightTotalModelSgy',
    // default: 'schNightTotalModel',
    if (hospitalPathGetList === 'schNightTotalModelSgy') {
      return this.post(`/schNightTotalModelSgy/delete/${query.id}`);
    } else {
      return this.get(`/schNightTotalModel/delete/${query.id}`);
    }
    // return this.get(`/${hospitalPathGetList}/delete/${query.id}`);
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
  /**福清妇幼导出 */
  public exportFQ(query: any) {
    return this.post(`/schNightTotalContentFQ/excel`, query, {
      responseType: "blob"
    });
  }
  /**福清妇幼导出 */
  public exportLJ(query: any) {
    return this.post(`/schNightTotalContentLJ/excel`, query, {
      responseType: "blob"
    });
  }
  /**导出 */
  public export(query: any) {
    if (hospitalPathGetList === 'schNightTotalModelSgy') {
      return this.post(`/${hospitalPath}/excelOne`, query, {
        responseType: "blob"
      });
    } else {
      return this.post(`/${hospitalPath}/excel`, query, {
        responseType: "blob"
      });
    }
    // return this.post(`/${hospitalPath}/excel`, query, {
    //   responseType: "blob"
    // });
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
  /**
   * 贵州省人民医院
   * @returns 
   */

  // public async getSgyList(parmas: ISgyParmas) {
  //   return this.post("/schNightTotalModelSgy/getList", parmas)
  // }

  // /**新建编辑 */
  // public createSgyReport(query: any) {
  //   return this.post("/schNightTotalModelSgy/saveOrUpdate", query);
  // }

  /**查看获取报告 */
  public getSgyReport(id: string | number) {
    return this.get(`/nightTotalContentSgy/getListOne?id=${id}`);
  }

  /**导出夜班费 */
  public sgyExport(query: any) {
    return this.post(`/nightTotalContentSgy/excelOne`, query, {
      responseType: "blob"
    });
  }

  /**提交审核 */
  public sgySubmit<T = any>(query: T) {
    return this.post(`/schNightTotalModelSgy/submit`, query);
  }
  /**片区护长审核驳回 */
  public sgyReject(query: any) {
    return this.post(`/schNightTotalModelSgy/reject`, query);
  }
  /**撤销*/
  public sgyUndo(query: any) {
    return this.post(`/schNightTotalModelSgy/undo`, query);
  }
  /**片区护长审核通过*/
  public sgyAccess(query: any) {
    return this.post(`/schNightTotalModelSgy/access`, query);
  }
  /**删除*/
  public sgyDel(id: any) {
    return this.post(`/schNightTotalModelSgy/delete/${id}`);
  }
  /**科室夜班费统计查询*/
  public sgyGetListTwol(query: any) {
    return this.post(`/nightTotalContentSgy/getListTwo`, query);
  }
  /**科室统计导出*/
  public sgyExcelTwo(query: any) {
    return this.post(`/nightTotalContentSgy/excelTwo`, query, {
      responseType: "blob"
    });
  }
  /**科室统计导出*/
  // public sgyExcelTwo(query: any) {
  //   return this.post(`/nightTotalContentSgy/excelTwo`, query, {
  //     responseType: "blob"
  //   });
  // }
  /**人员夜班费列表修改*/
  public sgySaveOrUpdate(query: any) {
    return this.post(`/nightTotalContentSgy/saveOrUpdate`, query);
  }
  //贵州字典
  public getStandardList() {
    return this.get(`/nightTotalContentSgy/getStandardList`);
  }
  /**--夜班费设置开始-- */
  /**查看列表 */
  public getListWithSchNightSetting(params: Obj) {
    return this.post('/schNightSetting/getList', params)
  }
  /**删除 */
  public deleteSettingWithSchNightSetting(params: Obj) {
    return this.post('/schNightSetting/deleteSetting', params)
  }
  /**新建 */
  public createSettingWithSchNightSetting(params: Obj) {
    return this.post('/schNightSetting/createSetting', params)
  }
  /**修改 */
  public updateSettingWithSchNightSetting(params: Obj) {
    return this.post('/schNightSetting/updateSetting', params)
  }
  /**--夜班费设置结束-- */
}

export const starRatingReportService = new StarRatingReportService();
