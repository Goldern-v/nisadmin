import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {Button, Select, Input, Checkbox} from "antd";
import {Place} from "src/components/common";
import {observer} from "mobx-react-lite";
import BaseTable, {DoCon} from "src/components/BaseTable";
import {authStore} from "src/stores";
import TemplateModal from "./components/TemplateModal";
const Option = Select.Option;
export const LEVEL_LIST = ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']

interface Query {
    pageSize: number;
    pageIndex: number;
    level: string;
    deptCode: string;
    name: string;
    dataTotal: number;
}

interface AddModal {
    title?: string;
    visible?: boolean
}

export default observer(function TemplateMaintenance() {
    const [loading, setLoading] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<AddModal>({
        title: '添加',
        visible: false
    })
    const [tableList, setTableList] = useState([]) as any
    const [query, setQuery] = useState<Query>({
        pageSize: 20,
        pageIndex: 1,
        level: "全部",
        deptCode: "",
        name: "",
        dataTotal: 0
    } as any); // 页码 ，每页条数
    const columns: any = [
        {
            title: "序号",
            dataIndex: "",
            key: "",
            align: "center",
            width: 40
        },
        {
            title: "状态",
            dataIndex: "firstLevelMenuName",
            align: "center",
            width: 100,
            render: () => {
                return (
                    <Checkbox/>
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
            dataIndex: "secondLevelMenuName",
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
            dataIndex: "thirdLevelMenuName",
            align: "center",
            width: 100
        },
        {
            title: "适用层级",
            dataIndex: "teachingMethodName",
            align: "center",
            className: "teaching-method-name",
            width: 60,
        },
        {
            title: "创建人",
            dataIndex: "title",
            align: "left",
            width: 100
        },
        {
            title: "创建时间",
            dataIndex: "statusDesc",
            width: 100,
            align: "center",
        },
        {
            title: "操作",
            key: "8",
            width: 60,
            align: "center",
            render: () => {
                return (
                    <DoCon>
                        <span>查看</span>
                        <span>编辑</span>
                        <span>删除</span>
                    </DoCon>
                )
            }
        }
    ];
    const handleDeptChange = (deptCode: any) => {
        let newQuery = {...query, deptCode, pageIndex: 1};
        setQuery(newQuery);
    };
    const handleLevelChange = (level: string) => {
        let newQuery = {...query, level, pageIndex: 1};
        setQuery(newQuery);
    }
    const handleAdd = () => {
        setAddModal({visible:true,title:'添加'})
    }
    const handleCancel = () => {
        setAddModal({...addModal,visible:false})
    }
    return (
        <Wrapper>
            <HeaderCon>
                <Title>手册模板维护</Title>
                <Place/>
                {/* 获取数据选择 */}
                <span style={{marginLeft: 15}}>表名：</span>
                <Select
                    showSearch
                    value={query.level}
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
                    value={query.level}
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
                    onClick={handleAdd}
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
            <TemplateModal title={addModal.title} visible={addModal.visible} handleCancel={handleCancel}/>
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
`;

const GroupPostBtn = styled(Button) <{ btntop?: string | number }>`
  position: fixed !important;
  top: ${p => p.btntop || '121px'};
  right: 33px;
`;
