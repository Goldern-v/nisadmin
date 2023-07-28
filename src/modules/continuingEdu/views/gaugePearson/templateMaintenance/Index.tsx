import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {Button, Select, Input, Checkbox, Switch, message, Modal} from "antd";
import {Place} from "src/components/common";
import {observer} from "mobx-react-lite";
import BaseTable, {DoCon} from "src/components/BaseTable";
import {authStore} from "src/stores";
import TemplateModal from "./components/TemplateModal";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
import { Query } from "../formMaintenance/Index";
const Option = Select.Option;
export const LEVEL_LIST = ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']

// interface Query {
//     pageSize: number;
//     pageIndex: number;
//     level: string;
//     deptCode: string;
//     name: string;
//     dataTotal: number;
// }

interface AddModal {
    title?: string;
    visible?: boolean;
    record?:any
}

export default observer(function TemplateMaintenance() {
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
        deptCode: "",
        tableName: "",
        dataTotal: 0
    } as any); // 页码 ，每页条数
    const columns: any = [
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
            dataIndex: "firstLevelMenuName",
            align: "center",
            width: 100,
            render: (text:any,record:any) => {
                // 0关闭  1 开启
                return (
                    <Switch checked={ text == 1  } onChange={(e:boolean)=>{
                        handleCheckBox(e,record)
                    }}/>
                )
            }
        },
        {
            title: "手册",
            dataIndex: "secondLevelMenuName",
            align: "center",
            width: 100
        },
        {
            title: "表名",
            dataIndex: "tableName",
            align: "center",
            width: 100
        },
        {
            title: "附件名称",
            dataIndex: "secondLevelMenuName",
            align: "center",
            width: 100
        },
        {
            title: "适用科室",
            dataIndex: "deptName",
            align: "center",
            width: 100
        },
        {
            title: "适用层级",
            dataIndex: "hierarchy",
            align: "center",
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
            key: "8",
            width: 60,
            align: "center",
            render: (text:any,record:any) => {
                let isDisable = record.isUse
                return (
                    <DoCon>
                        <Button >查看</Button>
                        <Button disabled={isDisable ==1} onClick={()=>handleAdd('编辑',record)}>编辑</Button>
                        <Button disabled={isDisable ==1}  onClick={()=>handleDelete(record.id)}>删除</Button>
                    </DoCon>
                )
            }
        }
    ];
    const handleCheckBox=(e:any,record:any)=>{
        trainingSettingApi.saveOrUpdate({
            ...record,
            status:e?1:0
        }).then((res) => {
            message.success('操作成功')
            getData()
        })
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
    const handleDeptChange = (deptCode: any) => {
        let newQuery = {...query, deptCode, pageIndex: 1};
        setQuery(newQuery);
    };
    const handleLevelChange = (level: string) => {
        let newQuery = {...query, level, pageIndex: 1};
        setQuery(newQuery);
    }
    const handleAdd = (title:string,record:any) => {
        setAddModal({visible:true,title,record})
    }
    const handleCancel = () => {
        setAddModal({...addModal,visible:false,record:{}})
    }
    const getData =()=>{
        setLoading(true)
        trainingSettingApi.getTemplateList({
            ...query,
            templateType:3
        }).then((res:any)=>{
            setQuery({...query,dataTotal:res.data.dataTotal})
            setTableList(res.data)
            setLoading(false)
        })
    }
    useEffect(()=>{
        getData()
    },[query.hierarchy,query.tableName,query.deptCode])
    return (
        <Wrapper>
            <HeaderCon>
                <Title>手册模板维护</Title>
                <Place/>
                {/* 获取数据选择 */}
                <span style={{marginLeft: 15}}>表名：</span>
                <Select
                    showSearch
                    value={query.tableName}
                    style={{width: 100}}
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
                <span style={{marginLeft: 15}}>科室：</span>
                <Select
                    style={{width: 100}}
                    value={query.deptCode}
                    showSearch
                    filterOption={(input: any, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={handleDeptChange}>
                    <Option value="">全院</Option>
                    {
                        authStore.deptList.map((item: any, idx: number) =>
                            <Option value={item.code} key={idx} title={item.name}>{item.name}</Option>)
                    }
                </Select>
                <span style={{marginLeft: 15}}>层级：</span>
                <Select
                    showSearch
                    value={query.hierarchy}
                    style={{width: 100}}
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

                <Button
                    type="primary"
                    onClick={getData}
                    style={{marginLeft: 15}}>
                    搜索
                </Button>
                <Button
                    type="primary"
                    style={{marginLeft: 15}}>
                    导出
                </Button>
                <Button
                    type="primary"
                    style={{marginLeft: 15}}>
                    下载所有模板
                </Button>
                <Button
                    onClick={()=>handleAdd('添加',{})}
                    type="primary"
                    style={{marginLeft: 15}}>
                    导入
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
                                total: query.dataTotal,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSize: query.pageSize,
                                current: query.pageIndex
                            }}
                        />
                    </MainCon>
                </BodyWarpper>
            </ScrollCon>
            <TemplateModal {...addModal}  handleCancel={handleCancel}/>
            {/*<SingModal title={title} visible={modalVisible} handleCancel={handleCancel} />*/}
        </Wrapper>
    );
});

const Wrapper = styled.div`
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


