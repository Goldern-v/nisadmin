import { message } from 'antd';
import moment from 'src/vendors/moment'

interface IExtraData {
  key?: number|string;
  patientNameOne: string;
  patientNameTwo: string;
  patientNameThree: string;
  patientNameFour: string;
}

interface ITableData {
  key?: number|string;
  wardName: string;
  shoushu: number;
  ruyuan: number;
  ruyuanshoushu: number;
  qita: number;
  option?: IExtraData[]
}
interface ICircleChart {
  name: string;
  value: number|undefined;
}

// 获取饼图数据
const getChartData = (data?: ITableData[]) => {
  let types: string[] = ['shoushu', 'ruyuan', 'ruyuanshoushu', 'qita']
  const realChartData: ICircleChart[] = []
  if (data?.length == 0) {
    return []
  }
  for (let index = 0; index < types.length; index++) {
    const key: string = types[index];
    let dataItem: ICircleChart = {
      name: '',
      value: 0
    }
    switch(key) {
      case 'shoushu':
        dataItem = { 
          name: '手术三天', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'ruyuan':
        dataItem = { 
          name: '入院三天', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'ruyuanshoushu':
        dataItem = { 
          name: '入院三天内术后', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'qita':
        dataItem = { 
          name: '其他', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      default: 
        break
    }
    realChartData.push(dataItem)
  }
  return realChartData
}
/**
 * 处理接口数据，按科室、发热类型分类以及统计每个科室每种类型的患者名称和床号
 * @param options 
 * @returns 
 */
export const setResData = (options?: any) => {
  let tableData: ITableData[] = [];
  // 发热患者类型字段
  // let colNames: string[] = ['shoushu', 'ruyuan', 'ruyuanshoushu', 'qita']
  const keys: string[] = Object.keys(options)
  // console.log('keys', keys)
  // 每种发热类型患者名称字段
  let extraNames: string[] = ['patientNameOne', 'patientNameTwo', 'patientNameThree', 'patientNameFour']
  for (let index = 0; index < keys.length; index++) {
    const data: any[] = options[keys[index]] || [];
    // console.log('data', data)
    // 过滤空科室
    data.filter((item: any) => item.deptName)
    .map((item: any, idx: number) => { 
      let deptName: string = item.deptName;
      
      let countName: string = keys[index] || ''
      // 表格数据的科室索引
      let dataIndex: number = tableData.findIndex((item: any) => item.wardName === deptName);
      let dataItem: ITableData = tableData[dataIndex]
      let extraName: string = extraNames[index] || ''
      // 子表默认数据
      let optionItem: IExtraData = {
        patientNameOne: 'patientNameOne' === extraName ? `${item.name} ${item.bedLabel}床` : '',
        patientNameTwo: 'patientNameTwo' === extraName ? `${item.name} ${item.bedLabel}床` : '',
        patientNameThree: 'patientNameThree' === extraName ? `${item.name} ${item.bedLabel}床` : '',
        patientNameFour: 'patientNameFour' === extraName ? `${item.name} ${item.bedLabel}床` : '',
      }
      // 如果有数据且已经有这个科室
      if (tableData.length > 0 && dataIndex !== -1) {
        // 当前子表患者数组
        let curOption: any[] = dataItem.option ? dataItem.option : [];
        // 如果有当前字段
        if (dataItem[countName] !== undefined) {
          // 数量+=住院次数
          dataItem[countName] += item.visitId
          let cIndex: number = curOption.findIndex((cItem: any) => cItem[extraName] === '')
          // 如果子表当前患者名称+床号字段为空数据
          if (cIndex !== -1) {
            curOption[cIndex][extraName] = `${item.name} ${item.bedLabel}床`
          } else {
            curOption.push(optionItem)
          }
        } else {
          dataItem = {
            ...dataItem,
            [countName]: item.visitId,
            option: [optionItem]
          }
        }
      } else { 
        // 没有数据或者没有这个科室
        dataItem = {
          wardName: deptName,
          shoushu: 'shoushu' == countName ? item.visitId : 0,
          ruyuan: 'ruyuan' == countName ? item.visitId : 0,
          ruyuanshoushu: 'ruyuanshoushu' == countName ? item.visitId : 0,
          qita: 'qita' == countName ? item.visitId : 0,
          option: [optionItem]
        }
        tableData.push(dataItem)
      }
      return dataItem;
    })
  }
  
  return {
    tableData,
    chartData: getChartData(tableData),
  }
  // return tableData
}

/**
 * 折线图数据类型
 */
interface ILineData {
  xAxis: string[]; // x 坐标
  shoushu: number[];
  ruyuan: number[];
  ruyuanshoushu: number[];
  qita: number[];
}
// 查询参数类型
interface IQuery {
  startDate: string;
  endDate: string;
}
// 年月日类型
interface IDate {
  year: number;
  month: number;
  day: number;
}
// 季度枚举
enum Quarter {
  QUARTERONE = 1,
  QUARTERTWO = 2,
  QUARTERTHREE = 3,
  QUARTERFOUR = 4,
}
// 获取季度
const getQuarter = <T>(month: T): number => {
  let quarter: number = 1
  if ([1, 2, 3].indexOf(+month) != -1) quarter = Quarter.QUARTERONE
  if ([4, 5, 6].indexOf(+month) != -1) quarter = Quarter.QUARTERTWO
  if ([7, 8, 9].indexOf(+month) != -1) quarter = Quarter.QUARTERTHREE
  if ([10, 11, 12].indexOf(+month) != -1) quarter = Quarter.QUARTERFOUR
  return quarter
}
// 获取顺序的x坐标
const getXAxisWithSequence = <T>(start: T, end: T, unit?: string): string[] => {
  let xAxis: string[] = []
  for (let index = 0; index <= (+end - +start); index++) {
    xAxis.push(+start + index + (unit ? unit : ''))
  }
  return xAxis
}
// 季度x坐标
const getXAxisByQuarter = <T>(start: T, end: T): string[] => {
  let xAxis: string[] = []
  let startQuarter = getQuarter<number>(+start)
  let endQuarter = getQuarter<number>(+end)
  for (let index = 0; index <= endQuarter - startQuarter; index++) {
    xAxis.push(`第 ${startQuarter + index} 季度`)
  }
  return xAxis
}
// 月份x坐标
const getXAxisByMonth = <T>(startM: T, endM: T, startY: T, endY: T): string[] => {
  let xAxis: string[] = []
  let totalMonth: number = (+endY - +startY) * 12 + (+endM - +startM) + 1
  for (let index = 0; index < totalMonth; index++) {
    // 获取当前月
    let curMonth: number = +startM + index <= 12 ? +startM + index : 1 + (+endM + index - totalMonth)
    // 获取当前年
    let curYear = +startM + index <= 12 ? startY : endY
    xAxis.push(`${curYear}-${curMonth < 10 ? '0' + curMonth : curMonth}`)
  }
  console.log('xAxis', xAxis)
  return xAxis
}
/**
 * 按照年查询数据
 * @param data 患者数据
 * @param start 开始年
 * @param end 结束年
 * @returns 折线图数据
 */
const getLineDataByYear = <K, T>(data: K[], start: T, end: T): ILineData => {
  let resultData: ILineData|any = {}
  for (const key in data) {
    const currentData: any = data[key];
    let lineArr = []
    // 遍历查询几年
    for (let index = 0; index <= (+end - +start); index++) {
      // 过滤指定年份的数据并汇总每年的住院次数visitId
      let count: number = currentData
      .filter((item: any) => +(item.recordDate.split('-')[0]) == (+start + index))
      .reduce((pre: any, cur: any) => { return pre + cur.visitId }, 0)
      lineArr.push(count)
    }
    resultData = {
      ...resultData,
      xAxis: getXAxisWithSequence(start, end, '年'),
      [key]: lineArr,
    }
  }
  return resultData
}
/**
 * 按照季度查询数据
 * @param data 患者数据
 * @param start 开始月份
 * @param end 结束月
 * @returns 折线图数据
 */
const getLineDataByQuarter = <K, T>(data: K[], start: T, end: T): ILineData => {
  let resultData: ILineData|any = {}
  // 总季度数
  let totalQuarter = getQuarter<number>(+end) - getQuarter<number>(+start) + 1
  // 开始季度
  let startQuarter = getQuarter<number>(+start)
  for (const key in data) {
    const currentData: any = data[key]
    let lineArr: number[] = []
    for (let index = 0; index < totalQuarter; index++) {
      let count: number = currentData
      .filter(
        (item: any) => moment(item.recordDate).month() >= +start && moment(item.recordDate).month() <= +end
      )
      .filter((item: any) => getQuarter<number>(moment(item.recordDate).month()) == startQuarter + index)
      .reduce((pre: any, cur: any) => { return pre + cur.visitId }, 0)
      lineArr.push(count)
    }
    resultData = {
      ...resultData,
      xAxis: getXAxisByQuarter<number>(+start, +end),
      [key]: lineArr
    }
  }
  return resultData
}
/**
 * 按月份查询数据
 * @param data 患者数据
 * @param startM 开始月份
 * @param endM 结束月份
 * @param startY 开始年份
 * @param endY 结束年份
 * @returns 折线图数据
 */
const getLineDataByMonth = <K, T>(data: K[], startM: T, endM: T, startY: T, endY: T): ILineData => {
  let resultData: ILineData|any = {}
  for (const key in data) {
    const currentData: any = data[key];
    let totalMonth: number = (+endY - +startY) * 12 + (+endM - +startM) + 1
    let lineArr: number[] = []
    // 遍历总月数
    for (let index = 0; index < totalMonth; index++) {
      let count: number = 0
      // 年份相等
      if (endY == startY) {
        count = currentData
        .filter((item: any) => +(item.recordDate.split('-')[1]) == +startM + index)
        .reduce((pre: any, cur: any) => { return pre + cur.visitId }, 0)
        // lineArr.push(count)
      } else {
        // 获取当前月
        let curMonth: number = +startM + index <= 12 ? +startM + index : 1 + (+endM + index - totalMonth)
        // 获取当前年
        let curYear = +startM + index <= 12 ? startY : endY
        count = currentData
        .filter((item: any) => item.recordDate.split('-')[0] == curYear) // 过滤当前年
        .filter((item: any) => +(item.recordDate.split('-')[1]) == curMonth) // 过滤当前月
        .reduce((pre: any, cur: any) => { return pre + cur.visitId }, 0) // 计算总和
      }
      lineArr.push(count)
    }
    resultData = {
      ...resultData,
      xAxis: getXAxisByMonth<number>(+startM, +endM, +startY, +endY),
      [key]: lineArr
    }
  }
  return resultData
}
/**
 * 按日查询发热患者数据
 * @param data 患者数据
 * @param startDay 开始天 
 * @param endDay 结束天
 */
const getLineDataByDay = <K, T>(data: K[], startDay: T, endDay: T) => {
  let resultData: ILineData = {} as ILineData
  for (const key in data) {
    const currentData: any = data[key];
    let lineArr: number[] = []
    // 循环查询天数
    for (let index = 0; index < (+endDay - +startDay + 1); index++) {
      let count: number = 0
      count = currentData
      .filter((item: any) => moment(item.recordDate).date() == +startDay + index)
      .reduce((pre: any, cur: any) => { return pre + cur.visitId }, 0)
      lineArr.push(count);
    }
    resultData = {
      ...resultData,
      xAxis: getXAxisWithSequence(startDay, endDay, '日'),
      [key]: lineArr
    }
  }
  return resultData
}
// 获取日期字符串的年月日
const getYearMonthDay = (dateStr: string): IDate => {
  return {
    year: moment(dateStr).year(),
    month: moment(dateStr).month() + 1,
    day: moment(dateStr).date()
  }
}
// 返回折线图数据
export const getLineData = (options: any, query: IQuery, mode: string) => {
  let lineData: ILineData|any = {}
  console.log('mode', query, mode)
  // 年份查询
  if (mode === 'year') {
    let startYear: number = moment(query.startDate).year()
    let endYear: number = moment(query.endDate).year()
    let startMonth: number = moment(query.startDate).month() + 1
    let endMonth: number = moment(query.endDate).month() + 1
    let startDay: number = moment(query.startDate).date()
    let endDay: number = moment(query.endDate).date()
    if (Number(endYear) - Number(startYear) >= 1) {
      lineData = getLineDataByYear<any, number>(options, startYear, endYear)
    } else {
      if (startMonth == endMonth) {
        return getLineDataByDay<any, number>(options, startDay, endDay)
      } else {
      // message.warning('年份查询不可小于一年!')
        return getLineDataByMonth<any, number>(options, startMonth, endMonth, startYear, endYear)
      }
    }
  }
  // 季度查询
  if (mode === 'quarter') {
    let startYear: number = moment(query.startDate).year()
    let endYear: number = moment(query.endDate).year()
    let startMonth: number = moment(query.startDate).month() + 1
    let endMonth: number = moment(query.endDate).month() + 1
    // let startDay: number = moment(query.startDate).date()
    // let endDay: number = moment(query.endDate).date()
    // 如果开始年份不相等
    if (startYear !== endYear) {
      // message.warning('季度查询不可跨年!')
      return getLineDataByYear<any, number>(options, startYear, endYear)
    } else {
      // 查询月份小于等于三个月
      if ((+endMonth - +startMonth + 1) <= 3) {
        // message.warning('季度查询不可小于3个月!')
        return getLineDataByMonth<any, number>(options, startMonth, endMonth, startYear, endYear)
      }
      lineData = getLineDataByQuarter<any, number>(options, startMonth, endMonth)
    }
    return lineData
  }
  // 月份查询
  if (mode === 'month') {
    let startYear: number = moment(query.startDate).year()
    let endYear: number = moment(query.endDate).year()
    let startMonth: number = moment(query.startDate).month() + 1
    let endMonth: number = moment(query.endDate).month() + 1
    // 获取总月数
    let totalMonth: number = (+endYear - +startYear) * 12 + (+endMonth - +startMonth) + 1
    // 总月数大于12/按年查询
    if (totalMonth > 12) {
      // message.warning('月份查询不能大于12个月!')
      return getLineDataByYear<any, number>(options, startYear, endYear)
    } else if (totalMonth == 1) {
      // 总月数为1，按日查询
      // message.warning('月份查询不能小于1个月!')
      return getLineDataByDay<any, number>(options, moment(query.startDate).date(), moment(query.endDate).date())
    } else {
      lineData = getLineDataByMonth<any, number>(options, startMonth, endMonth, startYear, endYear)
    }
  }
  // 日查询
  if (mode === 'day') {
    let startYear: number = moment(query.startDate).year()
    let endYear: number = moment(query.endDate).year()
    let startMonth: number = moment(query.startDate).month() + 1
    let endMonth: number = moment(query.endDate).month() + 1
    let startDay: number = moment(query.startDate).date()
    let endDay: number = moment(query.endDate).date()
    // console.log('date', startYear, startMonth, startDay)
    if (startYear != endYear) {
      // message.warning('按日查询不可跨年查询!')
      return getLineDataByYear<any, number>(options, startYear, endYear)
    } else if (startMonth != endMonth) {
      // message.warning('按日查询不可跨月查询!')
      return getLineDataByMonth<any, number>(options, startMonth, endMonth, startYear, endYear)
    } else {
      lineData = getLineDataByDay<any, number>(options, startDay, endDay)
    }
  }
  return lineData
} 
