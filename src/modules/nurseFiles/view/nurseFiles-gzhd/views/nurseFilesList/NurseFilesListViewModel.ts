import { fileDownload } from "src/utils/file/file";
import { observable, computed, action, reaction } from "mobx";
import {
  nurseFilesService,
  NurseQuery
} from "../../services/NurseFilesService";
import { authStore, appStore } from "src/stores";
import { crrentMonth } from "src/utils/moment/crrentMonth";

const kssxMap: any = {
  全部: "",
  住院护理单元花名册: "1",
  门诊护理单元花名册: "2"
};

class NurseFilesListViewModel {
  public constructor() {
    /** 监听 */
    reaction(
      () =>
        this.filterXl +
        this.filterZc +
        this.filterCj +
        this.filterWyearsCode +
        this.filterHLGW +
        this.filterZw +
        this.filterKs,
      () => {
        this.loadNursingList();
      }
    );
  }
  /** 筛选条件 */
  @observable public filterText: string = "";
  @observable public filterXl: string = "全部";
  @observable public filterZc: string = "全部";
  @observable public filterCj: string = "全部";
  @observable public filterWyears: string="全部";//工作年限
  @observable public filterWyearsCode: string="";//工作年限
  @observable public filterHLGW: string="全部";//护理岗位
  @observable public filterZw: string = "全部";
  @observable public filterKs: string = "全部";
  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10;
  @observable public totalCount: number = 0;
  @observable public listSpinning: boolean = false;
  @observable public nurseList: any = [];
  @observable public nursePostList:Array<string>=[]
  @observable public nursePostList2:any=[]//没有‘全部’

  @observable public isOpenFilter: boolean = true;
  @observable public jobDate: any = []; //日期
  @observable public hospitalDate: any = []; //日期
  @action
  public loadNursingList = () => {
    // this.title = newTitle
    let obj: NurseQuery = {
      deptCode: authStore.selectedDeptCode /** 部门编码 */,
      education: this.filterXl /** 学历 */,
      title: this.filterZc /** 职称 */,
      goHospitalYearType:this.filterWyearsCode,//工作年限
      nursingJob:this.filterHLGW,//护理岗位
      currentLevel: this.filterCj /** 能级、层级 */,
      post: this.filterZw /**  职务  */,
      zybz: kssxMap[this.filterKs] /**  科室属性  */,
      pageIndex: this.pageIndex /**  当前页数 */,
      pageSize: this.pageSize /**   每页页数 */,
      empName: this.filterText /**   工号 */,
      goHospitalWorkDateStartTime:
        appStore.HOSPITAL_ID == "gzhd" &&
        this.hospitalDate &&
        this.hospitalDate.length > 0
          ? this.hospitalDate[0].format("YYYY-MM-DD")
          : null,
      goHospitalWorkDateEndTime:
        appStore.HOSPITAL_ID == "gzhd" &&
        this.hospitalDate &&
        this.hospitalDate.length > 0
          ? this.hospitalDate[1].format("YYYY-MM-DD")
          : null,
      goWorkTimeStartTime:
        appStore.HOSPITAL_ID == "gzhd" &&
        this.jobDate &&
        this.jobDate.length > 0
          ? this.jobDate[0].format("YYYY-MM-DD")
          : null,
      goWorkTimeEndTime:
        appStore.HOSPITAL_ID == "gzhd" &&
        this.jobDate &&
        this.jobDate.length > 0
          ? this.jobDate[1].format("YYYY-MM-DD")
          : null
    };
    this.listSpinning = true;
    nurseFilesService.getByFormCodePC(obj).then(res => {
      this.pageIndex = res.data.pageIndex;
      this.totalCount = res.data.totalCount;
      this.nurseList = res.data.list;
      this.listSpinning = false;
    });
  };
  @action
  public exportNursingList = () => {
    // this.title = newTitle
    let obj: any = {
      deptCode: authStore.selectedDeptCode /** 部门编码 */,
      education: this.filterXl /** 学历 */,
      title: this.filterZc /** 职称 */,
      currentLevel: this.filterCj /** 能级、层级 */,
      goHospitalWorkYear:this.filterWyearsCode,
      nursingJob:this.filterHLGW,//护理岗位
      zybz: kssxMap[this.filterKs] /**  科室属性  */,
      post: this.filterZw /**  职务  */,
      empName: this.filterText /** 工号 */
    };
    nurseFilesService.auditeNurseListExcel(obj).then(res => {
      fileDownload(res);
    });
  };
}

export const nurseFilesListViewModel = new NurseFilesListViewModel();
