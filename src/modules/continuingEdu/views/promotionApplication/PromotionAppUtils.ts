import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import { PromotionApplicationApi } from './api/PromotionApplicationApi'
import { appStore, authStore } from "src/stores/index";
import moment from 'moment'
import { message } from "antd";
import { master, tableObjN1, tableObjN2, tableObjN3, tableObjN4, AdituCommitOneN1, AdituCommitTwoN1, AdituCommitOneN2, AdituCommitTwoN2, AdituCommitOneN3, AdituCommitTwoN3, AdituCommitOneN4, AdituCommitTwoN4 } from './types'



class PromotionApp {
  @observable public loading = false; // 晋升表code
  @observable public editStatus = '创建'; // 晋升表修改状态
  @observable public flowStatus = ''; // 填表流程主题状态
  @observable public edit = false; // 晋升表修改状态
  @observable public nextNodeCode = ""; // 提交&&创建&&保存
  @observable public tabsKey = '1'; // tabs的第几项
  @observable public commitStep = '';
  @observable public master = master;
  @observable public tableObjN1 = tableObjN1;  // 表单的数据1
  @observable public tableObjN2 = tableObjN2;  // 表单的数据2
  @observable public tableObjN3 = tableObjN3;  // 表单的数据3
  @observable public tableObjN4 = tableObjN4;  // 表单的数据4
  @observable public AdituCommitOneN1 = AdituCommitOneN1;  // 表单的数据 N0 1-4
  @observable public AdituCommitTwoN1 = AdituCommitTwoN1;  // 表单的数据 N0 6-7
  @observable public AdituCommitOneN2 = AdituCommitOneN2;  // 表单的数据 N1-4
  @observable public AdituCommitTwoN2 = AdituCommitTwoN2;  // 表单的数据 N1 6-7
  @observable public AdituCommitOneN3 = AdituCommitOneN3;  // 表单的数据 N2 1-4
  @observable public AdituCommitTwoN3 = AdituCommitTwoN3;  // 表单的数据 N2 6-7
  @observable public AdituCommitOneN4 = AdituCommitOneN4;  // 表单的数据 N3 1-4
  @observable public AdituCommitTwoN4 = AdituCommitTwoN4;  // 表单的数据 N3 6-7


  @observable public handlenodeDto: any = [] //审核流程内容
  @observable public attachmentList = [] //附件内容
  @observable public carePatientList = [
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
    {
      masterId: this.master.id,
      careTime: undefined,
      careMessage: "",
      medicalRecordNo: "",
      patientName: ""
    },
  ]

  @computed get listObj() {
    return {
      master: this.master,
    }
  }

  handleNewSet(arr:string[]):string[]{
    let a = []
    for(var i in arr){
        if(a.indexOf(arr[i])==-1){
            a.push(arr[i])
        }
    }   
    return a
  }

  handleEleBorder(ElementArr: string[], result: string) {
    if(ElementArr.length < 0) return
    ElementArr.map((item: string) => {
      let elementId = document.getElementById(item) 
      if(!elementId)  return
      elementId.style.border = result;
    })
  }

  // 处理不同的表逻辑
  handleDifferent() {
      let list = { 'HSJS_0001': this.tableObjN1, 'HSJS_0002': this.tableObjN2, 'HSJS_0003': this.tableObjN3, 'HSJS_0004': this.tableObjN4 }
      for (let key in list) {
        if (this.master.formCode == key) {
          let checkCode = ["JS0000037", "JS0000068", "JS0000071", "JS0000056", "JS0000093", "JS0000109", "JS0000112", "JS0000115", "JS0000118", "JS0000120", "JS0000122", "JS0000125", "JS0000126", "JS0000135", "JS0000139", "JS0000140", "JS0000141", "JS0000151", "JS0000153", "JS0000154", "JS0000155", "JS0000157", "JS0000159"]
          checkCode.map((item) => {
            list[key][item] = list[key][item] && list[key][item].toString()
          })
          return list[key]
        }
      }
  }
  // 重新赋值
  setAssignment(objList: any, keys: any) {
      return keys.map((item: any) => {
        objList[item] = objList[item] ? moment(objList[item]) : undefined
      })
  }
  // 重新赋值
  setAssignmentCheck(objList: any, keys: any) {
    keys.map((item: any) => {
      let arrStr: string = objList[item]
      if (arrStr) {
        return objList[item] = arrStr.split(',').filter((item: any) => item != '')
      }
    })
  }

