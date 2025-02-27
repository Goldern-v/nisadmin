import BaseApiService from "src/services/api/BaseApiService";
import { authStore } from "src/stores/index";
import qs from "qs";
import { appStore } from "src/stores";

class StatisticsApi extends BaseApiService {
  /** 1、待我审核列表 */
  public pendingPage(
    current?: number,
    pageSize?: number,
    showType?: string,
    keyword?: string
  ) {
    let data:any = {
      pageIndex: current || 0, //页码，number
      pageSize: pageSize || 10, //条数，number
      type: showType, //类型（质量检查or档案管理），string
      keyword,
      wardCode: authStore.selectedDeptCode //科室，string
    };
    if(['gxjb'].includes(appStore.HOSPITAL_ID)){
      data = {
        pageIndex: current || 0, //页码，number
        pageSize: pageSize || 10, //条数，number
        type: showType, //类型（质量检查or档案管理），string
        keyword,
        deptCodes: showType == "badEventMaster"?["全院"]:[authStore.selectedDeptCode] //科室，string
      };
    }
    return this.post(`/flow/task/pendingPage`, data);
  }

  /** 2、通知公告（收信箱） */
  public getReceiveList(pageIndex: number, pageSize: number, keyword = "") {
    let data = {
      pageIndex: pageIndex || 0, //页码，number
      pageSize: pageSize || 10, //条数，number
      keyword
    }as any;
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      data.beginDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm")
      data.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm")
    }
    return this.post(`/mail/receive/list`, data);
  }

  /** 3、护理制度 */
  public async getNursingSystem(pageIndex: number, pageSize: number) {
    let data = {
      pageIndex: pageIndex || 0, //页码，number
      pageSize: pageSize || 10 //条数，number
    };
    return this.post("/nursingInstitution/getList", data);
  }

  public async getCatalogByType(type: any) {
    // /hospitalBookshelf/getBookListByParam
    // return this.post('/nursingInstitution/getCatalogByType', qs.stringify({ type }));
    return this.post("/hospitalBookshelf/getBookListByParam", {
      bookName: "",
      pageIndex: 1,
      pageSize: 100
    });
  }

  // 0.床位情况
  public async bedInfo(data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    };
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    let trancePostData = this.stringify(postData);
    if (['nfzxy'].includes(appStore.HOSPITAL_ID)) { 
      return this.post(`/indexInfo/bedInfoHis`, trancePostData);   
    }
    return this.post(`/indexInfo/bedInfo`, trancePostData);
  }
  public async bedInfoByJMFY(data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    };
    // let trancePostData = this.stringify(postData);
    let selectDeptcode = authStore.selectedDeptCode==="全院" ? null : authStore.selectedDeptCode
    return this.get(`/indexInfo/getBedStatus/${selectDeptcode}`);
  }

  // 1.今日任务
  public async todayTask(data: any) {
    const postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    };
    let trancePostData = this.stringify(postData);
    if (['nfzxy'].includes(appStore.HOSPITAL_ID)) { 
      return this.post(`/indexInfo/todayTaskHis`, trancePostData);   
    }
    return this.post(`/indexInfo/todayTask`, trancePostData);
  }

  /** 0、获取留言板 */
  public async getMessage() {
    return this.get("/messageManage/getMessage");
  }
    /** 0、保存留言板 */
    public async saveMessage(data:any) {
      return this.post("/messageManage/saveMessage",data);
    }

  // 9.患者分布
  public async patientdistribute(data: any) {
    // let typeGet
    if (data.type === "按地区") {
      data.type = "1";
    } else if (data.type === "按费别") {
      data.type = "2";
    } else if (data.type === "按性别") {
      data.type = "3";
    }
    let postData = {
      type: data.type, // 分布方式：1=来源，2=费别， 3=性别
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    };
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    let trancePostData = this.stringify(postData);
    return this.post(`/indexInfo/patientdistribute`, trancePostData);
  }

  // 3.患者情况
  public async patientCondition(data: any) {
    let postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime // string 必须参数 结束时间
    };
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    let trancePostData = this.stringify(postData);
    if (['nfzxy'].includes(appStore.HOSPITAL_ID)) { 
      return this.post(`/indexInfo/patientConditionHis`, trancePostData);   
    }
    
    return this.post(`/indexInfo/patientCondition`, trancePostData);
  }

  // 4.执行单情况
  public async getWardExecuteHomeStatus(obj: any) {
    return this.post(`/execute/getWardExecuteHomeStatus`, obj);
  }

  // // 5.护理人员情况
  // public async nursingUser (data: any) {
  //   const postData = {
  //     wardCode: data.wardCode, // string 必须参数 科室编码
  //     startDate: data.startTime, // string 必须参数 开始时间
  //     endDate: data.endTime // string 必须参数 结束时间
  //   }
  //   return this.post(`/indexInfo/nursingUser`, postData)
  // }
  // 5首页 护理人员情况
  public async indexInfo(exportData: any) {
    if (exportData.item === "按职称") {
      exportData.item = "title";
    } else if (exportData.item === "按层级") {
      exportData.item = "job";
    } else if (exportData.item === "按工龄") {
      exportData.item = "workingYears";
    } else {
    }
    let postData = {
      deptCode: exportData.deptCode,
      item: exportData.item
    }as any;
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    let trancePostData = this.stringify(postData);
    return this.post(`/indexInfo/nursingUser`, trancePostData);
  }
  // 6.病区流转情况
  public async wardFlow(data: any) {
    let postData = {
      wardCode: data.wardCode, // string 必须参数 科室编码
      startDate: data.startTime, // string 必须参数 开始时间
      endDate: data.endTime, // string 必须参数 结束时间
      type: data.type
    } as any
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    let trancePostData = this.stringify(postData);
    return this.post(`/indexInfo/wardFlow`, trancePostData);
  }

  /**统计科室人员情况 */
  public countWardCodeEmpName() {
    return this.post('/countInformation/countWardCodeEmpName', {})
  }
}

export default new StatisticsApi();
