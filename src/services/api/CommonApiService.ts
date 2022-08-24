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
import qs from "qs";
import axios from "axios";
type EntityType = "mail";
export default class CommonApiService extends BaseApiService {
  // 0.获取护理单元列表
  public async getUintList() {
    return this.get(`/user/nursingUnit`);
  }
  // 获取含片区的科室树形列表 by顺德龙江
  public async nursingUnit4Area() {
    return this.get(`/user/nursingUnit4Area`);
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
  public groupByBigDeptInDeptList(postData: any = {}) {
    return this.post(`/user/groupByBigDeptInDeptList`, postData);
  }
  /** 本人有权限的片区 */
  public getBigDeptListSelfList() {
    return this.get(`/qcItem/dict/bigDeptListSelf`);
  }
  // 聊城二院-有分院-获取护理单元用户列表
  public groupByDeptInDeptListLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/groupByDeptInDeptList', postData)
  }

  // 聊城二院-有分院-获取科室层级用户列表
  public groupByLevelInDeptListLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/groupByLevelInDeptList', postData)
  }

  // 聊城二院-有分院-获取科室职务用户列表
  public groupByJobInDeptListLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/groupByJobInDeptList', postData)
  }

  // 聊城二院-有分院-获取护理实习生用户列表
  public QGIILGroupByYearLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/queryGraduateInternInfoListGroupByYear', postData)
  }

  // 聊城二院-有分院-获取护理进修生用户列表
  public qRStudentInfoListGroupByYearLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/queryRefresherStudentInfoListGroupByYear', postData)
  }

  // 聊城二院-有分院-根据角色编号获取用户列表
  public queryUserListByRoleCodeLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/queryUserListByRoleCode', postData)
  }

  // 聊城二院-有分院-获取职称用户列表
  public groupByTitleInDeptListLcey(postData: any = {}) {
    return this.post('/studyAndTrain/userPersonManage/groupByTitleInDeptList', postData)
  }

  // // 聊城二院-有分院-获取全院用户列表
  // public getAllUserListLcey(postData: any = {}) {
  //   return this.post('/studyAndTrain/userPersonManage/getAllUserList', postData)
  // }

  /** 根据科室获取人员列表 */
  public groupByDeptInDeptList(
    bigDeptCode?: string,
    deptCode?: string,
    keyword?: String,
    postData: any = {}
  ) {
    return this.post(`/user/groupByDeptInDeptList`, {
      deptCode,
      keyword,
      bigDeptCode,
      ...postData
    });
  }
  /** 根据职称获取人员列表 */
  public groupByTitleInDeptList(
    bigDeptCode?: string,
    title?: string,
    keyword?: String,
    postData: any = {}
  ) {
    return this.post(`/user/groupByTitleInDeptList`, {
      title,
      keyword,
      bigDeptCode,
      ...postData
    });
  }
  /** 根据职务获取人员列表 */
  public groupByJobInDeptList(
    bigDeptCode?: string,
    job?: string,
    keyword?: String,
    postData: any = {}
  ) {
    return this.post(`/user/groupByJobInDeptList`, {
      job,
      keyword,
      bigDeptCode,
      ...postData
    });
  }
  /** 根据职务获取人员列表 */
  public groupByLevelInDeptList(
    bigDeptCode?: string,
    currentLevel?: string,
    keyword?: String,
    postData: any = {}
  ) {
    return this.post(`/user/groupByLevelInDeptList`, {
      currentLevel,
      keyword,
      bigDeptCode,
      ...postData
    });
  }
  /** 根据角色获取人员列表 ---学习培训 菜单设置*/
  public groupByRoleInDeptList() {
    return this.get(`/studyAndTrain/menuManage/getAllRoles`);
  }
  /** 根据实习生获取人员列表 ---厚街学习培训 新建类型*/
  public groupByInternsInDeptList() {
    let obj: any = {
      years: [],
      keyWord: ""
    };
    return this.post(
      `/studyAndTrain/basicInformation/user/queryGraduateInternInfoListGroupByYear`,
      obj
    );
  }
  /** 根据进修生获取人员列表 ---厚街学习培训 新建类型*/
  public queryRefresherStudentInfoListGroupByYear() {
    let obj: any = {
      years: [],
      keyWord: ""
    };
    return this.post(
      `/studyAndTrain/basicInformation/user/queryRefresherStudentInfoListGroupByYear`,
      obj
    );
  }
  /** 根据 科室总带教 获取人员列表 ---厚街学习培训 新建类型*/
  public queryUserListByRoleCode(roleCode: string) {
    let obj: any = {
      roleCode
    };
    return this.post(
      `/studyAndTrain/userPersonManage/queryUserListByRoleCode`,
      obj
    );
  }

  /** 根据用户名获取人员列表 */
  public searchUser(empName: string, postData: any = {}) {
    //是否只查看权限科室 默认否
    let showAuthDept = false;
    if (postData && Object.keys(postData).indexOf('showAuthDept') >= 0)
      showAuthDept = postData.showAuthDept
    // if (appStore.HOSPITAL_ID == 'wh') showAuthDept = true
    return this.post(`/user/search`, { empName, ...postData, showAuthDept });
  }
  /** 获取默认科室人员列表 */
  public defaultDeptUser(keyword?: String, postData: any = {}) {
    return this.post(`/user/defaultDeptUser`, { keyword, ...postData });
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
  public getFileAndDown(path: string, name?: string, needAxios?: boolean) {
    //针对需要下载原始路径的文件
    if (needAxios)
      return axios.get(path, { responseType: "blob" }).then(res => {
        fileDownload(res, name);
      });

    return this.get(path, { responseType: "blob" }).then(res => {
      fileDownload(res, name);
    });
  }

  /** 根据工号获取完整信息 */
  public getNurseInformation(empNo: any) {
    let HOSPITAL_ID = appStore.HOSPITAL_ID
    if (HOSPITAL_ID == "hj") {
      return this.get(`/nurseInformation/getByEmpNoAudite/${empNo}`);
    } else if (HOSPITAL_ID == "wh" || HOSPITAL_ID == "gzsrm") {
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
  /** 二级质控片区 */
  public getTwoInpatientArea() {
    return this.get(`/dept/oneDeptList`);
  }

  /** 根据科室获取科室全部护士 */
  public userDictInfo(wardCode: string, query?: { getAllRelUser: boolean }) {
    let queryStr = "";
    if (query) queryStr = `?${qs.stringify(query)}`;
    return this.get(`/user/userDictInfo/${wardCode}${queryStr}`);
  }
  // 武汉亚心获取实操评分表下拉内容
  public getPraticalGradeManage(){
    if(appStore.HOSPITAL_ID == 'whyx'){
      return this.post(`/studyAndTrain/praticalGradeManage/getPage`,{})
    }else{
      return this.post(`/studyAndTrain/praticalGradeManageForFSXT/getPage`,{})
    }
  }
  // 武汉亚心获取实操评分表下拉内容
  public getDetailByPaperId(paperId:any){
    if(appStore.HOSPITAL_ID == 'whyx'){
      return this.post(`/studyAndTrain/praticalGradeManage/getDetailByPaperId`,qs.stringify({paperId}))
    }else{
      return this.post(`/studyAndTrain/praticalGradeManageForFSXT/getDetailByPaperId`,qs.stringify({paperId}))
    }
   
  }

  /**
   * 签名
   * @param empNo 工号
   * @param password 密码
   * @returns
   */
  public getUser(empNo: string, password: string) {
    return this.post(`/user/getUser`, {
      empNo,
      password
    });
  }

  /**
   * 获取用户权限科室的所有护士
   * @returns
   */
  public findAllNurseByPerDept() {
    return this.get("/qcNurseMeetingRecord/getPermissionDeptNurse");
  }

  /**
   * 获取侧边栏菜单
   * @param moduleRoleCode 模块code
   * @returns
   */
  public getSideMenu(moduleRoleCode: string) {
    return this.get(`/menu/getMenuList/${moduleRoleCode}`);
  }

  /**
   * 档案管理-模块-拓展字段查询
   * @param moduleCode 模块Code
   */
  public listNurseExpand(moduleCode: string) {
    return this.post('/nurseExpand/listNurseExpand', { "moduleCode": moduleCode })
  }
  /**
   * 获取片区列表
   * @returns 
   */
  public getBigDeptList() {
    return  this.get('/dept/bigDeptList')
  }
  // 武汉亚心 获取授权类别
  public getCodeList() {
    return  this.get('/nurseWHQualificationIn/getCodeList', {
      params: { moduleCode: 'grant_type'}
    })
  }

   // 武汉亚心 获取授权名称
   public getChildCodeList(code: any) {
    return  this.get('/nurseWHQualificationIn/getChildCodeList', {params: { itemCode: code }})
  }
}
