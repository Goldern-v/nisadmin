import { authStore } from "src/stores"

export const getKskszyDefaultDeptCode = () => {
  if (
    sessionStorage['kskszyk.code']
    || sessionStorage['kskszyk.code'] === ''
  )
    return sessionStorage['kskszyk.code']

  if (authStore.isDepartment) return ''
  return authStore.defaultDeptCode
}

export const getKskszyDefaultDeptName = () => {
  let code = sessionStorage['kskszyk.code']
  if (!code) return ''

  let target = authStore.deptList.find((item: any) => item.code == code)

  if (target) return target.name

  return ''
}

export const setKskszyDefaultCode = (code: any) => {
  sessionStorage['kskszyk.code'] = code
}

export const removeKskszyDefaultCode = (code: any) => {
  delete sessionStorage['kskszyk.code']
}
