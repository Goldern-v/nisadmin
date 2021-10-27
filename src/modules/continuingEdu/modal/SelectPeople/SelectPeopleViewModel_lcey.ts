import { observable, computed, action } from "mobx";
import { authStore, appStore } from "src/stores";
import service from "src/services/api";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { stepViewModal } from "../stepComponent/StepViewModal";
import { stepServices } from "../stepComponent/services/stepServices";

class SelectPeopleViewModel {
  @observable public groupsList: any = [];

  @observable modalLoading: boolean = false;
  /** 选择的片区 */
  @observable selectedBigDeptCode: any = "";
  @observable selectedBigDeptName: any = "";
  @observable public selectTreeDataAll: any = [
    {
      step: "本院",
      label: "本院",
      data: [],
      dataLabel: "deptName",
      stepLabel: "deptCode"
    }, {
      step: "华美院区",
      label: "华美院区",
      data: [],
      dataLabel: "deptName",
      stepLabel: "deptCode"
    },
  ];
  @observable public userList: any = {
    // 本院children
    owrHospital: [
      {
        step: "护理单元",
        label: "护理单元",
        dataLabel: "deptName",
      },
      {
        step: "科室层级",
        label: "科室层级",
        dataLabel: "level"
      },
      {
        step: "科室职务",
        label: "科室职务",
        dataLabel: "job",
      },
      {
        step: "护理实习生",
        label: "护理实习生",
        dataLabel: "year"
      },
      {
        step: "护理进修生用户",
        label: "护理进修生用户",
        dataLabel: "year"
      }],
    ColorfulCampus: [
      {
        step: "护理单元",
        label: "护理单元",
        dataLabel: "deptName",
      }, {
        step: "科室层级",
        label: "科室层级",
        dataLabel: "level"
      }, {
        step: "科室职务",
        label: "科室职务",
        dataLabel: "job",
      }, {
        step: "护理实习生",
        label: "护理实习生",
        dataLabel: "year"
      },
      {
        step: "护理进修生用户",
        label: "护理进修生用户",
        dataLabel: "year"
      }],
  }
  /** 病区下数据 */
  @observable public selectTreeHasBigDept = [
    {
      step: "按护理单元选择",
      label: "按护理单元选择",
      data: [],
      dataLabel: "deptName"
    },

    {
      step: "按职务选择",
      label: "按职务选择",
      data: [],
      dataLabel: "job"
    },
    {
      step: "按职称选择",
      label: "按职称选择",
      data: [],
      dataLabel: "title"
    },
    {
      step: "按层级选择",
      label: "按层级选择",
      data: [],
      dataLabel: "level"
    }
  ];
  @observable stepState: string[] = [];
  @observable public currentData: any = {};
  async pushStep(step: string, id?: any) {
    this.modalLoading = true;
    let ser = service.commonApiService;
    if (this.stepState.indexOf(step) == -1) {
      this.currentData = {};
      this.stepState.push(step);

      let hsName = this.stepState[0] === '本院' ? 'BY' : 'HMYQ'
      if (this.stepState.length == 2 || this.stepState.length == 3) {
        if (this.stepState[0] == "默认科室") {
          this.currentData = (await ser.defaultDeptUser("", {
            showAuthDept: false
          })).data;
        } else if (this.stepState[1] == "护理单元") {
          this.currentData = {
            list: (await ser.groupByDeptInDeptListLcey({ hospitalDistrict: hsName, deptCode: '' }))
              .data
          };
        } else if (this.stepState[1] == "科室层级") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptListLcey({ hospitalDistrict: hsName, level: '' }))
              .data
          };
        } else if (this.stepState[1] == "科室职务") {
          this.currentData = {
            list: (await ser.groupByJobInDeptListLcey({ hospitalDistrict: hsName, job: '' }))
              .data
          };
        } else if (this.stepState[1] == "护理实习生") {
          this.currentData = {
            list: (await ser.QGIILGroupByYearLcey({ hospitalDistrict: hsName, year: '' }))
              .data
          };
        } else if (this.stepState[1] == "护理进修生用户") {
          this.currentData = {
            list: (await ser.qRStudentInfoListGroupByYearLcey({ hospitalDistrict: hsName, year: '' }))
              .data
          };
        }
      }
    }
    this.modalLoading = false;
  }
  popStep() {
    if (this.stepState.length == 0) {
      this.pushStep("按片区选择");
      this.selectedBigDeptCode = "";
      this.selectedBigDeptName = "";
    } else {
      this.stepState.pop();
    }
  }

  @computed get selectTreeData(): any {
    return this.selectedBigDeptCode
      ? this.selectTreeHasBigDept
      : this.selectTreeDataAll;
  }

  @computed get secondSelectTreeData(): any {
    return this.stepState[1] === '本院' ? this.userList.owrHospital : this.userList.ColorfulCampus
  }
  @computed get currentTreeData() {
    if (this.stepState.length == 1) {
      if (this.stepState[0] === '本院') {
        return {
          parent: this.stepState[0],
          list: this.userList.owrHospital
        }
      } else if (this.stepState[0] === '华美院区') {
        return {
          parent: this.stepState[0],
          list: this.userList.ColorfulCampus
        }
      }
    }
    if (this.stepState.length == 2) {
      let { dataLabel, stepLabel } = this.secondSelectTreeData.find(
        (item: any) => item.step == this.stepState[1]
      ) || {
        dataLabel: "",
        stepLabel: ""
      };
      return {
        parent: this.stepState[1],
        list: (this.currentData.list || []).map(
          (item: any, index: number, arr: any[]) => ({
            ...item,
            label:
              dataLabel && `${item[dataLabel]}（${item.userList.length}）人`,
            key: dataLabel && item[dataLabel]
          })
        ),
        dataLabel,
        stepLabel,
        type: "parentList"
      };

    }
    if (this.stepState.length == 3) {
      let { dataLabel } = this.secondSelectTreeData.find(
        (item: any) => item.step == this.stepState[1]
      ) || {
        dataLabel: ""
      };
      let userData: any =
        (this.currentData.list || []).find(
          (item: any) => item[dataLabel || ""] == this.stepState[2]
        ) || {};
      return {
        parent: userData[dataLabel || ""],
        list: (userData.userList || []).map((item: any) => ({
          ...item,
          label: item.empName,
          key: item.empNo,
          userList: [item]
        })),
        type: "userList",
        dataLabel: "empName"
      };
    }
  }
  /** 初始化数据 */
  initData() {
    // this.modalLoading = true
    let ser = service.commonApiService;
    this.stepState = [];
    this.selectedBigDeptCode = "";
    this.selectedBigDeptName = "";
    this.currentData = {};
    // return Promise.all([
    //   ser.groupByBigDeptInDeptList(),
    //   ser.defaultDeptUser(),
    //   ser.groupByDeptInDeptList(),
    //   ser.groupByJobInDeptList(),
    //   ser.groupByTitleInDeptList(),
    //   ser.groupByLevelInDeptList()
    // ]).then((res) => {
    //   this.modalLoading = false
    //   res.forEach((item, index) => {
    //     this.selectTreeData[index].data = item.data
    //   })
    // })
  }
}

export const selectPeopleViewModel = new SelectPeopleViewModel();
