import { observable, computed, action } from 'mobx'
import { appStore } from 'src/stores';
import { questionBankManageService } from '../api/QuestionBankManageService'

export default class QuestionBankManageModel {
  //查询参数
  @observable query: any = {
    bankType: '2',
    choiceType: '选择题',
    pageIndex: 1,
    pageSize: 20,
    searchingContent: ''
  }
  //表格请求状态
  @observable tableLoading: boolean = false;
  //总条数
  @observable tableTotal: number = 0;
  //表格内容
  @observable tableData: any[] = [];

  @action
  getList() {
    // console.log({ ...this.query })
    //questionBankManageService
    const successCallback = (list: any, total: number) => {
      this.setTableData(list)
      this.setTableTotal(total)
      this.setTableLoading(false);
    }
    this.setTableData([]);
    this.setTableLoading(true);
    questionBankManageService.getQuestionBankList(this.query).then(res => {
      // switch (this.query.choiceType) {
      //   case '选择题':
      //     successCallback(res.data.list || [], res.data.totalCount || 0)
      // }
      successCallback(res.data.list || [], res.data.totalCount || 0)
    }, err => {
      this.setTableLoading(false);
    })

  }

  @action
  setTableData(data: any[]) {
    this.tableData = data;
  }

  @action
  setQuery(newQuery: any) {
    this.query = newQuery;
  }

  @action
  setTableTotal(total: number) {
    this.tableTotal = total;
  }

  @action
  setTableLoading(loading: boolean) {
    this.tableLoading = loading;
  }
}

export const questionBankManageModel = new QuestionBankManageModel();