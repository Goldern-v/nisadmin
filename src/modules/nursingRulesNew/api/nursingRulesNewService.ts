import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs';

export default class NursingRulesApiService extends BaseApiService {
  /**主列表查询-分页查询（pc端） */
  public getBookListByParam(query: any) {
    return this.post('/hospitalBookshelf/getBookListByParam', query);
  }

  /**获取任务码（书籍新增、书籍版本修订时用 */
  // taskType 任务类型（1-代表新增书籍；2代表修订书籍版本）
  // bookId 书籍Id（当taskType=2时，此项不能为空）
  public getTaskCode(params: any) {
    return this.post('/hospitalBookshelf/generateTaskCode', qs.stringify(params));
  }

  /**根据任务编码获取临时文件夹下的正文列表(新增书籍、修订书籍时） */
  public getTaskBodyFileList(taskCode: string) {
    return this.post('/hospitalBookshelf/getTaskBodyFileList', qs.stringify({ taskCode }));
  }

  /**获取书籍正文文件列表 */
  public getBookBodyFileList(bookId: string) {
    return this.post('/hospitalBookshelf/getBookBodyFileList', qs.stringify({ bookId }));
  }

  /**上传pdf文件到正式文件夹 */
  // taskCode 任务码
  // bodyFile 文件
  public upLoadBookBodyFile(params: any) {
    let formData = new FormData();
    for (let x in params) {
      formData.append(x, params[x])
    }

    return this.post('/hospitalBookshelf/upLoadBookBodyFile', formData);
  }

  /**上传pdf文件到临时文件夹 */
  // taskCode 任务码
  // bodyFile 文件
  public upLoadTaskBodyFile(params: any) {
    let formData = new FormData();
    for (let x in params) {
      formData.append(x, params[x])
    }

    return this.post('/hospitalBookshelf/upLoadTaskBodyFile', formData);
  }

  /**新建书籍 */
  public addBook(params: any) {
    let formData = new FormData();
    for (let x in params) {
      if (x == 'cover') {
        if (Object.prototype.toString.call(params[x]) !== '[object String]') formData.append('coverFile', params[x])
      } else {
        formData.append(x, params[x])
      }
    }
    return this.post('/hospitalBookshelf/addBook', formData);
  }

  /**修订书籍 */
  public revBook(params: any) {
    let formData = new FormData();
    for (let x in params) {
      if (x == 'cover') {
        if (Object.prototype.toString.call(params[x]) !== '[object String]') formData.append('coverFile', params[x])
      } else {
        formData.append(x, params[x])
      }
    }
    return this.post('/hospitalBookshelf/revBook', formData);
  }

  /**修改书籍信息 */
  public updateBookInfo(params: any) {
    let formData = new FormData();
    for (let x in params) {
      if (x == 'cover') {
        if (Object.prototype.toString.call(params[x]) !== '[object String]') formData.append('coverFile', params[x])
      } else {
        formData.append(x, params[x])
      }
    }
    return this.post('/hospitalBookshelf/updateBookInfo', formData);
  }

  /**删除某个任务的临时文件夹下的单个pdf */
  public deleteTaskBodyFile(params: any) {
    return this.post('/hospitalBookshelf/deleteTaskBodyFile', qs.stringify(params));
  }

  /**清空书籍正文pdf文件 */
  public deleteBookBodyFile(params: any) {
    return this.post('/hospitalBookshelf/deleteBookBodyFile', qs.stringify(params));
  }

  /**删除某个任务的临时文件夹下的全部pdf */
  public deleteTaskAllBodyFiles(taskCode: string) {
    return this.post('/hospitalBookshelf/deleteTaskAllBodyFiles', qs.stringify({ taskCode }));
  }

  /**清空书籍正文全部pdf文件 */
  public deleteBookAllBodyFiles(bookId: string) {
    return this.post('/hospitalBookshelf/deleteBookAllBodyFiles', qs.stringify({ bookId }));
  }

  /**获取状态为已审核的书籍目录信息 */
  public getBookCataLog(bookId: string) {
    return this.post('/hospitalBookshelf/getBookCataLog', qs.stringify({ bookId }));
  }

  /**目录上传模板下载 */
  public getCatalogTemplate() {
    return this.get('/hospitalBookshelf/getCatalogTemplate', { responseType: 'blob' });
  }

  /**获取书籍的当前修订版本信息 */
  public getBookInfo(bookId: string) {
    return this.post(`/hospitalBookshelf/getBookVersion?bookId=${bookId}`, { bookId });
  }

  /**获取书籍的全部书籍目录 */
  public getAllBookCataLog(bookId: string) {
    return this.post(`/hospitalBookshelf/getAllBookCataLogTree`, qs.stringify({ bookId }));
  }
  /**获取书籍的修订记录 */
  public getRevisions(bookId: string) {
    return this.post(`/hospitalBookshelf/getRevisions`, qs.stringify({ bookId }));
  }
  /**获取收藏的书籍目录 */
  public getCollections(bookId: string) {
    return this.get(`/hospitalBookshelf/getCollections?${qs.stringify({ bookId })}`);
  }
}

export const nursingRulesApiService = new NursingRulesApiService()