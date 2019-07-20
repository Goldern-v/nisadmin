import Identity from './id-card-of-china/main'
import moment from 'moment'
interface IdCardFormat {
  /** 是否合法 */
  legal: boolean
  /** 出生日期 */
  birthday: string
  /** 性别 */
  sex: string
  /** 省份 */
  province: string
  /** 城市 */
  city: string
  /** 区/县 */
  county: string
  /** 省市县/区合集 */
  tree: string[]
  /** 省市县/区合集字符串 */
  treeString: string
  age: number
}

export function formatAge(birthday: string) {
  const age = moment().diff(moment(birthday), 'years')
  return age
}

/** 解析身份证信息 */
export function formatIdCord(idCardNumber: string): Partial<IdCardFormat> {
  const peopleIdentity = new Identity(idCardNumber)
  const birthday = peopleIdentity.birthday()
  const age = moment().diff(moment(birthday), 'years')
  const legal = idCardNumber.length == 18 && peopleIdentity.legal()
  if (legal) {
    return {
      legal,
      birthday,
      sex: peopleIdentity.gender(),
      province: peopleIdentity.region().province(),
      city: peopleIdentity.region().city(),
      county: peopleIdentity.region().county(),
      tree: peopleIdentity.region().tree(),
      treeString: peopleIdentity.region().treeString(''),
      age
    }
  } else {
    return {
      legal
    }
  }
}
