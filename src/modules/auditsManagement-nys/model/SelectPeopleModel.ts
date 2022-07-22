import service from 'src/services/api'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { data } from 'jquery'
import { action, computed, observable } from 'mobx'
import { appStore, authStore } from 'src/stores'

import { aMServices } from '../services/AMServices'

class SelectPeopleViewModel {
  @observable public groupsList: any = [];

  @observable modalLoading: boolean = false;
  /** 选择的片区 */
  @observable selectedBigDeptCode: any = "";
  @observable selectedBigDeptName: any = "";
  @observable public selectTreeDataAll: any = [];
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
      if (this.stepState.length == 1) {

      } else if (this.stepState.length == 2) {
        
      }
    }
    this.modalLoading = false;
  }
  popStep() {
    if (this.stepState.length == 0) {
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
    aMServices.listCanParticipateInMember().then((res: any) => {
      let ser = service.commonApiService;
      this.stepState = [];
      this.selectedBigDeptCode = "";
      this.selectedBigDeptName = "";
      this.currentData = {};
      console.log('test-res', res)
      this.selectTreeDataAll = res.data
    })
  }
}

export const selectPeopleViewModel = new SelectPeopleViewModel();
