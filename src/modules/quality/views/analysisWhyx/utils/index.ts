/**获取模板名称 */
export const getTempName = (level: number, deptName?: string): string => {
  if (level == 2) {
    return '二级质控病区月度汇总报告'
  }
  if (level == 1) {
    return '一级质控病区月度汇总报告'
  }
  return '三级质控病区月度汇总报告'
}
