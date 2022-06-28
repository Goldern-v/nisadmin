export const SUMMARY_TYPES = [
  {
    name: '跌倒、坠床',
    value: '',
    key: 't1'
  },
  {
    name: '非计划拔管',
    value: '',
    key: 't2'
  },
  {
    name: '院内压力性损伤',
    value: '',
    key: 't3'
  },
  {
    name: '给药错误',
    value: '',
    key: 't4'
  },
  {
    name: '锐器伤',
    value: '',
    key: 't5'
  },
  {
    name: '其他不良事件',
    value: '',
    key: 't6'
  },
]
// 跌倒坠床
export const columnsNames1 = [
  '事件发生科室',
  '不良事件类型',
  '事件发生对象的姓名',
  '病案号',
  '年龄',
  '诊断',
  '跌倒/坠床风险评估结果',
  'Barthel指数评定结果',
  '事件发生日期',
  '事件发生时间',
  '事件发生班次',
  '事件发生地点',
  '事件发生相关人员',
  '事件发生相关人员/责任人姓名',
  '发生时当事人层级',
  '报告人',
  '上报护理部日期',
  '上报护理部时间',
  '跌倒/坠床时状态',
  '事件发生的简要描述',
  '事件处理结果',
  '跌倒/坠床造成的伤害',
  '跌倒/坠床伤害级别',
  '护理部讨论不良事件定性',
  '护理部讨论不良事件级别'
]
const columnsNames = {
  columnsNames1
}
export const getColumnsNames = (type:string): string[] => {
  return columnsNames['columnsNames' + type] || []
}