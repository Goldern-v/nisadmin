import { authStore } from "src/stores";
import { observable, computed } from "mobx";
import { checkWardService } from "../../services/CheckWardService";
import { crrentMonth } from "src/utils/moment/crrentMonth";

class CheckWardRecordModal {
  @observable public selectedDate: any = crrentMonth(); // 日期
  @observable public community: any = ""; //社区
  @observable public communityList: any = []; //社区列表
  @observable public status = ""; //状态
  @observable public pageIndex: any = 1;
  @observable public pageSize: any = 20;
  @observable public total: any = 0;
  @observable public tableList = []; // 表格内容
  @observable public tableLoading = false;

  async initData() {
    await Promise.all([
      //社区
      checkWardService.getCommunityList().then(res => {
        this.communityList = res.data || [];
      })
    ]);
  }

  @computed
  get postObj() {
    return {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      community: this.community,
      status: this.status,
      beginDate: this.selectedDate[0].format("YYYY-MM-DD"),
      endDate: this.selectedDate[1].format("YYYY-MM-DD")
    };
  }

  onload() {
    this.tableLoading = true;
    checkWardService.getPage(this.postObj).then(res => {
      this.tableList = res.data.page.list;
      this.pageIndex = res.data.page.pageIndex;
      this.pageSize = res.data.page.pageSize;
      this.total = res.data.page.totalCount;
      this.tableLoading = false;
    });
  }

  async init() {
    await this.initData();
    this.onload();
  }
}

export const checkWardRecordModal = new CheckWardRecordModal();
