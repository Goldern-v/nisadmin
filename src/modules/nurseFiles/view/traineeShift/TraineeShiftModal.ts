import { observable, computed } from "mobx";
import { traineeShiftApi } from "./api/TraineeShiftApi";
import { fileDownload } from "src/utils/file/file";
import moment from "moment";

class TraineeShiftModal {
  @observable public sheetId: any = undefined; //轮科表id
  @observable public groupId: any = undefined; //轮科表id

  // 主列表信息
  @observable public isOkBtn: any = false; //增加二级菜单弹窗开关
  @observable public keyWord: any = undefined; //关键字
  @observable public tableList: any = []; //表格数据
  @observable public tableDeptList: any = []; //表格科室对应的列
  @observable public tableLoading = false; //表格loading

  // 科室信息
  @observable public deptTableList: any = []; //表格数据
  @observable public deptTableCopyList: any = []; // 表格展示数据
  @observable public deptTableLoading = false; //表格loading

  // 实习生全部信息初始化
  @observable public allGroupKeyWord: any = undefined; //关键字
  @observable public selectedYear: any = moment(); //选中年份
  @observable public allGroupTableList: any = []; //表格数据
  @observable public allGroupTableLoading = false; //表格loading

  // 实习生绑定信息
  @observable public groupTableList: any = []; //表格数据
  @observable public groupTableCopyList: any = []; // 表格展示数据
  @observable public groupTableLoading = false; //表格loading

  // 已有科室
  @observable public existingDeptTableList: any = []; //表格数据
  @observable public existingDeptTableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      keyWord: this.keyWord,
      sheetId: this.sheetId
    };
  }

  @computed
  get postAllGroupObj() {
    return {
      sheetId: this.sheetId,
      keyWord: this.allGroupKeyWord,
      year: moment(this.selectedYear).format("YYYY"),
      groupId: this.groupId
    };
  }

  //主列表
  onload() {
    this.tableLoading = true;
    traineeShiftApi.querySheetCompleteInfo(this.postObj).then(res => {
      this.tableLoading = false;
      this.tableDeptList = res.data.rotateDeptList;
      this.tableList = res.data.rotateGroupsList;
    });
  }

  //所有实习生
  allGroupOnload() {
    this.allGroupTableLoading = true;
    traineeShiftApi
      .queryGraduateInternPageList(this.postAllGroupObj)
      .then(res => {
        res.data.map((item: any) => (item.isCheck = false));
        this.allGroupTableLoading = false;
        this.allGroupTableList = res.data;
      });
  }

  //获取已有绑定实习生
  groupOnload() {
    this.groupTableLoading = true;
    traineeShiftApi.queryAllRotatePersonsBySheetId().then(res => {
      this.groupTableLoading = false;
      this.groupTableList = res.data.rotatePersonsList;
      this.groupTableCopyList = res.data.rotatePersonsList;
    });
  }

  //全部科室
  deptOnload() {
    this.deptTableLoading = true;
    traineeShiftApi.queryAllDeptsAndRotateDepts(this.sheetId).then(res => {
      this.deptTableLoading = false;
      this.deptTableList = res.data;
      this.deptTableCopyList = res.data;
    });
  }

  // 已有科室
  queryAllRorateDepts() {
    this.existingDeptTableLoading = true;
    traineeShiftApi.queryAllRorateDepts().then(res => {
      this.existingDeptTableLoading = false;
      this.existingDeptTableList = res.data;
    });
  }

  //导出Excel
  export() {
    traineeShiftApi.exportSheetCompleteInfo(this.postObj).then(res => {
      fileDownload(res);
    });
  }
}

export const traineeShiftModal = new TraineeShiftModal();
