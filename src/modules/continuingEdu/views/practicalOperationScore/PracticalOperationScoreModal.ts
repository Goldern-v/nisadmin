import { observable, computed, action } from "mobx";
import { operationScoreApi } from './api/OperationScore'
import { fileDownload } from "src/utils/file/file";
import moment from 'moment'
import { message } from "antd";

class PracticalOperationScore {
  @observable public keyWord = ""; //;请输入要搜索的标题或章节
  @observable public tableLoading = false; //;请输入要搜索的标题或章节
  @observable public tableList = []; //表格内容
  @observable public pageIndex:any = 1; //页码
  @observable public pageSize:any = 20; //每页大小
  @observable public total:any = 0; //总条数
  @observable public subissionTimeBeginIndex:string | undefined = ''; //提交时间起始坐标
  @observable public subissionTimeEndIndex:string | undefined = ''; //提交时间终止坐标
  @observable public saveImportList:any = []; //导入模板数据

  @computed
  get postObj() {
    return {
      keyWord: this.keyWord,
      subissionTimeBeginIndex:this.subissionTimeBeginIndex,
      subissionTimeEndIndex: this.subissionTimeEndIndex,
      pageSize:this.pageSize,
      pageIndex:this.pageIndex,
      total:this.total,
    };
  }
  /** 查询接口 */
  async onload(){
    this.tableLoading = true;
    let {data} = await operationScoreApi.praticalGradeManage(this.postObj)
    this.tableLoading = false;
    this.tableList = data.list;
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.total = data.totalCount;
  }
  /**
   * 删除
   */
   getDeleteByPaperId(id:any) {
    operationScoreApi.getDeleteByPaperId(id).then((res)=>{
      if (res.code == 200) {
        message.success("文件删除成功");
        this.onload();
      } else {
        message.error(`${res.dec}`);
      }
    })
   }
     /** 下载模板 */
     getDownloadTemplate() {
      operationScoreApi.downloadTemplate()
        .then(res => fileDownload(res))
    }

}

export const practicalOperationScore = new PracticalOperationScore();