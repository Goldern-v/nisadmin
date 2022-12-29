import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Input, InputNumber, message, Modal, Select } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { userTypeList, educationList, titleList } from './../data/options'
import { rules } from './../data/rules'
import moment from 'moment'
import { otherEmpService } from './../api/OtherEmpService'
import { appStore } from 'src/stores'

const Option = Select.Option
const { RangePicker } = DatePicker

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any
}

export default function ImportEditModal(props: Props) {
  const { visible, onOk, onCancel, params } = props
  const [tableData, setTableData] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [deptList, setDeptList] = useState([] as any[])
  const userType = userTypeList.find((item: any) => item.name == params.userType)?.type

  const columns: any[] = (() => {

    let defaultColumns0 = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 60,
        align: 'center',
        render: (text: any, record: any, idx: number) => text
      },
      {
        title: '类型',
        dataIndex: 'userType',
        width: 90,
        align: 'center'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 90,
        className: 'ipt-cell',
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Input
            value={text}
            onChange={(e: any) =>
              handleRecordItemChange('name', e.target.value, idx)} />
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 60,
        className: 'ipt-cell',
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Select
            value={text}
            onChange={(val: any) =>
              handleRecordItemChange('sex', val, idx)}>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
      }
    ]

    let defaultColumns1 = [

      {
        title: '家庭地址',
        dataIndex: 'address',
        className: 'ipt-cell',
        width: 225,
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Input
            value={text}
            onChange={(e: any) =>
              handleRecordItemChange('address', e.target.value, idx)} />
      },
      {
        title: '紧急联系人',
        dataIndex: 'emergencyContactPerson',
        className: 'ipt-cell',
        width: 80,
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Input
            value={text}
            onChange={(e: any) =>
              handleRecordItemChange('emergencyContactPerson', e.target.value, idx)} />
      },
      {
        title: '紧急联系人电话',
        dataIndex: 'emergencyContactPhone',
        className: 'ipt-cell',
        width: 120,
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Input
            value={text}
            onChange={(e: any) =>
              handleRecordItemChange('emergencyContactPhone', e.target.value, idx)} />
      },
      {
        title: '备注',
        dataIndex: 'remark',
        className: 'ipt-cell',
        width: 180,
        align: 'center',
        render: (text: any, record: any, idx: number) =>
          <Input
            value={text}
            onChange={(e: any) =>
              handleRecordItemChange('remark', e.target.value, idx)} />
      },
      {
        title: '操作',
        key: 'operation',
        width: 80,
        align: 'center',
        render: (text: any, record: any, idx: number) => {
          return <DoCon>
            <span onClick={() => deleteRecord(idx)}>删除</span>
          </DoCon>
        }
      }
    ]

    switch (userType) {
      case '1':
        return [
          ...defaultColumns0,
          {
            title: '毕业院校',
            dataIndex: 'schoolName',
            width: 150,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('schoolName', e.target.value, idx)} />
          },
          {
            title: '专业',
            dataIndex: 'major',
            width: 120,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('major', e.target.value, idx)} />
          },
          {
            title: '学历',
            dataIndex: 'education',
            className: 'ipt-cell',
            width: 100,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('education', val, idx)}>
                {educationList.map((item) => <Option key={idx} value={item.name}>{item.name}</Option>)}
              </Select>
          },
          {
            title: '身份证号',
            dataIndex: 'idCardNo',
            className: 'ipt-cell',
            width: 150,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('idCardNo', e.target.value, idx)} />
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('phone', e.target.value, idx)} />
          },
          {
            title: '是否住宿',
            dataIndex: 'isResident',
            width: 60,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('isResident', val, idx)}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
          },
          {
            title: '宿舍编号',
            dataIndex: 'dormitoryNumber',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('dormitoryNumber', e.target.value, idx)} />
          },
          {
            title: '实习时间',
            dataIndex: 'internshipBegin',
            width: 225,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <RangePicker
                value={[
                  record.internshipBegin ? moment(record.internshipBegin) : undefined,
                  record.internshipEnd ? moment(record.internshipEnd) : undefined,
                ] as [any, any]}
                onChange={(_moment: any[]) => {
                  handleRecordChange({
                    ...record,
                    internshipBegin: _moment[0] ? _moment[0].format('YYYY-MM-DD') : '',
                    internshipEnd: _moment[1] ? _moment[1].format('YYYY-MM-DD') : ''
                  }, idx)
                }} />
          },
          {
            title: '实习科室',
            dataIndex: 'studyDeptCode',
            className: 'ipt-cell',
            width: 180,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                style={{ width: '100%' }}
                value={record.studyDeptCode}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(studyDeptCode: any) => {
                  let studyDeptName = ''
                  let target = deptList.find((item: any) => item.code == studyDeptCode)
                  if (target) studyDeptName = target.name
                  handleRecordChange({
                    ...record,
                    studyDeptCode,
                    studyDeptName
                  }, idx)
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
          },
          {
            title: '是否组长',
            dataIndex: 'isGroupLeader',
            width: 60,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('isGroupLeader', val, idx)}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
          },
          ...defaultColumns1,
        ]
      case '2':
        return [
          ...defaultColumns0,
          {
            title: '年龄',
            dataIndex: 'age',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <InputNumber
                style={{ width: '100%' }}
                value={record.age}
                step={1}
                precision={0}
                onChange={(age) =>
                  handleRecordChange({
                    ...record,
                    age
                  }, idx)} />
          },
          {
            title: '原单位名称',
            dataIndex: 'originalWorkUnit',
            className: 'ipt-cell',
            width: 180,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('originalWorkUnit', e.target.value, idx)} />
          },
          {
            title: '原科室',
            dataIndex: 'originalDepartment',
            className: 'ipt-cell',
            width: 180,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('originalDepartment', e.target.value, idx)} />
          },
          {
            title: '学历',
            dataIndex: 'education',
            className: 'ipt-cell',
            width: 100,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('education', val, idx)}>
                {educationList.map((item) => <Option key={idx} value={item.name}>{item.name}</Option>)}
              </Select>
          },
          {
            title: '身份证号',
            dataIndex: 'idCardNo',
            className: 'ipt-cell',
            width: 150,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('idCardNo', e.target.value, idx)} />
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('phone', e.target.value, idx)} />
          },
          {
            title: '是否住宿',
            dataIndex: 'isResident',
            width: 60,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('isResident', val, idx)}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
          },
          {
            title: '宿舍编号',
            dataIndex: 'dormitoryNumber',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('dormitoryNumber', e.target.value, idx)} />
          },
          {
            title: '进修时间',
            dataIndex: 'refresherTimeBegin',
            width: 225,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <RangePicker
                value={[
                  record.refresherTimeBegin ? moment(record.refresherTimeBegin) : undefined,
                  record.refresherTimeEnd ? moment(record.refresherTimeEnd) : undefined,
                ] as [any, any]}
                onChange={(_moment: any[]) => {
                  handleRecordChange({
                    ...record,
                    refresherTimeBegin: _moment[0] ? _moment[0].format('YYYY-MM-DD') : '',
                    refresherTimeEnd: _moment[1] ? _moment[1].format('YYYY-MM-DD') : ''
                  }, idx)
                }} />
          },
          {
            title: '进修科室一',
            dataIndex: 'refresherDeptCode01',
            className: 'ipt-cell',
            width: 180,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                style={{ width: '100%' }}
                value={record.refresherDeptCode01}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(refresherDeptCode01: any) => {
                  let refresherDeptName01 = ''
                  let target = deptList.find((item: any) => item.code == refresherDeptCode01)
                  if (target) refresherDeptName01 = target.name
                  handleRecordChange({
                    ...record,
                    refresherDeptCode01,
                    refresherDeptName01
                  }, idx)
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
          },
          ...appStore.hisMatch({
            map: {
              'qhwy,whhk,dglb,dghm': [],
              other: [
                {
                  title: '进修科室二',
                  dataIndex: 'refresherDeptCode02',
                  className: 'ipt-cell',
                  width: 180,
                  align: 'center',
                  render: (text: any, record: any, idx: number) =>
                    <Select
                      style={{ width: '100%' }}
                      value={record.refresherDeptCode02}
                      showSearch
                      filterOption={(input: any, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      allowClear
                      onChange={(refresherDeptCode02: any) => {
                        let refresherDeptName02 = ''
                        let target = deptList.find((item: any) => item.code == refresherDeptCode02)
                        if (target) refresherDeptName02 = target.name
                        handleRecordChange({
                          ...record,
                          refresherDeptCode02: refresherDeptCode02 || '',
                          refresherDeptName02
                        }, idx)
                      }}>
                      {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
                    </Select>
                },
              ]
            }
          }),
          ...defaultColumns1,
        ]
      case '3':
      case '4':
      case '99':
        return [
          ...defaultColumns0,
          {
            title: '毕业院校',
            dataIndex: 'schoolName',
            width: 150,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('schoolName', e.target.value, idx)} />
          },
          {
            title: '专业',
            dataIndex: 'major',
            width: 120,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('major', e.target.value, idx)} />
          },
          {
            title: '学历',
            dataIndex: 'education',
            className: 'ipt-cell',
            width: 100,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('education', val, idx)}>
                {educationList.map((item) => <Option key={idx} value={item.name}>{item.name}</Option>)}
              </Select>
          },
          {
            title: '身份证号',
            dataIndex: 'idCardNo',
            className: 'ipt-cell',
            width: 150,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('idCardNo', e.target.value, idx)} />
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('phone', e.target.value, idx)} />
          },
          {
            title: '是否住宿',
            dataIndex: 'isResident',
            width: 60,
            className: 'ipt-cell',
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                value={text}
                onChange={(val: any) =>
                  handleRecordItemChange('isResident', val, idx)}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
          },
          {
            title: '宿舍编号',
            dataIndex: 'dormitoryNumber',
            className: 'ipt-cell',
            width: 120,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Input
                value={text}
                onChange={(e: any) =>
                  handleRecordItemChange('dormitoryNumber', e.target.value, idx)} />
          },
          {
            title: '入职时间',
            dataIndex: 'dormitoryNumber',
            className: 'ipt-cell',
            width: 150,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <DatePicker
                value={record.entryDate ? moment(record.entryDate) : undefined}
                onChange={(_moment: any) => handleRecordChange({ ...record, entryDate: _moment.format('YYYY-MM-DD') }, idx)} />
          },
          {
            title: '所在科室',
            dataIndex: 'deptCode',
            className: 'ipt-cell',
            width: 180,
            align: 'center',
            render: (text: any, record: any, idx: number) =>
              <Select
                style={{ width: '100%' }}
                value={record.deptCode}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(deptCode: any) => {
                  let deptName = ''
                  let target = deptList.find((item: any) => item.code == deptCode)
                  if (target) deptName = target.name
                  handleRecordChange({
                    ...record,
                    deptCode,
                    deptName
                  }, idx)
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
          },
          ...defaultColumns1,
        ]
      default:
        return []
    }
  })()

  const handleRecordChange = (newRecord: any, idx: number) => {
    let newTableData = tableData.concat()
    newTableData[idx] = newRecord
    setTableData(newTableData)
  }

  const handleRecordItemChange = (key: string, val: any, idx: number) => {
    let newTableData = tableData.concat()
    newTableData[idx][key] = val
    setTableData(newTableData)
  }

  const deleteRecord = (idx: number) => {
    let newTableData = tableData.concat()
    newTableData.splice(idx, 1)
    setTableData(newTableData)
  }

  const handleSave = () => {
    let currentRules = rules(userType || '') as any
    let errMsgList = []
    if (tableData.length <= 0) errMsgList.push('需要保存的条目数为0')

    for (let i = 0; i < tableData.length; i++) {
      let editParams = tableData[i]
      let errMsgRow = []
      for (let key in currentRules) {
        let item = currentRules[key]
        let val = editParams[key] || ''
        for (let j = 0; j < item.length; j++) {
          let rule = item[j]
          let result = rule(val)
          if (result !== true) errMsgRow.push(result)
        }
      }
      if (errMsgRow.length > 0) {
        let errMsg = `第${editParams.index}条.${errMsgRow.join(',')}`
        errMsgList.push(errMsg)
      }
    }

    if (errMsgList.length > 0) {
      Modal.error({
        title: '提示',
        content: <div>
          {errMsgList.map((text: string, idx: number) => <div key={idx}>{text}</div>)}
        </div>
      })
      return
    }

    let saveParams = {
      userType: params.userType,
      personList: tableData,
    }

    setLoading(true)
    otherEmpService
      .importPersonsReally(saveParams)
      .then(res => {
        setLoading(false)
        message.success('操作成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  const getDept = () => {
    otherEmpService
      .nursingUnitWithOutLogin()
      .then(res => {
        setDeptList(res.data || [])
      })
  }

  useEffect(() => {
    getDept()
  }, [])

  useEffect(() => {
    if (visible) {
      let personList = params.personList || []

      setTableData(personList.concat())
    } else {
      setTableData([])
    }
  }, [visible])

  return <Modal
    forceRender
    title="导入确认"
    width={1000}
    visible={visible}
    confirmLoading={loading}
    onOk={() => handleSave()}
    onCancel={() => onCancel()}
    centered>
    <Wrapper>
      <BaseTable
        loading={loading}
        surplusWidth={200}
        surplusHeight={300}
        dataSource={tableData}
        columns={columns} />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  td{
    font-size: 14px!important;
  }
  .ipt-cell{
    padding:0!important;
    .ant-select{
      width: 100%;
    }
    textarea,.ant-select-selection,.ant-input{
      border:0;
      outline:0;
      border-radius:0;
      resize: none;
    }
    .ant-select-selection-selected-value{
      padding-right:0!important;
    }
  }
`