  // 保存和创建
  onSave() {
    this.loading = true;
    this.commitStep = '';
    this.carePatientList.map((item: any) => {
      item.masterId = this.master.id
    })
    console.log(this.master, master);
    let obj = {
      master: this.master,
      itemDataMap: this.handleDifferent(),
      carePatientList: this.carePatientList,
      commitStep: this.commitStep,
    }
   
    PromotionApplicationApi.getSaveOrCommit(obj).then((res) => {
      if (res.code == 200) {
        this.loading = false;
        PromotionAppUtils.editStatus = '编辑'
        PromotionAppUtils.master.status = '0'
        this.createOnload()
      } else {
        this.editStatus = "创建";
        this.edit = false;
        this.loading = false;
      }
    }).catch(() => {
      this.loading = false;
    })
  }

 

  handelStep<T>(formList: any, formListTwo: any, rawForm: T) {
    if (this.master.nextNodeCode == 'commit') {

      let isInfo = Object.keys(formList).some((item: string) => !rawForm[item])
      if (isInfo) {
        Object.keys(formList).forEach((item: string) => {
          if(!rawForm[item]){
            return message.warning(`填写一到四中: ${formList[item]} 未填，请确认！`)
          }
        })
        // this.handleEleBorder(errEleData, "2px solid #f00")
       
      } else {
        this.carePatientList.map((item: any) => {
          item.masterId = this.master.id
        })
        let obj = {
          master: this.master,
          itemDataMap: this.handleDifferent(),
          commitStep: this.master.nextNodeCode || '',
          carePatientList: this.carePatientList,
        }
        this.loading = true;
        PromotionApplicationApi.getSaveOrCommit(obj).then((res) => {
          this.loading = false;
          this.createOnload()
        }).catch(() => {
          this.loading = false;
        })
      }
    } else if (this.master.nextNodeCode == 'commit_kh_pj') {
      let isInfo =  Object.keys(formListTwo).some((item: string) => !rawForm[item])
      if (isInfo) {
        return message.warning('填写六、七项还有信息未填，请确认！')
      } else {
        this.carePatientList.map((item: any) => {
          item.masterId = this.master.id
        })
        let obj = {
          master: this.master,
          itemDataMap: this.handleDifferent(),
          commitStep: this.master.nextNodeCode || '',
          carePatientList: this.carePatientList,
        }
        this.loading = true;
        PromotionApplicationApi.getSaveOrCommit(obj).then((res) => {
          this.loading = false;
          this.createOnload()
        }).catch(() => {
          this.loading = false;
        })
      }
    } else {
      message.warning('申请还待审核！')
    }
  }
  // 提交
  onSubmit() {
    if (this.master.formCode == 'HSJS_0001') {
      this.handelStep<object>(this.AdituCommitOneN1, this.AdituCommitTwoN1, this.tableObjN1)
    } else if (this.master.formCode == 'HSJS_0002') {
      this.handelStep<object>(this.AdituCommitOneN2, this.AdituCommitTwoN2, this.tableObjN2)
    }
    else if (this.master.formCode == 'HSJS_0003') {
      this.handelStep<object>(this.AdituCommitOneN3, this.AdituCommitTwoN3, this.tableObjN3)
    }
    else if (this.master.formCode == 'HSJS_0004') {
      this.handelStep<object>(this.AdituCommitOneN4, this.AdituCommitTwoN4, this.tableObjN4)
    }

  }
  // 撤销
  onCancelForm() {
    return PromotionApplicationApi.getcancelById(this.master.id)
  }

  // 获取当前用户信息
  getTimingUser(empNo:string | undefined){
    return PromotionApplicationApi.getTimingUser(empNo)
  }

