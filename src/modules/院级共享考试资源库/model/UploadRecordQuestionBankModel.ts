import { observable, computed, action } from 'mobx'
import { questionBankManageService } from './../api/QuestionBankManageService'
import QuestionBankManageModel from './QuestionBankManageModel'

interface Bank {
  id: string,
  bankName: string
}

class UploadQuestionBankModel extends QuestionBankManageModel {
  @observable bank: Bank = {
    id: '',
    bankName: ''
  };
  @action setBank(bank: Bank) {
    this.bank = bank
  }
  @action getList() {
    let query = {
      bankId: this.bank.id,
      ...this.query,
    }

    // delete query.bankType;

    const successCallback = (list: any, total: number) => {
      this.setTableLoading(false);
      this.setTableData(list)
      this.setTableTotal(total)
    }

    this.setTableData([]);
    this.setTableLoading(true);
    questionBankManageService.getQuestionsByBankIdAndQuestionType(query).then(res => {
      successCallback(res.data.list || [], res.data.totalCount || 0)
    }, err => {
      this.setTableLoading(false);
    })
  }
}

export const uploadQuestionBankModel_hj1 = new UploadQuestionBankModel();