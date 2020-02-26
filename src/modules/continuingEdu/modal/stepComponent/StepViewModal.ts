import { observable, computed, action } from "mobx";

class StepViewModal {
  @observable public stepData1 = {
    teachingMethod: null
  };
  @observable public stepData2 = {};
  @observable public stepData3 = {};
  @observable public stepData4 = {};
  @observable public title = "";
  @computed
  public get getTitle() {
    return this.title;
  }
  @action
  public setTitle = (newTitle: any) => {
    this.title = newTitle;
  };
}

export const stepViewModal = new StepViewModal();
