import { appStore } from 'src/stores';
import { observable, computed, action, reaction } from 'mobx'
import { qualityControlRecordApi, NurseQuery, judgePowerYXIn } from './api/QualityControlRecordApi'
import { authStore } from 'src/stores'
import moment from 'moment'

class QualityControlRecordVM {
  /** 筛选列表 */
  @observable public formSelectList: any = [] //质控小组列表
  @observable public tableSelectList: any = [] //质控表单列表
  @observable public stateSelectList: any = []
  @observable public filterDeptList: any = []
  @observable public filterLevelList: any = [
    {
      code: 2,
      name: '二级质控'
    },
    {
      code: 3,
      name: '三级质控'
    }
  ]
  /** 筛选条件 */
  @observable public filterDate: any = [moment(moment().format('YYYY-MM') + '-01'), moment()]
  @observable public filterForm: any = ''
  @observable public filterState: any = ''
  @observable public filterDeptCode: any = ''
  @observable public level: any = 3
  @observable public readWay: any = 1
  @observable public allData: any = {}
  @observable public qcCode: any = ''
  @observable public  creatorName: any = ''
  @computed
  get query(){
    return{
      level:this.level,
      templateName:''
    }
  }

  async init(level: number) {
    this.filterForm = ''
    this.filterState = ''
    this.filterDeptCode = ''
    this.readWay = 1
    this.level = Number(level)
    this.filterDate = [moment(moment().format('YYYY-MM') + '-01'), moment()]
    this.allData = {}
    this.qcCode = ''
    this.creatorName= ''
    let dictChainNodeFn: any = null
    let fn = appStore.hisMatch({
      map: {
        whyx: () => {
          dictChainNodeFn = qualityControlRecordApi.dictChainNodeYX.bind(qualityControlRecordApi)
        },
        other: () => {
          dictChainNodeFn = qualityControlRecordApi.dictChainNode.bind(qualityControlRecordApi)
        }
      }
    })
    fn()
    await Promise.all([
      qualityControlRecordApi.qcRoleCodeSelf().then((res: any) => {
        this.formSelectList = res.data
      }),
      
      qualityControlRecordApi.formTemplateList(this.query).then((res: any) => {
        this.tableSelectList = res.data
      }),
      dictChainNodeFn(this.level).then((res: any) => {
        this.stateSelectList = res.data
      }),
      qualityControlRecordApi.qcWardCodeList().then((res) => {
        // if (authStore.isDepartment || authStore.isSupervisorNurse) {
        this.filterDeptCode = res.data.deptList[0] && res.data.deptList[0].code
        // } else {
        //   this.filterDeptCode = res.data.defaultDept
        // }
        this.filterDeptList = res.data.deptList
      })
    ])
  }
  @observable public btnRoleYX: boolean = false
  public judgePower = async (obj:judgePowerYXIn = {}) => {
    try {
      if (!obj.nodeCode) return
      const res = await qualityControlRecordApi.judgePowerYX(obj)
      this.btnRoleYX = res.data && res.data.isVis
      return this.btnRoleYX
    } catch (err) {
      console.log(err);
    }
  }
}

export const qualityControlRecordVM = new QualityControlRecordVM()
