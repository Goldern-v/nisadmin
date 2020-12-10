import { observable, computed } from "mobx";
import { allMenusApi } from "./api/AllMenusApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore } from "src/stores/index";
import { stepViewModal } from "../../modal/stepComponent/StepViewModal";

class AllMenusModal {
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public teachingMethod = ""; //教学方式
  @observable public status = ""; //状态
  @observable public organizationWay = ""; //组织方式
  @observable public keyWord = ""; //关键字
  @observable public empNo: any = null; //成员
  @observable public empNoList: any = []; //所有成员
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD"), // 结束时间
      teachingMethod: this.teachingMethod, //教学方式
      status: this.status, //状态
      organizationWay: this.organizationWay, //组织方式
      keyWord: this.keyWord, //关键字
      empNo: this.empNo, //成员
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize //每页大小
    };
  }

  async initData() {
    await Promise.all([
      //人员
      allMenusApi.getAllEmpName(this.empNo).then(res => {
        this.empNoList = res.data.list || [];
      })
    ]);
  }

  onload() {
    this.tableLoading = true;
    allMenusApi.queryPageList(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableList = res.data.list;
      this.total = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  //导出Excel
  export() {
    allMenusApi.exportMainData(this.postObj).then(res => {
      fileDownload(res);
    });
  }

  //清空数据
  clearData() {
    this.teachingMethod = "";
    this.status = "";
    this.organizationWay = "";
    this.keyWord = "";
    this.empNo = null;
    this.pageIndex = 1;
    this.pageSize = 20;
  }

  async init() {
    await this.initData();
    this.clearData();
    this.onload();
  }
}

export const allMenusModal = new AllMenusModal();
