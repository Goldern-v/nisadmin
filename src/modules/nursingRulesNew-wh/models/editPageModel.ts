import { action, observable, computed } from 'mobx'
import { nursingRulesApiService } from './../api/nursingRulesNewService'

export interface BaseParams {
  cover: string | File,
  bookName: string,
  bookBrief: string
}

export interface FileItem {
  fileName: string,
  filePath: string,
  fileSize: string | number,
  status?: string
}

export class EditPageModel {
  // @observable id = ''
  // @observable taskType = '1' //new 新建 upadte 修改 repair 修订
  private defaultInfo = {
    bookId: '',
    taskType: '',
    taskCode: '',
  }

  @observable baseInfo = { ...this.defaultInfo }
  //基本信息
  @observable baseParams: BaseParams = {
    cover: '',
    bookName: '',
    bookBrief: ''
  }
  //上传文件列表
  @observable fileList = [] as FileItem[]
  //目录列表
  //基本接口请求状态
  @observable baseLoading = false
  //上传状态
  @observable uploadLoading = false
  //总请求状态
  @computed get loading() {
    return this.baseLoading || this.uploadLoading
  }
  //目录信息
  @observable indexParams = [] as any[]
  //预览信息
  @observable previewInfo = {

  }
  //编辑类型名称
  @computed get taskName() {
    switch (this.baseInfo.taskType) {
      case '1':
        return '新建书籍'
      case '2':
        return '编辑书籍'
      case '3':
        return '修订书籍'
      default:
        return ''
    }
  }

  //获取全部章节数量
  @computed get chapterTotalSize() {
    let size = 0
    for (let i = 0; i < this.indexParams.length; i++) {
      let childrenList = this.indexParams[i].childrenList || []
      size += childrenList.length
    }

    return size
  }

  //获取已上传章节数量
  @computed get chapterUploadedSize() {
    let size = 0
    for (let i = 0; i < this.indexParams.length; i++) {
      let childrenList = this.indexParams[i].childrenList || []
      // let uploadedList = childrenList.filter((item: any) => item.urls && item.urls.length > 0)
      let uploadedList = childrenList.filter((item: any) => {
        let target = this.fileList
          .find((file: any) => file.fileName == item.fileName && file.status == 'success')
        if (target) return true
        else return false
      })

      size += uploadedList.length || 0
    }
    return size
  }

  //获取已上传文件的章节
  // @computed get chapterWithFile():any[]{
  //   let chapterList:any[] = []

  //   for(let i=0;i<this.indexParams.length;i++){
  //     let item0 = this.indexParams[i]
  //     if(item0&&item0.childrenList instanceof Array)
  //     for(let j=0;j<item0.length;j++){
  //       let item1 = item0[j]

  //     }
  //   }
  //   return []
  // }

  //初始化model
  @action public inited(newInfo?: any) {
    this.setBaseInfo({ ...this.defaultInfo, ...newInfo })

    this.setBaseLoading(false)
    this.setUploadLoading(false)

    this.setBaseParams({
      cover: '',
      bookName: '',
      bookBrief: ''
    })

    this.setFileList([])
    //获取书籍信息
    this.getBookData()
    //获取上传文件列表
    this.getFileList()
    //获取目录
    this.getIndex()
  }

  @action public setBaseInfo(baseInfo: any) {
    this.baseInfo = { ...baseInfo }
  }

  @action public setBaseParams(newParams: BaseParams, async?: boolean, callback?: Function) {
    this.baseParams = { ...newParams }

    if (async) {
      let { taskCode } = this.baseInfo
      if (taskCode)
        nursingRulesApiService
          .updateTaskBookInfo({ taskCode, ...this.baseParams })
          .then(res => {
            callback && callback(true)
          }, () => callback && callback(false))
    }
  }

  @action public setIndexParams(newIndex: any[]) {
    this.indexParams = [...newIndex]
  }

  @action public setUploadLoading = (loading: boolean) => {
    this.uploadLoading = loading
  }

