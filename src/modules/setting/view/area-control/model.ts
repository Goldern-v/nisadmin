import { message } from "antd";
import { action, observable } from "mobx";
import * as types from "src/libs/types";
import service from "src/services/api";
import SettingApi from "../../api/SettingApi";

class AreaControlModel {
  @observable public tableData: types.Obj[] = [];
  @observable public data: types.Obj[] = [];
  @observable public loading: boolean = false;

  // 关键字
  @observable public kw: string = "";
  @observable public deptTypes: types.Obj[] = [];
  // 编辑弹窗标题
  @observable public modalTitle: string = "";
  @observable public curItem: types.Obj = {};
  @observable public modalVis: boolean = false;

  @action
  getTableData() {
    this.loading = true;
    SettingApi.getDetManageList()
      .then((res) => {
        this.tableData = res.data;
        this.data = [...res.data];
        this.loading = false;
        if (this.kw) {
          this.getListByKw()
        }
      })
      .catch((e) => (this.loading = false));
  }
  @action
  getListByKw() {
    this.loading = true;
    this.tableData = this.filterArr(this.data);
    this.loading = false;
  }
  // 深度优先
  @action
  filterArr(treeArr: any[], arr = [] as any[], childName = "childDept") {
    if (treeArr) {
      for (let i = 0; i < treeArr.length; i++) {
        if (treeArr[i][childName]) {
          this.filterArr(treeArr[i][childName], arr);
        } else if (treeArr[i].name.includes(this.kw)) {
          arr.push(treeArr[i]);
        }
      }
    }
    return arr;
  }

  @action
  onSave(data: types.Obj) {
    this.loading = true
    SettingApi.updateDept([data]).then(() => {
      message.success("更新成功");
      this.getTableData();
      this.modalVis = false;
      this.loading = false
    }).catch(e => this.loading = false);
  }
  /**增加新片区 */
  @action
  async addNewArea() {
    await this.showModal(
      {
        type: "",
        name: "",
        code: "",
        bigDept: "",
        id: null,
      },
      "新增片区"
    );
  }
  @action
  async showModal(row: types.Obj, title?: string) {
    this.curItem = row;
    this.modalTitle = title || "编辑";
    this.modalVis = true;
  }
  @action
  init() {
    service.commonApiService.multiDictInfo(["dept_type"]).then((res) => {
      if (res.data) {
        this.deptTypes = res.data["dept_type"] || [];
      }
    });
    this.getTableData();
  }
}
export const areaControlModel = new AreaControlModel();
