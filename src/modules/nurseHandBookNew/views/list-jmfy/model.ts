import { action, computed, observable } from "mobx";
import { nurseHandBookService } from "../../services/NurseHandBookService";


class NurseHandBookJmfy {
  constructor() {
    this.getMenuList()
  }
  @observable public menuList:any =[]  //分类列表

  public  getMenuList(){
    nurseHandBookService.getFormList().then(res => {
      this.menuList =res.data
    })
  }
}


export const nurseHandbookJmfyModel = new NurseHandBookJmfy();
