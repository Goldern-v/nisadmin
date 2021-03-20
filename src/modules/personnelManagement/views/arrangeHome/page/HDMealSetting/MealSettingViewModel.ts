import { observable } from "mobx";
import { mealSettingService } from "./services/MealSettingService";
import service from "src/services/api";

class MealSettingViewModel {
  @observable public deptCodeList: any = []; //所有科室
  @observable public deptCode: any = ""; //所选科室
  @observable public treeData: any = []; //所选科室
  @observable public tableList = []; // 表格内容
  @observable public tableLoading = false; // 表格loading

  async initData() {
    await Promise.all([
      //获取全部科室
      mealSettingService.getAllDeptList().then(res => {
        this.deptCodeList = res.data.deptList || [];
        this.deptCode = res.data.defaultDept || "";
      })
    ]);
  }

  // 获取所有班次
  onload() {
    this.tableLoading = true;
    mealSettingService.listByDeptCodeAndStatus(this.deptCode, "").then(res => {
      this.tableLoading = false;
      this.tableList = res.data;
    });
  }

  // 获取级联数据
  getTreeData() {
    service.scheduleShiftApiService
      .getShiftListByCode(this.deptCode)
      .then((res: any) => {
        this.treeData = this.handleDataTree(res.data) || [];
      });
  }

  // 处理级联数据格式
  handleDataTree(dataList: any) {
    const array: any = [];
    dataList.map((o: any) => {
      const index = array.findIndex((p: any) => p.value === o.shiftType);
      const { name, id, shiftType } = o;
      if (index === -1) {
        const obj = {
          title: shiftType,
          label: shiftType,
          value: shiftType,
          key: shiftType,
          children: [
            {
              title: name,
              label: name,
              value: name,
              key: id
            }
          ]
        };
        array.push(obj);
      } else {
        array[index].children.push({
          title: name,
          label: name,
          value: name,
          key: id
        });
      }
    });
    return array;
  }

  async init() {
    await this.initData();
    await this.getTreeData();
    await this.onload();
  }
}

export const mealSettingViewModel = new MealSettingViewModel();
