import { action, observable } from "mobx";
import printing from 'printing';
import { cloneJson } from "src/utils/json/clone";
const employeePagerDefault = {
  name: '',
  birthday: '',
  deptName: '',
  leaveLocation: '',
  workDate: '',
  lastLeaveTime: '',
  leaveRange: '',
  phone: '',
  leaveDays: '',
  restDays: '',
  route: '',
  transportation: '',
  familyName: '',
  relationship: '',
  relationPhone: '',
  sabbatical: '',
  shijia: '',
  bingjia: '',
  fangshejia: '',
  chanjia: '',
  sangjia: '',
  hunjia: '',
  buxiu: '',
  weekend: '',
  legal: '',
  outDays: '',
  otherName: '',
  otherDays: '',
  total: ''
}
const militaryPagerDefault = {};
type PagerDefault = typeof employeePagerDefault;
class LeaveRecordModal {
  @observable 
  public employeePager: PagerDefault = cloneJson(employeePagerDefault);
  @observable
  public militaryPager: any = cloneJson(militaryPagerDefault);

  @action
  public updateEmployeePager(data: PagerDefault) {
    this.employeePager = { ...this.employeePager, ...data };
  }

  @action
  public updateMilitaryPager(data: any) {
    this.militaryPager = { ...this.militaryPager, ...data };
  }

  public onPrint() {
    const pager: HTMLElement | null = document.querySelector('.leave-page');
    if (pager) {
      printing(pager, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            size: A4;
            margin: 0mm 0mm 0mm 0mm;
          }
        `
      })
    }
  }
}
export const leaveRecordModal = new LeaveRecordModal();