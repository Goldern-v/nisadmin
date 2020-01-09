/**
 * @date: 2019-03-28
 * @author: laiweijun
 * @name: 护理管理系统-共用接口
 * @api: /schShiftUser/
 * @description:
 * 接口包含以下内容:  按 增删改查 顺序如下:
 * 0.获取护理单元列表
 */

/** 返回的字典项 */
export interface DictItem {
  code: string;
  name: string;
}
import BaseApiService from "./BaseApiService";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores";
import qs from 'qs'
type EntityType = "mail";
export default class CommonApiService extends BaseApiService {
  // 0.获取护理单元列表
  public async getUintList() {
    return this.get(`/user/nursingUnit`);
  }
  public async uploadFile(obj: any) {
    const trancePostData = new FormData();
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        trancePostData.append(key, obj[key]);
      }
    }
    return this.post(`/file/uploadNurse`, trancePostData);
  }

  /** 获取字典 */
  public dictInfo(code: string) {
    return this.post(`/dept/dictInfo`, this.stringify({ code }));
  }
  /** 批量获取字典 */
  public multiDictInfo(codeList: string[]) {
    return this.post(`/dept/multiDictInfo`, codeList);
  }
  /** 全部片区 */
  public groupByBigDeptInDeptList() {
    return this.post(`/user/groupByBigDeptInDeptList`, {});
  }
  /** 本人有权限的片区 */
  public getBigDeptListSelfList() {
    return this.get(`/qcItem/dict/bigDeptListSelf`);
  }

  /** 根据科室获取人员列表 */
  public groupByDeptInDeptList(
    bigDeptCode?: string,
    deptCode?: string,
    keyword?: String
  ) {
    return this.post(`/user/groupByDeptInDeptList`, {
      deptCode,
      keyword,
      bigDeptCode
    });
  }
  /** 根据职称获取人员列表 */
  public groupByTitleInDeptList(
    bigDeptCode?: string,
    title?: string,
    keyword?: String
  ) {
    return this.post(`/user/groupByTitleInDeptList`, {
      title,
      keyword,
      bigDeptCode
    });
  }
  /** 根据职务获取人员列表 */
  public groupByJobInDeptList(
    bigDeptCode?: string,
    job?: string,
    keyword?: String
  ) {
    return this.post(`/user/groupByJobInDeptList`, {
      job,
      keyword,
      bigDeptCode
    });
  }
  /** 根据职务获取人员列表 */
  public groupByLevelInDeptList(
    bigDeptCode?: string,
    currentLevel?: string,
    keyword?: String
  ) {
    return this.post(`/user/groupByLevelInDeptList`, {
      currentLevel,
      keyword,
      bigDeptCode
    });
  }

  /** 根据用户名获取人员列表 */
  public searchUser(empName: string) {
    return this.post(`/user/search`, { empName });
  }
  /** 获取默认科室人员列表 */
  public defaultDeptUser(keyword?: String) {
    return this.post(`/user/defaultDeptUser`, { keyword });
  }
  /** 上传附件 */
  public uploadAttachment(
    entityType: EntityType | string,
    file: any,
    onUploadProgress?: any
  ) {
    return this.post(`/file/uploadAttachment/${entityType}`, file, {
      timeout: 0,
      onUploadProgress: onUploadProgress || (() => { })
    });
  }
  /** 下载文件并导出 */
  public getFileAndDown(path: string, name?: string) {
    return this.get(path, { responseType: "blob" }).then(res => {
      fileDownload(res, name);
    });
  }
  /** 根据工号获取完整信息 */
  public getNurseInformation(empNo: any) {
    if (appStore.HOSPITAL_ID == "hj") {
      return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`);
    } else if (appStore.HOSPITAL_ID == "wh") {
      return this.get(`/nurseWHInformation/findByEmpNoSubmit/${empNo}`);
    } else {
      return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`);
    }
  }
  /** 武汉-普通护士 */
  public findByEmpNo(empNo: any) {
    return this.get(`/nurseWHInformation/findByEmpNo/${empNo}`);
  }
  /** 根据工号获取完整信息-武汉 */
  // public getNurseInformationWH(empNo: any) {
  //   return this.get(`/nurseWHInformation/findByEmpNoSubmit/${empNo}`)
  // }
  /** 获取全部科室列表 */
  public getNursingUnitAll() {
    return this.get(`/user/nursingUnit/all`);
  }
  /** 本人有权限的科室列表 */
  public getNursingUnitSelf() {
    return this.get(`/qcItem/dict/qcWardCodeList`);
  }
  /** 本人所属片区的科室列表 */
  public deptInbigDeptListSelf() {
    return this.get(`/qcItem/dict/deptInbigDeptListSelf`);
  }

  /** 根据科室获取科室全部护士 */
  public userDictInfo(wardCode: string, query?: { getAllRelUser: boolean }) {
    let queryStr = ''
    if (query) queryStr = `?${qs.stringify(query)}`
    return this.get(`/user/userDictInfo/${wardCode}${queryStr}`);
  }

  // 签名
  public getUser(empNo: string, password: string) {
    return this.post(`/user/getUser`, {
      empNo,
      password
    });
  }
}
