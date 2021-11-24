import { crrentMonth } from 'src/utils/moment/crrentMonth';
import { computed, observable } from "mobx";
import { trainingChartAnalysisApi } from './api/TrainingChartAnalysisApi'
import printing from "printing";

export type selectedTabType = 'all' | 'department' | 'person'
export interface TabsItem {
  label: string
  key: string
}
export interface ChangeEvent {
  target: {
    value: selectedTabType
  }
}

class TrainingChartAnalysisModal {
  /**选中的tab */
  @observable public selectedTab = 'all'
  /**选中的科室code */
  @observable public selectedDeptCode: string = ''
  /**选中的科室name */
  @observable public selectedDeptName: string = ''
  /**选中的个人code */
  @observable public selectedPerCode: any = ''
  /**选中的个人name */
  @observable public selectedPerName: any = ''
  /**选中的日期 */
  @observable public selectedDate: any = crrentMonth()
  /**科室下拉列表 */
  @observable public filterDeptList: any[] = []
  /**成员下拉列表 */
  @observable public filterPerList: any[] = []

  /**图表ref */
  @observable public chartRef: any;
  
  public readonly tabs: TabsItem[] = [
    {
      label: '全院',
      key: 'all'
    },
    {
      label: '科室',
      key: 'department'
    },
    {
      label: '个人',
      key: 'person'
    },
  ]
  
  @computed
  get chartTitle() {
    const [item1, item2, item3] = this.tabs
    switch(this.selectedTab) {
      case item1.key:
        return {
          t1: '全院培训数据统计',
          t2: '各科室培训数据统计'
        }
      case item2.key:
        return {
          t1: this.selectedDeptName + '培训数据统计',
          t2: this.selectedDeptName +'人员培训数据统计'
        }
      case item3.key:
        return {
          t1: this.selectedPerName + '培训数据统计',
          t2: ''
        }
      default:
        return {
          t1: '全院培训数据统计',
          t2: '各科室培训数据统计'
        }
    }
  }

  @computed
  get formData() {
    return {

    }
  }
  resetState(key: string) {
    this[key + 'Code'] = ''
    this[key + 'Name'] = ''
    if(key === 'selectPer') {
      this.filterPerList = []
    }
  }
  onChangeTab(e: any) {
    const [item1, item2, item3] = this.tabs
    const { value } =e.target
    switch(value) {
      case item3.key:
        // 设置对应成员列表
        this.getPerList()
        break
      case item2.key:
        if (this.selectedDeptCode === '') {
          this.selectedDeptCode = this.filterDeptList[0] && this.filterDeptList[0].code
          this.selectedDeptName = this.filterDeptList[0] && this.filterDeptList[0].name
        }
        this.resetState('selectedPer')
        break
      case item1.key:
        this.resetState('selectedPer')
        this.resetState('selectedDept')
        break
      default:
        break
    }
    this.selectedTab = value
    this.getData()
  }
  onChangeDept(value: string, option: any) {
    this.selectedDeptCode = value
    this.selectedDeptName = option.props.children
    if (this.tabs[2].key) {
      this.getPerList()
    }
    this.getData()
  }
  public getPerList() {

  }

  public async init() {
    try {

      trainingChartAnalysisApi.getDeptList().then((res: any) => {
        if (!(res.data.deptList && res.data.deptList.length>0)) return
        const [i1, ...data] = res.data.deptList
        this.filterDeptList = data
      })
      await this.getData()
  
    } catch (err) {
      console.log(err)
    }
  }
  
  getData() {

  }


  //打印图表
  print() {
    printing(this.chartRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
      @page {
        margin: 0;
      }
      `,
    });
  }

  public readonly teachingMethodList = [
  '学习',
  '培训',
  '考试',
  '练习',
  '实操',
  '演练',
  '实践',
  ]  
}

export const trainingChartAnalysisModal = new TrainingChartAnalysisModal()