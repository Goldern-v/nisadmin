import { observable, action } from 'mobx'
import createModal from 'src/libs/createModal'
import BaseModal from './components/base/BaseModal'
import { sectionList,sectionListOne } from './config/sectionList'
import { qualityAnalysisReportService } from './services/QualityAnalysisReportService'
import { AllData, DeptItem } from './types'
import { appStore } from './../../../../stores/index'
import {Obj} from "src/libs/types";
import QualityAnalysisService from "src/modules/quality/views/analysis/api/QualityAnalysisService";

const api = new QualityAnalysisService();


export interface SectionListItem {
  sectionId?: string

  sectionTitle?: string | undefined
  modalTitle?: string | undefined
  data?: any
  modal?: any
  section?: any
  modalWidth?: any
}

interface ModalCase {
  show: (...arr: any) => void
  hide(): void
  Component: any
}

interface SectionCase {
  sectionId?: string
  sectionTitle?: string
  modalTitle?: string
  modalWidth?: any
  data?: any
  modal?: any
  section?: any
}

class QualityAnalysisReportViewModal {
  @observable baseModal: ModalCase | null = null
  @observable public sectionList: SectionListItem[] = appStore.queryObj.qcOne=='monthReport'?sectionListOne:sectionList
  @observable public allData: Partial<AllData> = {
    report: {}
  }
@observable public  mzData:any =[]
  @observable public  zyData:any =[]
  @observable public specificDeductionList:any =[]


  /** 返回组件实例 */
  @action
  getSection(sectionId: string): SectionCase | null {
    let obj = this.sectionList.find((item) => item.sectionId == sectionId)
    if (obj) {
      return obj
    } else {
      return null
    }
  }

  /** 打开弹窗 */
  @action
  openEditModal(sectionId: string) {
    let obj = this.getSection(sectionId)
    this.baseModal &&
      obj &&
      this.baseModal.show({
        Component: obj.modal,
        sectionData: this.getSection(sectionId)
      })
  }

  /** 获取组件数据 */
  @action
  getSectionData(sectionId: string) {
    let obj = this.getSection(sectionId)
    if (obj) {
      return obj.data
    } else {
      return null
    }
  }
  /** 设置组件数据 */
  @action
  setSectionData(sectionId: string, data: any) {
    let obj = this.getSection(sectionId)
    if (obj) {
      Object.assign(obj.data, data)
      return true
    } else {
      return false
    }
  }

  /** 提取总数据 */
  getDataInAllData(key: string) {
    return this.allData[key] || {}
  }

  get report() {
    return this.getDataInAllData('report') || {}
  }

