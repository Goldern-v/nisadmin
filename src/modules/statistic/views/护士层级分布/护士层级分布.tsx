import styled from 'styled-components'
import React, { useState, useEffect,useRef } from 'react'
import { Button, Radio, Select, Spin } from 'antd'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import CircleChart from './../../components/CircleChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
import printing from "printing";
import PrintTable from '../printTable/printTable'
import ByDeptCodeGetPeople from "src/modules/statistic/views/护士工作年限分布/ByDeptCodeGetPeople";
import {Con} from 'src/modules/statistic/common/css/CommonLayout.ts';
import { delWithResData } from '../../utils/dealWithData'

const Option = Select.Option

export interface Props { }

interface QhwyPeopleModal{
  visible:boolean
 dept:number
 workType:string
}
export default observer(function 护士层级分布() {
  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode:['whyx','whhk'].includes(appStore.HOSPITAL_ID) ? authStore.defaultDeptCode:""
  })
  const [data, setData] = useState([] as any[])
  const [chartData, setChartData] = useState([] as { type: string, value: number }[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)
  const [chartsImg, setChartsImg] = useState<any[]>([])
  const [paramsObj,setParamsObj]=useState({} as QhwyPeopleModal)
  const [isPrint, setIsPrint] = useState(false)

  const [loading, setLoading] = useState(false)

  const [extraColumns, setExtraColumns] = useState([] as ColumnProps<any>[])
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tablePrintRef = useRef<HTMLDivElement | null>(null);

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'DEPTNAME',
      align: 'center',
    },
    {
      title: '护士人数',
      width: 60,
      dataIndex: 'NUM',
      align: 'center',
      render:(text:any,record:any)=>{
        return <div onClick={()=>{
          if(appStore.HOSPITAL_ID =='qhwy'){
            paramsObj.dept =record.DEPTCODE
            paramsObj.visible = true
            paramsObj.workType ='all'
            setParamsObj({...paramsObj})
          }
        }}>{text}</div>
      }
    },
    ...extraColumns,
  ]

  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)

    statisticsApi.countHierarchy(query)
      .then((res: any) => {
        setLoading(false)

        let dataList = res.data
        if (dataList) {
          const {
            newExtraColumns,
            newChartData,
            newData,
          } = delWithResData({
            dataList 
          })
          let newList:any =[]
        if(appStore.HOSPITAL_ID ==='qhwy'){
          newList = newExtraColumns.map((item:any)=>{
            item.children[0]={
              ...item.children[0],
              render:(text:any,record:any)=>{
                return <div onClick={()=>{
                  paramsObj.dept =record.DEPTCODE
                  paramsObj.visible = true
                  paramsObj.workType =item.children[0]['dataIndex']
                  setParamsObj({...paramsObj})
                }}>{text}</div>
              }
            }
            return item
          })
        }
          setExtraColumns(appStore.HOSPITAL_ID =='qhwy'? newList:newExtraColumns)
          setChartData(newChartData)
          setData(newData)
        }
      }, () => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [query])

  const exportPdf = ()=>{
    setIsPrint(true)
  }

  useEffect(() => {
    let timer: any = null
    if (chartVisible) {
      timer = setTimeout(() => {
        let canvasEl = document.querySelectorAll('canvas') as any
        if (canvasEl.length) {
          let arr = []
          for (let i = 0; i < canvasEl.length; i++) {
            arr.push(canvasEl[i].toDataURL())
          }
          setChartsImg(arr)
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [chartVisible])

  const setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        chartsImg[i] && (imgEl[i].src = chartsImg[i])
      }
    }
  }

  useEffect(() => {
    if(isPrint){
      setImg()
      let current = chartVisible ? tableRef.current! : tablePrintRef.current!
      !chartVisible && (current.style.display = 'block')
        printing(current, {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            @page {
              size:landscape;
              margin: 20px 10px 20px;
            }
            .right-group{
              display:none
            }
            .chart-img {
              width: 100%;
              object-fit: contain;
              height: 100%;
            }
          `,
        }).then(()=>{
          setIsPrint(false)
        });
        tablePrintRef.current!.style.display = 'none'
    }
  }, [isPrint])

  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])
  return <CommonLayout
    header={<div>
      <Select
        showSearch
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        {
          appStore.hisMatch({
            map: {
              "whyx,whhk": authStore.isDepartmentYaXin &&<Option  value={''}>全院</Option>,
              other:<Option  value={''}>全院</Option>
            },
            vague: true
          })  
        }
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
      <Button type="primary" onClick={handleSearch}>查询</Button>
      {['jmfy','hj'].includes(appStore.HOSPITAL_ID) && <Button type="primary" onClick={exportPdf}>导出pdf</Button>}
    </div>}
    body={<Spin spinning={loading}>
      <Con ref={tableRef} className="tableBox">
        <div className="main-title">护士层级分布</div>
        <div className="right-group">
          <Radio.Group
            size="small"
            buttonStyle="solid"
            value={chartVisible}
            onChange={(e) => setChartVisible(e.target.value)}>
            <Radio.Button value={false} >表格</Radio.Button>
            <Radio.Button value={true}>图表</Radio.Button>
          </Radio.Group>
        </div>
        {!chartVisible && <BaseTable
          surplusHeight={300}
          surplusWidth={500}
          columns={columns}
          dataSource={data} />}
        {chartVisible && <ChartCon style={{ height: `${chartHeight || 0}px` }}>
          {chartData.length > 0 && 
          !isPrint ?
          <CircleChart
            chartHeight={chartHeight}
            sourceData={chartData} />
            : <img className="chart-img" src={''} />
          }
          {chartData.length <= 0 && <div className="no-data">
            <img
              style={{ width: '100px' }}
              src={require('src/modules/statistic/img/noData.png')} />
            <br />
            <span>暂无数据</span>
          </div>}
        </ChartCon>}
        <div ref={tablePrintRef} style={{display:'none'}}>
          <PrintTable dataSource={data} columns={columns} title={'护士层级分布'}></PrintTable>
        </div>
        <ByDeptCodeGetPeople {...paramsObj} onCancel={()=>{
          paramsObj.visible =false
          setParamsObj({...paramsObj})
        }}/>
      </Con>
    </Spin>} />
})