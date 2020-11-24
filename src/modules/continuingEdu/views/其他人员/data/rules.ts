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
        ...defaultRules,
        schoolName: [(val: any) => !!val || '毕业院校不能为空'],
        education: [(val: any) => !!val || '最高学历不能为空'],
        major: [(val: any) => !!val || '专业不能为空'],
        internshipBegin: [(val: any) => !!val || '实习时间不能为空'],
        internshipEnd: [(val: any) => !!val || '实习时间不能为空'],
        studyDeptCode: [(val: any) => !!val || '实习科室不能为空'],
      }
    case '2':
      return {
        ...defaultRules,
        age: [(val: any) => !!val || '年龄不能为空'],
        title: [(val: any) => !!val || '职称不能为空'],
        education: [(val: any) => !!val || '最高学历不能为空'],
        originalWorkUnit: [(val: any) => !!val || '原单位名称不能为空'],
        originalDepartment: [(val: any) => !!val || '原科室不能为空'],
        refresherTimeBegin: [(val: any) => !!val || '进修时间不能为空'],
        refresherTimeEnd: [(val: any) => !!val || '进修时间不能为空'],
        refresherDeptCode01: [(val: any) => !!val || '进修科室一不能为空'],
      }
    case '3':
    case '4':
    case '99':
      return {
        ...defaultRules,
        schoolName: [(val: any) => !!val || '毕业院校不能为空'],
        education: [(val: any) => !!val || '最高学历不能为空'],
        major: [(val: any) => !!val || '专业不能为空'],
        entryDate: [(val: any) => !!val || '入职时间不能为空'],
        deptCode: [(val: any) => !!val || '所在科室不能为空'],
      }
    default: return defaultRules
  }
}