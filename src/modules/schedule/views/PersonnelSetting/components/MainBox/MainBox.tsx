import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'
import { Transfer, Modal ,Input ,message} from 'antd'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'
import { Record } from '_immutable@4.0.0-rc.12@immutable';
// import { calendarFormat } from 'moment';
export interface Props extends RouteComponentProps {}

export default function MainBox() {
  let [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [editingKey, setEditingKey] = useState(false)
  const [mockData, setMockData] = useState([])
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [groupName, setGroupName] = useState('')
  const [id, setId] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  
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
      dataIndex: 'groupName',
      key: 'groupName',
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
  
  //获取人员分组列表
  const getMealList = () => {
    setLoadingTable(true)
    let deptCode = scheduleStore.getDeptCode() 
    service.personnelSettingApiService.getByDeptCode(deptCode).then((res) => {
      setLoadingTable(false)
      setTableData(res.data)
    })
  }

  //保存
  const handleOk = () => {
    const data = {
      deptCode: scheduleStore.getDeptCode(),  //string 科室
      groupName: groupName,  //string 分组名称
    }
    if (!groupName) {
      message.warning('保存前请先填写分组名称')
      return
    }
    setConfirmLoading(true)
    service.personnelSettingApiService.updatePersonnelSetting(data).then((res) => {
      if(res){
        setConfirmLoading(false)
        getMealList()
        setEditingKey(false)
        setGroupName('')
        message.success('添加成功')
      }
    })
  }

  //删除
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该分组?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        service.personnelSettingApiService.deletePersonnelSetting(record).then((res) => {
          getMealList()
          message.success('删除成功')
        })
      }
    })
  }

  //获取分组已选人员
  const selectedScheduler = (record: any) =>{
    let id = record.id
    service.personnelSettingApiService.getById(id).then((res) => {
      setTargetKeys(res.data)
    })
  }

  //获取分组可选人员
  const selectScheduler = () =>{
    let deptCode = scheduleStore.getDeptCode() 
    service.personnelSettingApiService.getScheduler(deptCode).then((res) => {
      let array:any = []
      res.data.length > 0 && res.data.map((item:any, i:any) => {
        array.push({
          key: i.toString(),
          schSettingNurseGroupId: item.id,
          empName: item.empName,
          empNo: item.empNo
        })
      })
      setMockData(array)
    })
  }
  //表格行操作
  const selectRow = (record: any) =>{
    selectedScheduler(record)
    selectScheduler()
    setId(record.id)
  }

  useEffect(() => {
    getMealList()
  },[]);

   // 新增或修改分组中的人员
   const handleChange = (nextTargetKeys:any, direction:any, moveKeys:any) => {
    setTargetKeys(nextTargetKeys);
    let array = nextTargetKeys.map((item:any) => mockData.filter((v:any) => item === v.key)[0])
    let params = {
      schSettingNurseGroupId: id,
      schSettingNurseGroupDetail: array
    }
    console.log(params,'array')
    service.personnelSettingApiService.updateSavePersonnelSetting(params).then((res) => {
      message.success('操作成功！')
    }).catch(() =>{
      message.error('操作失败！')
    })
  };

  const  handleSelectChange = (sourceSelectedKeys:any, targetSelectedKeys:any) => {
    let array:any = [...sourceSelectedKeys, ...targetSelectedKeys];
    setSelectedKeys(array);
  };

  const renderItem = (item:any) => {
    const customLabel = (
      <span className="custom-item">
        {item.empName}
      </span>
    );
    return {
      label: customLabel, 
      value: item.empName, 
    };
  };

  /** 监听事件 --- 控制添加弹窗的状态*/
  emitter.removeAllListeners('添加人员分组')
  emitter.addListener('添加人员分组', () => {
    setEditingKey(true)
  })
  
  return (
    <Wrapper>
      <BaseTableBox>
        <BaseTable 
          columns={columns} 
          surplusHeight={190} 
          dataSource={tableData} 
          loading={loadingTable}
          //行类名
          rowClassName={
            (record) => {
              return 'cursorPointer';
            }
          }
          //表格行点击事件
          onRow={record => {
            return {
              onClick: (event:any) => {selectRow(record)},
            };
          }}
          /> 
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
        titles={['可选成员', '已选成员']}
        selectedKeys={selectedKeys}
        targetKeys={targetKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
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
          onOk={handleOk}
          confirmLoading={confirmLoading}
        >
          <div className='category' style={{ marginTop: '50px' ,marginBottom:'60px'}}>
            <SpanOne>分组名称：</SpanOne>
            <Input
              style={{ width: '72%' }}
              value={groupName}
              defaultValue=""
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </Modal>
      </TransferBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display:flex;
  .cursorPointer{
    cursor: pointer;
  }
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
