import { observable, computed } from "mobx";
import moment from 'moment'

class DataWholeAysi {

  @observable public master={} as any;
  @observable public rowList = [] as any;
  @observable public evaluationList = [] as any;
  @observable public chartMap = {
    '图一 临床护理质量指标对比（发生例数）':[],
    '图二 临床护理质量指标对比（发生率）':[],
    '图三 临床护理质量指标对比（发生率）':[],
    '图四 临床护理质量指标对比（发生例数）':[],
    '图五 临床护理质量指标对比（发生率）':[],
    '图六 工作量及管理质量指标对比（发生率）':[],
    '图七 工作量及管理质量指标对比（发生率）':[],
    '图八 工作量及管理质量指标对比（例数）':[]

  } as any
  @observable public chartMapKey = [] as any; //chartMap的key值组成的数组
  @observable public currentCycleMessage = ''
  @observable public preCycleMessage=''

  // 年份汇总数据
  @observable public deptCode = ""; //科室
  @observable public deptName = ""; //科室名称
  @observable public month = moment().month()+1; //yue份
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public quarter = moment().quarter() as unknown; //季度
  
  // 年份汇总数据 end


  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.year?.year()
  }
  // 科室年度汇总
  @computed get postObj(){
    return {
      year:this.year?.year(),
      deptCode:this.deptCode,
      month:this.month>9?this.month:'0'+this.month,
    }
  }

  @computed get deptNameChange(){
    return this.deptName
  }
}
export const dataWholeAysi = new DataWholeAysi();
