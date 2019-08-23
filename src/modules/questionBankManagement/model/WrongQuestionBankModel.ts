import { observable, computed, action } from 'mobx'
import { questionBankManageService } from './../api/QuestionBankManageService'
import QuestionBankManageModel from './QuestionBankManageModel'

class WrongQuestionBankModel extends QuestionBankManageModel {
  @observable status: string = '待处理';

  @action setStatus(status: string) {
    this.status = status;
  }

  @action getList() {
    let query = {
      status: this.status,
      ...this.query,
    }

    delete query.bankType;

    const successCallback = (list: any, total: number) => {
      this.setTableData(list)
      this.setTableTotal(total)
      this.setTableLoading(false);
    }

    this.setTableData([]);
    this.setTableLoading(true);
    questionBankManageService.getWrongQustionListBySearch(query).then(res => {
      successCallback(res.data.list || [], res.data.totalCount || 0)
    }, err => {
      this.setTableLoading(false);
    })
  }
}

export const wrongQuestionBankModel = new WrongQuestionBankModel();