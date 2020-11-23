export const rules = (userType: string) => {
  const defaultRules = {
    'name': [
      (val: any) => !!val || '姓名不能为空'
    ],
    'idCardNo': [
      (val: any) => !!val || '身份证号不能为空'
    ],
    'sex': [
      (val: any) => !!val || '性别不能为空'
    ],
    'phone': [
      (val: any) => !!val || '联系方式不能为空'
    ],
    'address': [
      (val: any) => !!val || '家庭住址不能为空'
    ],
    'emergencyContactPerson': [
      (val: any) => !!val || '紧急联系人不能为空'
    ],
    'emergencyContactPhone': [
      (val: any) => !!val || '紧急联系人电话不能为空'
    ],
  }

  switch (userType) {
    case '1':
      return {
        ...defaultRules
      }
    case '2':
      return {
        ...defaultRules
      }
    case '3':
    case '4':
    case '5':
      return {
        ...defaultRules
      }
    default: return defaultRules
  }
}