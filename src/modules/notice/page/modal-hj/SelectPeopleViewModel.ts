import { observable, computed, action } from "mobx";
import { authStore, appStore } from "src/stores";
import service from "src/services/api";
import React, { useState, useEffect, useLayoutEffect } from "react";
// import { stepViewModal } from "../stepComponent/StepViewModal";
// import { stepServices } from "../stepComponent/services/stepServices";

class SelectPeopleViewModel {
  @observable public groupsList: any = [];

  @observable modalLoading: boolean = false;
  /** 选择的片区 */
  @observable selectedBigDeptCode: any = "";
  @observable selectedBigDeptName: any = "";
  @observable public selectTreeDataAll = [
    {
      step: "按片区选择",
      label: "按片区选择",
      data: [],
      dataLabel: "deptName",
      stepLabel: "deptCode"
    },
    {
      step: "默认科室",
      label: authStore.defaultDeptName,
      data: []
    },

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
    },
    {
      step: "按实习生选择",
      label: "按实习生选择",
      data: [],
      dataLabel: "year"
    },
    {
      step: "按进修生选择",
      label: "按进修生选择",
      data: [],
      dataLabel: "year"
    },
  ];
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
    },
    {
      step: "按实习生选择",
      label: "按实习生选择",
      data: [],
      dataLabel: "year"
    },
    {
      step: "按进修生选择",
      label: "按进修生选择",
      data: [],
      dataLabel: "year"
    },
  ];
  @observable stepState: string[] = [];
  @observable public currentData: any = {};
  async pushStep(step: string, id?: any) {
    this.modalLoading = true;
    let ser = service.commonApiService;
    if (this.stepState.indexOf(step) == -1) {
      this.currentData = {};
      this.stepState.push(step);
      if (this.stepState.length == 1) {
        if (this.stepState[0] == "默认科室") {
          this.currentData = (await ser.defaultDeptUser("", {
            showAuthDept: false
          })).data;
        } else if (this.stepState[0] == "按片区选择") {
          this.currentData = {
            list: (await ser.groupByBigDeptInDeptList({ showAuthDept: false }))
              .data
          };
        } else if (this.stepState[0] == "按护理单元选择") {
          this.currentData = {
            list: (await ser.groupByDeptInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按职务选择") {
          this.currentData = {
            list: (await ser.groupByJobInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按职称选择") {
          this.currentData = {
            list: (await ser.groupByTitleInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按层级选择") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按实习生选择") {
          this.currentData = {
            list: (await ser.groupByInternsInDeptList()).data
          };
        } else if (this.stepState[0] == "按进修生选择") {
          this.currentData = {
            list: (await ser.queryRefresherStudentInfoListGroupByYear()).data
          };
        }  else if (this.stepState[0] == "科室总带教") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCode('LC_KSZDJ')).data
          };
        }  else if (this.stepState[0] == "院级培训师") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCode('LC_YJPXS')).data
          };
        }  else if (this.stepState[0] == "护理专业小组") {
          this.currentData = {
            list: (await ser.queryUserListByRoleCode('LC_HLZYXZ')).data
          };
        }
        // else if (id) {
        //   this.currentData = {
        //     list: (await stepServices.getAllPersonsOfGroup(id)).data
        //   };
        // }
      } else if (this.stepState.length == 2) {
        if (this.stepState[0] == "按片区选择") {
          this.selectedBigDeptCode = this.stepState[1].split("-")[0];
          this.selectedBigDeptName = this.stepState[1].split("-")[1];
          this.stepState = [];
        } else if (this.stepState[0] == "按护理单元选择") {
          this.currentData = {
            list: (await ser.groupByDeptInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按职务选择") {
          this.currentData = {
            list: (await ser.groupByJobInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按职称选择") {
          this.currentData = {
            list: (await ser.groupByTitleInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按层级选择") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: false }
            )).data
          };
        } else if (this.stepState[0] == "按实习生选择") {
          this.currentData = {
            list: (await ser.groupByInternsInDeptList()).data
          };
        } else if (this.stepState[0] == "按进修生选择") {
          this.currentData = {
            list: (await ser.queryRefresherStudentInfoListGroupByYear()).data
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
  @computed get currentTreeData() {
    // 判断当前是否为南医三小组名
    const arr: any = [
      "按片区选择",
      "默认科室",
      "按护理单元选择",
      "按职务选择",
      "按职称选择",
      "按层级选择",
      "按实习生选择",
      "按进修生选择"
    ];
    let isGroupName: any = !!arr.find(
      (item: any) => item === this.stepState[0]
    );
    if (this.stepState.length == 1) {
      if (this.stepState[0] == "默认科室") {
        return {
          parent: authStore.selectedDeptName,
          list: (this.currentData.userList || []).map((item: any) => ({
            ...item,
            userList: [item],
            label: item.empName,
            key: item.empNo
          })),
          type: "userList",
          dataLabel: "empName"
        };
      } else if (!isGroupName) {
        return {
          parent: this.stepState[0],
          list: (this.currentData.list || []).map((item: any) => ({
            ...item,
            userList: [item],
            label: item.empName,
            key: item.empNo
          })),
          type: "userList",
          dataLabel: "empName"
        };
      } else {
        let { dataLabel, stepLabel } = this.selectTreeData.find(
          (item: any) => item.step == this.stepState[0]
        ) || {
          dataLabel: "",
          stepLabel: ""
        };
        return {
          parent: this.stepState[0],
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
    }
    if (this.stepState.length == 2) {
      let { dataLabel } = this.selectTreeData.find(
        (item: any) => item.step == this.stepState[0]
      ) || {
        dataLabel: ""
      };
      let userData: any =
        (this.currentData.list || []).find(
          (item: any) => item[dataLabel || ""] == this.stepState[1]
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
