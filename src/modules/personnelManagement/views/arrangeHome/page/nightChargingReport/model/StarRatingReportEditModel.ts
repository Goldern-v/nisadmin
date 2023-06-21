import { appStore } from "src/stores";
import { observable, action } from "mobx";
import {message} from "antd";

import createModal from "src/libs/createModal";
import BaseModal from "./../components/base/BaseModal";

import { sectionList } from "./../config/sectionList";

import { starRatingReportService } from "./../api/StarRatingReportService";
import { AllData, IStandardItem } from "./../types";


export interface SectionListItem {
  sectionId?: string;

  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  data?: any;
  modal?: any;
  section?: any;
  modalWidth?: any;
}

interface ModalCase {
  show: (...arr: any) => void;

  hide(): void;

  Component: any;
}

interface SectionCase {
  sectionId?: string;
  sectionTitle?: string;
  modalTitle?: string;
  modalWidth?: any;
  data?: any;
  modal?: any;
  section?: any;
}

export interface IGzsrmReport extends Record<string, any> {
  id: number;
  deptCode: string;
  deptName: string;
  name: string;
  year: string;
  month: string;
  startDate: string;
  endDate: string;
  creatorNo: string;
  creatorName: string;
  createDate: string;
  status: string;
  approvalStatus: string;
  nrSignature: string;
  areaNrSignature: string;
  nrSignatureDate?: any;
  areaNrSignatureDate?: any;
  pageIndex?: any;
  pageSize?: any;
  contentSgyList: any[];
  sumTotal: number;
}

class StarRatingReportEditModel {
  @observable baseModal: ModalCase | null = null;
  @observable public sectionList: SectionListItem[] = sectionList;
  @observable public allData: Partial<AllData> = {
    report: {}
  };
  /**夜班费班次标准 */
  @observable public settingList: any[] = []
  //贵州省夜班统计报告
  @observable public gzsrmReport: IGzsrmReport = {
    id: 0,
    deptCode: "",
    deptName: "",
    name: "",
    year: "",
    month: "",
    startDate: "",
    endDate: "",
    creatorNo: "",
    creatorName: "",
    createDate: "",
    status: "",
    approvalStatus: "",
    nrSignature: "",
    areaNrSignature: "",
    nrSignatureDate: [],
    areaNrSignatureDate: "",
    pageIndex: "",
    pageSize: "",
    contentSgyList: [],
    remark:'护理信息系统无护工/工人信息，请手填输入姓名及个数。',
    sumTotal: 0,
  };
  //贵州夜班费标准字典
  @observable public gzsrmStandardList:Array<IStandardItem> | []=[];

  //设置贵州
  @action
  setGzsrmStandardList(gzsrmStandardList:Array<IStandardItem> | []){
    this.gzsrmStandardList=gzsrmStandardList;
  }
  //获取接口字典
  async getApiGzsrmStandardList(){
    if(this.gzsrmStandardList && this.gzsrmStandardList.length>0){
      return this.gzsrmStandardList
    }else {
      let res= await this.getGzsrmStandardList();
      return this.getGzsrmStandardList
    }
  }


  /** 返回组件实例 */
  @action
  getSection(sectionId: string): SectionCase | null {
    let obj = this.sectionList.find(item => item.sectionId == sectionId);
    if (obj) {
      return obj;
    } else {
      return null;
    }
  }

  /** 打开弹窗 */
  @action
  openEditModal(sectionId: string) {
    let obj = this.getSection(sectionId);
    this.baseModal && obj && this.baseModal.show({
      Component: obj.modal,
      sectionData: this.getSection(sectionId)
    });
  }

  /** 获取组件数据 */
  @action
  getSectionData(sectionId: string) {
    let obj = this.getSection(sectionId);
    if (obj) {
      return obj.data;
    } else {
      return null;
    }
  }

  /** 设置组件数据 */
  @action
  setSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId);
    if (obj) {
      Object.assign(obj.data, data);
      return true;
    } else {
      return false;
    }
  }

  /** 提取总数据 */
  getDataInAllData(key: string) {
    return this.allData[key] || {};
  }

  get report() {
    return this.getDataInAllData("report") || {};
  }

  /** 数据初始化 */
  async initData(query?: any) {
    let data;
    let remark;
    let sumTotalMoney;
    let sumTotalNum;
    let sumTotalWanbaNum;
    let sumTotalZaobaNum;
    let sumTotalZbNum;
    this.settingList = []
    //暂时隐藏20210926
    if (['gzsrm'].includes(appStore.HOSPITAL_ID)) {
      let res = await starRatingReportService.getSgyReport(query.id)
      data = res.data.contentSgyList
      remark = res.data.remark || '表中个数为班次数，即实际上的班次数（未乘系数），标准夜班费中的「个」指的是乘完系数后，助班费用按定额计划，统一为60元/个。'
      sumTotalMoney = res.data.sumTotalMoney
      sumTotalNum = res.data.sumTotalNum
      sumTotalWanbaNum = res.data.sumTotalWanbaNum
      sumTotalZaobaNum = res.data.sumTotalZaobaNum
      sumTotalZbNum = res.data.sumTotalZbNum
      this.gzsrmReport = res.data
    }else if (['fqfybjy'].includes(appStore.HOSPITAL_ID)) {
      let res = await starRatingReportService.getReportFQ(query)
      data = res.data
    } else if (['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)) {
      let res = await starRatingReportService.getReportLJ(query)
      data = res.data
    } else if (['zzwy', 'dghm'].includes(appStore.HOSPITAL_ID)) {
      let res = await starRatingReportService.getReport(query)
      data = res.data?.totalList || []
      this.settingList = res.data?.settingList || []
    } else {
      let res = await starRatingReportService.getReport(query)
      data = res.data
    }

    this.getSectionData("报告名称")!.text = appStore.queryObj.name

    if (['dghl', 'fqfybjy','sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)) {
      this.allData = data.list1
      this.getSectionData("夜班费上报表")!.list = data.list1
      this.getSectionData("夜班费上报表")!.list2 = {
        ...{
          allMoney: 0,
          ksfzr: '',
          ksfzrAutograph: '',
          ksfzrAutographDate: '',
          zgbmyj: '',
          zgbmyjAutograph: '',
          zgbmyjAutographDate: '',
        },
        ...data.list2
      }
      this.getSectionData("夜班费上报表")!.schNightTotalModel = data.schNightTotalModel
    } else {
      // debugger
      this.allData = data
      // console.log(this.getSectionData("夜班费上报表"))

      this.getSectionData("夜班费上报表")!.list = data
      if(['gzsrm'].includes(appStore.HOSPITAL_ID)){
        this.getSectionData("夜班费上报表")!.remark = remark
        this.getSectionData("夜班费上报表")!.sumTotalMoney = sumTotalMoney
        this.getSectionData("夜班费上报表")!.sumTotalNum = sumTotalNum
        this.getSectionData("夜班费上报表")!.sumTotalWanbaNum = sumTotalWanbaNum
        this.getSectionData("夜班费上报表")!.sumTotalZaobaNum = sumTotalZaobaNum
        this.getSectionData("夜班费上报表")!.sumTotalZbNum = sumTotalZbNum
      }
    }
  }

  async init(query?: any) {
    await this.initData(query);
    this.baseModal = createModal(BaseModal);
  }

  //获取贵州夜班统计标准字典
  async getGzsrmStandardList(){
    starRatingReportService.getStandardList().then(res=>{
      this.setGzsrmStandardList(res.data)
    }).catch(error=>{
      message.error(error)
    })
  }
}

export const starRatingReportEditModel = new StarRatingReportEditModel();
