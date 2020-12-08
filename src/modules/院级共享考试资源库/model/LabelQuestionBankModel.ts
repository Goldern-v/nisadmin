import { observable, computed, action } from 'mobx'
import { questionBankManageService } from './../api/QuestionBankManageService'
import QuestionBankManageModel from './QuestionBankManageModel'

interface Label {
  id: string,
  labelContent: string
}

class LabelQuestionBankModel_hj1 extends QuestionBankManageModel {
  @observable label: Label = {
    id: '',
    labelContent: ''
  };
  @action setLabel(label: Label) {
    this.label = label
  }
  @action getList() {
    let query = {
      labelId: this.label.id,
      ...this.query,
    }

    const successCallback = (list: any, total: number) => {
      this.setTableLoading(false);
      this.setTableData(list)
      this.setTableTotal(total)
    }

    this.setTableData([]);
    this.setTableLoading(true);
    questionBankManageService.getQuestionsByLabelId(query).then(res => {
      successCallback(res.data.list || [], res.data.totalCount || 0)
    }, err => {
      this.setTableLoading(false);
    })
  }
}

export const labelQuestionBankModel_hj1 = new LabelQuestionBankModel_hj1();