import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'
import { Transfer, Modal ,Input ,message} from 'antd'
import { calendarFormat } from 'moment';
export interface Props extends RouteComponentProps {}

export default function MainBox() {
  let [editingKey, setEditingKey] = useState(false)
  let [mockData, setMockData] = useState([])
  let [targetKeys, setTargetKeys] = useState([])
  const dataSource:any = [
    {
      key: '1',
      name: '脑科手术前期准备一组',
    },
    {
      key: '2',
      name: '脑科手术前期准备二组',
    },
  ];
  
  useEffect(() => {
    getMock()
  },[]);
  
  const getMock = () => {
    let targetKeys1:any = [];
    let mockData1:any = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys1.push(data.key);
      }
      mockData1.push(data);
    }
    setMockData(mockData1);
    setTargetKeys(targetKeys1);
  };

  const handleChange = (targetKeys:any, direction:any, moveKeys:any) => {
    console.log(targetKeys, direction, moveKeys);
    setTargetKeys(targetKeys);
  };

  const renderItem = (item:any) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );
    return {
      label: customLabel, 
      value: item.title, 
    };
  };
  // 表格
  const columns: any = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 5,
    },
    {
      title: '分组名称',
      dataIndex: 'name',
      key: '分组名称',
      width: 30,
      align: 'left'
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 8,
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Wrapper>
            <a onClick={() => handleDelete(record)} style={{ marginLeft: '15px', fontSize: '13px', margin:'auto'}}>
              删除
            </a>
          </Wrapper>
        )
      }
    }
  ]

  //表格删除
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该分组?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
          message.success('删除成功')
      }
    })
  }

  /** 监听事件 --- 控制添加弹窗的状态*/
  emitter.removeAllListeners('添加人员分组')
  emitter.addListener('添加人员分组', () => {
    setEditingKey(true)
  })
  
  return (
    <Wrapper>
      <BaseTableBox>
        <BaseTable columns={columns} surplusHeight={190} dataSource={dataSource}/> 
      </BaseTableBox>
      <TransferBox>
        <TitleCon>本科室成员名单：</TitleCon>
        <Transfer 
        className='transfer'
        dataSource={mockData}
        listStyle={{
          width: '46%',
          height:'calc(100vh - 187px)',
        }}
        locale={{
          itemUnit: '人', itemsUnit: '人', 
        }}
        titles={['已选成员', '可选成员']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={renderItem}
        />
        <Modal
          className='modal'
          centered={true}
          title='添加分组'
          width='600px'
          okText='保存'
          cancelText='返回'
          visible={editingKey}
          onCancel={() => {
            setEditingKey(false)
          }}
          onOk={() => {
            setEditingKey(false)
          }}
        >
          <div className='category' style={{ marginTop: '50px' ,marginBottom:'60px'}}>
            <SpanOne>分组名称：</SpanOne>
            <Input
              style={{ width: '72%' }}
            />
          </div>
        </Modal>
      </TransferBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display:flex;
`
const BaseTableBox = styled.div`
  flex:1;
`
const TransferBox = styled.div`
  flex:1;
  padding:15px;
  box-sizing:border-box;
`
const TitleCon = styled.div`
  height:35px;
  font-weight:900;
  font-size:16px;
`
const SpanOne = styled.span`
  display: inline-block;
  width: 75px;
  text-align: justify;
  margin-left: 35px;
`
