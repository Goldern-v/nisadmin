import { Radio, Form } from 'antd'
import { Modal, Input, Table, Popconfirm } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import { FormComponentProps } from 'antd/es/form'
import { table1AddDaeta as table } from './table1_add_data';
import BaseTable from "src/components/BaseTable";

const { Search } = Input;

export interface IProps extends FormComponentProps {
}

export interface Props {
}
export default Form.create()(observer(function (props: IProps) {
  const { form: { getFieldDecorator, validateFields, setFieldsValue, resetFields } } = props
  
  const columns: any = [
    {
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      title: '分组名称',
      dataIndex: 'name',
      width: 300,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return table.tableList.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              value={record['name']} 
              placeholder='请填写...' 
              onChange={e => handleInputChange(e, index)} 
              onBlur={save}
              onPressEnter={save}
            />
          </Form.Item>
        ) : null
      }
    },
    {
      title: '操作',
      width: 60,
      align: 'center',
      dataIndex: 'operation',
      render: (text:any, record: any) => 
        table.tableList.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => rowDelete(record)}>
            <a>删除</a>
          </Popconfirm>
      ) : null,
    },
	]

  const columns_group: any = [
    {
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      title: '表单名称',
      dataIndex: 'name',
      width: 250,
      align: 'center',
    },
    {
      title: '目标值',
      dataIndex: 'value',
      width: 120,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return table.tableList.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              readOnly={record.readOnly}
              value={record['value']} 
              placeholder='请填写...' 
              onChange={e => inputChangeGroup(e, index)} 
              onBlur={save}
              onPressEnter={save}
            />
          </Form.Item>
        ) : null
      }
    }
	]



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    let newLsit = [...table.tableList]
    newLsit[index]['name'] = value;
    table.tableList = [...newLsit]
  }

  const inputChangeGroup = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    let newLsit = [...table.tableList_group]
    newLsit[index]['value'] = value;
    table.tableList_group = [...newLsit]
  }


  const save = () => {
    console.log(table.tableList, 6666666666)
  }
  
  const rowDelete = (row: any) => {
    console.log(row, 77777)
  }

  const add = () => {
    let newLsit = [...table.tableList]
    table.tableList = [...table.tableList, { name: ''}]
  }

  const getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    table.mockData = [...mockData]
    table.targetKeys = [...targetKeys]
    // this.setState({ mockData, targetKeys });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      if (selected) {
        record.readOnly = false;
      } else {
        record.readOnly = true;
      }
      console.log(record, selected, selectedRows, 111);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows, 222);
    },
  };


  useEffect(() => {
    table.getTableList()
    getMock()
  }, [])
  
  return (
    <Modal
      width={ 1000 }
      title="护理部目标值的添加"
      visible={table.table1_add}
      onOk={() => table.tableAddOk()}
      onCancel={(() => table.tableAddonCancel())}
      okText='确定'
      centered
    >
      <Wrapper>
        <div className="table1">
          <Button onClick={add} size="small" type="primary" style={{ marginBottom: 16 }}>
            添加分组
          </Button>
          <Table
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={table.tableList}
            columns={columns}
            pagination={false}
          />
        </div>
        <div className="line"></div>
        <div>
          <Search
            placeholder="input search text"
            onSearch={(value: any) => console.log(value)}
            style={{ width: 200, marginBottom: '10px' }}
          />
          <Table
            rowSelection={rowSelection}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={table.tableList_group}
            columns={columns_group}
            pagination={false}
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

`