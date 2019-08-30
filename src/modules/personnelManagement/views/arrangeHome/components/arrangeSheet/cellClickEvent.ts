import { ArrangeItem } from './../../types/Sheet'
/** 追加排班 */
import _ from 'lodash'
export function getAddArrangeMenuList(list: ArrangeItem[], selectedCellObj: ArrangeItem) {
  let obj = _.groupBy(list, 'shiftType')
  let keys = Object.keys(obj)
  let result = []
  for (let i = 0; i < keys.length; i++) {
    let itemObj: any = {
      icon: '',
      label: keys[i],
      type: 'text',
      children: []
    }
    result.push(itemObj)
    for (let j = 0; j < obj[keys[i]].length; j++) {
      itemObj.children.push({
        icon: '',
        label: obj[keys[i]][j].name,
        type: 'text',
        dataSource: obj[keys[i]][j],
        onClick(item: any) {
          if (selectedCellObj!.rangeName) {
            selectedCellObj.settings = {
              rangeName: item.dataSource.name,
              nameColor: item.dataSource.nameColor,
              effectiveTime: item.dataSource.effectiveTime,
              effectiveTimeOld: item.dataSource.effectiveTime,
              shiftType: item.dataSource.shiftType
            }
          } else {
            selectedCellObj!.rangeName = item.dataSource.name
            selectedCellObj!.nameColor = item.dataSource.nameColor
            selectedCellObj!.effectiveTime = item.dataSource.effectiveTime
            selectedCellObj!.effectiveTimeOld = item.dataSource.effectiveTime
            selectedCellObj!.shiftType = item.dataSource.shiftType
          }
        }
      })
    }
  }
  return result
}
