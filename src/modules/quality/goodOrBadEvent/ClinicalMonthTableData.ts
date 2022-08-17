import { observable, computed } from "mobx";
import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Popover,
	Button,
	InputNumber
} from "src/vendors/antd";

import moment from 'moment'

class ClinicalMonthTableData {
  @observable public columns:ColumnProps<any>[] | any = []; //菜单id
  
  @observable public deptCode = ""; //科室






  @observable public sex =""; //性别
  @observable public selectTypeList: any = []; //类型
  @observable public selectedState = ""; //状态
  @observable public key: string = "0"; //状态
  @observable public pageIndex: any = 1; //页码
  @observable public pageSize: any = 20; //每页大小
  @observable public total: any = 0; //总条数
  @observable public tableList = []; //表格内容
  // @observable public tableLoading = false; //表格loading
  @observable public uploadingStatus = false; //上传状态
  @observable public uploadingPath = ""; //上传路径
  @observable public uploadingName = ""; //上传名称
  @observable public uploadingId = ""; //上传id

  @computed
  get postObj() {
    return {
      
    };
  }

  @computed
  public get greeting(){
    let dayList = [] as any, columnDay = {}

    const lastMonthDays = moment().subtract(1, 'month').daysInMonth()//上个月的总天数
    // 时间从上个月的26号开始到这个月的25号
    dayList = [...(Array.from({ length: (lastMonthDays - 26 + 1) }, (_, index) => index + 26 - 1 + 1)), ...(Array.from({ length: 25 }, (_, index) => index + 1))]
    // console.log(dayList)
    dayList.map((it: any) => {
      columnDay['ss_' + it] = 0
    })
    return columnDay
}




  /** 获取表格数据 */
  onload() {
    
  }

  init() {
    this.onload();
  }
}
export const clinicalMonthTableData = new ClinicalMonthTableData();