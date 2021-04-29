import moment from "moment";

export const getAge = (birthday?: string, current?: string) => {
  if (!birthday) return
  const start = moment(birthday)
  const end = moment(current)
  const months = end.diff(start, "month")
  let age = '无法确定'
  if (months < 1) {
    age = '新生儿'
  } else if (months < 7) {
    age = '1-6月'
  } else if (months < 13) {
    age = '7-12月'
  } else if (months < 12 * 7) {
    age = '1-6岁'
  } else if (months < 12 * 13) {
    age = '7-12岁'
  } else if (months < 12 * 19) {
    age = '13-18岁'
  } else if (months < 12 * 65) {
    age = '19-64岁'
  } else if (months >= 12 * 65) {
    age = '65岁以上'
  }
  return age
}