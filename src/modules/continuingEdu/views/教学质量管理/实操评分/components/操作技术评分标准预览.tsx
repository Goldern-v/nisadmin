import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select } from 'antd'
import { Modal, Spin } from 'antd'
import { ScrollBox } from 'src/components/common'
import { practicalScoreEvalService } from '../services/PracticalScoreEvalService'
import 操作技术评分 from './templates/操作技术评分'
import 操作技术评分标准编辑 from './操作技术评分标准编辑'
import { Place } from 'src/components/common'
export interface Props { }

const Option = Select.Option

export interface Props {
  visible: boolean,
  onCancel: Function,
}

export default function 操作技术评分标准预览(props: Props) {
  const { visible, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [viewData, setViewData] = useState({} as any)
  const [practicalTableList, setPracticalTableList] = useState([] as any[])

  const [editVisible, setEditVisible] = useState(false)
  const [editDetail, setEditDetail] = useState({})

  const getTemplateList = (callback?: Function) => {
    setLoading(true)

    practicalScoreEvalService.getAllPracticalTableList()
      .then(res => {
        setLoading(false)
        setPracticalTableList(res.data)
        callback && callback(res.data)
      }, () => setLoading(false))
  }

  const getTemplateDetail = (id: string | number) => {
    setLoading(true)
    practicalScoreEvalService.
      getPracticalTableByIdpracticalTableId(id)
      .then(res => {
        setLoading(false)
        setViewData(res.data)
      }, () => setLoading(false))
  }

  const handleEdit = (isNew?: boolean) => {
    if (isNew) {
      setEditDetail({})
    } else {
      setEditDetail(viewData)
    }

    setEditVisible(true)
  }

  useEffect(() => {
    if (visible)
      getTemplateList((newList: any[]) => {
        if (newList.length > 0) {
          let currentId = newList[0].id
          setSelectedId(currentId)
          getTemplateDetail(currentId)
        }
      })
  }, [visible])

  return <React.Fragment>
    <Modal
      title={'技术评分表预览'}
      visible={visible}
      centered
      bodyStyle={{ padding: 0 }}
      width={840}
      footer={null}
      onCancel={() => onCancel()}>
      <Wrapper>
        <Topbar>
          <Select
            value={selectedId.toString()}
            onChange={(id: string) => {
              setSelectedId(id)
              getTemplateDetail(id)
            }}>
            {practicalTableList.map((item: any) => (
              <Option key={item.id} value={item.id.toString()}>
                {item.tableName}操作技术评分标准
              </Option>
            ))}
          </Select>
          <Place />
          <Button onClick={() => handleEdit()} type="primary">编辑</Button>
          <Button style={{ marginLeft: 10 }} onClick={() => handleEdit(true)}>新建</Button>
        </Topbar>
        <ScrollCon>
          {!loading ? (
            <PageWrapper>
              <操作技术评分 isTemplate baseInfo={viewData} questionList={viewData.questionList || []} />
            </PageWrapper>
          ) : (
            <Spin spinning={loading}>
              <div className="loading-content"></div>
            </Spin>
          )}
        </ScrollCon>
      </Wrapper>
    </Modal>
    <操作技术评分标准编辑
      visible={editVisible}
      onOk={() => {
        setEditVisible(false)
        // 如果是新建则显示最后一条
        if (Object.keys(editDetail).length <= 0) {
          getTemplateList((newList: any[]) => {
            if (newList.length > 0) {
              let currentId = newList[newList.length - 1].id
              setSelectedId(currentId)
              getTemplateDetail(currentId)
            }
          })
        } else {
          getTemplateList(() => getTemplateDetail(selectedId))

        }
      }}
      onCancel={() => setEditVisible(false)}
      orginPrams={editDetail} />
  </React.Fragment>
}

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`

const Topbar = styled.div`
  padding: 5px 15px;
  background-color: #fff;
  border-bottom: 1px solid #dddd;
  display: flex;
`

// @ts-ignore
const ScrollCon = styled(ScrollBox)`
  background: #ddd;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  .loading-content{
    width: 100%;
    height: 500px;
  }
`

const PageWrapper = styled.div`
  background: #fff;
  margin: 30px auto;
  width: 740px;
  min-height: 1040px;
  padding: 30px;
  table{
    width: 100%;
    border-collapse: collapse;
    border-color: #000;
  }
  td,th{
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    color: #000;
    padding: 0;
    border: 1px #000 solid;
    padding: 2px 8px;
    word-break: break-all;
    &.selected{
      position: relative;
      &::after{
        content: '√';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -4px;
        color: #000;
        font-size: 30px;
        transform: translateY(-50%);
      }
    }
    &.align-center{
      text-align: center;
    }
    &.small-font-size{
      font-size: 12px;
    }
  }
  .main-title{
    line-height: 45px;
    font-size: 24px;
    font-weight: bold;
    color: #000;
    letter-spacing: 5px;
    text-align: center;
  }
  .form-name{
    letter-spacing: 1px;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
  .flex-row{
    display: flex;
  }
  .bold{
    font-weight: bold;
  }
`