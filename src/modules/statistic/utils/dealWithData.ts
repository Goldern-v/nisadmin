import { ColumnProps } from "antd/lib/table"

/** 
 * 2021-1-28 南医三统计查询 返回数据统一处理
 * 护士学历分布 护士男女分布 护士工作年限分布 护士在职状态分析
 *  */
export const delWithResData = (options?: {
  dataList?: any[],
  baseColums?: string[],
  otherName?: string,
}) => {
  let { dataList, baseColums, otherName } = options || {}
  if (!dataList) dataList = []

  if (!baseColums) baseColums = ['NUM', 'DEPTNAME']
  let _otherName = otherName || '其他'

  let newData = [] as any[]
  let newChartData = [] as any[]
  let newExtraColumns = [] as ColumnProps<any>[]

  /** 图表项目的添加或累计值 */
  const setChartDataItem = (key: string, val: number) => {
    let targetCharItem = newChartData.find((chartItem: any) => chartItem.type == key)
    if (targetCharItem)
      targetCharItem.value = targetCharItem.value + val || 0
    else
      newChartData.push({ type: key, value: val || 0 })
  }

  if (dataList && dataList.length > 0) {
    let extraKeys: any[] = []
    //获取统计分类
    extraKeys = Object.keys(dataList[0]).filter((key: string) => (baseColums || []).indexOf(key) < 0)
    //计算未统计人数
    //过滤空科室数据
    dataList = dataList.filter((item: any) => item.DEPTNAME)
      .map((item: any) => {

        let remainVal = extraKeys.reduce((prev, current) => {
          if (typeof prev == 'number')
            return prev + item[current] || 0
          else
            return (item[prev] || 0) + (item[current] || 0)
        })

        let restVal = (item.NUM || 0) - remainVal
        if (restVal < 0) restVal = 0

        return { ...item, [_otherName]: restVal }
      })

    //统计完未统计人数，把 其他otherName分类加入
    extraKeys.push(_otherName)

    newExtraColumns = extraKeys.map((key: string) => ({
      title: key,
      align: 'center',
      children: [
        {
          title: '人数',
          width: 60,
          dataIndex: key,
          align: 'center',
        },
        {
          title: '占比',
          width: 60,
          dataIndex: `${key}-percent`,
          align: 'center',
        },
      ]
    }))

    for (let i = 0; i < dataList.length; i++) {
      let newItem = { ...dataList[i] } as any

      for (let i = 0; i < extraKeys.length; i++) {
        let key = extraKeys[i]
        //设置表格item
        let percent = '0'
        if (newItem[key] && newItem.NUM)
          percent = (Math.round((newItem[key] / newItem.NUM) * 10000) / 100).toString()

        if (percent.split('.')[1] && percent.split('.')[1].length == 1) percent += '0'

        newItem[`${key}-percent`] = `${percent}%`
        //设置图表item
        if (newItem.DEPTNAME !== '全院')
          setChartDataItem(key, newItem[key])
      }

      newData.push(newItem)
    }
  }

  return {
    newData,
    newChartData,
    newExtraColumns
  }
}