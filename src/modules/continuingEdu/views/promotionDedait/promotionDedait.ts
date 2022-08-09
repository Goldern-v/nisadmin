import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import { badEventReportService } from './services/BadEventReportService'
import { appStore, authStore } from "src/stores/index";
import moment from 'moment'
import {master,tableObjN1,tableObjN2,tableObjN3,tableObjN4} from './types'

class PromotionApp {
  @observable public loading = false; // 晋升表code
  @observable public editStatus = '编辑'; // 晋升表修改状态
  @observable public flowStatus = ''; // 填表流程主题状态
  @observable public edit = false; // 晋升表修改状态
  @observable public nextNodeCode = ""; // 提交&&创建&&保存
  @observable public tabsKey = '1'; // tabs的第几项
  @observable public isEditList = true; // 是否显示空状态
  
  @observable public commitStep = '';
  @observable public master = master;
  @observable public tableObjN1 = tableObjN1;  // 表单的数据1
  @observable public tableObjN2 = tableObjN2;  // 表单的数据2
  @observable public tableObjN3 = tableObjN3;  // 表单的数据3
  @observable public tableObjN4 = tableObjN4;  // 表单的数据4
  @observable public handlenodeDto:any[] = [] //审核流程内容
  @observable public attachmentList = [] //附件内容
  @observable public  carePatientList = [
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
    {
      masterId:'',
      careTime:"",
      careMessage:"",
      medicalRecordNo:"",
      patientName:""
    },
  ]
  @computed get listObj() {
    let tableObj = {}
    return {
      master: this.master,
      itemDataMap: tableObj,
      commitStep: this.commitStep,
    }
  }

  // 保存和创建
  onSave() {
    this.loading = true;
    this.commitStep = '';
    let obj = {
      master : this.master,
      itemDataMap: this.handleDifferent(),
      commitStep: this.commitStep,
      carePatientList: this.carePatientList
    }
    badEventReportService.getSaveOrCommit(obj).then((res) => {
      if(res.code == 200){
        this.loading = false;
        this.createOnload()
      }else{
        this.loading = false;
      }
    }).catch(() => {
      this.loading = false;
    })
  }
  // 处理不同的表逻辑
  handleDifferent(){
    let list = {'HSJS_0001':this.tableObjN1,'HSJS_0002':this.tableObjN2,'HSJS_0003':this.tableObjN3,'HSJS_0004':this.tableObjN4}
    for(let key in list){
      if (this.master.formCode == key) {
        let checkCode =["JS0000037","JS0000068","JS0000071","JS0000056","JS0000093","JS0000109","JS0000112","JS0000115","JS0000118","JS0000120","JS0000122","JS0000125","JS0000126","JS0000135","JS0000139","JS0000140","JS0000141","JS0000151","JS0000153","JS0000154","JS0000155","JS0000157","JS0000159"]
        checkCode.map((item)=>{
          list[key][item] = list[key][item]&& list[key][item].toString()
        })
        return  list[key]
      }
    } 
  }

  // 重新赋值
  setAssignment(objList:any , keys:any) {
    return  keys.map((item:any)=> objList[item]= moment(objList[item]))
  }
  // 重新赋值
  setAssignmentCheck(objList:any , keys:any) {
    keys.map((item:any)=>{
      let arrStr: string = objList[item]
      if (arrStr) {
        return objList.JS0000037 = arrStr.split(',').filter((item: any) => item != '')
      }
    })
  }

