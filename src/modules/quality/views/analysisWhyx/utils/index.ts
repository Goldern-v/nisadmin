const deptObj = [
  {
    codes: ['10111002', '0005','030202'],
    name: '一级质控急诊月度汇总报告',
    type: '急诊'
  }
]
const DEF_ONE_TEMP_NAME = '一级质控病区月度汇总报告'

/**获取模板名称 */
export const getTempName = (level: number, deptCode?: string): string => {
  if (level == 2) {
    return '二级质控区域月度汇总报告'
  }
  if (level == 1) {
    if (deptCode) {
      const item = deptObj.find((v: any) => v.codes.includes(deptCode))
      return item ? item.name : DEF_ONE_TEMP_NAME
    }
    return DEF_ONE_TEMP_NAME
  }
  return '三级质控病区月度汇总报告'
}

export const getTypeName = (level: number, deptCode?: string): string => {
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