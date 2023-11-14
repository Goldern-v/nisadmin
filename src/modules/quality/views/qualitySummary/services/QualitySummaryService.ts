import BaseApiService from 'src/services/api/BaseApiService'
import { summaryModal } from '../view/Summary/SummaryModal';
import moment from 'moment'
import qs from 'qs';


export default class QualityService extends BaseApiService {
  
  public async getTemplateList(qcLevel: any) {
    return this.post(`/qcTemplateManage/templateListCheck`,{qcLevel});
  }

  public getPage(obj: any){
    return this.post(`/qcCheckCount/select`,obj)
  }

  public getPlato(obj: any){
    return this.post(`/qcCheckCount/plato`,obj)
  }

  public export(obj: any){
    return this.post(`/qcCheckCount/export`,obj,{responseType:'blob'})
  }

}

export const qualityService = new QualityService()
