import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import axios from 'axios'
import { fileDownload } from 'src/utils/file/file'

export default class NursingRulesApiService extends BaseApiService {
  /**主列表查询-分页查询（pc端） */
  public getBookListByParam(query: any) {
    return this.post('/hospitalBookshelf/getBookListByParam', query);
  }

  /**获取任务码（书籍新增、书籍版本修订时用 */
  // taskType 任务类型（1-代表新增书籍；2-代表修改书籍;3代表修订书籍版本）
  // bookId 书籍Id（当taskType=2|3时，此项不能为空）
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

  /**根据bookID获取该书籍目录模板 */
  public exportLatelyBookCatalog(bookId: string) {
    return this.post('/hospitalBookshelf/exportLatelyBookCatalog', qs.stringify({ bookId }), { responseType: 'blob' });
  }

  /**获取书籍的当前修订版本信息 */
  public getBookInfo(bookId: string) {
    return this.post(`/hospitalBookshelf/getBookVersion?bookId=${bookId}`);
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
    return this.post(`/hospitalBookshelf/getCollections`, qs.stringify({ bookId }));
  }

  /**收藏目录 */
  public addCollection(params: any) {
    return this.post(`/hospitalBookshelf/addCollection`, qs.stringify(params));
  }
  /**取消收藏 */
  public cancelCollection(collectionId: string) {
    return this.post(`/hospitalBookshelf/cancelCollection`, qs.stringify({ collectionId }));
  }
  /**提交审核 */
  public submitToAudit(taskCode: string) {
    return this.post(`/hospitalBookshelf/submitToAudit`, qs.stringify({ taskCode }));
  }
  /**获取待审核章节 */
  public getToAuditChapters(bookId: string) {
    return this.post(`/hospitalBookshelf/getToAuditChapters`, qs.stringify({ bookId }));
  }
  /**章节审核 */
  public auditChapters(params: any) {
    return this.post(`/hospitalBookshelf/auditChapters`, params);
  }
  /**书籍设为无效或启用 */
  public changeBookAvailability(params: any) {
    return this.post(`/hospitalBookshelf/changeBookAvailability`, qs.stringify(params));
  }
  /**删除书籍 */
  public deleteBook(bookId: string) {
    return this.post(`/hospitalBookshelf/deleteBook`, qs.stringify({ bookId }));
  }
  /**根据tackCode获取书籍目录信息（pc端） */
  public getTaskCataLogTree(taskCode: string) {
    return this.post(`/hospitalBookshelf/getTaskCataLogTree`, qs.stringify({ taskCode }));
  }
  /**修改书籍信息 （书籍名、书籍简介、书籍封面）（pc端） */
  public updateTaskBookInfo(params: any) {
    let formData = new FormData();
    for (let x in params) {
      if (x == 'cover') {
        if (Object.prototype.toString.call(params[x]) !== '[object String]') formData.append('coverFile', params[x])
      } else {
        formData.append(x, params[x])
      }
    }
    return this.post(`/hospitalBookshelf/updateTaskBookInfo`, formData);
  }
  /**上传书籍目录(pc端) */
  public upLoadTaskCataLog(params: any) {
    let formData = new FormData();
    for (let x in params) {
      formData.append(x, params[x])
    }
    return this.post(`/hospitalBookshelf/upLoadTaskCataLog`, formData);
  }

  /**根据taskCode获取书籍信息 */
  public getTaskBookInfo(taskCode: string) {
    return this.post('/hospitalBookshelf/getTaskBookInfo', qs.stringify({ taskCode }))
  }

  /**下载文件 */
  public downloadPage(url: string, name?: string) {
    axios.get(url, { responseType: 'blob' }).then((res) => fileDownload(res, name))
  }

  /**根据taskCode nodeNum上传pdf */
  public upLoadTaskBodyFilebyNode(formData: FormData) {
    return this.post('/hospitalBookshelf/upLoadTaskBodyFilebyNode', formData)
  }

  /**获取修订章节 */
  public getChapterRevisions(treePathCode: string, bookId: string) {
    return this.post('/hospitalBookshelf/getChapterRevisions',
      qs.stringify({ treePathCode, bookId }))
  }

  /**修订单个章节 */
  public revChapter(
    params: {
      bookId: string,
      nodeNum: number | string,
      bodyFile: File,
      rematk: string,
      cataLogName: string
    }
  ) {
    let newParams = { ...params } as any
    let formData = new FormData()
    for (let x in newParams) {
      formData.append(x, newParams[x])
    }

    return this.post('/hospitalBookshelf/revChapter', formData)
  }

  /**pdf阅读时重新上传某个章节文件 */
  public upLoadChapterBodyFile(params: {
    nodeNum: any,
    bodyFile: File,
    remark: any,
    bookId: any
  }) {
    let newParams = { ...params } as any
    let formData = new FormData()
    for (let x in newParams) {
      formData.append(x, newParams[x])
    }

    return this.post('/hospitalBookshelf/upLoadChapterBodyFile', formData)
  }

  /**书籍变更记录列表查询 */
  public getChangeRecordListByParam(query: any) {
    return this.post('/hospitalBookshelf/getChangeRecordListByParam', query)
  }

  /**书籍变更记录列表类型下拉选项 */
  public getOperateTypes() {
    return this.get('/hospitalBookshelf/getOperateTypes')
  }
}

export const nursingRulesApiService = new NursingRulesApiService()