  // 获取当前用户的晋升表数据
  createOnload() {
    this.loading = true;
    let createObj: any = {
      empNo: authStore.user?.empNo,
      formCode: this.master.formCode,
    };
    PromotionApplicationApi.getByEmpNoAndFormCode(createObj).then(res => {
      if (res.data) {
        this.master = { ...res.data.master }
        if (Object.keys(res.data.itemDataMap).length) {
          let dateCode = ["JS0000004", "JS0000008", "JS0000009", "JS0000038", "JS0000041", "JS0000054", "JS0000057", "JS0000060", "JS0000065", "JS0000066", "JS0000075", "JS0000077", "JS0000079", "JS0000081", "JS0000083", "JS0000085", "JS0000087", "JS0000089", "JS0000091", "JS0000097", "JS0000100", "JS0000129", "JS0000131", "JS0000136", "JS0000160", "JS0000162", "JS0000164", "JS0000166", "JS0000168", "JS0000170"]
          let checkCode = ["JS0000037", "JS0000068", "JS0000071", "JS0000056", "JS0000093", "JS0000109", "JS0000112", "JS0000115", "JS0000118", "JS0000120", "JS0000122", "JS0000125", "JS0000126", "JS0000135", "JS0000139", "JS0000140", "JS0000141", "JS0000151", "JS0000153", "JS0000154", "JS0000155", "JS0000157", "JS0000159"]
          this.setAssignment(res.data.itemDataMap, dateCode)
          this.setAssignmentCheck(res.data.itemDataMap, checkCode)

          // 跟据不同表赋值
          if (this.master.formCode == 'HSJS_0001') {
            this.tableObjN1 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0002') {
            this.tableObjN2 = { ...res.data.itemDataMap }
            this.carePatientList = res.data.carePatientList.length ? res.data.carePatientList : [
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
            ]
          } else if (this.master.formCode == 'HSJS_0003') {
            this.tableObjN3 = { ...res.data.itemDataMap }
            this.carePatientList = res.data.carePatientList.length ? res.data.carePatientList : [
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
              {
                masterId: this.master.id,
                careTime: undefined,
                careMessage: "",
                medicalRecordNo: "",
                patientName: ""
              },
            ]
          } else if (this.master.formCode == 'HSJS_0004') {
            this.tableObjN4 = { ...res.data.itemDataMap }
          }
        }
        this.attachmentList = res.data.attachmentList.map((item: any, index: number) => {
          item.status = item.status == 1 ? 'done' : 'error'
          item.url = item.path
          return item
        })
        if (res.data.handlenodeDto.length) {

          let DtoData = res.data.handlenodeDto.some((item: any) => item.status == '1')
          if (DtoData) {
            let noZeroData = res.data.handlenodeDto.filter((item: any) => item.status != '0')
            let lastData = res.data.handlenodeDto.find((item: any) => item.status == '0')
            this.handlenodeDto = lastData ? [...noZeroData, lastData] : noZeroData
          } else {
            let lastData = res.data.handlenodeDto.find((item: any) => item.status == '0')
            this.handlenodeDto = lastData
          }
        } else {
          this.handlenodeDto = []
        }
        if(this.master.formCode == 'HSJS_0004'){
          // N3升级N4的状态要特殊处理
          switch (res.data.master.status) {
            case '0':
            case '-2':
              this.flowStatus = '0'
              break;
            case '1':
            case '2':
            case '3':
              this.flowStatus = '1'
              break;
            case '4':
              this.flowStatus = '2'
              break;
            case '5':
            case '6':
              this.flowStatus = '3'
              break;
            case '7':
              this.flowStatus = '4'
              break;
            default:
              this.flowStatus = ''
              break;
          }
        }else{
          switch (res.data.master.status) {
            case '0':
              this.flowStatus = '0'
              break;
            case '1':
            case '2':
              this.flowStatus = '1'
              break;
            case '3':
              this.flowStatus = '2'
              break;
            case '4':
              this.flowStatus = '3'
              break;
            case '5':
              this.flowStatus = '3'
              break;
            case '6':
              this.flowStatus = '4'
              break;
            default:
              this.flowStatus = ''
              break;
          }
        }
        
        if (this.editStatus == '编辑' || this.editStatus == '取消编辑' || this.master.id) {
          this.editStatus = '编辑'
        } else {
          this.editStatus = '创建'
        }
      } else {
        this.master = { ...this.master, id: '', currentLevel: authStore.user?.nurseHierarchy, }
        this.flowStatus = ''
        this.editStatus = '创建'
        this.attachmentList = []
        this.handlenodeDto = []
        // 跟据不同表赋值
        if (this.master.formCode == 'HSJS_0001') {
          this.tableObjN1 = tableObjN1
        } else if (this.master.formCode == 'HSJS_0002') {
          this.tableObjN2 = tableObjN2
        } else if (this.master.formCode == 'HSJS_0003') {
          this.tableObjN3 = tableObjN3
        } else if (this.master.formCode == 'HSJS_0004') {
          this.tableObjN4 = tableObjN4
        }
      }
      this.loading = false;

    })
  }

  // 删除附件
  deleteAttachment(obj: any) {
    return PromotionApplicationApi.deleteAttachment(obj)
  }
  
  // 删除表单
  onRemove(id:any){
    return PromotionApplicationApi.removeById(id)
  }
}

export const PromotionAppUtils = new PromotionApp()
