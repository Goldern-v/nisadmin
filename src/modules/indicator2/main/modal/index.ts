import {observable, computed} from "mobx";
import {api} from "../api";
import {defaultTableColumn} from '../config'

export class Modal {
  @observable public name: string = ''; //名字
  @observable public selectedDate: string = String(new Date().getFullYear()); //年份
  @observable public selectedDeptType = ""; //科室
  @observable public deptList: any[] = []; //科室列表
  @observable public isLoading = false; //内容loading状态
  @observable public tableColumn: any[] = []; //表头
  @observable public dataList: any[] = []; //返回的数据

  @computed
  get postObj() {
    return {
      wardCode: this.selectedDeptType,
      year: this.selectedDate
    };
  }

  constructor(name: string) {
    this.name = name
    this.tableColumn = defaultTableColumn
  }

  //查询数据
  async search() {
    let res = null
    this.isLoading = true
    if (this.name === '专科季度统计表') {
      res = await api.getDataBySpecial(this.postObj)
    } else {
      res = await api.getDataByPublic(this.postObj)
    }
    this.dataList = res.data
    this.isLoading = false
  }

  protected async getDeptList() {
    const {data} = await api.getDeptList('nursingUnit')
    this.deptList = data.deptList
    this.selectedDeptType = this.deptList[0]?.code
  }

  async init() {
    await this.getDeptList()
    await this.search()
  }
}

