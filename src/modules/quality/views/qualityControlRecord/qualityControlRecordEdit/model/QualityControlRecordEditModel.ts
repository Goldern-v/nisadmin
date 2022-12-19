import { message } from 'src/vendors/antd';
import { action, observable, computed } from 'mobx'
import { qualityControlRecordApi } from './../../api/QualityControlRecordApi'
import service from 'src/services/api'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import qs from 'qs'

export interface Emp {
  empNo: string,
  empName: string
}

export interface BedNurse {
  empName: string, //员工名称
  empNo?: string, // 员工号
  nurseHierarchy?: string, //层级
  title?: string, //职称
  workingSeniority?: string //工作年限
}

export interface Cause {
  causeCode: string,
  causeContent?: string,
  checked: boolean
}

/**
 * 人员指定类型
 */
export interface IAudit extends Record<string, any> {
  chainCode: string;//流程编码
  nodeCode: string;//流程节点编码
  appointUserCode: string;//指定人类型编码
  showItemName: string;//项目显示名称
  indexNo: number;//序号
  required: boolean;//是否必填
  multiSelect: boolean;//是否多选
  codeList: Array<ICode> | [];//员工列表
}

export interface ICode {
  code: string,
  name: string
}

/**
 * 指定人员对象
 */
export interface IAuditUser {
  appointUserCode: string,
  codeList: Array<ICode>
}

export interface IuserEmpNo {
  empNo: string,
  empName: string
}

/**
 * 指定人员类型
 */
export interface INodeAppoint extends IAudit {
  userList: Array<IuserEmpNo> | []
}

class QualityControlRecordEditModel {
  //浏览器查询参数
  @observable query = {} as any
  //基本信息
  @observable baseInfo = {
    qcLevel: '',
    intro: '',
    qcName: '',
    qcGroupRoles: '',
    useScore: false,
    qcCode: '',
    useSubItemFixedScore: false,
    isPatientNumber: '', // 判断是否隐藏病案号 by亚心
    isBedNumber: '',
  } as any
  //加载状态
  @observable loading = false

  //管床护士能否多选
  @observable writeMoreNurse = false
  //质控人员列表
  @observable userList = [] as Emp[]
  //管床护士列表 
  @observable bedNurseList = [] as BedNurse[]
  //原因列表
  @observable causeList = [] as Cause[]
  //人员指定列表
  @observable auditList: Array<IAudit> = [];
  //指定人员类型及名单
  @observable nodeAppointList: Array<INodeAppoint> = [];
  // 是否需要添加患者弹窗
  needPatientModal: boolean = ['whsl'].includes(appStore.HOSPITAL_ID)
  // 是否添加患者弹窗
  @observable patientVisible: boolean = false

  //基本填写信息
  @observable master = {
    evalDate: '', //评估时间
    userList: [] as Emp[],//质控人
    bedNurseList: [] as BedNurse[],//管床护士
    wardCode: '', //科室编码
    bedLabel: '', //床号
    patientName:'',//质控病人
    inpNo: '', //入院号
    followEvaluate: false, //是否追踪评价
    followEvaluateDate: '', //追踪评价日期
    empNo: '', //提交签名
    password: '', //提交签名密码
  } as any
  //基本信息填写状态
  @observable masterErrObj = {
    evalDate: false,
    userList: false,
    wardCode: false,
    // bedNurseList: false,
    bedLabel: false,
    inpNo: false
  } as any

  @computed get selectedBedNurse() {
    return this.master.bedNurseList.map((item: BedNurse) => item.empName)
  }
  //单选列表
  @observable itemGroupList = [] as any[]
  //单选列表填写状态
  @observable itemListErrObj = {} as any

  //质控科室列表
  @observable deptlist = [] as any[]


