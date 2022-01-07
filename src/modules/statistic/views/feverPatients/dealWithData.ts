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
  type: string;
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
      type: '',
      value: 0
    }
    switch(key) {
      case 'shoushu':
        dataItem = { 
          type: '手术三天', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'ruyuan':
        dataItem = { 
          type: '入院三天', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'ruyuanshoushu':
        dataItem = { 
          type: '入院三天内术后', 
          value: data?.reduce((pre, cur) => { return pre + cur[key] }, 0) 
        }
        break;
      case 'qita':
        dataItem = { 
          type: '其他', 
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