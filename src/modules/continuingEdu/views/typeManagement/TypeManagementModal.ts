import { observable, computed } from "mobx";
import { typeManagementApi } from "./api/TypeManagementApi";

class TypeManagementModal {
  @observable public firstLevelMenuId = ""; //一级菜单id
  @observable public secondLevelMenuId = ""; //二级菜单id
  @observable public firstLevelMenu = []; //一级菜单
  @observable public secondLevelMenu = []; //二级菜单
  @observable public menu: any = {}; //默认菜单值对象
  @observable public tableList: any = []; //表格内容
  @observable public tableLoading = false; //表格loading

  onload() {
    this.tableLoading = true;
    typeManagementApi.getMenuTree().then(res => {
      this.tableLoading = false;
      this.tableList = res.data;
      this.firstLevelMenu = res.data;
      this.menu =
        (res.data &&
          res.data.find(
            (item: any) => item.childList && item.childList.length > 0
          )) ||
        {};
      this.firstLevelMenuId = this.menu.id.toString();
      this.secondLevelMenuId = this.menu.childList[0].id.toString();
      let target: any =
        this.tableList &&
        this.tableList.find((item: any) => item.id == this.firstLevelMenuId);
      if (target) this.secondLevelMenu = target.childList || [];
    });
  }

  getDefaultValue() {
    this.firstLevelMenuId = this.menu.id.toString();
    this.secondLevelMenuId = this.menu.childList[0].id.toString();
  }
}

export const typeManagementModal = new TypeManagementModal();