  @action public inited = (query: any, error?: Function) => {
    this.query = query
    //清空数据
    this.deptlist = []
    this.itemGroupList = []
    this.userList = []
    this.bedNurseList = []
    this.causeList = []
    this.auditList = []
    this.nodeAppointList = []

    this.itemListErrObj = {}

    this.baseInfo = {
      qcLevel: '',
      intro: '',
      qcName: '',
      qcGroupRoles: '',
      useScore: false,
      qcCode: '',
      useSubItemFixedScore: false,
    }

    for (let x in this.master) {
      if (Object.keys(this.masterErrObj).indexOf(x) >= 0) {
        this.masterErrObj[x] = false
      }

      if (this.master[x] instanceof Array) {
        if (x == 'userList') {
          if (authStore.user) {
            this.master[x] = [{
              empName: authStore.user.empName,
              empNo: authStore.user.empNo,
            }]
          }
        } else {
          this.master[x] = []
        }
      } else if (x == 'followEvaluate') {
        this.master[x] = false
      } else if (x == 'evalDate') {
        this.master[x] = moment().format('YYYY-MM-DD HH:mm')
      } else if (x == 'wardCode' && ['whyx', 'whsl'].includes(appStore.HOSPITAL_ID)) {
        this.master[x] = authStore.defaultDeptCode
      } else {
        this.master[x] = ''
      }
    }

    if (!query.qcCode) {
      error && error()
      return
    }
    //重新请求数据
    this.getDetailOrTemplate()
    this.getDeptList()
  }

  @action private getDetailOrTemplate = () => {
    this.loading = true
    if (!this.query.id) {
      let fn = appStore.hisMatch({
        map: {
          "whyx,whhk": qualityControlRecordApi.formTemplateDetailYX,
          default: qualityControlRecordApi.formTemplateDetail
        },
        vague: true
      })

      fn.call(qualityControlRecordApi, this.query.qcCode).then((res: any) => {
        // console.log(res);//质控数据
        // console.log("res质控数据");//质控数据
        if (res.data) {
          this.loading = false

          if (res.data.template) {
            let template = res.data.template
            this.baseInfo = {
              qcLevel: template.qcLevel,
              qcName: template.qcName,
              intro: template.intro,
              qcGroupRoles: template.qcGroupRoles,
              useScore: template.useScore || false,
              qcCode: template.qcCode || '',
              useSubItemFixedScore: template.useSubItemFixedScore,
              isPatientNumber: template.isPatientNumber || '是',
              isBedNumber: template.isBedNumber || '是',
            }
          }

          if (res.data.itemGroupList)
            this.initItemGroupList(res.data.itemGroupList)

          if (res.data.causeList)
            this.causeList = [...res.data.causeList]

          if (this.baseInfo.qcGroupRoles) this.getUserList();
          // 科室存在请求检查人
          if (this.master.wardCode) this.getBedNurseList(true);

          //赋值人员指定列表
          (res?.data?.nodeAppointList && res.data.nodeAppointList.length > 0) && (this.auditList = res.data.nodeAppointList);
          //
          if (res?.data?.nodeAppointList && res?.data?.nodeAppointList.length > 0) {
            this.nodeAppointList = res?.data?.nodeAppointList.map((item: IAudit) => {
              let newItem = JSON.parse(JSON.stringify(item))
              newItem.userList = []
              return newItem
            })
          }
        }
      })
    } else {
      let fn = appStore.hisMatch({
        map: {
          "whyx,whhk": qualityControlRecordApi.qcItemInstanceGetYX,
          default: qualityControlRecordApi.qcItemInstanceGet
        },
        vague: true
      })

      fn.call(qualityControlRecordApi, this.query.id)
        .then((res: any) => {
          if (res.data) {
            this.loading = false
            let master = res.data.master
            let userList = res.data.userList
            let itemGroupList = res.data.itemGroupList
            let bedNurseList = res.data.bedNurseList
            let causeList = res.data.causeList
            if (master) {
              let masterKeys = Object.keys(master)
              for (let x in this.master) {
                if (masterKeys.indexOf(x) >= 0)
                  this.master[x] = master[x]
              }

              this.baseInfo = {
                qcLevel: master.qcLevel,
                qcName: master.qcName,
                intro: master.intro,
                qcGroupRoles: master.qcGroupRoles,
                useScore: master.useScore || false,
                qcCode: master?.qcCode || '',
                useSubItemFixedScore: master.useSubItemFixedScore,
                isPatientNumber: master.isPatientNumber || '是',
                isBedNumber: master.isBedNumber || '是',
              }
            }

            if (itemGroupList) this.initItemGroupList(itemGroupList)

            if (userList) this.master.userList = [...userList]
            if (bedNurseList) this.master.bedNurseList = [...bedNurseList]
            if (causeList) this.causeList = [...causeList]

            if (this.baseInfo.qcGroupRoles) this.getUserList()
            if (this.master.wardCode) this.getBedNurseList();
            //赋值人员指定列表
            //(res?.data?.nodeAppointList && res.data.nodeAppointList.length > 0) && (this.auditList = res.data.nodeAppointList) && (this.nodeAppointList=res.data.nodeAppointList)
            if ((res?.data?.nodeAppointList && res.data.nodeAppointList.length > 0)) {
              //this.auditList = res.data.nodeAppointList;
              this.nodeAppointList = res.data.nodeAppointList
              this.auditList = res?.data?.nodeAppointList.map((item: INodeAppoint) => {
                let newItem: INodeAppoint = JSON.parse(JSON.stringify(item))
                //设置codeList值
                newItem.codeList = item?.userList ? (item.userList as Array<IuserEmpNo>).map((newItem: IuserEmpNo) => ({ code: newItem.empNo, name: newItem.empName })) : []
                return newItem
              })
            }
          }

        })
    }
  }

