import BaseApiService from 'src/services/api/BaseApiService';

export default class CourseLibraryApi extends BaseApiService {
  // 上传课件
  updateFile(data: any) {
    return this.post('/studyAndTrain/courseLibrary/uploadPictures', data)
  }
  // 获取分页数据
  getData(params: any) {
    return this.post('/studyAndTrain/courseLibrary/queryPageList', params)
  }
  // 保存/更新课件
  saveOrUpdate(params: any) {
    return this.post('/studyAndTrain/courseLibrary/saveOrUpdate', params)
  }
  // 删除课件
  deleteCourse(id: string) {
    return this.post('studyAndTrain/courseLibrary/delete', { id })
  }
}
export const courseLibraryApi = new CourseLibraryApi()
export const formatResponseData = (res: any) => {
  if (res.code === '200') {
    if (res.data) {
      return res.data
    } else {
      return {}
    }
  }
  throw new Error(res)
}
export const getResponseData = (callback: any) => {
  return Promise
    .resolve(callback())
    .then(formatResponseData)
}