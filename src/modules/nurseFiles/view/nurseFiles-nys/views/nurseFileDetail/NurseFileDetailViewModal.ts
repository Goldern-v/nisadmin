import { observable, computed, action } from "mobx";
import { reverseKeyValue } from "src/utils/object/object";
import { DictItem } from "src/services/api/CommonApiService";
import service from "src/services/api";
let dictList = {
  文件类型: "nurse_junior_special_type",
  工作编制: "user_work_conversion",
  进修单位所属地: "level"
};

type DictList = typeof dictList;
export type DictName = keyof DictList;

class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0;
  @observable public nurserInfo: any = {};
  @observable public pageSpinning: boolean = false;

  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {};

  initDict() {
    service.commonApiService
      .multiDictInfo(Object.keys(reverseKeyValue(dictList)))
      .then(res => {
        this.dict = res.data;
      });
  }
  getDict(dictName: DictName): DictItem[] {
    return this.dict[dictList[dictName]] || [];
  }
  init() {
    this.initDict();
  }
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal();
