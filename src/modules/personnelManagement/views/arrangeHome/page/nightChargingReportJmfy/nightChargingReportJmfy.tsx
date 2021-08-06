import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Modal, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import { ScrollBox } from "src/components/common"
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import OneEditTable from './components/OneEditTable'
import TwoEditTable from './components/TwoEditTable'

import { nightChargingReportJmfyService } from './services/nightChargingReportJmfyService'
import moment from 'src/vendors/moment'

const ButtonGroup = Button.Group

export interface Props { }

export default observer(function nightChargingReportJmfy() {
  const { queryObj, history } = appStore

  const [data, setData] = useState({
    schNightTotalModel: {} as any,
    list1: [] as any[],
    list2: {} as any
  })

  let dateOrigin = (data.schNightTotalModel.year && data.schNightTotalModel.month) ?
    `${data.schNightTotalModel.year}-${data.schNightTotalModel.month}` :
    data.schNightTotalModel.startDate || queryObj.startDate

  const dateStr = moment(dateOrigin).format('YYYY年MM月')

  const [showType, setShowType] = useState('0')

  const showTypeList = [
    { name: '一值夜班', code: '0' },
    { name: '突发回院', code: '1' },
  ]

  const [loading, setLoading] = useState(false)

  const onDelete = () => {

    Modal.confirm({
      title: '提示',
      content: '是否删除?',
      onOk: () => {
        setLoading(true)

        nightChargingReportJmfyService
          .delete(queryObj.id)
          .then(res => {
            setLoading(false)
            message.success('删除成功', () => {
              history.goBack()
            })
          }, () => setLoading(false))
      }
    })
  }

  const getData = () => {
    setLoading(true)

    setData({
      list1: [],
      list2: {},
      schNightTotalModel: data.schNightTotalModel
    })

    if (showType === '0') {
      nightChargingReportJmfyService.getListOne({
        id: queryObj.id,
        deptCode: queryObj.deptCode,
        startDate: queryObj.startDate,
        endDate: queryObj.endDate,
      })
        .then(res => {
          setLoading(false)

          if (res.data) {
            let newData = {
              list1: res.data.list1.map((item: any) => {
                let numKeys = ["moneyN", "standardP", "daysP", "standardN", "daysN", "totalAll", "moneyP"]

                let newItem = {
                  ...item,
                  key: `${new Date().getTime()}-${parseInt((Math.random() * 1000000).toString())}`
                }

                numKeys.forEach((key: string) => {
                  let val = Number(newItem[key] || undefined)
                  if (isNaN(val)) {
                    newItem[key] = 0
                  } else {
                    newItem[key] = val
                  }
                })

                return newItem
              }),
              list2: res.data.list2,
              schNightTotalModel: res.data.schNightTotalModel,
            }

            setData(newData)
          }
        }, () => setLoading(false))
    } else if (showType === '1') {
      nightChargingReportJmfyService.getListTwo({
        id: queryObj.id,
        deptCode: queryObj.deptCode,
        startDate: queryObj.startDate,
        endDate: queryObj.endDate,
      })
        .then(res => {
          setLoading(false)
          if (res.data) {
            let newData = {
              list1: res.data.list1.map((item: any) => {
                let numKeys = ["money", "standard", "days"]

                let newItem = {
                  ...item,
                  key: `${new Date().getTime()}-${parseInt((Math.random() * 1000000).toString())}`
                }

                numKeys.forEach((key: string) => {
                  let val = Number(newItem[key] || undefined)
                  if (isNaN(val)) {
                    newItem[key] = 0
                  } else {
                    newItem[key] = val
                  }
                })

                return newItem
              }),
              list2: res.data.list2,
              schNightTotalModel: res.data.schNightTotalModel,
            }

            setData(newData)
          }
        }, () => setLoading(false))
    }
  }

  const handleSave = () => {
    let saveParams = {
      list1: data.list1.map((item: any, idx: number) => ({ ...item, sort: idx + 1 })),
      list2: data.list2,
      schNightTotalModel: data.schNightTotalModel,
    }

    // console.log(saveParams)

    let reqMethod = nightChargingReportJmfyService.saveListOne.bind(nightChargingReportJmfyService)

    if (showType === '1') {
      reqMethod = nightChargingReportJmfyService.saveListTwo.bind(nightChargingReportJmfyService)
    }

    setLoading(true)
    reqMethod(saveParams)
      .then(res => {
        message.success('保存成功')
        setLoading(false)
      }, () => setLoading(true))
  }

  const handleExport = () => {
    let reqMethod = nightChargingReportJmfyService.excelListOne.bind(nightChargingReportJmfyService)
    if (showType === '1') {
      reqMethod = nightChargingReportJmfyService.excelListTwo.bind(nightChargingReportJmfyService)
    }

    reqMethod(data)
  }

  useEffect(() => {
    getData()
  }, [showType])

  return <Wrapper>
    <HeadCon>
      <BaseBreadcrumb
        data={[
          {
            name: "分析报告",
            link: "/personnelManagement/nightChargingReport"
          },
          { name: "报告详情", link: "" }
        ]}
      />
      <div className="title">{queryObj.name}</div>
      <div className="tool-con">
        <Button onClick={onDelete}>删除</Button>
        <Button onClick={() => handleExport()}>导出</Button>
        <Button type="primary" onClick={() => history.goBack()}>返回</Button>
      </div>
    </HeadCon>
    <ScrollCon>
      <Spin spinning={loading}>
        <Page>
          <div className="btn-group btn-group-left">
            <ButtonGroup>
              {showTypeList.map((item: any) => (
                <Button
                  size="small"
                  disabled={loading}
                  key={item.code}
                  type={showType == item.code ? 'primary' : 'default'}
                  onClick={() => setShowType(item.code)}>
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div className="main-title">江门市妇幼保健院夜班补助签领单</div>
          <div className="btn-group btn-group-right">
            <Button
              loading={loading}
              size="small"
              onClick={() => handleSave()}>
              保存
            </Button>
          </div>
          {showType === '0' && (
            <OneEditTable
              deptName={queryObj.deptName}
              dateStr={dateStr}
              data={data}
              onDataChange={(newData: any) => setData({ ...newData })}
            />
          )}
          {showType === '1' && (
            <TwoEditTable
              deptName={queryObj.deptName}
              dateStr={dateStr}
              data={data}
              onDataChange={(newData: any) => setData({ ...newData })} />
          )}
        </Page>
      </Spin>
    </ScrollCon>
  </Wrapper>
})

const Wrapper = styled.div`
  * {
      font-size: 14px;
    }
`

const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`;

// @ts-ignore
const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`;

const Page = styled.div`
  width: 1350px;
  min-height: calc(100vh - 220px);
  margin: 20px auto 20px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  padding: 30px 50px;
  padding-bottom: 10px;
  line-height: 28px;

  .main-title{
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: #000;
  }

  .btn-group{
    position: absolute;
    top: 30px;
    &.btn-group-left{
      left: 50px;
    }
    &.btn-group-right{
      right: 50px;
    }
  }
`;