import { action, observable, computed } from 'mobx'

export interface BaseParams {
  cover: string | File,
  fileList: any[],
  title: string,
  desc: string
}

export class EditPageModel {
  @observable id = ''
  @observable editType = 'new' //new 新建 upadte 修改 repair 修订
  //基本信息
  @observable baseParams: BaseParams = {
    cover: '' as any,
    fileList: [] as any[],
    title: '',
    desc: ''
  }
  //上传状态
  @observable uploadLoading = false
  //目录信息
  @observable indexParams = {
  }
  //预览信息
  @observable previewInfo = {

  }

  @action public inited() {
    this.baseParams = {
      cover: '' as any,
      fileList: [] as any[],
      title: '',
      desc: ''
    }
  }

  @action public setBaseParams(newParams: BaseParams) {
    this.baseParams = { ...newParams }
  }

  @action public setUploadLoading = (loading: boolean) => {
    this.uploadLoading = loading
  }

  @action public formatFileSize = (limit: number) => {
    var size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
      size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
      size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
      size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分  
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  }
}

export const editPageModel = new EditPageModel();