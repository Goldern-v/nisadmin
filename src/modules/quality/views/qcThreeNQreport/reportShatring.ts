import { observable, computed } from "mobx";

class ReportShatring {
  @observable public reportData = {};
}


export const reportShatring = new ReportShatring();