import { observable, computed, action } from "mobx";
import { authStore } from "src/stores";
import service from "src/services/api";
import { groupSettingService } from './../../api/GroupSettingService'
import { Emp } from "src/modules/quality/views/qualityControlRecord/qualityControlRecordEdit/model/QualityControlRecordEditModel";

class SelectPeopleViewModel {
  @observable isOtherEmp: boolean = false
  @observable modalLoading: boolean = false;
  /** 选择的片区 */
  @observable selectedBigDeptCode: any = "";
  @observable selectedBigDeptName: any = "";

  @observable public selectTreeDataAll = () => {
    if (!this.isOtherEmp) return [
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
      }
    ]

    return [
      {
        step: "实习生",
        label: "实习生",
        data: [],
        dataLabel: "year"
      },
      {
        step: "进修生",
        label: "进修生",
        data: [],
        dataLabel: "year"
      },
      {
        step: "试用人员",
        label: "试用人员",
        data: [],
        dataLabel: "year"
      },
      {
        step: "文员",
        label: "文员",
        data: [],
        dataLabel: "year"
      },
      {
        step: "其它人员",
        label: "其它人员",
        data: [],
        dataLabel: "year"
      },
    ]
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
  async pushStep(step: string) {
    this.modalLoading = true;
    let ser = service.commonApiService;
    if (this.stepState.indexOf(step) == -1) {
      this.currentData = {};
      this.stepState.push(step);
      if (this.stepState.length == 1) {
        if (this.stepState[0] == "默认科室") {
          this.currentData = (await ser.defaultDeptUser("", {
            showAuthDept: true
          })).data;
        } else if (this.stepState[0] == "按片区选择") {
          this.currentData = {
            list: (await ser.groupByBigDeptInDeptList({ showAuthDept: true }))
              .data
          };
        } else if (this.stepState[0] == "按护理单元选择") {
          this.currentData = {
            list: (await ser.groupByDeptInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按职务选择") {
          this.currentData = {
            list: (await ser.groupByJobInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按职称选择") {
          this.currentData = {
            list: (await ser.groupByTitleInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按层级选择") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "实习生") {
          let res = await groupSettingService.graduateInternGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '实习生',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "进修生") {
          let res = await groupSettingService.fresherStudentGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '进修生',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "试用人员") {
          let res = await groupSettingService.probationaryPersonGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '试用人员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "文员") {
          let res = await groupSettingService.officeClerkGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '文员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "其它人员") {
          let res = await groupSettingService.otherPersonGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '其它人员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        }
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
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按职务选择") {
          this.currentData = {
            list: (await ser.groupByJobInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按职称选择") {
          this.currentData = {
            list: (await ser.groupByTitleInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "按层级选择") {
          this.currentData = {
            list: (await ser.groupByLevelInDeptList(
              this.selectedBigDeptCode,
              "",
              "",
              { showAuthDept: true }
            )).data
          };
        } else if (this.stepState[0] == "实习生") {
          let res = await groupSettingService.graduateInternGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '实习生',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "进修生") {
          let res = await groupSettingService.fresherStudentGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '进修生',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "试用人员") {
          let res = await groupSettingService.probationaryPersonGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '试用人员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "文员") {
          let res = await groupSettingService.officeClerkGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '文员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
        } else if (this.stepState[0] == "其它人员") {
          let res = await groupSettingService.otherPersonGroupByYear()
          this.currentData = {
            list: (res.data || []).map((item: any) => ({
              year: item.year + '其它人员',
              userList: (item.userList || []).map((emp: any) => ({
                empName: emp.name,
                empNo: emp.personIdentifier
              }))
            }))
          }
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
      : this.selectTreeDataAll();
  }
  @computed get currentTreeData() {
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
  initData(isOtherEmp?: boolean) {
    // this.modalLoading = true
    this.isOtherEmp = !!isOtherEmp
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
