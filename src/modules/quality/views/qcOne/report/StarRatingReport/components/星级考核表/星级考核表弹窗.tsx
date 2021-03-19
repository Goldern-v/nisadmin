import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Popover } from 'antd'
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
const TextArea = Input.TextArea

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 星级考核表弹窗(props: Props) {
  let { location, history } = appStore
  let search = qs.parse(location.search.replace('?', ''))
  const { scoreDetailMap } = starRatingReportEditModel

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
          showSearch
          value={record.empName}
          onSearch={(empName: string) => {
            cloneData.list[index].empName = empName
            if (cloneData.list[index].empNo) {
              cloneData.list[index].empNo = ''
              cloneData.list[index].currentLevel = ''
              cloneData.list[index].addPointsItemList = []
              cloneData.list[index].annualAddPoints = ''
            }
            setData(cloneData)
          }}
          style={{ width: '100%' }}
          onChange={(empName: any) => {
            cloneData.list[index].empName = empName
            let target = nurseList.find((item: any) => item.empName == empName)
            if (target) {
              cloneData.list[index].empNo = target.empNo
              cloneData.list[index].currentLevel = target.currentLevel || ''
              cloneData.list[index].addPointsItemList = []
              cloneData.list[index].annualAddPoints = ''
            }

            setData(cloneData)
          }}
          filterOption={(input: string, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {nurseList.map((item: any) => <Option key={item.empNo} value={item.empName}>{item.empName}</Option>)}
        </Select>
      },
      width: 120
    },
    {
      title: '护理质量',
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return <span
            style={{
              fontWeight: 'bold',
              cursor: 'default'
            }}>
            不参加考核原因
            </span>
        else
          return <Input
            className={`nursingDeduct${index}`}
            value={record.nursingDeduct}
            onChange={(e: any) => handleNumberInput(e, record, index, 'nursingDeduct')} />
      },
      width: 90
    },
    {
      title: `工作量`,
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return {
            children: <TextArea
              autosize={{ minRows: 1 }}
              value={record.noCheckReason}
              onChange={(e: any) => {
                cloneData.list[index].noCheckReason = e.target.value
                setData(cloneData)
              }} />,
            props: {
              colSpan: 4
            }
          }
        else
          return <Input
            className={`workloadDeduct${index}`}
            value={record.workloadDeduct}
            onChange={(e: any) => handleNumberInput(e, record, index, 'workloadDeduct')} />
      },
      width: 90
    },
    {
      title: `满意度`,
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return { children: '', props: { colSpan: 0 } }
        else
          return <Input
            className={`satisfactionDeduct${index}`}
            value={record.satisfactionDeduct}
            onChange={(e: any) => handleNumberInput(e, record, index, 'satisfactionDeduct')} />
      },
      width: 90
    },
    {
      title: `学时`,
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return { children: '', props: { colSpan: 0 } }
        else
          return <Input
            className={`classHoursDeduct${index}`}
            value={record.classHoursDeduct}
            onChange={(e: any) => handleNumberInput(e, record, index, 'classHoursDeduct')} />
      },
      width: 90
    },
    {
      title: `考核总分`,
      width: 90,
      align: 'center',
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return { children: '', props: { colSpan: 0 } }
        else
          return <span>{sum(record)}</span>
      }
    },
    {
      title: `星级`,
      align: 'center',
      render(text: any, record: any, index: number) {
        if (record.noCheck)
          return { children: '', props: { colSpan: 0 } }
        else
          return <span>{record.starClass}</span>
      },
      width: 80
    },
    ...(() => {
      /**12月份显示年度加分和明细 */
      if (report.month === 12) {
        return [
          {
            title: '加分明细',
            dataIndex: 'addPointsItemList',
            width: 80,
            align: 'center',
            render: (arr: any, record: any, index: number) => {
              let level = record.currentLevel
              if (!level) return <span></span>

              let itemList = scoreDetailMap[level] || []

              const content = itemList.map((item: any, itemIdx: number) => {
                let targetItem = (record.addPointsItemList || [])
                  .find((recordItem: any) => recordItem.itemCode == item.itemCode)

                return <PopItemCon key={`pop-${index}-${itemIdx}`}>
                  <Checkbox
                    checked={targetItem && targetItem.checked} onChange={(e: any) => {
                      let newRecord = { ...record }

                      if (targetItem) {
                        targetItem.checked = e.target.checked
                      } else {
                        let newItem = {
                          ...item,
                          checked: e.target.checked
                        }
                        if (newRecord.addPointsItemList instanceof Array)
                          newRecord.addPointsItemList.push(newItem)
                        else
                          newRecord.addPointsItemList = [newItem]
                      }

                      cloneData.list[index] = newRecord

                      setData(cloneData)
                    }}>
                    <span className="pop-item-content">{itemIdx + 1}.{item.itemName}</span>
                    <span
                      onClick={(e) => { e.stopPropagation() }}
                      style={{
                        marginLeft: '5px',
                        marginRight: '-5px',
                        color: '#999',
                        fontSize: '12px',
                        position: 'relative',
                        top: '-2px',
                      }}>
                      <span>分值:</span>
                      <span>
                        <Input
                          size="small"
                          disabled={!(targetItem && targetItem.checked)}
                          style={{ width: '60px' }}
                          className={`check-item-source-${index}-${itemIdx}`}
                          value={targetItem ? targetItem.addPoints : ''}
                          onChange={(e) =>
                            handleCheckItemSource(
                              e.target.value,
                              targetItem ? targetItem.addPoints : '',
                              record,
                              item,
                              index)} />
                      </span>
                      <span style={{ marginLeft: '5px' }}>({item.expand || '0'}分)</span>
                    </span>
                  </Checkbox>
                </PopItemCon>
              })

              return <DoCon>
                <Popover
                  placement='right'
                  trigger='click'
                  title={`${record.empName || ''}的加分明细`}
                  content={content}>
                  <span>请选择</span>
                </Popover>
              </DoCon>
            },
          },
          {
            title: '年度加分',
            dataIndex: 'annualAddPoints',
            align: 'center',
            // render(val: any, record: any, index: number) {
            //   return <Input
            //     className={`annualAddPoints${index}`}
            //     value={val}
            //     onChange={(e: any) => handleNumberInput(e, record, index, 'annualAddPoints')} />
            // },
            width: 90,
          },
        ] as ColumnProps<any>[]
      } else {
        return []
      }
    })(),
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

  const handleCheckItemSource = (newVal: string, oldVal: string, record: any, item: any, idx: number) => {
    if (/^\d*\.{0,1}\d*$/.test(newVal)) {
      newVal = newVal.replace('-', '')
      let valArr = newVal.split('.')
      if (valArr.length > 1) {
        valArr[1] = valArr[1].slice(0, 1)
        // if (valArr[1].length <= 0) valArr[1] = '0'
      }
      newVal = valArr.join('.')

      let expand = item.expand

      if (expand && !isNaN(Number(expand)) && Number(newVal) > Number(expand)) {
        newVal = expand
      }
    } else if (newVal !== '' && newVal !== '0') {
      newVal = oldVal
    }

    let newRecord = { ...record }

    let target = newRecord.addPointsItemList.find((listItem: any) => listItem.itemCode == item.itemCode)
    target.addPoints = newVal

    let annualAddPoints = 0
    newRecord.addPointsItemList
      .filter((listItem: any) => listItem.checked)
      .map((listItem: any) => {
        console.log(listItem)
        annualAddPoints += parseFloat(listItem.addPoints || 0)
      })

    newRecord.annualAddPoints = annualAddPoints

    cloneData.list[idx] = newRecord

    console.log(cloneData.list[idx])

    setData(cloneData)
  }

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

  const addUncheckedItem = () => {
    //添加不考核人员
    cloneData.list.push({
      id: '',
      empName: '',
      empNo: '',
      indexNo: cloneData.list.length,
      nursingDeduct: '',
      workloadDeduct: '',
      satisfactionDeduct: '',
      starClass: '',
      month: search.month,
      year: search.year,
      noCheck: true,
      noCheckReason: '',
      reportCode: "ward_star_rating",
      wardCode: search.wardCode
    })

    setData(cloneData)
  }

  const handleNumberInput = (e: any, record: any, index: number, key: string) => {
    let val = e.target.value

    // 学时扣分不能大于6分
    let numVal = Number(val)
    if (key === 'classHoursDeduct' && !isNaN(numVal)) {
      if (Math.abs(numVal) > 6)
        val = '-6'
    }

    record[key] = val
    record.starClass = starClass(record)

    setData(cloneData)
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
    if (nursingDeduct < 0) nursingDeduct = -nursingDeduct

    let workloadDeduct = Number(
      formatNum(
        -Number(item.workloadDeduct)
      )
    )
    if (isNaN(workloadDeduct)) workloadDeduct = 0
    if (workloadDeduct < 0) workloadDeduct = -workloadDeduct

    let satisfactionDeduct = Number(
      formatNum(
        -Number(item.satisfactionDeduct)
      )
    )
    if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0
    if (satisfactionDeduct < 0) satisfactionDeduct = -satisfactionDeduct

    let classHoursDeduct = Number(
      formatNum(
        -Number(item.classHoursDeduct)
      )
    )
    if (isNaN(classHoursDeduct)) classHoursDeduct = 0
    if (classHoursDeduct < 0) classHoursDeduct = -classHoursDeduct

    return formatNum(total - nursingDeduct - workloadDeduct - satisfactionDeduct - classHoursDeduct)
  }

  const starClass = (record: any) => {
    let sumUp = Number(sum(record))

    if (sumUp >= 98) return '三星'
    if (sumUp >= 94) return '二星'
    if (sumUp >= 90) return '一星'
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
              empNo: item.code,
              currentLevel: item.currentLevel
            }
          }))
        }
      })
  }, [])

  return (
    <Wrapper>
      <div className='button-con'>
        <Button
          icon='plus'
          type="danger"
          size='small'
          style={{ marginRight: '5px' }}
          onClick={addUncheckedItem}>
          添加不考核人员
        </Button>
        <Button
          icon='plus'
          size='small'
          onClick={addItem}>
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
const PopItemCon = styled.div`
  margin-bottom: 5px;
  label>span{
    vertical-align: top;
  }
  .ant-checkbox{
    position: relative;
    top: 3px;
  }
  .pop-item-content{
    display:inline-block;
    width: 350px;
    word-break: break-all;
    vertical-align: top;
  }
`

const HeadCon = styled.div``
