import { appStore, authStore } from "src/stores";
import BaseApiService from "src/services/api/BaseApiService";
import { sheetViewModal } from "../viewModal/SheetViewModal";
import { selectViewModal } from "../viewModal/SelectViewModal";
import moment from "moment";
import { PageObj } from "src/modules/nurseFiles/view/statistics/config/getPageObj";

export default class ArrangeService extends BaseApiService {
  /** 获取排班信息 */
  public findCreateOrUpdate(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD")
    };
    const url = appStore.HOSPITAL_ID === 'jmfy' ? `/schedulingJm/findCreateOrUpdate` : `/scheduling/findCreateOrUpdate`
    return this.post(url, obj);
  }

  public handleSave(obj: any) {
    const params = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD"),
      ...obj
    };
    return this.post(`/scheduling/saveOrUpdate`, params);
  }

  /** 保存排班信息 */
  public saveOrUpdate(status: "0" | "1" | undefined, urlName: string) {
    let setting:any =[]
    if(appStore.HOSPITAL_ID==='sdlj'){
       setting =sheetViewModal.sheetTableData.sort((a: any, b: any) => a.sortValue - b.sortValue).map(
          (item: any, index: number) => ({
            ...item,
            status,
            sortValue: index + 1,
            timeLimit: item.timeLimit
          })
      )
    }else{
      setting = sheetViewModal.sheetTableData.map(
          (item: any, index: number) => ({
            ...item,
            status,
            sortValue: index,
            timeLimit: item.timeLimit
          })
      )
    }
    let obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      setting,
      remark: sheetViewModal.remark,
      deptCode: selectViewModal.params.deptCode,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD")
    };
    return this.post(`/${urlName}/saveOrUpdate`, obj);
  }

  /** 获取排班班次 */
  public getArrangeMenu(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode,
      status: true
    };
    return this.post(`/schShiftSetting/getByDeptCode`, this.stringify(obj));
  }

  /** 获取排班班次套餐 */
  public getArrangeMeal(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode,
      status: true
    };
    return this.post(`schMealSetting/getByDeptCode`, this.stringify(obj));
  }

  /** 获取广州花都排班班次套餐 */
  public getHDArrangeMeal(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode,
      status: 1
    };
    return this.post(`schMealSettingHd/listByDeptCodeAndStatus`, obj);
  }

  /** 获取符号列表 */
  public getSchSymbol(obj?: any) {
    obj = {
      deptCode: selectViewModal.params.deptCode
    };
    return this.post(`/schSymbol/listByDeptCode`, obj);
  }

  // 按科室查找人员分组列表
  public getByDeptCode(obj: any) {
    obj = {
      deptCode: obj.deptCode // number
    };
    return this.get(`/schSettingNurseGroup/getByDeptCode/${obj.deptCode}`);
  }

  // 导出护士排班
  public async export(data: any) {
    const postData = {
      ...data,
      deptCode: selectViewModal.params.deptCode, // deptCode  科室编码
      startTime: selectViewModal.params.startTime, // stratTime 开始时间（刚开始由后台传给前台）
      endTime: selectViewModal.params.endTime // endTime   结束时间（刚开始由后台传给前台）
    };
    const url = appStore.hisMatch({
      map: {
        lcey: '/schedulingLc/export',
        jmfy: '/schedulingJm/export',
        'whyx,whhk': '/schedulingYaXin/export',
        default: '/scheduling/export',
      },
      vague:true,
    })
    return this.post(url, postData, { responseType: "blob" });
  }

  // 聊城打印排班
  public async printRosterExcel() {
    const postData = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD")
    };
    const url = '/scheduling/exportExcel'
    return this.post(url, postData, { responseType: "blob" });
  }

  // 聊城导出排班
  public async exportRoster(type: number, status: boolean = false) {
    const list = authStore.deptList;
    const current = list.find((item: any) => item.code === selectViewModal.params.deptCode) || { name: '' }
    const postData = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      deptName: current.name,
      nurseGroup: selectViewModal.params.group,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD"),
      excelType: type
    };
    const url = `/scheduling/${status ? 'exportExcelLC' : 'exportExcel'}`

    return this.post(url, postData, { responseType: "blob" });
  }

  // 获取期望排班
  public getByDeptCodeAndDate(obj?: any) {
    obj = {
      startDate: selectViewModal.params.startTime,
      endDate: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode
    };
    return this.post(`/schExpect/getByDeptCodeAndDatePC`, obj);
  }

  // 获取申请加减班
  public schExpectAddOrSubGetByDeptCodeAndDate(obj?: any) {
    obj = {
      startDate: selectViewModal.params.startTime,
      endDate: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode
    };
    return this.post(`/schExpectAddOrSub/getByDeptCodeAndDate`, obj);
  }

  //复制排班
  public copyPrevSettingRange(statusCopy: Boolean = true, obj?: any) {
    if (statusCopy) {
      obj = {
        startTime: selectViewModal.params.startTime,
        endTime: selectViewModal.params.endTime,
        ids: sheetViewModal.sheetTableData.map((item: any) => item.id),
        empNames: sheetViewModal.sheetTableData.map((item: any) => item.empName),
        startTimeWeek: moment(selectViewModal.params.startTime)
          .weekday(0)
          .format("YYYY-MM-DD"),
        endTimeWeek: moment(selectViewModal.params.endTime)
          .weekday(6)
          .format("YYYY-MM-DD"),
        deptCode: selectViewModal.params.deptCode
      };
    } else {
      obj = {
        startTime: selectViewModal.params.startTime,
        endTime: selectViewModal.params.endTime,
        ids: sheetViewModal.sheetTableData.map((item: any) => item.id),
        empNames: sheetViewModal.sheetTableData.map((item: any) => item.empName),
        startTimeWeek: moment(selectViewModal.params.startTime)
          .weekday(0)
          .format("YYYY-MM-DD"),
        endTimeWeek: moment(selectViewModal.params.endTime)
          .weekday(6)
          .format("YYYY-MM-DD"),
        deptCode: selectViewModal.params.deptCode,
        assignDate: selectViewModal.params.copyTime,
      };
    }
    let url = ''
    switch (appStore.HOSPITAL_ID) {
      case 'jmfy':
        url = '/schedulingJm/copyPrevSettingRange'
        break;
      case 'gzsrm':
        url = '/schedulingSgy/copyPrevSettingRange'
        break;
      default:
        url = '/scheduling/copyPrevSettingRange'
    }
    // const url = appStore.HOSPITAL_ID === 'jmfy' ? '/schedulingJm/copyPrevSettingRange' : '/scheduling/copyPrevSettingRange'
    return this.post(url, obj);
  }

  //推送排班
  public push(obj?: any) {
    obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      setting: sheetViewModal.sheetTableData,
      remark: sheetViewModal.remark,
      deptCode: selectViewModal.params.deptCode,
      status: "1"
    };
    return this.post(`/scheduling/saveOrUpdate`, obj);
  }

  //同步排班人员
  public findSysnNurse(sync:boolean) {
    const postData = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode,
      nurseGroup: selectViewModal.params.group,
      ...sync ? {sync:true} : null,
      startTimeWeek: moment(selectViewModal.params.startTime)
        .weekday(0)
        .format("YYYY-MM-DD"),
      endTimeWeek: moment(selectViewModal.params.endTime)
        .weekday(6)
        .format("YYYY-MM-DD")
    };
    if (['nfzxy'].includes(appStore.HOSPITAL_ID)) {
      return this.post(`/scheduling/findSyncNurse`, postData);
    }
    return this.post(`/scheduling/findSysnNurse`, postData)
  }

  //加减班查询
  public findBylist(obj: PageObj) {
    if (['whyx','whhk'].includes(appStore.HOSPITAL_ID)) {
      return this.post(`/schExpectAddOrSub/getByDeptCodeAndDatePC`, obj);
    }
    return this.post(`/schAddOrSub/findBylist`, obj);
  }

  //加减班总和查询
  public getCount(obj: PageObj) {
    return this.post(`/schAddOrSub/getCount`, obj);
  }

  //夜小时数查询
  public schNightHourFindBylist(obj: any) {
    return this.post(`schNightHour/findBylist`, obj);
  }

  //假期查询
  public schHolidaysWHFindBylist(obj: PageObj) {
    return this.post(`/schHolidaysWH/findBylist`, obj);
  }

  //假期新增
  public schHolidaysWHSaveOrUpdate(obj: any) {
    return this.post(`/schHolidaysWH/saveOrUpdate`, obj);
  }

  //假期删除
  public schHolidaysWHDelete(id: any) {
    return this.get(`/schHolidaysWH/delete/${id}`);
  }

  //新增保存班次
  public schShiftSettingSaveOrUpdate(obj: any) {
    if (appStore.HOSPITAL_ID === 'lcey')  return this.post(`schShiftRangeLc/saveOrUpdate`, obj);
    else return this.post(`/schShiftSetting/saveOrUpdate`, obj);
  }

  //结余数据列表
  public schHourInstanceGetByDeptCode(deptCode: any) {
    return this.get(`/schHourInstance/getByDeptCode/${deptCode}`);
  }

  //结余数据列表保存
  public schHourInstanceSaveOrUpdate(lists: any) {
    return this.post(`/schHourInstance/saveOrUpdate`, { lists });
  }

  //结余数据列表 新
  public schBalanceHourGetList(obj: PageObj) {
    return this.post(`/schBalanceHour/getList`, obj);
  }

  //标准工时设置列表
  public schInitialHourGetList(obj: any) {
    return this.post(`/schInitialHour/getList`, obj);
  }

  //新增编辑结余数据 新
  public schBalanceHourSaveOrUpdate(obj: any) {
    return this.post(`/schBalanceHour/saveOrUpdate`, obj);
  }

  //新增编辑标准工时
  public schInitialHourSaveOrUpdate(obj: any) {
    return this.post(`/schInitialHour/saveOrUpdate`, obj);
  }

  //删除结余数据 新
  public schBalanceHourDelete(id: any) {
    return this.get(`/schBalanceHour/delete/${id}`);
  }

  //删除标准工时
  public schInitialHourDelete(id: any) {
    return this.get(`/schInitialHour/delete/${id}`);
  }

  //请假查询
  public schVacationGetList(obj: PageObj) {
    return this.post(`/schVacation/getList`, obj);
  }

  // 获取期望排班列表模块
  public schExpectGetListPC(obj: PageObj) {
    return this.post(`/schExpect/getListPC`, obj);
  }

  // 江门妇幼 - 夜班数统计
  public getNightNum(obj: PageObj) {
    return this.post(`/schedulingJm/getNightNum`, obj);
  }

  // 武汉获取休假类型最近日期得天数编号
  public listRangeNameCode(list: any) {
    let obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      empNames: list.map((item: any) => item.empName),
      deptCode: selectViewModal.params.deptCode
    };
    return this.post(`/scheduling/listRangeNameCode`, obj);
  }

  // 期望排班增改
  public schExpectSaveOrUpdate(obj: any) {
    return this.post(`/schExpect/saveOrUpdate`, obj);
  }

  // 期望排班删除
  public schExpectDelete(id: any) {
    return this.get(`/schExpect/delete/${id}`);
  }

  // 排班 查看标准工时
  public schInitialHourGetListByDate(obj: any) {
    return this.post(`/schInitialHour/getListByDate`, obj);
  }

  // 批量修改班次工时
  public schInitialHourSaveOrUpdateList(list: any) {
    return this.post(`/schInitialHour/saveOrUpdateList`, list);
  }

  // 批量修改班次
  public schShiftRangeNanYiSanUpdateList(list: any) {
    let obj: any = {
      lists: list
    };
    return this.post(`/schShiftRangeNanYiSan/updateList`, obj);
  }

  //南医三积假数据列表 新
  public schBalanceHourGetListNys(obj: PageObj) {
    return this.post(`/schBalanceHourNys/getList`, obj);
  }

  //南医三新增积假数据
  public schBalanceHourSaveOrUpdatetNys(obj: PageObj) {
    return this.post(`/schBalanceHourNys/saveOrUpdate`, obj);
  }

  //删除结余数据 新
  public schBalanceHourDeleteNys(id: any) {
    return this.get(`/schBalanceHourNys/delete/${id}`);
  }

  //南医三批量导出
  public exportNys(obj: any) {
    return this.post(`/schedulingNys/export`, obj, { responseType: "blob" });
  }

  // 获取所有科室
  public getAllDeptList() {
    return this.get(`/dept/nursingUnit/all`);
  }

  // 聊城二院 模板下载
  public downloadExcel() {
    return this.post(`/schedulingLc/downloadExcel`, {}, { responseType: "blob" });
  }

  // 聊城二院 模板导入
  public importExcel(file: File) {
    let formData = new FormData()
    formData.append('upfile', file)
    return this.post(`/schedulingLc/importExcel`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }

  //导出管床信息
  public async excelTubeBed(data: any) {
    return this.post('/schedulingYaXin/excelTubeBed', data, { responseType: "blob" });
  }

  public async getHourStart() {
    return this.get(`/scheduling/getHourStart`)
  }

  //添加编辑加减班
  public async expectAddOrSub(data:any) {
    return this.post('/schExpectAddOrSub/saveOrUpdate',data)
  }
  // 删除加减班
  public async deleteOrSub(id: any) {
    return this.get(`/schExpectAddOrSub/delete/${id}`)
  }
  //
}

export const arrangeService = new ArrangeService();
