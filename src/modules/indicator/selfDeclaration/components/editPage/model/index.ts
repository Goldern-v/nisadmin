import { observable } from "mobx";
import moment from "moment";

export interface FormModelType {
  getMaster: Function,
  setMaster: Function,
}

class FormModel implements FormModelType {
  @observable private master: any = {}
  @observable private itemDataMap: any = {}

  constructor() {
    this.initData()
  }

  public initData(master = {}, itemDataMap = {}) {
    this.master = master
    this.itemDataMap = itemDataMap
  }

  public getMaster() {
    return this.master
  }

  public setMaster(master: any) {
    const data = { ...this.master, ...master }
    data.admissionDate = data.admissionDate ? moment(master.admissionDate) : undefined
    this.master = data
  }

  public getItemDataMap() {
    return this.itemDataMap
  }

  public setItemDataMap(itemDataMap: any) {
    this.itemDataMap = { ...this.itemDataMap, ...itemDataMap }
  }

}

export default new FormModel()
