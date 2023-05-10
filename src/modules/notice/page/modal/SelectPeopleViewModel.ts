import { observable, computed, action } from 'mobx'
import { appStore, authStore } from 'src/stores'
// import { noticeService } from '../../serveices/NoticeService'
import service from 'src/services/api'
class SelectPeopleViewModel {
  @observable modalLoading: boolean = false
  @observable public selectTreeData = [
    {
      step: '按片区选择',
      label: '按片区选择',
      data: [],
      dataLabel: 'deptName'
    },
    ...appStore.hisMatch({
      map: {
        925: [],
        other: [
          {
            step: '默认科室',
            label: authStore.selectedDeptName || authStore.defaultDeptName,
            data: []
          },
        ]
      }
    }),
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

  pushStep(step: string) {
    if (this.stepState.indexOf(step) == -1) {
      this.stepState.push(step)
    }
  }
  popStep() {
    this.stepState.pop()
  }

  @computed get currentTreeData() {
    if (this.stepState.length == 1) {
      if (this.stepState[0] == '默认科室') {
        return {
          parent: authStore.selectedDeptName,
          list: ((this as any).selectTreeData[1].data.userList || []).map((item: any) => ({
            ...item,
            userList: [item],
            label: item.empName,
            key: item.empNo
          })),
          type: 'userList',
          dataLabel: 'empName'
        }
      } else {
        let { data, dataLabel } = this.selectTreeData.find((item) => item.step == this.stepState[0]) || {
          data: [],
          dataLabel: ''
        }
        return {
          parent: this.stepState[0],
          list: data.map((item: any, index: number, arr: any[]) => ({
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
      let { data, dataLabel } = this.selectTreeData.find((item) => item.step == this.stepState[0]) || {
        data: [],
        dataLabel: ''
      }
      let userData: any = data.find((item: any) => item[dataLabel || ''] == this.stepState[1]) || {}
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
    this.modalLoading = true
    let ser = service.commonApiService
    this.stepState = []
    let arr = [
      ser.groupByBigDeptInDeptList(),
      ...appStore.hisMatch({
        map: {
          925: [],
          other: [
            ser.defaultDeptUser(),
          ]
        }
      }),
      ser.groupByDeptInDeptList(),
      ser.groupByJobInDeptList(),
      ser.groupByTitleInDeptList(),
      ser.groupByLevelInDeptList()
    ]
    return Promise.all(arr).then((res) => {
      this.modalLoading = false
      res.forEach((item, index) => {
        this.selectTreeData[index].data = item.data
      })
    })
  }
}

export const selectPeopleViewModel = new SelectPeopleViewModel()
