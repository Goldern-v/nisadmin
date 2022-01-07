import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, InputNumber, Modal, Spin } from 'antd'
import YearPicker from 'src/components/YearPicker'
import { ModalComponentProps } from 'src/libs/createModal'
import { empManageService } from "./../views/empDetail/api/EmpManageService"
import moment from 'moment'
import { message } from 'antd/es'
import { authStore } from "src/stores";

export interface Props extends ModalComponentProps {
  okCallback?: Function
}

export default function RuleInstsEditModal(props: Props) {
  const { visible, onCancel, okCallback } = props

  const [year, setYear] = useState(moment().format('YYYY'))

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])

  const getTableData = () => {
    setLoading(true)
    empManageService
      .queryRuleInsts(year)
      .then(res => {
        setLoading(false)
        if (res.data)
          setTableData(res.data.instDtoList || [])
      }, () => setLoading(false))
  }

  const handleSave = () => {
    if (authStore.isDepartment) {
      setLoading(true)
      empManageService
        .saveOrUpdateRuleInsts({
          year,
          instDtoList: tableData
        })
        .then(res => {
          message.success('修改成功')
          setLoading(false)
          okCallback && okCallback()
        }, () => setLoading(false))
    } else {
      message.warning('您没有权限编辑')
    }
    
  }

  useEffect(() => {
    if (visible)
      getTableData()
    else
      setYear(moment().format('YYYY'))
  }, [visible, year])

  return <Modal
    title="学时学分规则督导"
    visible={visible}
    width={400}
    confirmLoading={loading}
    onCancel={onCancel}
    okText="保存"
    onOk={handleSave}
    centered>
    <Wrapper>
      <div>
        <span>年份：</span>
        <YearPicker
          style={{ width: 80 }}
          disabled={loading}
          allowClear={false}
          value={moment(`${year}-01-01`)}
          onChange={(_moment: any) => setYear(_moment.format('YYYY'))} />
      </div>
      <Spin spinning={loading}>
        <MinTableCon>
          <table>
            <tbody>
              <tr className="header">
                <td>层级</td>
                <td>最低学分要求</td>
                <td>最低学时要求</td>
              </tr>
              {tableData.length > 0 && tableData.map((item: any, idx: number) => <tr key={item.ruleItem}>
                <td>{item.ruleItem}</td>
                <td>
                  <InputNumber
                    value={item.minimumCredit}
                    onChange={(val) => {
                      let newItem = { ...item, minimumCredit: val }
                      let newTableData = [...tableData]
                      newTableData[idx] = newItem
                      setTableData(newTableData)
                    }} />
                </td>
                <td>
                  <InputNumber
                    value={item.minimumClassHours}
                    onChange={(val) => {
                      let newItem = { ...item, minimumClassHours: val }
                      let newTableData = [...tableData]
                      newTableData[idx] = newItem
                      setTableData(newTableData)
                    }} />
                </td>
              </tr>)}
              {tableData.length <= 0 && <tr className="null-row">
                <td colSpan={3}></td>
              </tr>}
            </tbody>
          </table>
        </MinTableCon>
      </Spin>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div``

const MinTableCon = styled.div`
  width: 100%;
  margin-top: 10px;
  table,table tr th, table tr td { 
    border:1px solid #ccc;
  }
  td{
    padding: 5px 10px;
  }
  table { 
    width: 100%;
    text-align: center; 
    border-collapse: collapse;
    .ant-input-number{
      width: 100%;
    }
  }
  .header{
    background: #eee;
    font-weight: bold;
  }
  .null-row{
    td{
      height: 300px;
    }
  }
`