  // 获取当前用户的晋升表id
  createOnload() {
    this.loading = true;
    let createObj: any = {
      id: this.master.id,
    };
    badEventReportService.getDetailList(createObj).then(res => {
      this.loading = false;
      if (res.data) {
        this.master = { ...res.data.master }
        if(Object.keys(res.data.itemDataMap).length){
          let dateCode = ["JS0000008","JS0000009","JS0000038","JS0000041","JS0000057","JS0000075","JS0000077","JS0000060","JS0000065","JS0000066","JS0000075","JS0000077","JS0000079","JS0000081","JS0000083","JS0000085","JS0000087","JS0000089","JS0000091","JS0000097","JS0000100","JS0000129","JS0000131","JS0000136","JS0000162","JS0000164","JS0000166","JS0000168","JS0000170"]
          let checkCode =["JS0000037","JS0000068","JS0000071","JS0000056","JS0000093","JS0000109","JS0000112","JS0000115","JS0000118","JS0000120","JS0000122","JS0000125","JS0000126","JS0000135","JS0000139","JS0000140","JS0000141","JS0000151","JS0000153","JS0000154","JS0000155","JS0000157","JS0000159"]
          this.setAssignment(res.data.itemDataMap,dateCode)
          this.setAssignmentCheck(res.data.itemDataMap,checkCode)
          // 跟据不同表赋值
          if (this.master.formCode == 'HSJS_0001') {
            this.tableObjN1 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0002') {
            this.tableObjN2 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0003') {
            this.tableObjN3 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0004') {
            this.tableObjN4 = { ...res.data.itemDataMap }
          }
        }
        this.attachmentList = res.data.attachmentList.map((item: any, index: number) => {
          item.status = item.status == 1 ? 'done' : 'error'
          item.url = item.path
          return item
        })
        if(res.data.handlenodeDto.length){
          let DtoData = res.data.handlenodeDto.some((item:any)=>item.status == '1')
          if(DtoData){
            let noZeroData = res.data.handlenodeDto.filter((item:any)=> item.status != '0')
            let lastData = res.data.handlenodeDto.find((item:any)=> item.status == '0')
            this.handlenodeDto = [...noZeroData,lastData]
          }
        }else{
          this.handlenodeDto = []
        }
        switch (res.data.master.status) {
          case '':
            this.flowStatus = ''
            break;
          case '0':
            this.flowStatus = '0'
            break;
          case '-2':
            this.flowStatus = '0'
            break;
          case '1':
            this.flowStatus = '1'
            break;
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
            break;
        }
        if (this.editStatus == '编辑' || this.editStatus == '取消编辑' || this.master.id) {
          this.editStatus = '编辑'
        }
      }else{
        this.master = this.master
        this.flowStatus = ''
        this.editStatus = '编辑'
        this.attachmentList = []
        this.handlenodeDto = []
        // 跟据不同表赋值
        if (this.master.formCode == 'HSJS_0001') {
          this.tableObjN1 = this.tableObjN1
        } else if (this.master.formCode == 'HSJS_0002') {
          this.tableObjN2 = this.tableObjN2
        } else if (this.master.formCode == 'HSJS_0003') {
          this.tableObjN3 = this.tableObjN3
        } else if (this.master.formCode == 'HSJS_0004') {
          this.tableObjN4 = this.tableObjN4
        }
      }
      
    })
  }

  // 跟据用户名称和formCode获取表
  getUesrPromotionList() {
    this.loading = true;
    let createObj: any = {
      empNo: authStore.user?.empNo,
      formCode: this.master.formCode,
    };
    badEventReportService.getByEmpNoAndFormCode(createObj).then((res)=>{
      this.loading = false;
      if (res.data) {
        this.master = { ...res.data.master }
        if(Object.keys(res.data.itemDataMap).length){
          let dateCode = ["JS0000008","JS0000009","JS0000038","JS0000041","JS0000057","JS0000075","JS0000077","JS0000060","JS0000065","JS0000066","JS0000075","JS0000077","JS0000079","JS0000081","JS0000083","JS0000085","JS0000087","JS0000089","JS0000091","JS0000097","JS0000100","JS0000129","JS0000131","JS0000136","JS0000162","JS0000164","JS0000166","JS0000168","JS0000170"]
          let checkCode =["JS0000037","JS0000068","JS0000071","JS0000056","JS0000093","JS0000109","JS0000112","JS0000115","JS0000118","JS0000120","JS0000122","JS0000125","JS0000126","JS0000135","JS0000139","JS0000140","JS0000141","JS0000151","JS0000153","JS0000154","JS0000155","JS0000157","JS0000159"]
          this.setAssignment(res.data.itemDataMap,dateCode)
          this.setAssignmentCheck(res.data.itemDataMap,checkCode)
          // 跟据不同表赋值
          if (this.master.formCode == 'HSJS_0001') {
            this.tableObjN1 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0002') {
            this.tableObjN2 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0003') {
            this.tableObjN3 = { ...res.data.itemDataMap }
          } else if (this.master.formCode == 'HSJS_0004') {
            this.tableObjN4 = { ...res.data.itemDataMap }
          }
        }
        this.attachmentList = res.data.attachmentList.map((item: any, index: number) => {
          item.status = item.status == 1 ? 'done' : 'error'
          item.url = item.path
          return item
        })
        if(res.data.handlenodeDto.length){
          let DtoData = res.data.handlenodeDto.some((item:any)=>item.status == '1')
          if(DtoData){
            let noZeroData = res.data.handlenodeDto.filter((item:any)=> item.status != '0')
            let lastData = res.data.handlenodeDto.find((item:any)=> item.status == '0')
            this.handlenodeDto = [...noZeroData,lastData]
          }
        }else{
          this.handlenodeDto = []
        }
        switch (res.data.master.status) {
          case '':
            this.flowStatus = ''
            break;
          case '0':
            this.flowStatus = '0'
            break;
          case '-2':
            this.flowStatus = '0'
            break;
          case '1':
            this.flowStatus = '1'
            break;
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
            break;
        }
        if (this.editStatus == '编辑' || this.editStatus == '取消编辑' || this.master.id) {
          this.editStatus = '编辑'
        }
      }else{
        this.isEditList = false;
      }
      
    })
  }
 
  // 删除附件
  deleteAttachment(obj: any) {
    return badEventReportService.deleteAttachment(obj)
  }
}

export const PromotionDetaitUtils = new PromotionApp()