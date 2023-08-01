import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {Button, Select, Input,  Switch, message, Modal} from "antd";
import {Place} from "src/components/common";
import {observer} from "mobx-react-lite";
import BaseTable, {DoCon} from "src/components/BaseTable";
import {appStore, authStore} from "src/stores";
import MaintenanceModal from "./component/MaintenanceModal";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
const Option = Select.Option;
export const LEVEL_LIST = ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']

export interface Query {
    pageSize: number;
    pageIndex: number;
    hierarchy: string;
    deptCode: string;
    tableName: string;
    totalCount: number;
}

interface AddModal {
    title?: string;
    visible?: boolean
    record?:any
}

export default observer(function FormMaintenance() {
    const [loading, setLoading] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<AddModal>({
        title: '添加',
        visible: false,
        record:{}
    })
    const [tableList, setTableList] = useState([]) as any
    const [query, setQuery] = useState<Query>({
        pageSize: 20,
        pageIndex: 1,
        hierarchy: "全部",
        deptCode: "全院",
        tableName: "",
        totalCount: 0
    } as any); // 页码 ，每页条数
    const columns: any = [
        //
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 50,
            render:(text:string,record:any,index:number)=><span>{index + 1}</span>
        },
        {
            title: "状态",
            dataIndex: "status",
            align: "center",
            width: 60,
            render: (text:any,record:any,index:number) => {
                // 0关闭  1 开启
                // isUse 0 未引用 1引用
                return (
                    <Switch key={index + 'a'} checked={ text == 1  } onChange={(e:boolean)=>{
                        handleCheckBox(e,record)
                    }}/>
                )
            }
        },
        {
            title: "表名",
            dataIndex: "tableName",
            align: "center",
            width: 100
        },
        {
            title: "科室",
            dataIndex: "deptName",
            align: "center",
            width: 100
        },
        {
            title: "层级",
            dataIndex: "hierarchy",
            align: "center",
            className: "hierarchy",
            width: 60,
        },
        {
            title: "创建人",
            dataIndex: "createNo",
            align: "center",
            width: 100
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 100,
            align: "center",
        },
        {
            title: "操作",
            key: "cz",
            width: 100,
            align: "center",
            render: (text:any,record:any) => {
                return (
                    <DoCon >
                        <span onClick={()=>handleReview(record)}>查看</span>
                        <span className={record.isUse !==1?'':'disable-sty'}  onClick={()=>handleAdd('编辑',record)}>编辑</span>
                        <span className={record.isUse !==1?'':'disable-sty'} onClick={()=>handleDelete(record.id)}>删除</span>
                    </DoCon>
                )
            }
        }
    ];
    const handleReview =(record:any)=>{
        if(!record.id)return
        const {id,createNo,tableName,isUse}=record
        appStore.history.push(
            `/formMaintenanceDetail?isUse=${isUse}&createNo=${createNo}&tableName=${tableName}&id=${id}`
        );
    }

    const handleDelete =(id:number)=>{
        if(!id)return
        Modal.confirm({
            title: '提示',
            content: '是否删除该数据',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                trainingSettingApi.deleteTemplate({id}).then(()=>{
                    message.success('删除成功')
                    getData()
                })
            }
        })

    }
    const handleCheckBox=(e:any,record:any)=>{
        console.log(e);
        trainingSettingApi.saveOrUpdate({
            ...record,
            status:e?1:0
        }).then((res) => {
            message.success('操作成功')
            getData()
        })
    }
    const handleDeptChange = (deptCode: any) => {
        let newQuery = {...query, deptCode, pageIndex: 1};
        setQuery(newQuery);
    };
    const handleLevelChange = (hierarchy: string) => {
        let newQuery = {...query, hierarchy, pageIndex: 1};
        setQuery(newQuery);
    }
    const handleAdd = (title:string,record:any) => {
        setAddModal({visible:true,title,record})
    }
    const handleCancel = () => {
        setAddModal({...addModal,visible:false,record:{}})
    }
    const handleOk =async ()=>{
       await handleCancel()
       await getData()
    }
    const getData =()=>{
        setLoading(true)
        trainingSettingApi.getTemplateList({
            ...query,
            templateType:2
        }).then((res:any)=>{
            setQuery({...query,totalCount:res.data.totalCount})
            setTableList(res.data.list||[])
            setLoading(false)
        })
    }
    useEffect(()=>{
        getData()
    },[query.hierarchy,query.tableName,query.deptCode])
    return (
        <Wrapper>
            <HeaderCon>
                <Title>手册表单维护</Title>
                <Place/>
                <span style={{marginLeft: 15}}>科室：</span>
                <Select
                    style={{width: 180}}
                    value={query.deptCode}
                    showSearch
                    filterOption={(input: any, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={handleDeptChange}>
                    <Option value="全院">全院</Option>
                    {
                        authStore.deptList.map((item: any, idx: number) =>
                            <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
                    }
                </Select>
                <span style={{marginLeft: 15}}>层级：</span>
                <Select
                    showSearch
                    value={query.hierarchy}
                    style={{width: 180}}
                    onChange={handleLevelChange}
                    filterOption={(input: any, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder='选择层级'>
                    {LEVEL_LIST.map((item: string) => (
                        <Select.Option value={item} key={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
                <span style={{marginLeft: 15}}>表名：</span>
                <Input
                    defaultValue={query.tableName}
                    onBlur={(e) => {
                        console.log(e.target.value);
                        setQuery({...query, tableName: e.target.value})
                    }}
                    placeholder="请输入表名"
                    style={{width: 240, marginLeft: 15}}
                    allowClear
                />
                <Button
                    onClick={getData}
                    type="primary"
                    style={{marginLeft: 15}}>
                    搜索
                </Button>
                <Button
                    onClick={()=>handleAdd('添加',{})}
                    style={{marginLeft: 15}}>
                    新增
                </Button>
            </HeaderCon>
            <ScrollCon>
                <BodyWarpper>
                    <MainCon>
                        <BaseTable
                            loading={loading}
                            dataSource={tableList}
                            columns={columns}
                            surplusHeight={400}
                            pagination={{
                                pageSizeOptions: ['10', '20', '30', '40', '50'],
                                onChange: (pageIndex) =>
                                    setQuery({...query, pageIndex}),
                                onShowSizeChange: (pageIndex, pageSize) => setQuery({...query, pageSize}),
                                total: query.totalCount,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSize: query.pageSize,
                                current: query.pageIndex
                            }}
                        />
                    </MainCon>
                </BodyWarpper>
            </ScrollCon>
            <MaintenanceModal {...addModal} handleCancel={handleCancel} handleOk={handleOk}/>
            {/*<SingModal title={title} visible={modalVisible} handleCancel={handleCancel} />*/}
        </Wrapper>
    );
});

const Wrapper = styled.div<{ height?: string | number }>`
  padding: ${p => p.theme.$mcp};
  height: calc(100% - 49px);
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 195px;

  .teaching-method-name {
    position: relative;

    .teaching-method-item {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      span {
        cursor: default;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

`;

const HeaderCon = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0 -15px;
    /* padding: ${p => p.theme.$mcp}; */
  .disable-sty{
    color:#999;
    cursor: auto;
    &:hover{
      font-weight: normal;
    }
  }
`;

const BodyWarpper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainCon = styled.div`
  flex: 1;
  align-items: stretch;
  display: flex;
  margin: 20px;
  .ant-btn{
    border: none;
    background: none;
  }
`;