  @action public setBaseLoading = (loading: boolean) => {
    this.baseLoading = loading
  }

  @action public setFileList = (newList: FileItem[]) => {
    this.fileList = newList
  }

  @action public getBookData = () => {
    let { taskCode } = this.baseInfo
    if (!taskCode) return
    this.setBaseLoading(true)
    // nursingRulesApiService.getBookInfo(bookId).then(res => {
    //   this.setBaseLoading(false)
    //   this.setBaseParams({
    //     cover: res.data.coverPath,
    //     bookName: res.data.bookName,
    //     bookBrief: res.data.bookBrief
    //   })
    // }, () => this.setBaseLoading(false))
    nursingRulesApiService
      .getTaskBookInfo(taskCode)
      .then(res => {
        this.setBaseLoading(false)
        this.setBaseParams({
          cover: res.data.coverPath,
          bookName: res.data.bookName,
          bookBrief: res.data.bookBrief
        })
      }, () => this.setBaseLoading(false))
  }

  //获取文件列表
  @action public getFileList = () => {

    let callback = (res: any) => {
      if (res.data) this.setFileList(res.data.map((item: any) => {
        return { ...item, status: 'success' } as FileItem
      }))
    }
    if (this.baseInfo.taskCode) {
      nursingRulesApiService
        .getTaskBodyFileList(this.baseInfo.taskCode)
        .then(res => callback(res))
    } else {
      nursingRulesApiService
        .getBookBodyFileList(this.baseInfo.bookId)
        .then(res => callback(res))
    }
  }

  //获取目录信息
  @action public getIndex = (success?: Function) => {
    this.setIndexParams([])
    if (this.baseInfo.taskCode) nursingRulesApiService
      .getTaskCataLogTree(this.baseInfo.taskCode).
      then(res => {
        success && success()
        this.setIndexParams(res.data)
      })
  }

  //上传page文件
  @action public uploadFile = (file: File, callback: Function) => {
    if (this.baseInfo.taskCode) {
      //上传临时文件夹
      nursingRulesApiService
        .upLoadTaskBodyFile({
          taskCode: this.baseInfo.taskCode,
          bodyFile: file
        })
        .then(res => callback(res), err => callback())
    } else {
      //上传正式文件夹
      nursingRulesApiService
        .upLoadBookBodyFile({
          bookId: this.baseInfo.bookId,
          bodyFile: file
        })
        .then(res => callback(res), err => callback())
    }
  }

  //删除上传文件
  @action public deletFile = (item: FileItem, _callback?: Function) => {
    let { fileName } = item
    let idx = this.fileList.indexOf(item)
    let { taskCode, bookId } = this.baseInfo

    let callback = (res?: any) => {
      this.setBaseLoading(false)
      if (res && res.code == 200) {
        let newFileList = [...this.fileList]

        newFileList.splice(idx, 1)

        this.setFileList(newFileList)
        _callback && _callback(true)
      } else {
        _callback && _callback(false)
      }
    }

    this.setBaseLoading(true)
    if (taskCode) {
      nursingRulesApiService
        .deleteTaskBodyFile({ taskCode, fileName })
        .then(res => callback(res), err => callback())
    } else {
      nursingRulesApiService
        .deleteBookBodyFile({ bookId, fileName })
        .then(res => callback(res), err => callback())
    }
  }

  //全部删除上传文件
  @action public deletAllFile = (_callback?: Function) => {
    let { taskCode, bookId } = this.baseInfo

    let callback = (res?: any) => {
      this.setBaseLoading(false)
      if (res && res.code == 200) {
        this.setFileList([])
        _callback && _callback(true)
      } else {
        _callback && _callback(false)
      }
    }

    this.setBaseLoading(true)
    if (taskCode) {
      nursingRulesApiService
        .deleteTaskAllBodyFiles(taskCode)
        .then(res => callback(res), err => callback())
    } else {
      nursingRulesApiService
        .deleteBookAllBodyFiles(bookId)
        .then(res => callback(res), err => callback())
    }
  }
}

export const editPageModel = new EditPageModel();