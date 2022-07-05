const deptObj = [
  {
    codes: ['10111002', '0005','030202'],
    name: '一级质控急诊月度汇总报告',
    type: '急诊'
  }
]
const DEF_ONE_TEMP_NAME = '一级质控病区月度汇总报告'

/**获取模板名称 */
export const getTempName = (level: number | string, deptCode?: string): string => {
  switch(level+ '') {
    case '2':
      return '二级质控区域月度汇总报告'
    case '3.1':
      return '委员会小组工作报告'
    case '3.2':
      return '三级质控问题分析改进报告'
    case '3.3':
      return '三级质控问题分析改进报告'
    default:
      break
  }
  if (level == 1) {
    if (deptCode) {
      const item = deptObj.find((v: any) => v.codes.includes(deptCode))
      return item ? item.name : DEF_ONE_TEMP_NAME
    }
    return DEF_ONE_TEMP_NAME
  }
  return ''
}

export const getTypeName = (level: number | string, deptCode?: string): string => {
  if (level == 2) {
    return '区域'
  }
  if (level == 1) {
    if (deptCode) {
      const item = deptObj.find((v: any) => v.codes.includes(deptCode))
      return item ? item.type : '病区'
    }
    return DEF_ONE_TEMP_NAME
  }
  return '病区'
}

/**返回分页查询所需的templateName */
export  const getSearchTempName = (level: number | string): string => {
  let name = getTempName(level)
  if (level == 1) return name + ',' + deptObj.map(v=> v.name).join(',')
  return name
}