import { observable, computed } from "mobx";
import { nursingDataApi } from "./api/NursingDataApi";
import { crrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";

class NursingDataModal {
  @observable public selectedDeptType = ""; //科室
  @observable public deptList = []; //所有科室
  @observable public isBigScreenOk = ""; //是否为大屏
  @observable public selectedDate: any = crrentMonth(); //日期
  @observable public dataList = {
    nurseCount: {
      bedSize: "",
      totalNurseInBegin: "",
      totalNurseInEnd: 0,
      nurseSizeInARange: 0,
      patientDaySizeInARange: "",
      nurseSizeInNRange: "",
      patientDaySizeInNRange: "",
      totalWorkTime: "",
      totalPatientDaySize: 0,
      patientSizeInBegin: 0,
      patientSizeInEnd: 0,
      patientDaySizeIn0l: "",
      patientDaySizeIn1l: "",
      patientDaySizeIn2l: "",
      patientDaySizeIn3l: ""
    },
    nurseTitleCount: {
      juniorNurseInBegin: 0,
      nursePractitionerInBegin: 0,
      nurseInChargeInBegin: 0,
      aProfessorOfNursingInBegin: 0,
      professorOfNursingInBegin: 0,
      totalNurseInBegin: 0,
      juniorNurseInEnd: 0,
      nursePractitionerInEnd: 0,
      nurseInChargeInEnd: 0,
      aProfessorOfNursingInEnd: 0,
      professorOfNursingInEnd: 0,
      totalNurseInEnd: 0
    },
    nurseEduCount: {
      schoolInBegin: 0,
      collegeInBegin: 0,
      undergraduateInBegin: 0,
      masterInBegin: 0,
      doctorInBegin: 0,
      totalNurseInBegin: 0,
      schoolInEnd: 0,
      collegeInEnd: 0,
      undergraduateInEnd: 0,
      masterInEnd: 0,
      doctorInEnd: 0,
      totalNurseInEnd: 0
    },
    workYearsCount: {
      lessThanAYearInBegin: 0,
      lessThanTwoYearInBegin: 0,
      lessThanFiveYearInBegin: 0,
      lessThanTenYearInBegin: 0,
      lessThanTwentyYearInBegin: 0,
      moreThanTwentyYearInBegin: 0,
      totalNurseInBegin: 0,
      lessThanAYearInEnd: 0,
      lessThanTwoYearInEnd: 0,
      lessThanFiveYearInEnd: 0,
      lessThanTenYearInEnd: 0,
      lessThanTwentyYearInEnd: 0,
      moreThanTwentyYearInEnd: 0,
      totalNurseInEnd: 0
    },
    dimission: 0
  }; //数据内容
  @observable public dataLoading = false; //内容loading

  @computed
  get postObj() {
    return {
      wardCode: this.selectedDeptType, //科室
      beginDate: this.selectedDate[0].format("YYYY-MM-DD"), //开始时间
      endDate: this.selectedDate[1].format("YYYY-MM-DD") // 结束时间
    };
  }

  async initData() {
    console.log(this.isBigScreenOk, "this.isBigScreenOk");
    await Promise.all([
      //类型
      nursingDataApi
        .getNursingUnit(
          this.isBigScreenOk === "true" ? "nursingUnitPub" : "nursingUnit"
        )
        .then(res => {
          this.deptList = res.data.deptList;
        })
    ]);
  }

  //查询数据
  onload() {
    this.dataLoading = true;
    nursingDataApi.getData(this.postObj).then(res => {
      this.dataLoading = false;
      this.dataList = res.data;
    });
  }

  //导出Excel
  export() {
    // nursingDataApi.exportData(this.postObj).then(res => {
    //   fileDownload(res);
    // });
  }

  async init() {
    await this.initData();
    this.onload();
  }
}

export const nursingDataModal = new NursingDataModal();
