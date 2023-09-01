import { Radio, Form } from 'antd'
import { Modal, Input, Table, Popconfirm } from 'antd/es'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import {
	Button,
} from "src/vendors/antd";
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
  
  const [tableList, setTableList]: any[] = useState([])
  
  const [selectedRow, setSelectedRow]: any= useState({});

  const [inputValues, setInputValues] = useState({});

  const [tableList_group, setTableList_group]: any[] = useState([]);
  const [tableList_group_TS, setTableList_group_TS] = useState([]);

  const [selectedRows, setSelectedRows] = useState([])

  const [templateData, setTemplateData] :any = useState([])

  const [shouldExecuteOnRowGetFrom, setShouldExecuteOnRowGetFrom] = useState(false);

  
  const columns: any = [
    {
      key: 'groupId',
      dataIndex: 'groupId',
      title: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: any, groupId: number) {
        return groupId + 1
      }
    },
    {
      title: '分组名称',
      dataIndex: 'groupName',
      width: 300,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return tableList.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              value={record['groupName']} 
              placeholder='请填写...' 
              onChange={e => handleInputChange(e, index)} 
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
      render: (text:any, record: any, index: number) => 
        tableList.length >= 1 ? (
          <Popconfirm title="确定要删除吗?" onConfirm={(event:any) => {event.stopPropagation(); rowDelete(record, index)}}>
            <a onClick={(event) => event.stopPropagation()}>删除</a>
          </Popconfirm>
      ) : null,
    },
	]

  
  const columns_group: any = [
    {
      key: 'qcCode',
      dataIndex: 'qcCode',
      title: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      title: '表单名称',
      dataIndex: 'qcName',
      width: 250,
      align: 'center',
    },
    {
      title: '目标值',
      dataIndex: 'nurseDeptTargetValue',
      width: 120,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return tableList_group.length >= 1 ? (
          <Form.Item style={{ margin: 0 }}>
            <Input 
              // readOnly={!record.readOnly}
              value={inputValues[`${selectedRow.groupId}-${record.qcCode}`] || ''} 
              placeholder='请填写...' 
              onChange={e => inputChangeGroup(e, record, index)} 
            />
          </Form.Item>
        ) : null
      }
    }
	]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setTableList((prevTableList: any) => prevTableList.map((item:any, idx: any) => {
      if (idx === index) {
        return { ...item, groupName: value };
      }
      return item;
    }));
  }

  const inputChangeGroup = (e: React.ChangeEvent<HTMLInputElement>, record:any, index: number) => {
    const { value } = e.target;

    let list = tableList.find((item: any) => item.groupId === selectedRow.groupId)
    if (list && list.mychildren && list.mychildren.length > 0) {
      list.mychildren.map((child: any) => {
        if (child.qcCode === record.qcCode) {
          child['nurseDeptTargetValue'] = value;
        }
      })
    } 
    // setTableList_group((prevTableList: any) => prevTableList.map((item:any, idx: any) => {
    //   if (idx === index) {
    //     return { ...item, nurseDeptTargetValue: value };
    //   }
    //   return item;
    // }));
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [`${selectedRow.groupId}-${record.qcCode}`]: value,
    }));
  }
  
  const rowDelete = (row: any, index: number) => {
    tableList.splice(index, 1)
    onRowGetFrom(tableList[0])
  }


  const add = () => {
    let lists = [...tableList, { groupId: tableList.length + 1 , groupName: ''}]
    setTableList(lists)
    setShouldExecuteOnRowGetFrom(false);
  }


  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows.map((row: any) => row.qcCode));
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      tableList.forEach((item: any) => {
        if (item.groupId === selectedRow.groupId) {
          item['mychildren'] = selectedRows
        }
      })
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      tableList.forEach((item: any) => {
        if (item.groupId === selectedRow.groupId) {
          item['mychildren'] = selectedRows
        }
      })
    },
  };

  const rowClassName = (record: any) => {
    return record.groupId === selectedRow.groupId ? 'highlight-row' : '';
  };

  const getTemplateList = async() => {
    let { data } = await api.templateList()
    setTemplateData(data || [])
    setTableList_group_TS(data || [])
  }

  let onRowGetFrom = async(row: any) => {
    console.log(row, tableList, 'ces')
    if (!row) {
      setTableList_group([])
      return
    }
    setTableList_group(templateData || []);
    setSelectedRow(row)
    let list = tableList.find((item:any) => row.groupId === item.groupId)
    if (list && list.mychildren && list.mychildren.length > 0) {
      let qcCodes = list.mychildren.map((it:any) => {
        setInputValues((prevInputValues: any) => ({
          ...prevInputValues,
          [`${row.groupId}-${it.qcCode}`]: it.nurseDeptTargetValue || "",
        }));
        return it.qcCode
      })
      setSelectedRows(qcCodes); 
      
    } else {
      setSelectedRows([]); 
    }
  }
  const tableAddOk = async () => {
    let newtableLists:any = tableList.flatMap((item:any) => 
      item.mychildren?.map((child:any) => ({
        ...child,
        groupId: item.groupId,
        groupName: item.groupName,
        nurseDeptTargetValue: inputValues[`${item.groupId}-${child.qcCode}`] || ''
      })) || []
    );
    let { reportMasterData }: any = localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}
    let params = {
      reportLevel: reportMasterData?.reportLevel,
      startDate: reportMasterData?.startDate,
      endDate: reportMasterData?.endDate,
      wardCode: reportMasterData?.wardCode,
      getEvalRateDataList: newtableLists
    }

    let { data } = await api.getMasterEvalRate(params)
    firstData.firstTableList_UD = data || []
    handleCancel()
  }


  useEffect(() => {
    getTemplateList()
  }, [])

  useEffect(() => { 
    if (table_add) {
      let tableLists = [...firstData.firstTableList_UD]
      
      let mergedTableLists = tableLists.reduce((acc, curr) => {
        const existingGroup = acc.find((item: any) => item.groupId === curr.groupId);
        if (existingGroup) {
          existingGroup.mychildren.push(curr);
        } else {
          acc.push({ ...curr, mychildren: [curr] });
        }
        return acc;
      }, []);
      setTableList(mergedTableLists)
      setShouldExecuteOnRowGetFrom(true);
    }
  }, [table_add])

  useEffect(() => {
    if (shouldExecuteOnRowGetFrom) {
      onRowGetFrom(tableList[0]);
      setShouldExecuteOnRowGetFrom(false);
    }
  }, [shouldExecuteOnRowGetFrom]);
  
  return (
    <Modal
      width={ 1000 }
      title="护理部目标值的添加"
      visible={table_add}
      onOk={tableAddOk}
      onCancel={handleCancel}
      okText='确定'
      centered
    >
      <Wrapper>
        <div className="table1">
          <Button onClick={add} size="small" type="primary" style={{ marginBottom: 16 }}>
            添加分组
          </Button>
          <Table
            onRow={(record:any) => {
              return {
                onClick: (event: any) => onRowGetFrom(record), // 点击行
              };
            }}
            rowClassName={rowClassName}
            bordered
            dataSource={tableList}
            columns={columns}
            pagination={false}
            scroll={{ y: 400 }}
          />
        </div>
        <div className="line"></div>
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