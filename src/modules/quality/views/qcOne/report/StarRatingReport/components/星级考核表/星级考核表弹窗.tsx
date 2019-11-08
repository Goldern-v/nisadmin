import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Select, ColumnProps, AutoComplete, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { starRatingReportEditModel } from '../../model/StarRatingReportEditModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import service from 'src/services/api'
import qs from 'qs'
const commonApi = service.commonApiService

const Option = Select.Option

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 星级考核表弹窗(props: Props) {
  let { location, history } = appStore
  let search = qs.parse(location.search.replace('?', ''))

  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = starRatingReportEditModel.getDataInAllData('report')


  const [nurseList, setNurseList] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render(text: any, record: any, index: number) {
        return index + 1
      },
      width: 50,
      align: 'center'
    },
    {
      title: '姓名',
      align: 'center',
      render(text: any, record: any, index: number) {
        return <Select
          value={record.empNo}
          style={{ width: '100%' }}
          onChange={(empNo: any) => {
            cloneData.list[index].empNo = empNo
            let target = nurseList.find((item: any) => item.empNo == empNo)
            if (target) cloneData.list[index].empName = target.empName

            setData(cloneData)
          }}
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {nurseList.map((item: any) => <Option key={item.empNo} value={item.empNo}>{item.empName}</Option>)}
        </Select>
      },
      width: 120
    },
    {
      title: '护理质量',
      render(text: any, record: any, index: number) {
        return <Input
          className={`nursingDeduct${index}`}
          defaultValue={record.nursingDeduct}
          onChange={(e: any) => handleNumberInput(e, record, index, 'nursingDeduct')} />
      },
      width: 90
    },
    {
      title: `工作量`,
      render(text: any, record: any, index: number) {
        return <Input
          className={`workloadDeduct${index}`}
          defaultValue={record.workloadDeduct}
          onChange={(e: any) => handleNumberInput(e, record, index, 'workloadDeduct')} />
      },
      width: 90
    },
    {
      title: `满意度`,
      render(text: any, record: any, index: number) {
        return <Input
          className={`satisfactionDeduct${index}`}
          defaultValue={record.satisfactionDeduct}
          onChange={(e: any) => handleNumberInput(e, record, index, 'satisfactionDeduct')} />
      },
      width: 90
    },
    {
      title: `星级`,
      align: 'center',
      render(text: any, record: any, index: number) {
        return <span>{record.starClass}</span>
      },
      width: 80
    },
    {
      title: `考核总分`,
      width: 90,
      align: 'center',
      render(text: any, record: any, index: number) {
        return <span>{sum(record)}</span>
      }
    },
    {
      title: '操作',
      key: '操作',
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={(e) => {
                cloneData.list.splice(index, 1)
                setData(cloneData)
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

  const addItem = () => {

    cloneData.list.push({
      id: '',
      empName: '',
      empNo: '',
      indexNo: cloneData.list.length,
      nursingDeduct: '',
      workloadDeduct: '',
      satisfactionDeduct: '',
      starClass: '三星',
      month: search.month,
      year: search.year,
      reportCode: "ward_star_rating",
      wardCode: search.wardCode
    })

    setData(cloneData)
  }

  const handleNumberInput = (e: any, record: any, index: number, key: string) => {
    if (
      !Number(e.target.value) &&
      Number(e.target.value) !== 0 &&
      e.target.value !== '-' &&
      e.target.value[e.target.value.length - 1] !== '.'
    ) {
      return message.warning('只能输入数字')
    }
    if (e.target.value !== '-') {
      record[key] = e.target.value

      record.starClass = starClass(record)
      setData(cloneData)
    }
  }

  const formatNum = (num: number | string) => {
    num = Number(num)

    if (isNaN(num)) return '0.0'

    let numArr = num.toString().split('.')
    if (!numArr[0]) numArr[0] = '0'

    if (numArr[1]) {
      numArr[1] = numArr[1][0]
    } else {
      numArr[1] = '0'
    }

    return numArr.join('.')
  }

  const sum = (item: any) => {
    let total = 100;
    let nursingDeduct = Number(
      formatNum(
        -Number(item.nursingDeduct)
      )
    )
    if (isNaN(nursingDeduct)) nursingDeduct = 0

    let workloadDeduct = Number(
      formatNum(
        -Number(item.workloadDeduct)
      )
    )
    if (isNaN(workloadDeduct)) workloadDeduct = 0

    let satisfactionDeduct = Number(
      formatNum(
        -Number(item.satisfactionDeduct)
      )
    )
    if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

    return formatNum(total - nursingDeduct - workloadDeduct - satisfactionDeduct)
  }

  const starClass = (record: any) => {
    let sumUp = Number(sum(record))

    if (sumUp > 98) return '三星'
    if (sumUp > 96) return '二星'
    if (sumUp > 90) return '一星'
    return '无星'
  }

  useEffect(() => {
    commonApi
      .userDictInfo(search.wardCode)
      .then(res => {
        if (res.data && res.data instanceof Array) {
          setNurseList(res.data.map((item: any) => {
            return {
              empName: item.name,
              empNo: item.code
            }
          }))
        }
      })
  }, [])

  return (
    <Wrapper>
      <div className='button-con'>
        <Button icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
      </div>

      <BaseTable
        surplusHeight={400}
        columns={columns}
        dataSource={cloneData.list || []}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  )
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  td {
    padding: 0 !important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  .ant-input{
      resize: none;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
`

const HeadCon = styled.div``
