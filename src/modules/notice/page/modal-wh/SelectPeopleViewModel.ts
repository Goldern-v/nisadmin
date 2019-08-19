import { observable, computed, action } from 'mobx'
import { authStore } from 'src/stores'
import { noticeService } from '../../serveices/NoticeService'
import service from 'src/services/api'
class SelectPeopleViewModel {
  @observable modalLoading: boolean = false
  /** 选择的片区 */
  @observable selectedBigDept: boolean = false

  @observable public selectTreeDataAll = [
    {
      step: '按片区选择',
      label: '按片区选择',
      data: [],
      dataLabel: '片区筛选'
    },
    {
      step: '默认科室',
      label: authStore.selectedDeptName,
      data: []
    },

    {
      step: '按护理单元选择',
      label: '按护理单元选择',
      data: [],
      dataLabel: 'deptName'
    },

    {
      step: '按职务选择',
      label: '按职务选择',
      data: [],
      dataLabel: 'job'
    },
    {
      step: '按职称选择',
      label: '按职称选择',
      data: [],
      dataLabel: 'title'
    },
    {
      step: '按层级选择',
      label: '按层级选择',
      data: [],
      dataLabel: 'level'
    }
  ]
  /** 病区下数据 */
  @observable public selectTreeHasBigDept = [
    {
      step: '按护理单元选择',
      label: '按护理单元选择',
      data: [],
      dataLabel: 'deptName'
    },

    {
      step: '按职务选择',
      label: '按职务选择',
      data: [],
      dataLabel: 'job'
    },
    {
      step: '按职称选择',
      label: '按职称选择',
      data: [],
      dataLabel: 'title'
    },
    {
      step: '按层级选择',
      label: '按层级选择',
      data: [],
      dataLabel: 'level'
    }
  ]
  @observable stepState: string[] = []

  @observable public currentData: any = {}
  async pushStep(step: string) {
    let ser = service.commonApiService
    if (this.stepState.indexOf(step) == -1) {
      this.currentData = {}
      this.stepState.push(step)
      if (this.stepState.length == 1) {
        if (this.stepState[0] == '默认科室') {
          this.currentData = (await ser.defaultDeptUser()).data
        } else if (this.stepState[0] == '按片区选择') {
          this.currentData = {
            list: (await ser.groupByBigDeptInDeptList()).data
          }
        } else if (this.stepState[0] == '按护理单元选择') {
          this.currentData = {
            list: (await ser.groupByDeptInDeptList()).data
          }
        } else if (this.stepState[0] == '按职务选择') {
          this.currentData = {
            list: (await ser.groupByJobInDeptList()).data
          }
        } else if (this.stepState[0] == '按职称选择') {
          this.currentData = {
            list: (await ser.groupByTitleInDeptList()).data
          }
        } else if (this.stepState[0] == '按层级选择') {
          this.currentData = {
            list: (await ser.groupByLevelInDeptList()).data
          }
        }
      } else if (this.stepState.length == 2) {
        if (this.stepState[1] == '片区筛选') {
        } else {
        }
      }
    }
  }
  popStep() {
    this.stepState.pop()
  }

  @computed get selectTreeData() {
    return this.selectedBigDept ? this.selectTreeHasBigDept : this.selectTreeDataAll
  }
  @computed get currentTreeData() {
    if (this.stepState.length == 1) {
      if (this.stepState[0] == '默认科室') {
        return {
          parent: authStore.selectedDeptName,
          list: (this.currentData.userList || []).map((item: any) => ({
            ...item,
            userList: [item],
            label: item.empName,
            key: item.empNo
          })),
          type: 'userList',
          dataLabel: 'empName'
        }
      } else {
        let { dataLabel } = this.selectTreeData.find((item) => item.step == this.stepState[0]) || {
          dataLabel: ''
        }
        return {
          parent: this.stepState[0],
          list: (this.currentData.list || []).map((item: any, index: number, arr: any[]) => ({
            ...item,
            label: dataLabel && `${item[dataLabel]}（${item.userList.length}）人`,
            key: dataLabel && item[dataLabel]
          })),
          dataLabel,
          type: 'parentList'
        }
      }
    }
    if (this.stepState.length == 2) {
      let { dataLabel } = this.selectTreeData.find((item) => item.step == this.stepState[0]) || {
        dataLabel: ''
      }
      let userData: any =
        (this.currentData.list || []).find((item: any) => item[dataLabel || ''] == this.stepState[1]) || {}
      return {
        parent: userData[dataLabel || ''],
        list: userData.userList.map((item: any) => ({
          ...item,
          label: item.empName,
          key: item.empNo
        })),
        type: 'userList',
        dataLabel: 'empName'
      }
    }
  }

  /** 初始化数据 */
  initData() {
    // this.modalLoading = true
    let ser = service.commonApiService
    this.stepState = []
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

export const selectPeopleViewModel = new SelectPeopleViewModel()
