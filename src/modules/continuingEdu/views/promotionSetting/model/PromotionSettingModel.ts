import { action, observable, computed } from 'mobx'

class PromotionSettingModel {
  @observable data = {
    key1: '180',
    key2: '本科',
    key3: '100',
    key4: '10',
    key5: '20',
    key6: '30',
    key15: '4',
  } as any

  @observable config = {
    'key1': {
      title: '在院工作年限',
      type: 'number',
      onUnitChange: (val: any) => console.log(val),
      unit: '日',
      units: [
        { code: '日', name: '日' },
        { code: '周', name: '周' },
        { code: '月', name: '月' },
        { code: '年', name: '年' },
      ]
    },
    'key2': {
      title: '最高学历',
      type: 'select',
      options: [
        { code: '专科', name: '专科' },
        { code: '本科', name: '本科' },
        { code: '研究生', name: '研究生' },
        { code: '博士', name: '博士' },
      ]
    },
    'key3': {
      title: '院级学分',
      type: 'number',
      unit: '分',
    },
    'key4': {
      title: '片区学分',
      type: 'number',
      unit: '分',
    },
    'key5': {
      title: '病区学分',
      type: 'number',
      unit: '分',
    },
    'key6': {
      title: '学时',
      type: 'number',
      unit: '小时',
    },
    'key7': {
      title: '职务',
      type: 'select',
      options: [
        { code: '护士', name: '护士' },
        { code: '护士长', name: '护士长' },
        { code: '科护士长', name: '科护士长' },
        { code: '护理部干事', name: '护理部干事' },
      ]
    },
    'key8': {
      title: '职称',
      type: 'select',
      options: [
        { code: '主管护师', name: '主管护师' },
      ]
    },
    'key9': {
      title: '政治面貌',
      type: 'select',
      options: [
        { code: '中共党员', name: '中共党员' },
        { code: '团员', name: '团员' },
        { code: '群众', name: '群众' },
      ]
    },
    'key10': {
      title: '编制',
      type: 'select',
      options: [
        { code: '人事编制', name: '中共党员' },
        { code: '合同编制', name: '合同编制' },
      ]
    },
    'key11': {
      title: '著作',
      type: 'number',
      unit: '篇'
    },
    'key12': {
      title: '带教',
      type: 'number',
      unit: '次'
    },
    'key13': {
      title: '专利',
      type: 'number',
      unit: '个'
    },
    'key14': {
      title: '参与科研课题',
      type: 'number',
      unit: '个'
    },
    'key15': {
      title: '举办继续教育培训班',
      type: 'number',
      unit: '个'
    },
    'key16': {
      title: '科研课题获奖',
      type: 'number',
      unit: '个'
    },
    'key17': {
      title: '主持科研课题',
      type: 'number',
      unit: '个'
    },
    'key18': {
      title: '个人获奖',
      type: 'number',
      unit: '个'
    },
    'key19': {
      title: '发表文章',
      type: 'number',
      unit: '个'
    },
    'key20': {
      title: '学会任职',
      type: 'select',
      options: [
        { code: '会长', name: '会长' },
      ]
    },
  } as any

  // @observable

  @action public setDataItem(name: string, val: any) {
    this.data[name] = val
  }
  @action public setData(newData: any) {
    this.data = { ...newData }
  }
  @action public setConfigItem(name: string, newCfgItem: any) {
    if (Object.keys(this.config).indexOf(name) >= 0) {
      this.config[name] = { ...newCfgItem }
    }
  }
  @action public setConfig(newCfg: any) {
    this.config = JSON.parse(JSON.stringify(newCfg))
  }
}

export const promotionSettingModel = new PromotionSettingModel()