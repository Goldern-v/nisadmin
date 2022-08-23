import { observable, computed } from "mobx";
import {trainingSettingApi} from "../api/TrainingSettingApi";
import { crrentMonth, noCrrentMonth } from "src/utils/moment/crrentMonth";
import { fileDownload } from "src/utils/file/file";
import { appStore, authStore } from "src/stores/index";
import { T } from "antd/lib/upload/utils";
import { message as Message } from "src/vendors/antd";
import moment from 'moment';
import { DictItem } from 'src/services/api/CommonApiService';
import service from 'src/services/api';
import { reverseKeyValue } from 'src/utils/object/object';

let dictList = {
  留院结果: 'whyx_studytrain_hospitalresult',
}

type DictList = typeof dictList
export type DictName = keyof DictList

class ClinicalManagModel {
  @observable public id = ""; //菜单id
  @observable public keyWord = ""; //关键字
  @observable public selectedType = ""; //类型
  @observable public deptCodeMultiple =["全院"]; //科室编码
  @observable public deptNameMultiple =[]; //科室名称
  @observable public empName =""; //实习学生
  @observable public allDeptAll: { name: string; code: string }[] = []
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}

  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public yearImport = moment() as undefined | moment.Moment; //年份
  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public totalCount: any = 0; //总条数
  @observable public totalPage: any = 0; //总页数
  @observable public selectedDate: any = noCrrentMonth(); //护士长界面实习时间
  @observable public isNursingDepartment = false; //是否为护理部
  @observable public headerTableList = []; //头部表格内容
  @observable public tableList = []; //表格内容
  @observable public tableLoading = false; //表格loading
  @observable public hjSelectedType = ""; //状态

  @computed
  get postObj() { 
    const startFormat: string = "YYYY-MM-01"
    // 取最后一天
    const endFormat: string = `YYYY-MM-${moment(this.selectedDate[1]).daysInMonth()}`
    
    const internshipTime = (type: string, format: string) => {
      console.log('this.selectedDate', this.selectedDate)
      if(type == 'start') {
        return this.selectedDate[0] ? this.selectedDate[0].format(format) : null
      } else if (type == 'end') {
        return this.selectedDate[1] ? this.selectedDate[1].format(format) : null
      } else {
        return null
      }
    }
    return {
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      totalCount: this.totalCount, //总条数
      totalPage: this.totalPage, //总页数
      deptCodeMultiple: authStore.isDepartmentYaXin ? this.deptCodeMultiple : [], //科室编码
      deptNameMultiple: this.deptNameMultiple, //科室名称
      keyWord: this.keyWord, //关键字
      empName: this.empName, //姓名
      internshipStartTime: internshipTime('start', startFormat), //开始时间
      internshipEndTime: internshipTime('end', endFormat), // 结束时间
      isNursingDepartment: this.isNursingDepartment, //是否为护理部
    };
  }
  get getObj() {
    return {
      // year:moment(this.year).format("YYYY"), //年份
      pageIndex: this.pageIndex, //页码
      pageSize: this.pageSize, //每页大小
      totalCount: this.totalCount, //总条数
      keyWord: this.keyWord, //关键字
    };
  }
  
   //导出Excel
   export() {
    trainingSettingApi.exportPageListYaXin({
      ...this.postObj,
      fileName: appStore.queryObj.fileName || undefined
    }).then(res => {
      fileDownload(res);
    });
  }


  /** 获取表格数据 */
  onload() {
    this.tableLoading = true;
    trainingSettingApi.getFormListYaXin(this.postObj).then(res => {
      this.tableLoading = false;
      // this.tableList = res.data.list;
      // res.data.list.map((item:any)=> Number(item.isGoodIntern) == 1 ? item.isGoodIntern = '是' : item.isGoodIntern = '否')
      this.tableList = this.mergeRows(res.data.list);
      this.totalCount = res.data.totalCount;
      this.pageIndex = res.data.pageIndex;
      this.pageSize = res.data.pageSize;
    });
  }

  // 表格数据里添加rowSpan属性
  mergeRows = (data: any) => {
    
    let count = 0;//重复项的第一项
    let indexCount = 1;//下一项
    while (data.length > indexCount) {
      //取重复项中的第一项
      let item = data.slice(count, count + 1)[0]
      //表格数据中添加rowSpan属性，默认为1行
      if (!(item as any).rowSpan) {
        (item as any).rowSpan = 1;
      }
      //判断当前行是否和下一行相等，如果相等则当前行和下一行合并，下一行rowSpan为0 
      if ((item as any).empName == (data[indexCount] as any).empName) {
        (item as any).rowSpan += 1;
        (data[indexCount] as any).rowSpan = 0;
      } else {
        count = indexCount
      }
      indexCount++
    }
    return data
  }

  /** 获取实习科室 */
  getDeptCode() {
    trainingSettingApi.getUintList()
      .then(res => {
        this.headerTableList = res.data.deptList;
        
      })
  }

  /**删除患者 */
  deleteIdentification(obj:Object){
    return trainingSettingApi.deleteClinicalIdentification(obj)
  }


  /** 保存表格数据 */
  handleSave() {
    trainingSettingApi
      .saveClinicalYaXin(this.tableList)
      .then(res => {
        if (res.code == 200) {
          Message.success("保存成功");
          clinicalManagData.onload();
        } else {
          Message.error(`${res.dec}`);
        }
      })
      .catch(e => { });
  };

  initDict() {
    service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
    service.commonApiService.getNursingUnitAll().then((res) => {
      this.allDeptAll = res.data.deptList
    })
  }
  getDict(dictName: DictName | '全部科室'): DictItem[] {
    if (dictName == '全部科室') {
      return this.allDeptAll
    } else {
      return this.dict[dictList[dictName]] || []
    }
  }

  init() {
    this.onload();
    this.getDeptCode();
    this.initDict()
  }
}
export const clinicalManagData = new ClinicalManagModel();