  /** 数据初始化 */
  async initData() {
    let data = {} as any
    let jmfyData = {} as any
    if(appStore.queryObj.qcOne=='monthReport'){
      data = await qualityAnalysisReportService.getReport_dgxg_one()
    }else{
      data = await qualityAnalysisReportService.getReport()
      if(data && appStore.HOSPITAL_ID ==='jmfy') {
        jmfyData = await qualityAnalysisReportService.getQcAnalysisJmfy({
          beginDate: `${data.data?.report?.beginDate} 00:00:00`,
          endDate:`${data.data?.report?.endDate} 23:59:59`,
          qcCode: data.data?.report?.qcCode,
          groupRoleCode: data.data?.report?.groupRoleCode
        })
      }
    }
    this.allData = data.data
    this.getSectionData(`报告名称`).text = this.allData.report!.reportName || {}
    this.getSectionData(`上月质量问题`).list = this.allData!.lastImproveItemList || []
    this.getSectionData(`上月质量问题`).report =this.allData!.report || {}
    this.getSectionData(`2-1`).report = this.allData!.report || {}
    this.getSectionData(`本月质量检查扣分情况`).report = this.allData!.report || {}
    if(appStore.HOSPITAL_ID ==='jmfy' && jmfyData.data?.typeCompareList.length > 0){
      this.jmfyTypeCompareList(jmfyData.data?.typeCompareList)
    }else{
      this.getSectionData(`质量扣分比较`).list = (this.allData!.typeCompareList || []).map((item: any) => {
        return Object.assign(item, {
          currentDeductScore: Number((item.currentDeductScore || 0).toFixed(2)),
          lastDeductScore: Number((item.lastDeductScore || 0).toFixed(2)),
          compareScore: Number(item.compareScore.toFixed(2)),
          compareScorePercent: Number(item.compareScorePercent.toFixed(2))
        })
      })
    }
    if(appStore.queryObj.qcOne=='monthReport'){
      this.getSectionData(`本月质量扣分质控表排序`).list = (this.allData!.codeItemList || []).map((item: DeptItem) => {
        return Object.assign(item, {
          // deductScore: Number(Number(item.deductScore).toFixed(2)),
          convertDeductScore: Number(Number(item.convertDeductScore).toFixed(2)),
        })
      })
    }else{
      if(appStore.HOSPITAL_ID ==='jmfy' && jmfyData.data?.deptItemList.length > 0){
        this.jmfyDeptItemList(jmfyData)
      }else{
        this.getSectionData(`本月质量扣分科室排序`).list = (this.allData!.deptItemList || []).map((item: DeptItem,key:number) => {
          return Object.assign(item, {
            deductScore: Number(Number(item.deductScore).toFixed(2)),
            convertDeductScore: Number(Number(item.convertDeductScore).toFixed(2)),
          })
        })
      }
    }
    this.getSectionData(`本月主要质量问题`).list = (this.allData!.detailItemList || []).map((item: any) => {
      return Object.assign(item, {
        totalDeductScore: Number(Number(item.totalDeductScore).toFixed(2))
      })
    })
    this.getSectionData(`本月质量检查亮点`).list = this.allData!.highlightItemList || []
    this.getSectionData(`重点问题`).list = this.allData!.keyItemList || []
    this.getSectionData(`持续改进`).list = this.allData!.currentImproveItemList || []
    this.getSectionData(`追踪督导`).report =this.allData!.report || {}
    this.getSectionData(`检查重点`).report =this.allData!.report || {}
    this.getSectionData(`问题及建议`).report = this.allData!.report || {}
  /**   **/
    if(appStore.HOSPITAL_ID ==='jmfy'){
     await  this.initChart( this.allData!.report || {})
    }
  }
  async init() {
    this.sectionList = appStore.queryObj.qcOne=='monthReport'?sectionListOne:sectionList
    await this.initData()
    this.baseModal = createModal(BaseModal)
  }
  async  initChart(record:Obj){
    try {
      let params: any = {
        beginDate:`${appStore.queryObj.beginDate} 00:00:00`,
        endDate:`${appStore.queryObj.endDate} 23:59:59`
      }
      const res = await Promise.all([
        api.countDeptQc({...params,qcCode:record?.qcCode, flag: 'mz'}),
        api.countDeptQc({...params,qcCode:record?.qcCode, flag: 'zy'}),
        api.getSpecificDeductionList({...params, typeList: [1, 2, 3, 4, 5, 6]})
      ])
      this.mzData =(res[0].data||[]).sort((a:any,b:any)=>b.score - a.score)
      this.zyData =(res[1].data||[]).sort((a:any,b:any)=>b.score - a.score)
      this.specificDeductionList =res[2].data || []
    } catch (e) {
      // return message.error('系统出小差~')
    }
  }
   getMonthStartAndEnd(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始计算，需要加1
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay
  }
/**江门妇幼数据--分科室排序**/
  jmfyDeptItemList(data:any){
  this.getSectionData(`本月质量扣分科室排序`).list = (this.allData!.deptItemList || []).map((item: DeptItem,key:number) => {
    const matchingItemB = data.data?.deptItemList.find((itemB:any) => itemB.wardCode === item.wardCode);
    return {
      ...item,
      deductScore: Number((matchingItemB?.deductScore||0).toFixed(2)),
      convertDeductScore: Number((matchingItemB?.convertDeductScore||0).toFixed(2)),
    };

  })
}
  /**江门妇幼数据--质量扣分比较**/
  jmfyTypeCompareList(data:any){
    this.getSectionData(`质量扣分比较`).list = (this.allData!.typeCompareList || []).map((item: any,key:number) => {
      const matchingItemB = data.find((itemB:any) => itemB.itemType === item.itemType);
      return Object.assign(item, {
        currentDeductScore: Number(matchingItemB?.currentDeductScore||0).toFixed(2),
        lastDeductScore: Number(matchingItemB?.lastDeductScore||0).toFixed(2),
        compareScore: Number(matchingItemB?.compareScore||0).toFixed(2),
        comparePercent: Number(matchingItemB?.comparePercent||0).toFixed(2),
        // compareScorePercent:Number(matchingItemB?.compareScorePercent||0).toFixed(2),
      })
    })
  }
}

export const qualityAnalysisReportViewModal = new QualityAnalysisReportViewModal()
