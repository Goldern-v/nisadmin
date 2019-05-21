import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import SelectDepartment from '../common/SelectDepartment'
import DeptSelect from 'src/components/DeptSelect'
import SelectData from 'src/modules/statistic/common/SelectData.tsx'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi.ts'
import { Button, message } from 'antd'
import emitter from 'src/libs/ev'
// import { observer } from 'mobx-react-lite'
export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })

  const onChange = (value: string) => {
    // nurseFilesListViewModel.loadNursingList()
    console.log(value)
  }
  function searchButtonClick () {
    emitter.emit('科室节假日排班表')
  }
  // 导出文件
  const fileDownload = (res: any) => {
    let filename = res.headers['content-disposition']
      ? res.headers['content-disposition'].replace('attachment;filename=', '')
      : '导出文件'
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    })
    if (res.data.type.indexOf('excel') > -1) {
      let a = document.createElement('a')
      let href = window.URL.createObjectURL(blob) // 创建链接对象
      a.href = href
      a.download = filename // 自定义文件名
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(href)
      document.body.removeChild(a) // 移除a元素
    } else {
      let reader = new FileReader()
      reader.addEventListener('loadend', function (data: any) {
        // reader.result 包含转化为类型数组的blob
        message.error(`${reader.result}`)
      })
      reader.readAsText(blob)
    }
  }
  const exportButtonClick = () => {
    StatisticsApi.postDepartmentHolidaySchedule(false).then((res) => {
      fileDownload(res)
    })
  }

  return (
    <Con>
      {/* <DeptSelect onChange={onChange} /> */}
      {/* <SelectDepartment /> */}
      {/* <Spacing /> */}
      <SelectData />
      <Button className='searchButton' onClick={searchButtonClick}>
        查询
      </Button>
      <Button className='exportButton' onClick={exportButtonClick}>
        导出excl
      </Button>
    </Con>
  )
}

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
    width: 120px;
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
