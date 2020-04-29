import { observable, computed, action } from 'mobx'
import { questionBankManageService } from './../api/QuestionBankManageService'
import QuestionBankManageModel from './QuestionBankManageModel'

class WrongQuestionBankModel extends QuestionBankManageModel {
  @observable status: string = '待处理';

  @action setStatus(status: string) {
    this.status = status;
  }

  @action getList() {
    const { pageIndex, pageSize, searchingContent } = this.query
    let query = {
      pageIndex,
      pageSize,
      // keyword: searchingContent
    }

    const successCallback = (list: any, total: number) => {
      this.setTableLoading(false);
      this.setTableData(list)
      this.setTableTotal(total)
    }

    this.setTableData([]);
    this.setTableLoading(true);

    if (this.status == '待处理') {
      questionBankManageService.getWrongQustionHandleList(query)
        .then(res => {
          successCallback(res.data.list || [], res.data.totalCount || 0)
        }, err => {
          this.setTableLoading(false);
        })
    } else {
      questionBankManageService.getWrongQustionSolvedList(query)
        .then(res => {
          successCallback(res.data.list || [], res.data.totalCount || 0)
        }, err => {
          this.setTableLoading(false);
        })
    }
  }
}

export const wrongQuestionBankModel = new WrongQuestionBankModel();