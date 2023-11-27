import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button,  InputNumber, Modal, } from 'antd'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import {Select, Input, Tabs, Switch, message} from 'src/vendors/antd'
import {appStore, authStore} from 'src/stores'
import BaseTable, {DoCon} from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import createModal from "src/libs/createModal";
import AddClassModal from "src/modules/nurseHandBookNew/views/list-jmfy/nursingQuality/addClassModal";
import AddContent from "src/modules/nurseHandBookNew/views/list-jmfy/nursingQuality/addContent";
import {cloneDeep} from "lodash";
import { jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";
const {TabPane} = Tabs;
const {Option} = Select

export interface Props {
    title?: string
    menuCode?: string
}

export default observer(function (props: Props) {
    const {title, menuCode} = props
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([] as any)
    const [menuList, setMenuList] = useState([])
    const [total, setTotal] = useState(0)
    const addClassModal = createModal(AddClassModal)  //分类添加
    const addContent = createModal(AddContent) ////指标添加
    const [defaultKey, setDefaultKey] = useState('1')
    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        pageSize: 20,
        menuCode: "",
        monitorContent: '',
        pageNum: 1,
        wideIndicators: 1,
        assortCode: '',
    })
    const changeStatus = (check: boolean, index: number) => {
        let newData = cloneDeep(dataSource)
        newData[index]['status'] = check ? 1 : 0
        setDataSource(newData)
    }
    let columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            align: 'center',
            render: (text: any, record: any, index: number) =>
                <Switch
                    size='small'
                    onChange={(check: any) => changeStatus(check, index)}
                    checked={record.status == 1}
                />

        },
        {
            title: '分类',
            dataIndex: 'assortName',
            width: 100,
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Select
                    style={{width: '100%'}}
                    value={record.assortName} onChange={(e: any) => {
                    console.log(e);
                    let newData = cloneDeep(dataSource)
                    newData[index]['assortName'] = e
                    setDataSource(newData)
                }}>
                    {
                        model.menuList.map((v: any) => (
                            <Option key={v.menuCode} value={v.name}>{v.name}</Option>
                        ))
                    }
                </Select>
            }
        },
        {
            title: '指标名称',
            dataIndex: 'monitorContent',
            width: 100,
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Input
                    style={{width: '100%'}}
                    key={index + 'a1'}
                    onChange={(e: any) => {
                        let newData: any = cloneDeep(dataSource)
                        newData[index].monitorContent = e.target.value
                        setDataSource(newData)
                    }}
                    value={record.monitorContent} placeholder='请输入指标名称'/>
            }
        },
        {
            title: '达标值',
            dataIndex: 'qualified',
            width: 80,
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <InputNumber
                    style={{width: '100%'}}
                    key={index + 'a1'}
                    onChange={(e: any) => {
                        let newData: any = cloneDeep(dataSource)
                        newData[index].qualified = e
                        setDataSource(newData)
                    }}
                    value={record.qualified} placeholder='请输入'/>
            }
        },
        {
            // 0求和，1平均
            title: '汇总',
            width: 100,
            dataIndex: 'summaryTag',
            align: 'center',
            render: (text: string, record: any, index: number) => {
                return <Select style={{width: '100%'}} value={record.summaryTag == 0 ? '求和汇总' : "求平均汇总"}
                               onChange={(e: any) => {
                                   console.log(e);
                                   let newData = cloneDeep(dataSource)
                                   newData[index]['summaryTag'] = e
                                   setDataSource(newData)
                               }}>
                    {
                        [{name: '求和汇总', code: 0}, {name: '求平均汇总', code: 1}].map((v: any) => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                        ))
                    }
                </Select>
            }
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'operate',
            align: 'center',
            render: (text: string, record: Obj) => {
                return (
                    <DoCon>
                        <span onClick={() => deleteRecord(record)}>删除</span>
                        <span onClick={() => saveRecord(record)}>保存</span>
                    </DoCon>
                )
            }
        },

    ]
    let juniorColumns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
        },
        {
            title: '字段名称',
            dataIndex: 'fieldName',
            width: 120,
            align: 'center',
        },
        {
            title: '编码',
            dataIndex: 'itemCode',
            width: 120,
            align: 'center',
        },
        {
            title: '数据接口',
            dataIndex: 'dataInterface',
            width: 120,
            align: 'center',
        },
        {
            title: '文字描述',
            dataIndex: 'description',
            width: 120,
            align: 'center',
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'operate',
            align: 'center',
            render: (text: string, record: Obj) => {
                return (
                    <DoCon>
                        <span onClick={() => {
                            addContent.show({
                                onOkCb: onOkAddContent,
                                menuCode: menuCode,
                                wideIndicators: query.wideIndicators,
                                record: record
                            })
                        }}>编辑</span>
                        <span onClick={() => deleteRecord(record)}>删除</span>
                    </DoCon>
                )
            }
        },
    ]
    const deleteRecord = (record: Obj) => {
        Modal.confirm({
            title: '提示',
            content: '是否删除?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            centered: true,
            onOk: () => {
                nurseHandBookService.publicDeleteIndicatorsItem({id: record.id}).then((res: any) => {
                    message.success('删除成功')
                    getData()
                })
            }
        })

    }
    const saveRecord = (record: Obj) => {
        let assort: any = model.menuList.find((item: any) => item.name == record.assortName)
        nurseHandBookService.publicSaveIndicatorsTItem({
            wideIndicators:query.wideIndicators,
            deptCode:query.deptCode ?query.deptCode : 'common',
            ...record,
            status: record.status ? 1 : 0,
            assortCode: assort?.menuCode || '',
        }).then((res: any) => {
            message.success('保存成功')
            getData()
        })

    }
    const handleAddClass = () => {
        addClassModal.show({
            onOkCb: onOkAddClass,
            menuCode: menuCode
        })
    }
    const onOkAddClass = (params: any) => {
        // saveRecord(params)
    }
    const handleAddContent = () => {
        if (defaultKey == '1') {
            dataSource.push({
                status: 0,
                summaryTag: '',
                assortName: '',
                assortCode: '',
                qualified: '',
                monitorContent: ""
            })
            setDataSource([...dataSource])
        } else {
            addContent.show({
                onOkCb: onOkAddContent,
                menuCode: menuCode,
                wideIndicators: query.wideIndicators
            })
        }

    }
    const onOkAddContent = (params: any) => {
        saveRecord(params)
    }
    const getMenuCode = () => {
        nurseHandBookService.getFormList().then(res => {
            setMenuList(res.data)
        })
    }
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getPublicIndicatorsItem({...query}).then((res: Obj) => {
            setDataSource(res.data.list || [])
            setTotal(res.data.totalCount)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    const callback = (key: string) => {
        setDefaultKey(key)
        console.log(defaultKey);
    }
    useEffect(() => {
        getData()
    }, [query])
    // useEffect(() => {
    //     if (menuCode) {
    //         nurseHandbookJmfyModel.getMenuList()
    //     }
    // }, [menuCode])
    useEffect(() => {
        return () => {
            addClassModal.unMount()
            addContent.unMount()
        }
    }, [appStore.location.pathname])
    return (
        <Wrapper>
            <WrapperHeard>
                <PageTitle>{title}</PageTitle>
                <Place/>
                <Select value={query.wideIndicators} onChange={(e: any) => {
                    setQuery({...query, wideIndicators: e})
                }}>
                    {
                        [{label: '全院共性指标', value: 1}, {label: '专科指标', value: 0}].map(v => (
                            <Option key={v.value} value={v.value}>{v.label}</Option>
                        ))
                    }</Select>
                <span className='label'>科室:</span>
                <Select value={query.deptCode} onChange={(e: any) => {
                    setQuery({...query, deptCode: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        authStore.deptList.map(v => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                        ))
                    }</Select>

                <span className='label'>分类:</span>
                <Select value={query.assortCode} onChange={(e: any) => {
                    setQuery({...query, assortCode: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        model.menuList.map((v: any) => (
                            <Option key={v.menuCode} value={v.menuCode}>{v.name}</Option>
                        ))
                    }
                </Select>
                <Input
                    placeholder='请输入指标名称'
                    style={{width: '120px', marginLeft: "10px"}} value={query.monitorContent} onChange={(e: any) => {
                    setQuery({...query, year: e.target.value})
                }}/>
                <Button type='primary' onClick={handleAddContent}>新增</Button>
                {
                    defaultKey == '1' && <>
                        <Button type='primary' onClick={handleAddClass}>分类维护</Button>
                        <Button type='primary'>导入</Button>
                        <Button type='primary'>导出模板</Button>
                    </>
                }
            </WrapperHeard>
            <div>修改监测指标后立刻生效，且当前历史数据以当年最后修改完的结果值为准。</div>
            <Tabs defaultActiveKey={defaultKey} onChange={callback}>
                <TabPane tab="手动录入" key="1">
                    <BaseTable
                        loading={pageLoading}
                        dataSource={dataSource}
                        columns={columns}
                        wrapperStyle={{margin: '0 15px'}}
                        type={['index']}
                        pagination={{
                            current: query.pageNum,
                            pageSize: query.pageSize,
                            total,
                        }}
                        onChange={(pagination) => {
                            setQuery({
                                ...query,
                                pageNum: pagination.current,
                                pageSize: pagination.pageSize,
                            })
                        }}
                    />
                </TabPane>
                <TabPane tab="自动提取" key="2">
                    <BaseTable
                        loading={pageLoading}
                        dataSource={dataSource}
                        columns={juniorColumns}
                        wrapperStyle={{margin: '0 15px'}}
                        type={['index']}
                        pagination={{
                            current: query.pageNum,
                            pageSize: query.pageSize,
                            total,
                        }}
                        onChange={(pagination) => {
                            setQuery({
                                ...query,
                                pageNum: pagination.current,
                                pageSize: pagination.pageSize,
                            })
                        }}
                    />
                </TabPane>
            </Tabs>

            <addClassModal.Component/>
            <addContent.Component/>
        </Wrapper>
    )
})
const Wrapper = styled.div`
  .heard {
    display: flex;
    height: 50px;
    font-size: 13px;
    position: relative;
    color: #333333;
    padding: 0 15px 0 15px;
    align-items: center;
  }

`
const WrapperHeard: any = styled(PageHeader)`
  .ant-calendar-picker {
    width: 200px;
  }
`