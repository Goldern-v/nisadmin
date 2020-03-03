import { observable, computed } from "mobx";
import { mainPageApi } from "./api/MainPageApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { any } from "prop-types";

class MainPageModal {
  @observable public id = ""; //菜单id
  @observable public title = ""; //菜单名
  @observable public selectedType = "null"; //类型
  @observable public selectedState = "null"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading

  @computed
  get postObj() {
    return {
      secondLevelMenuId: this.id, //二级菜单id
      thirdLevelMenuId: this.selectedType, //三级菜单id(类型)
      status: this.selectedState, //状态
      title: this.title, //菜单名
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      beginTime: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endTime: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  onload() {
    this.tableLoading = true;
    mainPageApi.getMainData(this.postObj).then(res => {
      this.tableLoading = false;
      console.log(res.data, "00000000");
    });
  }

  async init() {
    await this.onload();
  }
}

export const mainPageModal = new MainPageModal();
