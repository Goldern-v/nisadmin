import { log } from "console";
import { action, observable } from "mobx";
import moment from "moment";
import printing from 'printing';
import qs from 'qs'
import { appStore } from 'src/stores'
import { message } from 'antd'
import { nurseFilesService } from 'src/modules/nurseFiles/view/nurseFiles-wh/services/NurseFilesService'
import { cloneJson } from "src/utils/json/clone";

//这里用在了《聘用人员请（休）假审批报告表》的“填写请假（外出）天数”的合计总计算
//《军队人员请休假（外出）审批报告表》也有用 但军人只是用在了字段存值 如果军人表不够字段了 注意不能只纯在这里加！！！
export let Alldays = {
  shijia: '',
  sabbatical: '',
  fangshejia: '',
  chanjia: '',
  sangjia: '',
  bingjia: '',
  hunjia: '',
  buxiu: '',
  weekend: '',
  legal: '',
  outDays: '',
  otherName: '',
  otherDays: '',
}

export let travelRoute = {
  province:"",
  shi:"",
  qu:"",
  route:""
}

const employeePagerDefault = {
  nodeList:[],
  recordName:"",
  recordType:0,
  creatorName: '',
  leaveReason:"",
  goHospitalWorkDate:"",
  nextNode:"",
  id:"",
  personalPhoneNumber:"",
  leaveStartTime:"",
  leaveEndTime:"",
  birthday: '',
  deptName: '',
  position: '',
  cancellationDateDesc:"",
  enlistmentDate:"",
  departmentAndPosition:"",
  preLeaveTime: '',
  personType:"",
  contactPhoneNumber: '',
  annualLeaveTakenDays: 0,
  leaveDuration: 0,
  remainingPublicHolidays: 0,
  travelRoute: '',
  status:0,
  transportation: '',
  creatorNo:"",
  emergencyContact: '',
  relationshipToEmployee: '',
  leaveDetail:"",
  ...Alldays,
  ...travelRoute
}


const militaryPagerDefault = {};
type PagerDefault = typeof employeePagerDefault;
class LeaveRecordModal {
  @observable 
  public employeePager: PagerDefault = cloneJson(employeePagerDefault);
  @observable
  public militaryPager: any = cloneJson(militaryPagerDefault);
  // @observable
  // public loading = false
  @action
  public updateEmployeePager(data: PagerDefault) {
    this.employeePager = { ...this.employeePager, ...data };
    console.log(this.employeePager,'updateEmployeePager');
  }
  // @action
  // public setLoading(boolean:boolean){
    
  //   this.loading = boolean
  //   console.log("-----",this.loading);
  // }
  @action
  public updateMilitaryPager(data: any) {
    this.militaryPager = { ...this.militaryPager, ...data };
  }

  // @action
  // public initDetail(){
  //     this.setLoading(true)
  //     const search = qs.parse(appStore.location.search.replace("?", ""));
  //     if(!search.id && search.recordType){
  //       nurseFilesService.leaveApplicationCreate({recordType:search.recordType}).then((res:any)=>{
  //         if(res.data){
  //           this.employeePager = {...res.data}
  //           message.success('创建成功')
  //         }
  //         this.setLoading(false)
  //       })
  //     }else if(search.id){
  //       nurseFilesService.leaveApplicationDetail(search.id).then((res:any)=>{
  //         console.log(res,"leaveApplicationDetail");
  //         if(res.data){
  //           let leaveDetail = JSON.parse(res.data.leaveDetail)
  //           this.employeePager = {...res.data,...leaveDetail}
  //         }
  //         this.setLoading(false)
  //       })
  //     }
  //   }
  public onPrint() {
    const pager: HTMLElement | null = document.querySelector('.leave-page');
    if (pager) {
      printing.preview(pager, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            size: A4;
            margin: 0mm 0mm 0mm 0mm;
          }
          .input-50 .ant-input{
            width:50px;
          }
          .ant-calendar-picker{
            width:100%;
          }
          .ant-calendar-picker-input{
            width:100%;
            display:flex;
            justify-content: center;
          }
        `
      })
    }
  }
}
export const leaveRecordModal = new LeaveRecordModal();