let getRangeName = (range: any, i: number) => {
  let result = ''
  try {
    result = range[i].rangeName ? range[i].rangeName : ''
  } catch (error) {
    return ''
  }
  return result
}
let getRangeNameCode = (range: any, i: number) => {
  let result = ''
  try {
    result = range[i].rangeNameCode ? range[i].rangeNameCode : ''
  } catch (error) {
    return ''
  }
  return result
}

let getNameColor = (range: any, i: number) => {
  let result = ''
  try {
    result = range[i].nameColor ? range[i].nameColor : ''
  } catch (error) {
    return ''
  }
  return result
}
let getNameEffectiveTime = (range: any, i: number) => {
  let result = ''
  try {
    result = range[i].effectiveTime ? range[i].effectiveTime : 0
  } catch (error) {
    return ''
  }
  return result
}

export const keys = [
  {
    key: '',
    getValue: getRangeName
  },
  {
    key: 'Code',
    getValue: getRangeNameCode
  },
  {
    key: 'Color',
    getValue: getNameColor
  },
  {
    key: 'EffectiveTime',
    getValue: getNameEffectiveTime
  }
]

let weeks = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export function backFill(settingDtos: any[], weekNum: number) {
  let obj: any = {}
  for (let w = 1; w < weekNum + 1; w++) {
    for (let i = 0; i < weeks.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        obj[weeks[i] + 'Name' + '_' + w + keys[j].key] = keys[j].getValue(settingDtos, w * i)
      }
    }
  }
  return obj
}
