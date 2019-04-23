export const sexEnum: any = {
  '0': '男',
  '1': '女'
}
/** 审核状态 */
export enum auditedStatusEnum {
  'noSubmit' = '未提交（暂存）',
  'waitAuditedNurse' = '待护士长审核',
  'auditedFailNurse' = '护士长审核不通过',
  'auditedSuccessDepartment' = '护理部审核通过',
  'auditedSuccessNurse' = '护士长审核通过',
  'auditedFailDepartment' = '护理部审核不通过'
}
