import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import SelectDepartment from '../common/SelectDepartment'
import DeptSelect from 'src/components/DeptSelect'
import SelectData from 'src/modules/statistic/common/SelectData.tsx'
import { authStore } from 'src/stores/index'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi.ts'
import { observer } from 'mobx-react-lite'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import { Button, message, Select } from 'antd'
import emitter from 'src/libs/ev'
const { Option } = Select
export default observer(function BedSituation () {
  const [count, setCount] = useState(0)
  const [typeGet, setTypeGet] = useState('出院')
  // const [getMethods, setGetMethods] = useState(() => null)
  useEffect(() => {
    console.log(count, setCount)
  }, [])

  const onChange = (value: string) => {
    // nurseFilesListViewModel.loadNursingList()
    console.log(value)
  }
  function searchButtonClick () {
    emitter.emit('住院病人认知情况统计表查询')
  }
  // 导出文件
  const fileDownload = (res: any) => {
    let filename = res.headers['content-disposition']
      ? decodeURIComponent(res.headers['content-disposition'].replace('attachment;filename=', ''))
      : '导出文件'
    // decodeURIComponent
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    })
    console.log('fileDownload', res)
    // if (res.data.type.indexOf('excel') > -1) {
    if (res.data) {
      let a = document.createElement('a')
      let href = window.URL.createObjectURL(blob) // 创建链接对象
      a.href = href
      a.download = filename // 自定义文件名u
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(href)
      document.body.removeChild(a) // 移除a元素
    } else {
      let reader = new FileReader()
      reader.addEventListener('loadend', function (data: any) {
        // reader.result 包含转化为类型数组的blob
        // message.error(`${reader.result}`)
      })
      reader.readAsText(blob)
    }
  }

  const exportButtonClick = () => {
    const postDate = {
      startDate: statisticViewModel.startDate,
      endDate: statisticViewModel.endDate,
      deptCode: authStore.selectedDeptCode,
      type: typeGet
    }
    StatisticsApi.patientStatisticsExcel(postDate).then((res) => {
      fileDownload(res)
    })
  }
  const selectChange = (value: any) => {
    emitter.emit('住院病人认知情况统计表类型', value)
    setTypeGet(value)
    console.log('value66666666666', value)
  }
  return (
    <Con>
      <DeptSelect onChange={onChange} />
      {/* <SelectDepartment /> */}
      <Spacing />
      <SelectData />
      <SelectCon>
        类型：
        <Select defaultValue='出院' style={{ width: '90px' }} onChange={selectChange}>
          <Option value='在院'>在院</Option>
          <Option value='出院'>出院</Option>
          {/* <Option value='disabled' disabled>
          Disabled
        </Option> */}
        </Select>
      </SelectCon>
      <Button type='primary' style={{ margin: '0 0 0 60px', width: '90px' }} onClick={searchButtonClick}>
        查询
      </Button>
      <Button style={{ margin: '0 10px', width: '90px' }} onClick={exportButtonClick}>
        导出Excel
      </Button>
    </Con>
  )
})

const Con = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  .searchButton {
    margin-left: 10px;
    width: 90px;
    background: rgba(91, 190, 152, 1);
    border-radius: 3px;
    border: 1px solid rgba(62, 152, 98, 1);
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
  }
  .exportButton {
    margin-left: 10px;
    width: 90px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    border: 1px solid rgba(192, 203, 206, 1);
    font-size: 13px;
    color: rgba(51, 51, 51, 1);
  }
`
const Spacing = styled.div`
  width: 20px;
`
const SelectCon = styled.div`
  margin-left: 20px;
`
