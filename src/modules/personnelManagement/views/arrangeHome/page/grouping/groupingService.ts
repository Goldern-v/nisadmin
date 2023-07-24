import BaseApiService from "src/services/api/BaseApiService";

export default class GroupingService extends BaseApiService {
    public async getList() {
        return this.post('/schBedGroup/getList')
    }
    public async save(data:any) {
        return this.post('/schBedGroup/save',data)
    }
    public async delete(data:any) {
        return this.post('/schBedGroup/delete',data)
    }
    public async update(data:any) {
        return this.post('/schBedGroup/update',data)
    }
}
export const groupingService = new GroupingService();