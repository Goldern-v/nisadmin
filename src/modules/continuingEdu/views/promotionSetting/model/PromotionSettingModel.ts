import { action, observable, computed } from 'mobx'
import { promotionSettingService } from './../api/PromotionSettingService'

class PromotionSettingModel {
  @observable data = [] as any[]
  @observable levelList = [] as any[]
  @observable activeLevel = ''
  @observable loading = false
  @computed get currentLevelItem() {
    let target = this.levelList.find((item: any) => item.sort == this.activeLevel)
    return target
  }

  public itemConfig(item: any) {

    let type = 'number'
    let units = [] as any[]
    let vals = [] as any[]
    switch (item?.requestKey) {
      case '在院工作年限':
        units = [
          { code: '日', name: '日' },
          { code: '周', name: '周' },
          { code: '月', name: '月' },
          { code: '年', name: '年' },
        ]
        break
      case '最高学历':
        type = 'select'
        vals = [
          { code: '中专', name: '中专' },
          { code: '大专', name: '大专' },
          { code: '本科', name: '本科' },
          { code: '研究生', name: '研究生' },
          { code: '博士', name: '博士' },
        ]
        break
      case '职务':
        type = 'select'
        vals = [
          { code: '教学小组长', name: '教学小组长' },
          { code: '教学秘书', name: '教学秘书' },
          { code: '护理组长', name: '护理组长' },
          { code: '副护士长', name: '副护士长' },
          { code: '护士长', name: '护士长' },
          { code: '科护士长', name: '科护士长' },
          { code: '护理部副主任', name: '护理部副主任' },
          { code: '护理部主任', name: '护理部主任' },
        ]
        break
      case '职称':
        type = 'select'
        vals = [
          { code: '见习期护士', name: '见习期护士' },
          { code: '护士', name: '护士' },
          { code: '护师', name: '护师' },
          { code: '主管护师', name: '主管护师' },
          { code: '副主任护师', name: '副主任护师' },
          { code: '主任护师', name: '主任护师' },
        ]
        break
      case '政治面貌':
        type = 'select'
        vals = [
          { code: '中共党员', name: '中共党员' },
          { code: '团员', name: '团员' },
          { code: '群众', name: '群众' },
        ]
        break
      case '编织':
        type = 'select'
        vals = [
          { code: '人事编制', name: '人事编制' },
          { code: '合同编制', name: '合同编制' },
        ]
        break
      case '学会任职':
        type = 'select'
        vals = [
          { code: '会长', name: '会长' },
        ]
        break
    }

    return {
      type,
      units: units.length <= 0 ? null : units,
      vals: vals.length <= 0 ? null : vals,
    }
  }

  @action public setDataItem(idx: number, newItem: any) {
    this.data[idx] = newItem
  }

  @action public setData(newData: any) {
    this.data = newData.concat()
  }

  @action public getData() {
    // this.data = newData.concat()
    this.loading = true
    let target = this.currentLevelItem

    if (target) {
      promotionSettingService
        .getPromoteConfig(target.title)
        .then(res => {
          this.loading = false
          this.data = res.data ?
            res.data.sort((a: any, b: any) => a.sort - b.sort) :
            []
        }, () => this.loading = false)
    } else {
      this.loading = false
    }
  }

  @action public inited() {
    this.levelList = []
    this.data = []
    this.activeLevel = ''
    this.loading = true

    this
      .getLevelList((arr: any[]) => {
        if (arr.length > 0) {
          this.activeLevel = arr[0].sort
          this.getData()
        } else {
          this.loading = false
        }
      })
  }

  @action public activeLevelChange(newLevel: string) {
    this.activeLevel = newLevel
    this.getData()
  }

  public getLevelList(success?: Function, error?: Function) {
    promotionSettingService
      .getAllNurseLevel()
      .then((res) => {
        let newArr = [] as any[]
        if (res.data) {
          let sortedArr = res.data.sort((a: any, b: any) => a.code - b.code)

          if (sortedArr.length >= 2)
            for (let i = 0; i < sortedArr.length - 1; i++) {
              let item = sortedArr[i]
              let nextItem = sortedArr[i + 1]

              newArr.push({
                current: item.name,
                next: nextItem.name,
                sort: item.code,
                title: `${item.name}升${nextItem.name}`
              })
            }
        }

        this.levelList = newArr
        success && success(newArr)
      }, () => {
        error && error()
      })
  }

  @action public saveEdit(success?: Function, error?: Function) {
    this.loading = true
    promotionSettingService
      .editPromoteRequest({
        promoteLevel: this.currentLevelItem.title,
        promoteInfoList: this.data
      })
      .then(res => {
        this.loading = false
        this.getData()
        success && success()
      }, () => {
        this.loading = false
        error && error()
      })

  }
}

export const promotionSettingModel = new PromotionSettingModel()