  private initItemGroupList = (itemGroupList: any[]) => {
    let newItemGorupList = [...itemGroupList]
    let newItemListErrObj = {} as any

    newItemGorupList.forEach((itemGorup: any, idx0: number) => {
      let itemList = itemGorup.itemList || []

      itemList.forEach((item: any, idx1: number) => {
        let qcItemName = item.qcItemName

        let fillDataList = item.fillDataList
        if (fillDataList && fillDataList.length > 0) {
          let qcNameFillList = [] as any[]

          fillDataList.forEach((fillItem: any, idx2: number) => {
            let prevIndexAt = 0
            if (fillDataList[idx2 - 1]) prevIndexAt = fillDataList[idx2 - 1].indexAt

            qcNameFillList.push(qcItemName.substring(prevIndexAt, fillItem.indexAt) + '____')

            if (idx2 === fillDataList.length - 1)
              qcNameFillList.push(qcItemName.substring(fillItem.indexAt))
          })

          item.qcNameFill = qcNameFillList.join('')
        }

        newItemListErrObj[item.qcItemCode] = {
          name: qcItemName,
          err: false,
          key: `${idx0}-${idx1}`
        }
      })

    })

    this.itemListErrObj = newItemListErrObj
    this.itemGroupList = newItemGorupList
  }

  //获取质控病区科室
  @action private getDeptList = () => {
    this.deptlist = []

    if (appStore.HOSPITAL_ID === 'nys')
      //南医三获取用户权限科室
      service.homeDataApiServices
        .getListDepartment()
        .then(res => {
          console.log(res)
          if (res.data) {
            this.deptlist = res.data.deptList
            if (!this.query.id) {
              this.master.wardCode = res.data.defaultDept
            }
          }
        })
    else
      //获取表单关联科室
      qualityControlRecordApi
        .formTemplateDeptList(this.query.qcCode)
        .then(res => {
          if (res.data) this.deptlist = res.data
        })
  }

  //获取质控人员
  @action private getUserList = () => {
    this.userList = []
    qualityControlRecordApi
      .getUserByRoles(
        this.baseInfo.qcGroupRoles.split(',')
      ).then(res => {
        if (res.data && res.data.userList) this.userList = res.data.userList
      })
  }

  /**
   * 获取管床护士列表
   * @param isInit 是否初始化检查人
   */
  @action public getBedNurseList = (isInit = false) => {
    this.bedNurseList = []
    if (this.master.wardCode)
      qualityControlRecordApi
        .getBedNurseList(this.master.wardCode)
        .then(res => {
          if (res.data) {
            this.bedNurseList = res.data || []
            if (isInit) {
              const item = this.bedNurseList.find(v => v.empNo === authStore.user?.empNo)
              item && (this.master.bedNurseList = [item])
            }
          }
        })
  }

  //更新master对象信息
  @action public setMaster = (newMaster: any) => {
    this.master = { ...newMaster }
  }

  //更新itemGroupList信息
  @action public upadteItemGroup = (newItem: any, idx: number) => {
    this.itemGroupList[idx] = newItem
  }

