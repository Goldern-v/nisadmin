import {authStore} from "src/stores";
import {Button, Tabs, InputNumber, message, Modal} from "antd";
import {Badge, Empty} from "src/vendors/antd";
import React, {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {nurseHandbookRecordModel as model} from "src/modules/nurseHandBookNew/views/detail-lyrm/newModel";
import BaseTable from "src/components/BaseTable";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {cloneDeep} from "lodash";

const {TabPane} = Tabs

interface Props {
    title?: string
    tableData: any
    menuCode?: string
    onCommit: (key: string) => void
}

export default observer(function (props: Props) {
    const {title, tableData, menuCode, onCommit} = props
    const [currContent, setCurrContent] = useState({} as any);//点击的当前item
    const [pageLoading, setPageLoading] = useState(false)
    const [detail, setDetail] = useState([] as any)
    const [defKey,setDefKey] =useState('1')
    const callback = (key:string) => {
        setDefKey(key)
        onCommit&&onCommit(key)
    }
    const handleCurrent = (it: any) => {
        setCurrContent(it);
        setPageLoading(true)
        getDetail(it.id)
        setPageLoading(false)
    }

    const columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 60,
            align: 'center',
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: '指标项目',
            dataIndex: 'monitorContent',
            width: 100,
            align: 'center',
        },
        {
            title: '本月数据',
            dataIndex: 'indicators',
            width: 100,
            align: 'center',
            render: (text: number, record: any, index: number) => {
                return <InputNumber
                    style={{width: '100%'}}
                    key={index + 'a1'}
                    onChange={(e: any) => {
                        let newData: any = cloneDeep(detail)
                        newData[index].indicators = e
                        setDetail(newData)
                    }}
                    value={record.indicators} placeholder='请输入'/>
            }
        },
        {
            title: '目标值',
            dataIndex: 'qualified',
            width: 100,
            align: 'center',
        },
    ]
    const getDetail = (id: any) => {
        nurseHandBookService.getIndicatorsItemData({
            menuCode: menuCode,
            recordId: id || tableData[0]?.id,
        }).then(res => {
            setDetail(res.data || [])
        })
    }
    const commit = () => {
        nurseHandBookService.saveIndicatorsItemData({
            id:currContent.id,
            nurseHandbookItemDtoList:detail
        }).then((res => {
            message.success('暂存成功')
            onCommit && onCommit(defKey)
        }))
    }
    const onDelete =(id:any)=>{
            Modal.confirm({
                title: '删除',
                content: '确认删除该表单？',
                onOk: () => {
                    nurseHandBookService.delNHR({id}).then(res => {
                        if (res.code === '200') {
                            message.success('删除成功')
                            onCommit && onCommit(defKey)
                        }
                    })
                }
            })
    }
    useEffect(()=>{
        if (menuCode){
            getDetail('')
        }
        // if(currContent.id){
        //     getDetail(currContent.id)
        // }
    },[menuCode])
    useEffect(() => {
        if (Array.isArray(tableData) &&tableData.length >=1) {
            setCurrContent(tableData[0])
            console.log(tableData[0]);
            getDetail(tableData[0].id)
        } else {
            setCurrContent({})
        }

    }, [tableData])
    return <Wrapper>
        <div className="main-contain">
            <div className="left">
                {authStore.isDepartment && <Tabs defaultActiveKey={defKey} className='sticky' onChange={callback}>
                    <TabPane tab='我创建的' key="1">
                    </TabPane>
                    <TabPane tab='全院创建的' key="2">
                    </TabPane>
                </Tabs>}

                {tableData.length < 1 ?
                    <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                           description={'创建一份' + (title || '')}/> :
                    <div style={{overflowY: 'auto', height: "100vh"}}>
                        {
                            tableData.map((it: any) => {
                                return (
                                    <div
                                        className={it.id == currContent?.id ? 'left-item active' : 'left-item'}
                                        key={it.id} onClick={() => handleCurrent(it)}>
                                        <div className='plan-left-title'><span
                                            className='fontsize-16 ellipsis'>{it.title}</span>
                                            {/* 待提交 */}
                                            {it.status === 0 && <Badge className='plan-badge ready' color='#108ee9'
                                                                       text={it.statusDesc}/>}
                                            {/* 待审批 */}
                                            {it.status === 1 && <Badge className='plan-badge wait' color='#F0944B'
                                                                       text={it.statusDesc}/>}
                                            {/* 审批通过 */}
                                            {it.status === 2 && <Badge className='plan-badge through' color='#87d068'
                                                                       text={it.statusDesc}/>}
                                            {/* 审批不通过 */}
                                            {it.status == -1 &&
                                                <Badge className='plan-badge fail' color='#f00' text={it.statusDesc}/>}
                                        </div>
                                        <div>
                    <span
                        className='fontsize-16'>{it.createName}</span><span>{it.deptName}</span>
                                        </div>
                                        <p className='plan-left-time'>{it.createdTime}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='right'>
                <div className='header'>
                    <div>创建日期:{currContent?.createdTime}</div>
                    <div>
                        <Button type='primary' onClick={commit}>暂存</Button>
                        <Button type='danger' onClick={() => onDelete(currContent.id)}>删除</Button>
                    </div>
                </div>
                <div>创建人:{currContent?.createdBy}</div>
                <div className='title'>{currContent?.menuName}</div>
                {
                    currContent?.id ? <div>
                            <BaseTable
                                loading={pageLoading}
                                dataSource={detail}
                                columns={columns}
                                surplusHeight={220}
                            />
                        </div>
                        :
                        <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                               description={'选择左侧' + title + '或创建一份' + (title || '')}/>
                }
            </div>
        </div>
    </Wrapper>
})
const Wrapper = styled.div`
  .main-contain {
    background-color: #fff;
    width: 100%;
    display: flex;
    height: calc(100vh - 95px);

    .left {
      width: 250px;
      border: 1px solid #ddd;
      box-sizing: border-box;

      .sticky {
        position: sticky;
        top: 0;
      }

      .left-item {
        border-bottom: 1px solid #ddd;
        padding: 5px;


        .plan-left-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .fontsize-16 {
          font-size: 13px;
          font-weight: bold;
        }

        .ellipsis {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .plan-badge {
          flex: none;

          .ant-badge-status-text {
            font-size: 12px;
            margin-left: 3px;

          }

          &.through {
            .ant-badge-status-text {
              color: #87d068;
            }
          }

          &.wait {
            .ant-badge-status-text {
              color: #F0944B;
            }
          }

          &.ready {
            .ant-badge-status-text {
              color: #108ee9;
            }
          }

          &.fail {
            .ant-badge-status-text {
              color: #f00;
            }
          }
        }

        .plan-left-time {
          font-size: 12px;
          color: #999;
        }

        &:hover, &.active {
          cursor: pointer;
          background-color: #ddd;

          .plan-left-time {

          }
        }
      }
    }

    .right {
      flex: 1;
      padding: 20px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
      }

      .title {
        font-weight: 700;
        font-size: 20px;
        text-align: center;
      }
    }
  }

`