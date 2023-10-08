export const quarterList = [
  '第一季度',
  '第二季度',
  '第三季度',
  '第四季度',
]

export const quarterAndYear = [
  '第一季度',
  '第二季度',
  '第三季度',
  '第四季度',
  '全年',
]
export const quarterAndYear1 = [
  '全年',
  '第一季度',
  '第二季度',
  '第三季度',
  '第四季度',
]

export const monthList = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]
export const quarterYear =['全年', '上半年','下半年']
export const weekList =[{value:1,name:'第一周'},{value:2,name:'第二周'},{value:3,name:'第三周'},{value:4,name:'第四周'}]
const startAndEnd = {
  0:['01-01','12-31'],
  1:['01-01','03-31'],
  2:['04-01','06-30'],
  3:['07-01','09-30'],
  4:['10-01','12-31']
}
/**
 * 季度对应的开始时间和结束时间
 * @param year 年份
 * @param quarter 季度：1，2，3，4
 */
export const quarterTimes = (year:number|string|undefined,quarter:number|string)=>{
  return [year+'-'+startAndEnd[quarter][0],year+'-'+startAndEnd[quarter][1]]
}
