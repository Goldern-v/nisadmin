import service from 'src/services/api'
import { computed, observable } from "mobx"
import { currentMonth } from 'src/utils/date/rangeMethod'
import { courseLibraryApi, getResponseData } from './api/courseLibraryApi'
export interface SelectItem {
  code: string
  name: string
}
export interface RadioItem {
  label: string,
  value: any
}
export type FormDataT = 'date' | 'deptCode' | 'type' | 'keyword'

export default class CourseLibraryModal {
  @observable public date: any[] = []
  @observable public deptCode: string = ''
  @observable public type: string = ''
  @observable public keyword: string = ''
  @observable public deptList: SelectItem[] = []
  @observable public tableList: any[] = []
  
  public readonly typeList: SelectItem[] = [
    {
      name: '全部',
      code: ''
    },
    {
      name: '.doc',
      code: '.doc'
    },
    {
      name: '.docx',
      code: '.docx'
    },
    {
      name: '.pdf',
      code: '.pdf'
    },
    {
      name: '.ppt',
      code: '.ppt'
    },
    {
      name: '.pptx',
      code: '.pptx'
    },
    {
      name: '.xls',
      code: '.xls'
    },
    {
      name: '.xlsx',
      code: '.xlsx'
    },
    {
      name: '.mp4',
      code: '.mp4'
    },
    {
      name: '图片',
      code: '图片'
    },
  ]
  
  @observable public page: number | undefined = 1
  @observable public pageSize: number | undefined = 20
  @observable public total: number | undefined = 0
  
  @computed
  get getParams () {
    return {
      startDate: this.date[0] || '',
      endDate: this.date[1] || '',
      deptCode: this.deptCode,
      courseType: this.type,
      courseName: this.keyword,
      type: this.curTab,
      pageIndex: this.page,
      pageSize: this.pageSize
    }
  }
  public setFormData(key: FormDataT, val: any) {
    if (key === 'keyword') {
      this[key] = val ? val.target.value : ''
    } else {
      this[key] = val
    }
    this.page = 1
    this.getData()
  }
  @observable public tableLoading = false
  public getData() {
    this.tableLoading = true
    getResponseData(() => courseLibraryApi.getData(this.getParams)).then(res => {
      console.log('test-res', res)
      this.tableList = res.list || []
      this.total = res.totalCount;
      (this.page as number) += 1
    }).finally(() => {
      this.tableLoading = false
    })

  }
  public async getDeptList() {
    try {
      const res = await getResponseData(() => service.commonApiService.getNursingUnitAll())
      console.log('test-res', res)
      if (res.deptList) {
        this.deptList = [
          {
            name: '全部',
            code: ''
          },
          ...res.deptList,
        ]
      }
      this.deptCode = ''
      
    } catch (err) {
      console.log(err)
    }
  }
  @observable public curTab: number = 1
  public readonly tabList = [
    {
      name: '公共课件',
      code: 1
    },
    {
      name: '个人课件',
      code: 2
    }
  ]
  public selectTab = (val: any) => {
    this.curTab = val.target.value
    this.page = 1
    this.getData()
  }


  formatSec = (s: number): [number| undefined, string] => {
    let obj = {
      s: 1,
      min: 60,
      h: 3600
    }
    if (s<=0) return [undefined, '']
    for(let key in obj) {
      let val = parseInt((s / obj[key]) + '')
      if (key == 'h') return [val, key]
      if (val < 60) {
        return [val, key]
      }
    }
    return [undefined, '']
  }

  public reset = () => {
    this.date = currentMonth(),
    this.type = this.typeList[0].code || '',
    this.keyword = ''
    this.page = 1
  }
  public init = async () => {
    this.reset()
    await this.getDeptList()
    await this.getData()
  }

}

export const courseLibraryModal = new CourseLibraryModal()
