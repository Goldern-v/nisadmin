import { fileDownload } from 'src/utils/file/file'
import { action, computed, observable, reaction } from 'mobx'
import { authStore } from 'src/stores'

import { nurseFilesService, NurseQuery } from '../../services/NurseFilesService'

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
        this.filterZw +
        this.filterKs +
        this.filterXb,
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
  @observable public filterZw: string = "全部";
  @observable public filterKs: string = "全部";
  @observable public filterXb: string = "全部";

  /** 工作年限 */
  @observable public goHospitalWorkStartYear: string = "";
  @observable public goHospitalWorkEndYear: string = "";

  @observable public pageIndex: number = 1;
  @observable public pageSize: number = 10000;
  @observable public totalCount: number = 0;
  @observable public listSpinning: boolean = false;
  @observable public nurseList: any = [];
  @observable public isOpenFilter: boolean = true;

  @action
  public loadNursingList = () => {
    // this.title = newTitle
    let obj: NurseQuery | any = {
      deptCode: authStore.selectedDeptCode /** 部门编码 */,
      education: this.filterXl /** 学历 */,
      title: this.filterZc /** 职称 */,
      currentLevel: this.filterCj /** 能级、层级 */,
      post: this.filterZw /**  职务  */,
      sex: this.filterXb, /**  性别  */
      // zybz: kssxMap[this.filterKs] /**  科室属性  */,
      goHospitalWorkStartYear: this.goHospitalWorkStartYear,
      goHospitalWorkEndYear: this.goHospitalWorkEndYear,
      pageIndex: this.pageIndex /**  当前页数 */,
      pageSize: this.pageSize /**   每页页数 */,
      empName: this.filterText /**   工号 */
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
      zybz: kssxMap[this.filterKs] /**  科室属性  */,
      post: this.filterZw /**  职务  */,
      sex: this.filterXb, /**  性别  */
      empName: this.filterText /** 工号 */
    };
    nurseFilesService.auditeNurseListExcel(obj).then(res => {
      fileDownload(res);
    });
  };
  /**
   * 删除护士
   * @param empNo 
   */
  @action
  public deleteNysNurse = (params: any) => {
    return nurseFilesService.deleteNysNurse(params)
  }
}

export const nurseFilesListViewModel = new NurseFilesListViewModel();