  @action public setAllQcItemValue = (val: string) => {
    for (let i = 0; i < this.itemGroupList.length; i++) {
      let itemList = this.itemGroupList[i].itemList

      if (itemList)
        for (let j = 0; j < itemList.length; j++) {
          let item = itemList[j]
          item.qcItemValue = val
          if(appStore.HOSPITAL_ID == "fssdy"){
            if (this.baseInfo.useScore) {
              if (val === '不符合' && !item.subItemList) {
                // if (item.remarkDeductScore === null || item.remarkDeductScore === '') {
                  item.remarkDeductScore = item.fixedScore.toString()
                // }
              }else if (val === '部分符合' && !item.subItemList) {
                // if (item.remarkDeductScore === null || item.remarkDeductScore === '') {
                  item.remarkDeductScore = item.partialMatchScore.toString()
                // }
              } else if (val === '符合') {
                item.remarkDeductScore = ''
                if (item.subItemList)
                  item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
              }
            }
          }else{
            if (this.baseInfo.useScore) {
              if (val === '否' && !item.subItemList) {
                if (item.remarkDeductScore === null || item.remarkDeductScore === '') {
                  item.remarkDeductScore = item.fixedScore.toString()
                }
              } else if (val === '是') {
                item.remarkDeductScore = ''
                if (item.subItemList)
                  item.subItemList = item.subItemList.map((subItem: any) => ({ ...subItem, checked: false }))
              }
            }
          }
          

          this.setItemListErrObj(item.qcItemCode, false)
        }
    }
  }

  //设置master基本信息错误状态
  @action public setMasterErrObj = (key: string, state: boolean) => {
    if (Object.keys(this.masterErrObj).indexOf(key) >= 0)
      this.masterErrObj[key] = state
  }

  //设置itemList错误状态
  @action public setItemListErrObj = (key: string, state: boolean) => {
    this.itemListErrObj[key].err = state
  }

  //勾选问题及可能原因
  @action public setCauseListChecked = (idx: number, checked: boolean) => {
    this.causeList[idx].checked = checked
  }

  //拼装要提交的数据数据
  private formatData = (cfg: { sign: boolean, empNo?: string, password?: string }) => {
    const { sign, empNo, password } = cfg
    const { qcGroupRoles } = this.baseInfo
    const { qcCode, id } = this.query
    const {
      wardCode,
      evalDate,
      bedLabel,
      inpNo,
      followEvaluate,
      patientName,
      followEvaluateDate,
      bedNurseList,
      userList,
    } = this.master

    let itemList = [] as any[]
    let itemTypeList = [] as any[]
    let causeList = this.causeList.map((item: Cause) => {
      const { causeCode, checked } = item
      return {
        causeCode,
        checked
      }
    })

    for (let i = 0; i < this.itemGroupList.length; i++) {
      let itemGroup = this.itemGroupList[i]
      let originItemList = itemGroup.itemList

      itemTypeList.push({
        qcItemType: itemGroup.qcItemType,
        remark: itemGroup.remark
      })

      if (originItemList)
        for (let j = 0; j < originItemList.length; j++) {
          let item = originItemList[j]

          let newItem = {
            ...item,
            qcItemCode: item.qcItemCode,
            attachIds: item.attachIds,
            attachUrls: item.attachUrls,
            qcItemValue: item.qcItemValue
          } as any

          /**南医三加入remark字段 */
          if (appStore.HOSPITAL_ID === 'nys')
            newItem.remark = item.remark

          itemList.push(newItem)
        }
    }

    let params = {
      id,
      sign, //是否暂存 暂存false，提交true
      empNo: empNo || '',
      password: password || '',
      qcCode,
      wardCode,
      evalDate,
      patientId: '',
      patientName: patientName || '',
      visitId: '22',
      bedLabel,
      inpNo,
      measures: '',
      followEvaluate,
      followEvaluateDate: followEvaluateDate || '',
      attachIds: '',
      bedNurseList,
      qcGroupRoles,
      userList,
      itemList,
      itemTypeList,
      causeList
    } as any

    if (appStore.HOSPITAL_ID === 'gzsrm') {
      params.nodeAppointList = this.nodeAppointList
    }

    return params
  }
  // 
  private checkSaveGZSRM(params: any) {
    if (['gzsrm'].includes(appStore.HOSPITAL_ID)) {
      if (params.nodeAppointList && params.nodeAppointList.length > 0) {
        let index = params.nodeAppointList.findIndex((v: any) => {

          if (v.appointUserCode == 'QCR0003_FILTER_AUTH_DEPT' && v.userList.length === 0) {
            return true
          }
          return false
        })
        if (index > -1) {
          message.error('请填写指定质控组长')
          this.loading = false
          return false
        }
      }
    }
    return true
  }

