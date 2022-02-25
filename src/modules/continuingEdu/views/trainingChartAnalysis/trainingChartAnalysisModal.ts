import { crrentMonth } from 'src/utils/moment/crrentMonth';
import { computed, observable } from "mobx";
import { QueryIn, QueryIn2, trainingChartAnalysisApi } from './api/TrainingChartAnalysisApi';
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
  @observable public selectedPerCode: string = ''
  /**选中的个人name */
  @observable public selectedPerName: string = ''
  /**选中的日期 */
  @observable public selectedDate: any[] = crrentMonth()
  /**科室下拉列表 */
  @observable public filterDeptList: any[] = []
  /**成员下拉列表 */
  @observable public filterPerList: any[] = []

  /**图表ref */
  @observable public chartRef: any;
  
  @observable public chartData1: any = []
  @observable public chartData2: any = []
  
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
  get formData(): QueryIn {
    return {
      startDate: this.selectedDate[0] || '',
      endDate: this.selectedDate[1] || '',
      deptCode: this.selectedDeptCode,
      empNo: this.selectedPerCode
    }
  }
  // 重置
  resetState(key: string) {
    this[key + 'Code'] = ''
    this[key + 'Name'] = ''
    if(key === 'selectPer') {
      this.filterPerList = []
    }
  }
  async onChangeTab(e: any) {
    const [item1, item2, item3] = this.tabs
    const { value } =e.target
    this.selectedTab = value
    switch(value) {
      case item3.key:
        if (this.selectedDeptCode === '') {
          this.selectedDeptCode = this.filterDeptList[0] && this.filterDeptList[0].code
          this.selectedDeptName = this.filterDeptList[0] && this.filterDeptList[0].name
        }
        // 设置对应成员列表
        await this.getPerList()
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
    await this.getData()
  }
  // 切换科室
  async onChangeDept(value: string, option: any) {
    this.selectedDeptCode = value
    this.selectedDeptName = option.props.children
    if (this.tabs[2].key == this.selectedTab) {
      await this.getPerList()
    }
    await this.getData()
  }
  // 获取人员列表
  public async getPerList() {
    try {
      const res = await trainingChartAnalysisApi.getUserListByDeptCode({ deptCode: this.selectedDeptCode})
      let { data: data = [] } = res
      this.filterPerList = data
      this.selectedPerCode = data[0]?.empNo || ''
      this.selectedPerName = data[0]?.empName || ''
    } catch (e) {
      
    }
  }
  // 切换人员
  async onChangePer(value: string, option: any) {
    this.selectedPerCode = value
    this.selectedPerName = option.props.children
    // if (this.tabs[2].key) {
    //   await this.getPerList()
    // }
    await this.getData()
  }

  public async init() {
    try {
      trainingChartAnalysisApi.getDeptList().then(async (res: any) => {
        const [i1, ...data] = res.data.deptList
        this.filterDeptList = data
        await this.getData()
      })
  
    } catch (err) {
      console.log(err)
    }
  }
  
  public async getData() {
    let arr: any[] = []
    const [item1, item2, item3] = this.tabs

    switch(this.selectedTab) {
      case item1.key:
        arr = [
          trainingChartAnalysisApi.queryStudyType(this.formData),
          trainingChartAnalysisApi.queryDeptStudyType(this.formData),
        ]
        break
      case item2.key:
        arr = [
          trainingChartAnalysisApi.queryStudyType(this.formData),
          trainingChartAnalysisApi.queryParticipants(this.formData),
        ]
        break
      case item3.key:
        let {deptCode, ...params} = this.formData
        arr = [
          trainingChartAnalysisApi.queryPerson(params as QueryIn2)
        ]
        break
    }
    try {
      let res = await Promise.all(arr)
      res[0] && (this.chartData1 = (res[0].data || []).map((item: any) => {
        return [item.name, ...item.numberList]
      }))

      res[1] && (this.chartData2 = (res[1].data || []).map((item: any) => {
        return [item.name, ...item.numberList]
      }))
    } catch (e) {
      
    }
  }
  
  @observable public chartImg1: string = ''
  @observable public chartImg2: string = ''
  //打印图表
  print() {
    let canvasEls: any = document.querySelectorAll(
      ".echarts-body canvas"
    );
    if (canvasEls) {
     for (let i = 0; i < canvasEls.length; i++) {
      this[`chartImg${i + 1}`] = canvasEls[i].toDataURL();
     }
    }
    printing(this.chartRef.current, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
      @page {
        margin: 0mm;
      }
      .echarts-body {
        display: none;
      }
      .chart-img-page {
        display: block !important
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