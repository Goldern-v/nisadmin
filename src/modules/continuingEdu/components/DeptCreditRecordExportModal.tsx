import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select } from 'antd'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import { empManageService } from "./../views/empDetail/api/EmpManageService"
import { ModalComponentProps } from 'src/libs/createModal'
import { fileDownload } from 'src/utils/file/file'

const Option = Select.Option

export interface Props extends ModalComponentProps {
  deptCode?: string
}

export default observer(function DeptCreditRecordExportModal(props: Props) {
  const { visible, onCancel, deptCode } = props

  const { selectedDeptCode, deptList } = authStore

  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useState({
    year: moment().format('YYYY'),
    deptCode: selectedDeptCode
  })

  const handleExport = () => {
    setLoading(true)
    empManageService
      .exporCreditdetailInfoByYear(query)
      .then(res => {
        setLoading(false)
        fileDownload(res)
        onCancel && onCancel()
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      setQuery({
        year: moment().format('YYYY'),
        deptCode: deptCode || selectedDeptCode,
      })
    }
  }, [visible])

  return <Modal
    title="导出科室学分统计"
    visible={visible}
    width={400}
    confirmLoading={loading}
    onCancel={onCancel}
    onOk={handleExport}
    centered>
    <Wrapper>
      <Row className="query-row">
        <Col span={4} className="label">科室:</Col>
        <Col span={16}>
          <Select
            style={{ width: '100%' }}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={query.deptCode}
            onChange={(deptCode: string) =>
              setQuery({ ...query, deptCode })}>
            {deptList.map((item: any, idx: number) =>
              <Option
                value={item.code}
                key={item.code}>
                {item.name}
              </Option>)}
          </Select>
        </Col>
      </Row>
      <Row className="query-row">
        <Col span={4} className="label">年份:</Col>
        <Col span={16}>
          <YearPicker
            style={{ width: 80 }}
            allowClear={false}
            value={moment(`${query.year}-01-01`)}
            onChange={(_moment: any) =>
              setQuery({ ...query, year: _moment.format('YYYY') })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .query-row{
    margin-bottom:10px;
  }
  .label{
    padding-right: 10px;
    text-align: right;
    line-height: 30px;
  }
`