  @action public formCache(success?: Function) {
    this.loading = true
    let params = this.formatData({ sign: false })
    if (!this.checkSaveGZSRM(params)) return
    let fn = appStore.hisMatch({
      map: {
        "whyx,whhk": qualityControlRecordApi.formSaveYX,
        default: qualityControlRecordApi.formSave
      },
      vague: true
    })
    fn.call(qualityControlRecordApi, params)
      .then((res: any) => {
        this.loading = false
        if (res.data && res.data.master) {
          success && success()

          let { history, location } = appStore
          if (res.data.master.id) {
            this.query.id = res.data.master.id

            let url = `${location.pathname}?${qs.stringify(this.query)}`

            history.replace(url)
          }
        }

      }, () => this.loading = false)
  }

  @action public formSubmit(user: { empNo: string, password: string }, success?: Function) {
    const { empNo, password } = user
    this.loading = true
    let params = this.formatData({
      sign: true,
      empNo,
      password
    })
    if (!this.checkSaveGZSRM(params)) return
    let fn = appStore.hisMatch({
      map: {
        "whyx,whhk": qualityControlRecordApi.formSaveYX,
        default: qualityControlRecordApi.formSave
      },
      vague: true
    })
    fn.call(qualityControlRecordApi, params)
      .then((res: any) => {
        this.loading = false

        if (res.data && res.data.master) {
          success && success()
        }
      }, () => this.loading = false)
  }

  //更新setNodeAppointListr对象信息
  @action public setNodeAppointList = (newNodeAppointList: Array<INodeAppoint>) => {
    this.nodeAppointList = [...newNodeAppointList]
  }
  //更新auditList值
  @action public setAuditList = (auditList: Array<IAudit>) => {
    this.auditList = [...auditList]
  }
  @computed get yxGradeObj(): Record<string, any> {
    if (!['whyx','whhk'].includes(appStore.HOSPITAL_ID)) return {}

    let right = 0;
    let fault = 0;
    let total = 0;
    let rate = 0;
    let totalScore = 100;
    let deductScore = 0;
    let noPlan = 0;
    for (let i = 0; i < this.itemGroupList.length; i++) {
      let itemList = this.itemGroupList[i].itemList;

      if (itemList)
        for (let j = 0; j < itemList.length; j++) {
          let item = itemList[j];
          switch (item.qcItemValue) {
            case "是":
              right++;
              break;
            case "否":
              fault++;
              break;
            case "不适用":
              noPlan++
              break
          }
          total++
          // 分数类型累计分数
          if (this.baseInfo.useScore) {
            // if (item.fixedScore) totalScore += item.fixedScore;

            if (['否', '', undefined].findIndex(v => v == item.qcItemValue)> -1) deductScore += Number(item.fixedScore);
          }
        }
    }
    total = total - noPlan
    // rate = totalScore == 0 ? 0 : parseFloat((((totalScore - deductScore) * 100) / totalScore).toFixed(2));
    rate = parseFloat(((right * 100) / total).toFixed(2));

    return {
      right,
      fault,
      total,
      rate,
      totalScore,
      deductScore,
      noPlan
    };
  }
  /**选择患者 */
  @action
  handlePatientSelect(data: any) {
    const { bedLabel, inpNo } = data[0]
    this.setMasterErrObj('inpNo', false)
    this.setMasterErrObj('bedLabel', false)
    
    this.setMaster({ ...this.master, inpNo, bedLabel })
    this.patientVisible = false
  }
}

export const qualityControlRecordEditModel = new QualityControlRecordEditModel()

