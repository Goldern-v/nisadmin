import styled from 'styled-components'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'
import {Transfer, Modal, Input, message, Spin, Select, Tooltip,InputNumber} from 'antd'
import service from 'src/services/api'
import {appStore, scheduleStore} from 'src/stores'
export interface Props extends RouteComponentProps {
}

interface sortParams {
    visible : boolean
    sortNumber :any
    currentId: any
}
export default function MainBox() {
    const [loadingTable, setLoadingTable] = useState(false)
    const [tableData, setTableData] = useState([] as any[])
    const [editingKey, setEditingKey] = useState(false)
    const [mockData, setMockData] = useState([] as any[])
    const [targetKeys, setTargetKeys] = useState([] as any[])
    const [selectedKeys, setSelectedKeys] = useState([] as any[])
    const [groupName, setGroupName] = useState('')
    const [groupColor, setGroupColor] = useState('')
    const [groupColorList, setGroupColorList] = useState([])
    const [id, setId] = useState('')
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [effect, setEffect] = useState(true)
    const [loadingTransfer, setLoadingTransfer] = useState(false)
    const [sortObj,setSortVisible]=useState<sortParams>({visible:false,sortNumber:0,currentId:''})
    // 表格
    const columns: any = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            render: (text: any, record: any, index: number) => index + 1,
            align: 'center',
            width: 5
        },
        {
            title: '分组名称',
            dataIndex: 'groupName',
            key: 'groupName',
            width: 30,
            align: 'left'
        },
        ...appStore.hisMatch({
            map: {
                'dghl,fqfybjy': [
                    {
                        title: '分组颜色',
                        dataIndex: 'groupColor',
                        key: 'groupColor',
                        width: 8,
                        align: 'center',
                        render: (text: any, record: any) => {
                            const item = groupColorList.find((item: any) => {
                                return item.code === record.groupColor
                            }) || {name: ""}
                            return <span>{item.name}</span>
                        }
                    }
                ],
                default: []
            },
            vague: true,
        }),
        {
            title: '操作',
            dataIndex: '操作',
            key: '操作',
            width: 8,
            align: 'center',
            render: (text: any, record: any) => {
                return (
                    <Wrapper>
                        <a onClick={() => handleDelete(record)}
                           style={{marginLeft: '15px', fontSize: '13px', margin: 'auto'}}>
                            删除
                        </a>
                        {appStore.HOSPITAL_ID ==='nfzxy'&&
                            <a onClick={() => changeSort(record)} style={{marginLeft: '15px', fontSize: '13px', margin: 'auto'}}>排序</a>}

                    </Wrapper>
                )
            }
        }
    ]

    //获取人员分组列表
    const getMealList = () => {
        if (effect) {
            setLoadingTable(true)
            let deptCode = scheduleStore.getDeptCode()
            service.personnelSettingApiService.getByDeptCode(deptCode).then((res) => {
                setLoadingTable(false)
                //需要根据sortValue进行排序
                let sortData: [] = res.data.sort((a: any, b: any) => {
                    return a.sortValue-b.sortValue
                })
                setTableData(sortData)
                if(res.data.length > 0)selectRow(res.data[0])
            })
        }
    }

    //保存
    const handleOk = () => {
        const data = {
            deptCode: scheduleStore.getDeptCode(), //string 科室
            groupName: groupName, //string 分组名称
            groupColor: groupColor, //string 分组颜色
        }
        if (!groupName) {
            message.warning('保存前请先填写分组名称')
            return
        }
        setConfirmLoading(true)
        service.personnelSettingApiService.updatePersonnelSetting(data).then((res) => {
            if (res) {
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
                    setMockData([])
                    setTargetKeys([])
                    message.success('删除成功')
                })
            }
        })
    }

    //获取分组已选人员
    const selectedScheduler = (record?: any, arrayData?: any) => {
        let id = record.id
        setLoadingTransfer(true)
        service.personnelSettingApiService.getById(id).then((res) => {
            setLoadingTransfer(false)
            let array: any = []
            res.data.length > 0 && res.data.map((item: any, i: any) => {
                let data: any = arrayData.filter((o: any) => `${o.empNo} + ${o.empName}` === `${item.empNo} + ${item.empName}`)
                if (data && data.length > 0) {
                    array.push(data[0].key)
                }
            })
            setTargetKeys(array)
        })
    }

    //获取分组可选人员
    const selectScheduler = async (record?: any) => {
        let deptCode = scheduleStore.getDeptCode()
        let id = record.id
        setLoadingTransfer(true)
        let res = null
        if (['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
            const params = {
                id,
                deptCode,
                userLists: tableData.map(i => i.id).filter(i => i !== id),
            }
            res = await service.personnelSettingApiService.getSchedulerHl(params)
        } else {
            res = await service.personnelSettingApiService.getScheduler(deptCode)
        }
        setLoadingTransfer(false)
        let array: any = []
        res.data.length > 0 &&
        res.data.map((item: any, i: any) => {
            array.push({
                key: i.toString(),
                sortValue: i.toString(),
                schSettingNurseGroupId: id,
                empName: item.empName,
                empNo: item.empNo
            })
        })
        setMockData(array)
        selectedScheduler(record, array)
    }

    //表格行操作
    const selectRow = async (record: any) => {
        await selectScheduler(record)
        setId(record.id)
    }

    useEffect( ()=> {
        setEffect(true)
        getMealList()
    }, [])

    useLayoutEffect(() => {
        setEffect(false)
    }, [])

    useLayoutEffect(() => {
        service.personnelSettingApiService.getGroupColorList().then(res => {
            const list = res.data.sch_range_color
            setGroupColorList(list)
        })
    }, [])

    // 新增或修改分组中的人员
    const handleChange = (nexTargetKeys: any, direction: any, moveKeys: any) => {
        setTargetKeys(nexTargetKeys)
        let array = nexTargetKeys.map((item: any) => mockData.filter((v: any) => item === v.key)[0])
        let params = {
            schSettingNurseGroupId: id,
            schSettingNurseGroupDetail: array
        }
        service.personnelSettingApiService
            .updateSavePersonnelSetting(params)
            .then((res) => {
                getMealList()
                message.success('操作成功！')
            })
            .catch(() => {
                message.error('操作失败！')
            })
    }

    const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
        let array: any = [...sourceSelectedKeys, ...targetSelectedKeys]
        setSelectedKeys(array)
    }

    const renderItem = (item: any) => {
        const customLabel = <Tooltip placement="topLeft" title={'工号：' + item.empNo}><span
            className='custom-item'>{item.empName}</span></Tooltip>
        return {
            label: customLabel,
            value: item.empName
        }
    }

    /** 监听事件 --- 控制添加弹窗的状态*/
    emitter.removeAllListeners('添加人员分组')
    emitter.addListener('添加人员分组', () => {
        setEditingKey(true)
    })

    /** 监听事件 --- 控制刷新状态*/
    emitter.removeAllListeners('刷新人员分组')
    emitter.addListener('刷新人员分组', () => {
        setId('') // 清除表格选中背景色
        getMealList()
        setMockData([])
        setTargetKeys([])
    })
    //拖拽后更新数据
    emitter.removeAllListeners('saveDragData')
    emitter.addListener('saveDragData', (callback) => {
        if (callback) {
            callback(tableData)
        }
    })
    // const moveRow = (dragIndex: number, hoverIndex: number) => {
    //     const dragRow = tableData[dragIndex];
    //     if (!dragRow) return;
    //     setTableData(
    //         update(tableData, {$splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]})
    //     );
    //     //更新后跑保存接口
    //     emitter.emit('saveDragData', (tableData: any) => {
    //         service.personnelSettingApiService.schSettingNurseGroup(tableData.map((item: any, index: number) => {
    //             item.sortValue = index
    //             return item
    //         })).then(() => {
    //             getMealList()
    //         })
    //     })
    // };
    /* 同步更新右侧科室人员数据*/
    // useEffect(()=>{
    //     if(tableData.length > 0){
    //         selectRow(tableData[0])
    //     }
    // },[])
    const changeSort = (item:any)=>{
        sortObj.visible =true
        sortObj.currentId =item.id
        setSortVisible({...sortObj})
    }
    /*排序弹窗确定*/
    const handleSort =()=>{
        let currentItem = tableData.find((item:any)=>item.id === sortObj.currentId)
        if(currentItem.sortValue === sortObj.sortNumber){
            return message.info('保存失败,序号信息不应与自己一致')
        }
        currentItem.sortValue=sortObj.sortNumber
        setTableData([...tableData])
            emitter.emit('saveDragData', (tableData: any) => {
                // let list =tableData.sort((a:any,b:any)=>b.sortValue-a.sortValue)
                service.personnelSettingApiService.schSettingNurseGroup(tableData).then(() => {
                    handleSortCancel()
                    getMealList()
                })
            })
    }
    /*排序弹窗取消*/
    const handleSortCancel =()=>{
        sortObj.visible =false
        sortObj.sortNumber=0
        sortObj.currentId=''
        setSortVisible({...sortObj})
    }
    return (
        <Wrapper>
            <BaseTableBox>
                <BaseTable
                    columns={columns}
                    surplusHeight={190}
                    dataSource={tableData}
                    loading={loadingTable}
                    rowClassName={(record) => {
                        return record.id === id ? 'background' : 'cursorPointer'
                    }}
                    onRow={(record) => {
                        return {
                            onClick: (event: any) => {
                                selectRow(record)
                            }
                        }
                    }}
                />
            </BaseTableBox>
            <TransferBox>
                <TitleCon>本科室成员名单：</TitleCon>
                <Spin className='loading' spinning={loadingTransfer}>
                    <Transfer
                        className='transfer'
                        dataSource={mockData}
                        listStyle={{
                            width: 'calc(24vw - 75px)',
                            height: 'calc(100vh - 187px)'
                        }}
                        locale={{
                            itemUnit: '人',
                            itemsUnit: '人'
                        }}
                        titles={['可选成员', '已选成员']}
                        selectedKeys={selectedKeys}
                        targetKeys={targetKeys}
                        onChange={handleChange}
                        onSelectChange={handleSelectChange}
                        render={renderItem}
                        lazy={false}
                        showSearch
                        filterOption={(inputValue, item) => {
                            return item.empName.indexOf(inputValue) !== -1
                        }
                        }
                    />
                </Spin>
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
                    <div className='category' style={{marginTop: '50px'}}>
                        <SpanOne>分组名称：</SpanOne>
                        <Input
                            style={{width: '72%'}}
                            value={groupName}
                            defaultValue=''
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    {
                        appStore.hisMatch({
                            map: {
                                'dghl,fqfybjy': (
                                    <div className='category' style={{marginTop: '20px', marginBottom: '50px'}}>
                                        <SpanOne>分组颜色：</SpanOne>
                                        <Select
                                            style={{width: '72%'}}
                                            value={groupColor}
                                            onChange={(value: any) => setGroupColor(value)}
                                        >
                                            {groupColorList.map((item: any, index: number) =>
                                                <Select.Option key={index} value={item.code}>
                                                    {item.name}
                                                </Select.Option>
                                            )}
                                        </Select>
                                    </div>
                                ),
                                other: <div style={{marginBottom: '50px'}}/>
                            },
                            vague: true,
                        })
                    }
                </Modal>
            {/*   nfzxy 排序弹窗 */}
                <Modal
                    className='modal'
                    centered={true}
                    title='排序'
                    width='600px'
                    okText='确定'
                    cancelText='取消'
                    visible={sortObj.visible}
                    onCancel={handleSortCancel}
                    onOk={handleSort}>
                    <div className='category'>
                        <SpanOne>设置序号：</SpanOne>
                        <InputNumber min={1} max={tableData.length}
                                     style={{width:'72%'}} value={sortObj.sortNumber} onChange={(e:any)=>{
                            sortObj.sortNumber =e
                            setSortVisible({...sortObj})
                        }}/>
                    </div>
                    <Remarks>仅支持设置小雨当前所有序号的任何序号，设置后与设置的序号对调</Remarks>
                </Modal>
            </TransferBox>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;

  .cursorPointer {
    cursor: pointer;
  }

  .background {
    cursor: pointer;
    background: #d4e5dd !important;
  }
`
const BaseTableBox = styled.div`
  flex: 1;
`
const TransferBox = styled.div`
  flex: 1;
  padding: 15px 0 15px 15px;
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 187px);

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
  }

  .transfer {
    .ant-transfer-list-content {
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eaeaea;
      }

      &::-webkit-scrollbar-track {
        border-radius: 50px;
        background-color: #eaeaea;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #c2c2c2;
      }
    }
  }
`
const TitleCon = styled.div`
  height: 35px;
  font-weight: 900;
  font-size: 16px;
`
const SpanOne = styled.span`
  display: inline-block;
  width: 75px;
  text-align: justify;
  margin-left: 35px;
`
const Remarks = styled.div`
margin-top: 20px;
  color: #999;
  text-align: center;
`
