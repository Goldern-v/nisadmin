import { authStore } from "src/stores";
import { observable, computed } from "mobx";
import { checkWardService } from "../../services/CheckWardService";
import moment from "moment";

class CheckWardTotalModal {
  @observable public selectedYear: any = moment(); //年份
  @observable public month = ""; //月份
  @observable public status = ""; //状态
  @observable public pageIndex: any = 1;
  @observable public pageSize: any = 20;
  @observable public total: any = 0;
  @observable public tableList = []; // 表格内容
  @observable public tableLoading = false;

  @computed
  get postObj() {
    return {
      year: moment(this.selectedYear).format("YYYY"),
      month: this.month,
      status: this.status,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
  }

  onload() {
    this.tableLoading = true;
    checkWardService.getPageTotal(this.postObj).then(res => {
      this.tableList = res.data.list;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
      this.total = res.data.totalCount;
      this.tableLoading = false;
    });
  }
}

export const checkWardTotalModal = new CheckWardTotalModal();
