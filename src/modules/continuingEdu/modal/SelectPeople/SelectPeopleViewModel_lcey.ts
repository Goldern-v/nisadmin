import { observable, computed, action } from "mobx";
// import { authStore, appStore } from "src/stores";
import service from "src/services/api";
// import React, { useState, useEffect, useLayoutEffect } from "react";
// import { stepViewModal } from "../stepComponent/StepViewModal";
// import { stepServices } from "../stepComponent/services/stepServices";

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
        step: "按护理单元选择",
        label: "按护理单元选择",
        dataLabel: "deptName",
      }, {
        step: "按层级选择",
        label: "按层级选择",
        dataLabel: "level"
      }, {
        step: "按职务选择",
        label: "按职务选择",
        dataLabel: "job",
      }, {
        step: "按职称选择",
        label: "按职称选择",
        data: [],
        dataLabel: "title"
      }, {
        step: "护理实习生",
        label: "护理实习生",
        dataLabel: "year"
      }, {
        step: "护理进修生用户",
        label: "护理进修生用户",
        dataLabel: "year"
      }, {
        step: "科室总带教",
        label: "科室总带教",
        data: [],
        dataLabel: "year"
      }, {
        step: "院级培训师",
        label: "院级培训师",
        data: [],
        dataLabel: "year"
      }, {
        step: "护理专业小组",
        label: "护理专业小组",
        data: [],
        dataLabel: "year"
      }],
    ColorfulCampus: [
      {
        step: "按护理单元选择",
        label: "按护理单元选择",
        dataLabel: "deptName",
      }, {
        step: "按层级选择",
        label: "按层级选择",
        dataLabel: "level"
      }, {
        step: "按职务选择",
        label: "按职务选择",
        dataLabel: "job",
      }, {
        step: "按职称选择",
        label: "按职称选择",
        data: [],
        dataLabel: "title"
      }, {
        step: "护理实习生",
        label: "护理实习生",
        dataLabel: "year"
      },
      {
        step: "护理进修生用户",
        label: "护理进修生用户",
        dataLabel: "year"
      }, {
        step: "科室总带教",
        label: "科室总带教",
        data: [],
        dataLabel: "year"
      }, {
        step: "院级培训师",
        label: "院级培训师",
        data: [],
        dataLabel: "year"
      }, {
        step: "护理专业小组",
        label: "护理专业小组",
        data: [],
        dataLabel: "year"
      }
    ],
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
  async pushStep(step: string, id?: any, status = true) {
    this.modalLoading = true;
    let ser = service.commonApiService;
    if (this.stepState.indexOf(step) == -1) {
      this.currentData = {};
      if (status) this.stepState.push(step);

      let hsName = this.stepState[0] === '本院' ? 'BY' : 'HMYQ'
      if (this.stepState.length == 2 || this.stepState.length == 3) {
        let isId = ''
        if (this.stepState.length == 2) isId = ''
        else isId = id
        if (this.stepState[0] == "默认科室") {
          this.currentData = (await ser.defaultDeptUser("", {
            showAuthDept: false
          })).data;
        } else if (this.stepState[1] == "按护理单元选择") {
          this.currentData = {
            list: (await ser.groupByDeptInDeptListLcey({ hospitalDistrict: hsName, deptCode: isId }))
              .data
          };
        } else if (this.stepState[1] == "按层级选择") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptListLcey({ hospitalDistrict: hsName, level: isId }))
              .data
          };
        } else if (this.stepState[1] == "按职务选择") {
          this.currentData = {
            list: (await ser.groupByJobInDeptListLcey({ hospitalDistrict: hsName, job: isId }))
              .data
          };
        } else if (this.stepState[1] == "按职称选择") {
          this.currentData = {
            list: (await ser.groupByTitleInDeptListLcey({ hospitalDistrict: hsName, title: isId })).data
          };
        } else if (this.stepState[1] == "护理实习生") {
          this.currentData = {
            list: (await ser.QGIILGroupByYearLcey({ hospitalDistrict: hsName, year: isId }))
              .data
          };
        } else if (this.stepState[1] == "护理进修生用户") {
          this.currentData = {
            list: (await ser.qRStudentInfoListGroupByYearLcey({ hospitalDistrict: hsName, year: isId }))
              .data
          };
        } else if (this.stepState[1] == "科室总带教") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCodeLcey({ roleCode: 'LC_KSZDJ', hospitalDistrict: hsName })).data
          };
        } else if (this.stepState[1] == "院级培训师") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCodeLcey({ roleCode: 'LC_YJPXS', hospitalDistrict: hsName })).data
          };
        } else if (this.stepState[1] == "护理专业小组") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCodeLcey({ roleCode: 'LC_HLZYXZ', hospitalDistrict: hsName })).data
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
      if (this.stepState.length == 2) {
        this.pushStep('', '', false)
      }
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
    const arr: any = [
      "科室总带教",
      "院级培训师",
      "护理专业小组",
    ];
    // 处理没有展开的情况
    let isGroupName: any = !!arr.find(
      (item: any) => item === this.stepState[1]
    );

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
    if (this.stepState.length == 2 && !isGroupName) {
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
            label: dataLabel && `${item[dataLabel]}（${item.userList.length}）人`,
            key: dataLabel && item[dataLabel]
          })
        ),
        dataLabel,
        stepLabel,
        type: "parentList"
      };
    }
    if (this.stepState.length == 3 || isGroupName) {
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
        parent: isGroupName ? this.stepState[1] : userData[dataLabel || ""],
        list: ((isGroupName ? this.currentData.list : userData.userList) || []).map((item: any) => ({
          ...item,
          label: item.empName,
          key: item.empNo,
          userList: [item],
          settingDataList: item?.settingDataList || []
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
