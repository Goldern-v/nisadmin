import { Radio, Form } from 'antd'
import { Modal, Input, Table, Popconfirm } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { FormComponentProps } from 'antd/es/form'
import { api } from 'src/modules/quality/views/qcZzwy/qqualityMWSummary/api'
import { firstData } from '../firstData'

const { Search } = Input;
export interface IProps extends FormComponentProps {
  table_add: boolean | undefined;
  handleCancel: () => void;
}
export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { table_add, handleCancel, form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props

  const [tableList_group, setTableList_group]: any[] = useState([]);
  const [tableList_group_TS, setTableList_group_TS] = useState([]);

  const [selectedRows, setSelectedRows]:any[] = useState([])

  const [selectedRowKeys, setSelectedRowKeys]:any = useState([]);

  const [nurseValues, setnurseValues] = useState({});
  const [depValues, setdepValues] = useState({});


  const columns_group: any = [
    {
      key: 'qcCode',
      dataIndex: 'qcCode',
      title: '序号',
      width: 80,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      title: '表单名称',
      dataIndex: 'qcName',
      width: 300,
      align: 'center',
    },
    {
      title: '护理部目标值',
      dataIndex: 'nurseDeptTargetValue',
      width: 160,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return tableList_group.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              // readOnly={!record.readOnly}
              value={nurseValues[`nurseDeptTargetValue-${record.qcCode}`] || ''}
              // value={record[`nurseDeptTargetValue`] || ''} 
              placeholder='请填写...' 
              onChange={e => inputChangeGroup(e.target.value, record, index, 'nurseDeptTargetValue')} 
              
            />
          </Form.Item>
        ) : null
      }
    },
    {
      title: '科室目标值',
      dataIndex: 'deptTargetValue',
      width: 160,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return tableList_group.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              // readOnly={!record.readOnly}
              // value={record[`deptTargetValue`] || ''} 
              value={depValues[`deptTargetValue-${record.qcCode}`] || ''}
              placeholder='请填写...' 
              onChange={e => inputChangeGroup(e.target.value, record, index, 'deptTargetValue')} 
              
            />
          </Form.Item>
        ) : null
      }
    }
	]

  const inputChangeGroup = (value: any, record:any, index: number, text: string) => {
    setTableList_group((prevTableList: any) => {
      const updatedTableList: any[] = prevTableList.map((item: any, idx: number) => {
        if (idx === index) {
          return {
            ...item,
            [text]: value
          };
        }
        return item;
      });
  
      // 更新selectedRows中对应行的数据
      const updatedSelectedRows = selectedRows.map((row: any) => {
        if (row.qcCode === record.qcCode) {
          return {
            ...row,
            [text]: value
          };
        }
        return row;
      });
      setnurseValues(prevInputValues => ({
        ...prevInputValues,
        [`${text}-${record.qcCode}`]: value,
      }));

      setdepValues(prevInputValues => ({
        ...prevInputValues,
        [`${text}-${record.qcCode}`]: value,
      }));

      setSelectedRows(updatedSelectedRows);
      return updatedTableList;
    });

  }
  
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record: any, selected: any, _selectedRows: any) => {
      const updatedSelectedRows = selectedRows.filter((row: any) => row.qcCode !== record.qcCode);
      if (selected) {
        setSelectedRows((prevSelectedRows: any[]) => [...prevSelectedRows, record]);
      } else {
        setSelectedRows(updatedSelectedRows);
      }
    },
    onSelectAll: (selected: any, _selectedRows: any, changeRows: any) => {
      const updatedSelectedRows = selected ? [...selectedRows, ...changeRows] : selectedRows.filter((row: any) => !changeRows.some((changeRow: any) => changeRow.qcCode === row.qcCode));
      setSelectedRows(updatedSelectedRows);
    },
  };

  const getTemplateList = async() => {
    let { data } = await api.templateList()
    setTableList_group(data || []);
    setTableList_group_TS(data || [])
  }

  const tableAddOk = async () => {
    let { reportMasterData }: any = localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}
    let params = {
      reportLevel: reportMasterData?.reportLevel,
      startDate: reportMasterData?.startDate,
      endDate: reportMasterData?.endDate,
      wardCode: reportMasterData?.wardCode,
      getEvalRateDataList: selectedRows
    }
    let { data } = await api.getMasterEvalRate(params)
    firstData.firstTableList_DE = [...data] || []

    

    handleCancel()
  }

  const handleChildCancel = () => {
    handleCancel()
    resetFields()
  };

  useEffect(() => {
    getTemplateList()
  }, [])

  useEffect(() => { 
    if (table_add) {

      const keys = firstData.firstTableList_DE.map((item: any) => {
        setnurseValues(prevInputValues => ({
          ...prevInputValues,
          [`nurseDeptTargetValue-${item.qcCode}`]: item.nurseDeptTargetValue || '',
        }));
  
        setdepValues(prevInputValues => ({
          ...prevInputValues,
          [`deptTargetValue-${item.qcCode}`]: item.deptTargetValue || '',
        }));

        return item.qcCode
      });

      setSelectedRowKeys(keys);
      setSelectedRows(firstData.firstTableList_DE)
    }
    
  }, [table_add])

  
  return (
    <Modal
      width={ 800 }
      title="护理部目标值的添加"
      visible={table_add}
      onOk={tableAddOk}
      onCancel={handleChildCancel}
      okText='确定'
      centered
    >
      <Wrapper>
        <div>
          <Search
            placeholder="请输入表单名称"
            onSearch={(value: any) => {
              if (!value) return setTableList_group(tableList_group_TS)
              let group = tableList_group.filter((group: any) => group.qcName.indexOf(value) !== -1)
              setTableList_group(group)
            }}
            
            style={{ width: 200, marginBottom: '10px' }}
          />
          <Table
            rowKey="qcCode"
            rowSelection={rowSelection}
            bordered
            dataSource={tableList_group}
            columns={columns_group}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </div>
        
      </Wrapper>
    </Modal>
  )
}))

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0;
  .line {
    width: 1px;
    /* height: 100%; */
    background: #efefef;
    margin: 0 10px;
  }
  .table1{
  }
  .ant-table-thead > tr > th {
    padding: 10px
  }
  .ant-table-tbody > tr > td{
    padding: 0 8px;
    font-size: 13px !important;
    height: 30px !important;
  }
  .highlight-row{
    background-color: #cfe6dc;
  }


`