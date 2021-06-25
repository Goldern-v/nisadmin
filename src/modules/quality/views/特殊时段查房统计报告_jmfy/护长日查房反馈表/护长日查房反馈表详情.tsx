import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Input } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores'
import { AuditInfoPannel, BaseInfoPannel, ButtonGroups, MainPannel, MainTitle, NavCon, SubContent, TopPannel, Wrapper, BaseInfoPage } from './components/detail.common'
import { Link } from 'react-router-dom'
export interface Props { }

export default observer(function 护长日查房反馈表详情() {
  const { queryObj, history } = appStore
  const [editable, setEditable] = useState(false)
  const [baseInfo, setBaseInfo] = useState({} as any)
  const [listData, setListData] = useState([
    { wardName: '测试科室', exsistProblem: '存在问题', measure: '措施' }
  ] as any[])
  const [auditInfo, setAuditInfo] = useState([] as any[])

  const totalCols = 6

  const handleAddRow = () => {
    let newListData = [...listData]
    newListData.push({})

    setListData(newListData)
  }

  const handleListItemChange = (newItem: any, idx: number) => {
    let newListData = [...listData]
    newListData[idx] = { ...newItem }

    setListData(newListData)
  }

  const handleListItemDelete = (idx: number) => {
    let newListData = [...listData]
    newListData.splice(idx, 1)

    setListData(newListData)
  }

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/checkWard/月护长查房反馈表" replace>月护长查房汇总统计</Link>
        <span> &gt; 记录详情</span>
      </NavCon>
      <MainTitle>
        {baseInfo && <span>{baseInfo.title || '记录详情标题'}</span>}
      </MainTitle>
      <SubContent>
        <span className="label"> 状态:</span>
        <span className="content">待提交</span>
      </SubContent>
      <ButtonGroups>
        <Button type="primary">提交</Button>
        <Button type="primary">审核</Button>
        <Button
          onClick={() => history.goBack()}>
          返回
        </Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <AuditInfoPannel>
        <div className="audit-title">审核过程</div>
        <div className="audit-list">
          <div className="audit-item">
            <div className="status-icon">
              {/* <Icon type="close-circle" theme="filled" className="step-status error" /> */}
              <Icon type="check-circle" theme="filled" className="step-status success" />
              {/* <div className="step-status no-status"></div> */}
            </div>
            <div className="info">
              <div className="step-title">提交</div>
              <div className="desc">备注abc</div>
            </div>
          </div>
        </div>
      </AuditInfoPannel>
      <BaseInfoPannel>
        <BaseInfoPage>
          <div className="main-title">{baseInfo.title || '记录详情标题'}</div>
          <table className="form-info">
            <tbody>
              <tr>
                <td
                  style={{ textAlign: 'left' }}
                  colSpan={totalCols}>
                  日期：2021 年 05 月 01 日- 05 月 31 日                    反馈者：安琪拉
                </td>
              </tr>
              <tr>
                <td>科别</td>
                <td>存在问题</td>
                <td>整改措施</td>
                <td>可是落实</td>
                <td>护理部跟踪</td>
                <td>操作</td>
              </tr>
              {listData.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td>
                    <Input.TextArea
                      autosize={{ minRows: 1 }}
                      value={item.wardName}
                      onChange={(e: any) => handleListItemChange({
                        ...item,
                        wardName: e.target.value,
                      }, idx)} />
                  </td>
                  <td>
                    <Input.TextArea
                      autosize={{ minRows: 1 }}
                      value={item.exsistProblem}
                      onChange={(e: any) => handleListItemChange({
                        ...item,
                        exsistProblem: e.target.value,
                      }, idx)} />
                  </td>
                  <td>
                    <Input.TextArea
                      autosize={{ minRows: 1 }}
                      value={item.measure}
                      onChange={(e: any) => handleListItemChange({
                        ...item,
                        measure: e.target.value,
                      }, idx)} />
                  </td>
                  <td>
                    <Input.TextArea
                      autosize={{ minRows: 1 }}
                      value={item.canBeDone}
                      onChange={(e: any) => handleListItemChange({
                        ...item,
                        canBeDone: e.target.value,
                      }, idx)} />
                  </td>
                  <td className="relative">
                    <Input.TextArea
                      autosize={{ minRows: 1 }}
                      value={item.followed}
                      onChange={(e: any) => handleListItemChange({
                        ...item,
                        followed: e.target.value,
                      }, idx)} />
                  </td>
                  <td>
                    <Button size="small" type="danger" onClick={() => handleListItemDelete(idx)}>删除</Button>
                  </td>
                </tr>
              ))}
              {listData.length <= 0 && (
                <tr>
                  <td
                    colSpan={totalCols}
                    style={{
                      color: '#999',
                      height: 300,
                      lineHeight: '300px',
                      textAlign: 'center'
                    }}>
                    暂 无 数 据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Button
            style={{ marginTop: '15px', width: '100%' }}
            onClick={() => handleAddRow()}>

          </Button>
        </BaseInfoPage>
      </BaseInfoPannel>
    </MainPannel>
  </Wrapper>
})
