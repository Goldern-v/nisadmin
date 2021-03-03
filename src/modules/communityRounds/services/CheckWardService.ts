import BaseApiService from "src/services/api/BaseApiService";
import moment from "moment";
import qs from "qs";

export default class CheckWardService extends BaseApiService {
  //添加修改查房记录
  public saveOrUpdate(obj: any) {
    return this.post(`/communitySR/saveOrUpdate`, obj);
  }

  //根据参数获取查房记录列表
  public getPage(obj: any) {
    return this.post(`/communitySR/getPage`, obj);
  }

  // 获取所有社区列表
  public getCommunityList() {
    return this.get(`/dict/dictInfo/c_sreach_room_community`);
  }

  // 上传附件
  public uploadAttachment(file: any) {
    return this.post(`/communitySR/upload`, file);
  }

  // 删除记录
  public delete(id: any) {
    return this.get(`/communitySR/delete/${id}`);
  }

  //获取查房记录详情
  public getDetail(id: any) {
    return this.get(`/communitySR/detail/${id}`);
  }

  //审核流程
  public handleNode(obj: any) {
    return this.post(`/communitySR/handleNode`, obj);
  }
}

export const checkWardService = new CheckWardService();
