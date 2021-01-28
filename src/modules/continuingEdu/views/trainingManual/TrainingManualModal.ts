import { observable, computed } from "mobx";
import { appStore } from "src/stores/index";

class TrainingManualModal {
  @observable public tabKey = ""; //tab对应key值

  @computed
  get postObj() {
    return {};
  }

  async initData() {
    await Promise.all([]);
  }

  onload() {}

  //tabs变化函数
  tabsChanged(key: any) {}

  async init() {
    await this.initData();
    await this.onload();
  }
}

export const trainingManualModal = new TrainingManualModal();
