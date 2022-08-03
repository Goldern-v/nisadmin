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
  @observable public commitStep = '';
  @observable public master = master;
  @observable public tableObjN1 = tableObjN1;  // 表单的数据1
  @observable public tableObjN2 = tableObjN2;  // 表单的数据2
  @observable public tableObjN3 = tableObjN3;  // 表单的数据3
  @observable public tableObjN4 = tableObjN4;  // 表单的数据4
  @observable public handlenodeDto = [] //审核流程内容
  @observable public attachmentList = [] //附件内容
 
  @computed get listObj() {
    let tableObj = {}

    this.handleDifferent(tableObj)
    
    return {
      master: this.master,
      itemDataMap: tableObj,
      commitStep: this.commitStep,
    }
  }

  // 处理不同的表逻辑
  handleDifferent(tableValue:any){
    let list = {'HSJS_0001':this.tableObjN1,'HSJS_0002':this.tableObjN2,'HSJS_0003':this.tableObjN3,'HSJS_0004':this.tableObjN4}
    for(let key in list){
      if (this.master.formCode == key) {
        return  tableValue = list[key]
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
          let list = {'HSJS_0001':this.tableObjN1,'HSJS_0002':this.tableObjN2,'HSJS_0003':this.tableObjN3,'HSJS_0004':this.tableObjN4}
          for(let key in list){
            if (this.master.formCode == key) {
              return  list[key] = { ...res.data.itemDataMap }
            }
          }
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
          this.handlenodeDto = res.data.handlenodeDto
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
        this.master = {
          id: '', // 晋升表code
          formCode: this.master.formCode, // 晋升表code
          formName: this.master.formCode, // 晋升表名称
          status: "-1", // 晋升表状态
          nextNodeCode: "", // 提交&&创建&&保存
          creatorNo: authStore.user?.empNo,
          creatorName: authStore.user?.empName,
          updaterNo: authStore.user?.empNo,
          updaterName: authStore.user?.empName,
          updateTime: moment().format("YYYY-MM-DD HH:mm"),
          currentLevel: authStore.user?.currentLevel,
          deptName: authStore.user?.deptName,
          empNo: authStore.user?.empNo,
          empName: authStore.user?.empNo,
          chainCode: "HSJS_COMMON",
          chainName: "护士晋升申请通用",
          attachmentCount: 0,
          lastCommitTime: "2022-07-20 14:51",
          hasRead: false,
          noPass: false,
        }
        this.flowStatus = ''
        this.editStatus = '创建'
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

  // 删除附件
  deleteAttachment(obj: any) {
    return badEventReportService.deleteAttachment(obj)
  }
}

export const PromotionDetaitUtils = new PromotionApp()