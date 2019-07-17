import { keys } from './backFill'

export let weekDays1: any = [
  'mondayName_1',
  'tuesdayName_1',
  'wednesdayName_1',
  'thursdayName_1',
  'fridayName_1',
  'saturdayName_1',
  'sundayName_1'
]
export let weekDays2: any = [
  'mondayName_2',
  'tuesdayName_2',
  'wednesdayName_2',
  'thursdayName_2',
  'fridayName_2',
  'saturdayName_2',
  'sundayName_2'
]

export function splitRecord(record: any, weekNum: number) {
  let wl = weekNum == 2 ? [...weekDays1, ...weekDays2] : weekDays1
  return wl.map((weekName: any, index: number) => {
    let splitObj: any = {
      index
    }
    for (let k of keys) {
      // console.log(record, weekName, k.key, 'recored')
      splitObj[k.key || 'Name'] = record[weekName + k.key]
    }

    return splitObj
  })
}
