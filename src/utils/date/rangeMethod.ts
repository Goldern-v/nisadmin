import moment from "src/vendors/moment";

/** 返回当前或指定日期的当月首尾日期 */
export const currentMonth = (date?: moment.Moment) => {
  let currentDate = date ? moment(date) : moment()

  let range0 = moment(currentDate).date(1)
  let range1 = moment(range0).month(range0.month() + 1).subtract(1, 'd')

  return [range0, range1] as [moment.Moment, moment.Moment]
}

/**返回当前或指定日期的当前季度首尾日期 */
export const currentQuater = (date?: moment.Moment) => {
  let currentDate = date ? moment(date) : moment()

  let quarter = currentDate.quarter()

  let year = currentDate.format('YYYY')

  let range0: moment.Moment,
    range1: moment.Moment

  switch (quarter) {
    case 1:
      range0 = moment(year + '-01-01')
      range1 = moment(year + '-03-31')
      break
    case 2:
      range0 = moment(year + '-04-01')
      range1 = moment(year + '-06-30')
      break
    case 3:
      range0 = moment(year + '-07-01')
      range1 = moment(year + '-09-30')
      break
    case 4:
      range0 = moment(year + '-10-01')
      range1 = moment(year + '-12-31')
      break
    default:
      return [undefined, undefined] as [undefined, undefined]
  }

  return [range0, range1] as [moment.Moment, moment.Moment]
}

/**返回当前或指定日期的当前年度首尾日期 */
export const currentYear = (date?: moment.Moment) => {
  let currentDate = date ? moment(date) : moment()

  let year = currentDate.format('YYYY')

  let range0 = moment(year + '-01-01')
  let range1 = moment(year + '-12-31')

  return [range0, range1] as [moment.Moment, moment.Moment] | [undefined, undefined]
}

