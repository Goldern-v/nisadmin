import service from "src/services/api/index";
import { appStore, authStore } from "../../../../../../../stores/index";
import { observable, computed, action } from "mobx";
import { dateDiff } from "src/utils/date/dateDiff";
import moment from "moment";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import { tubeBedService } from "../services/TubeBedService";
class TobeBed {
  @observable public tobeBedTableData: any = [];
  @observable public dateList: string[] = [];
  @observable public pageLoading: boolean = false;
  @observable public bedNoList: any;

  @observable public date: any = getCurrentMonth();
  /** 选中的格子 */
  @observable public selectedCell: any = {};
  @observable public AllCell: any = [];

  /** 时间段 */
  getDateList() {
    let days = [];
    let startTime = (this.date && this.date[0] && this.date[0].format("YYYY-MM-DD"));
    let endTime = (this.date && this.date[1] && this.date[1].format("YYYY-MM-DD"))

    let dayDiff = startTime && endTime
      ? dateDiff(startTime, endTime) : 0;
    if (dayDiff >= 0) {
      for (let i = 0; i <= dayDiff; i++) {
        days.push(moment(startTime).add(i, "d").format("YYYY-MM-DD"));
      }
    }
    return days;
  }
  setDate(date: any) {
    this.date = date
  }

  getAllCell() {
    let cellList = [];
    for (let i = 0; i < this.tobeBedTableData.length; i++) {
      for (let j = 0; j < this.tobeBedTableData[i]!.bedList.length; j++) {
        cellList.push(this.tobeBedTableData[i].bedList[j]);
      }
    }
    return cellList;
  }

  setAllCellData(row: any, col: any, selectedCell: any,) {
    for (let i = 0; i < this.AllCell.length; i++) {
      for (let j = 0; j < this.AllCell[i]!.bedList.length; j++) {
        if (row == i && col == j) {
          this.AllCell[i].bedList[j] = { ...selectedCell }
        }
      }
    }
  }

  getTobeBedTableData() {
    this.pageLoading = true;
    let data = {
      deptCode: authStore.selectedDeptCode,
      startTime: (tobeBedModal.date && tobeBedModal.date[0] && tobeBedModal.date[0].format("YYYY-MM-DD")) || "",
      endTime: (tobeBedModal.date && tobeBedModal.date[1] && tobeBedModal.date[1].format("YYYY-MM-DD")) || "",
    }
    tubeBedService.getBedRec(authStore.selectedDeptCode).then(res => {
      if (res.code == 200) {
        // setBedNoList(res.data)
        this.bedNoList = res.data
      }
    })
    tubeBedService.TubeBedList(data).then(res => {
      let data = res.data.length ? res.data : [{}];
      this.tobeBedTableData = data;
      this.AllCell = data;
      this.pageLoading = false;
    })
    this.dateList = this.getDateList()
  }

  saveOrUpdate() {
    let startTime = (tobeBedModal.date && tobeBedModal.date[0] && tobeBedModal.date[0].format("YYYY-MM-DD"));
    let endTime = (tobeBedModal.date && tobeBedModal.date[1] && tobeBedModal.date[1].format("YYYY-MM-DD"))
    let deptCode = authStore.selectedDeptCode;
    let saveAll = []
    saveAll = this.AllCell.map((item: any) => {
      return {
        empNo: item.empNo,
        sortValue: item.sortValue,
        bedList: item.bedList
      }
    })
    let data = {
      saveAll,
      deptCode,
      endTime,
      startTime,
    }
    return tubeBedService.saveOrUpdate(data)
  }

  schTubeBedExport() {
    let startTime = (tobeBedModal.date && tobeBedModal.date[0] && tobeBedModal.date[0].format("YYYY-MM-DD"));
    let endTime = (tobeBedModal.date && tobeBedModal.date[1] && tobeBedModal.date[1].format("YYYY-MM-DD"))
    let deptCode = authStore.selectedDeptCode;
    let data = {
      startTime,
      endTime,
      deptCode
    }
    return tubeBedService.schTubeBedExport(data)
  }
}

export const tobeBedModal = new TobeBed();
