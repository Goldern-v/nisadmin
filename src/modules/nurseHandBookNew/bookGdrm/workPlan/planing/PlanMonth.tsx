import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanHeader from '../header/PlanHeader';
import CKEditorFn from './Editor.jsx';
import moment from 'moment';
import { authStore, appStore } from 'src/stores'
import { quarterList, monthList } from 'src/enums/date';
import {
    Badge, ColumnProps,Spin,
    message,
    Input,
    Select,
    DatePicker,
    Steps,
    Button,
    Modal,
    Icon,
    Row, Col,
    Empty
} from 'src/vendors/antd'
import { planDatas } from './planData';
import 审核集中管理 from 'src/modules/continuingEdu/views/审核集中管理/审核集中管理';
import { nursingDataApi } from 'src/modules/indicator/mainView/nursingData/api/NursingDataApi';
import { nursingHandlerApi } from '../../api/NursingHandlerApi';
import NodeList from './NodeList';
import { init } from 'echarts';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
const { Step } = Steps

export interface Props {
    payload: any;
    getTitle: any;
}
export default observer(function PlanMonth(props: Props) {
    // modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalReportType, setModalReportType] = useState('0');
    const [modalDate, setModalDate] = useState(['', '']);
    const [yearPickShow1, setYearPickShow1] = useState(false);//年份
    const [createYear, setCreateYear] = useState(moment() as undefined | moment.Moment);
    // const user = JSON.parse(sessionStorage.getItem('user') || '')
    const { history, location } = appStore;
    // 显示文字
    const [data, setData] = useState(new Object() as any)
    const [currContent, setCurrContent] = useState({ id: null, content: '', status: null });//点击的当前item

    
    // 初始化
    useEffect(() => {
        // init()
        // setDataList([])
        // setCurrContent({id:null,content:''})
        // setfForceUpdate(false);
        // setTimeout(() => {
        //   setfForceUpdate(true); 
        // }, 0);
        // console.log(props.getTitle)
        // console.log(location)
        planDatas.pathname = location.pathname
        // 截取最后一个'/'后面的字符串
        let index = location.pathname.lastIndexOf('/')
        planDatas.pathname = location.pathname.substring(index + 1, location.pathname.length)
        init()
    }, [props.getTitle])
    const init = () => {
        // 初始化数据
        planDatas.attchList = []
        planDatas.auditInfo = []
        planDatas.contentDetail = {}
        planDatas.contentItem = {id:null,content:'',status:null}
        planDatas.getDept()
        // planDatas.getList()
        planDatas.handelReset()
    }



    // const { master, handlenodeDto, auditDetails } = detailData
    // let stepCurrent = [...handlenodeDto].reverse().find((step: any) => step.nodeCode === master.currentNodeCode)

    // 弹框确定  创建
    const handleOk = () => {
        let paramter = planDatas.createObj as any
        if (planDatas.pathname.indexOf('quarter') > -1) {
            // 季度
            paramter.quarter = planDatas.createQuarter
        } else if (planDatas.pathname.indexOf('month') > -1) {
            paramter.month = planDatas.createMonth
        }

        planDatas.mainLoading = true
        nursingHandlerApi.recordCreate(paramter).then(res => {
            planDatas.mainLoading = false
            if (res.code == '200') {
                message.success('保存成功')
                planDatas.modalVisible = false
                // 直接打开编辑器
                
                // planDatas.itemList[0] = res.data || {}
                // setCurrContent(res.data); 
                // planDatas.contentItem = {id:null,content:'',status:null}
                // planDatas.contentItem = res.data; 

                planDatas.yearYear = planDatas.createYear
                planDatas.getList(res.data.id)
                // planDatas.getDetail(res.data.id)
                // 先把条件设置成
                
            } else {
                message.error(res.desc)
            }
        }).catch(err => {
            planDatas.mainLoading = false
        })

    }

    // 弹框取消
    const handleCancel = () => {
        planDatas.modalVisible = false
    }

    // 打印
    const onPrint = (isPrint: boolean) => {

    }
    // 事件轨迹
    // const streamNode = (auditDetails: any) => {
    //     auditDetails = auditDetails || {}
    //     let steps = [
    //         {
    //             title: "保存",
    //             status: "success",
    //             date: "",
    //             name: ""
    //         },
    //         {
    //             title: "上报",
    //             name: auditDetails.sbr,
    //             date: "",
    //             status: auditDetails.sbstatus == "已上报" ? "success" : "wait"
    //         },
    //         {
    //             title: "质控科分派",
    //             name: auditDetails.fpr,
    //             date: "",
    //             status: auditDetails.fpstatus == "已分派" ? "success" : "wait"
    //         },
    //         {
    //             title: "职能部门审核",
    //             name: auditDetails.znbmshr,
    //             date: auditDetails.znbmshsj,
    //             status: auditDetails.znbmshstatus == "审核通过" ? "success" : "wait"
    //         },
    //         {
    //             title: "职能部门结案",
    //             name: auditDetails.jar,
    //             date: auditDetails.jasj,
    //             status: auditDetails.jastatus == "已结案" ? "success" : "wait"
    //         },
    //         {
    //             title: "质控科结案",
    //             name: auditDetails.zkzxshr,
    //             date: auditDetails.zkzxshsj,
    //             status: auditDetails.zkzxshstatus == "审核通过" ? "success" : "wait"
    //         },
    //         {
    //             title: "完成",
    //             name: "",
    //             date: auditDetails.zkzxshsj,
    //             status: auditDetails.zkzxshstatus == "审核通过" ? "success" : "wait"
    //         }
    //     ]
    //     return steps
    // }
    // const stepRender = () => {
    //     let auditDetails = detailData.auditDetails || {}
    //     let steps = streamNode(auditDetails)
    //     return <Steps direction='vertical' size='small' current={0} className='status-line-content'>
    //         {steps.map((item: any, idx: number) => {
    //             let icon: any

    //             if (item.status == 'success') {
    //                 icon = <Icon type='check-circle' className='icon-step success' />
    //             } else {
    //                 icon = <Icon type='minus-circle' className='icon-step default' />
    //             }
    //             return (
    //                 <Step
    //                     title={''}
    //                     icon={icon}
    //                     description={<div>
    //                         <div>
    //                             <div style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</div>
    //                             <span>{item.name}</span>
    //                             <br />
    //                             <span>{item.date}</span>
    //                         </div>
    //                     </div>}
    //                     key={idx} />
    //             )
    //         })}
    //     </Steps>
    // }
    useEffect(() => {
      return () => {
        // 对Edoitor非常重要！！！
        planDatas.contentItem = {id:null,content:'',status:null}
      }
    }, [])
    
    return (
        <Wrapper>
            <PlanHeader title={props.getTitle}></PlanHeader>
            <Spin spinning={planDatas.mainLoading}>
            <div className="main-contain">
                <div className="left">
                {planDatas.itemList.length<1 && <Empty style={{ marginTop: '200px',width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'创建一份'+planDatas.getEmptyTips(planDatas.pathname)} />}
                    {
                        planDatas.itemList.map((it: any) => {
                            return (
                                <div className={it.id == planDatas.contentItem.id ? 'left-item active' : 'left-item'} key={it.id} onClick={() => { setCurrContent(it); planDatas.contentItem = it; planDatas.getDetail(it.id) }}>
                                    <div className='plan-left-title'><span className='fontsize-16 ellipsis'>{it.title}</span>
                                        {/* 待提交 */}
                                        {it.status === 0 && <Badge className='plan-badge ready' color='#108ee9' text={it.statusDesc} />}
                                        {/* 待审批 */}
                                        {it.status === 1 && <Badge className='plan-badge wait' color='#F0944B' text={it.statusDesc} />}
                                        {/* 审批通过 */}
                                        {it.status === 2 && <Badge className='plan-badge through' color='#87d068' text={it.statusDesc} />}
                                        {/* 审批不通过 */}
                                        {it.status == -1 && <Badge className='plan-badge fail' color='#f00' text={it.statusDesc} />}
                                    </div>
                                    <div>
                                        <span className='fontsize-16'>{it.createName}</span><span style={{ marginLeft: '8px' }}>{it.deptName}</span>
                                    </div>
                                    <p className='plan-left-time'>{it.createTime}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="content">
                    <Spin style={{ marginTop: '20%',width: "50%"}} spinning={planDatas.detailLoading} size="large"></Spin>
                    {/* 正在编辑就显示富文本编辑框 */}
                    {(planDatas.contentItem.status===0 || planDatas.contentItem.status===-1) &&
                        <>
                            <div>
                                <CKEditorFn />
                            </div>
                            {planDatas.contentItem.status===-1 &&<NodeList key={planDatas.contentItem.id || ''} />}
                        </>
                    }
                    {planDatas.contentItem.status == null && <Empty style={{ marginTop: '200px',width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'选择左侧'+planDatas.getEmptyTips(planDatas.pathname)+'或创建一份'+planDatas.getEmptyTips(planDatas.pathname)} />}
                    {(planDatas.contentItem.status === 1 || planDatas.contentItem.status === 2) && <>
                        <div className='content-middle'>
                            <div className='btn-list'>
                                <div className="btn-list-left">
                                    {/* <Button className='mr-15' onClick={() => history.goBack()}>导入</Button> */}
                                    <Button onClick={() => planDatas.exportEditor()}>导出</Button>
                                </div>
                                <div className="btn-list-right">
                                    {/* <Button className='mr-15' type="primary" onClick={() => saveContent('0')}>暂存</Button> */}
                                    {/* <Button className='mr-15' type="primary" onClick={() => saveContent('1')}>提交</Button> */}
                                    {planDatas.contentItem.status===1 && <Button className='mr-15' onClick={() => planDatas.cancelSubmit()} type="danger">撤销</Button>}
                                    {/* <Button onClick={() => {alert('打印')}}>打印</Button> */}

                                </div>
                            </div>
                            <div style={{ padding: '0 10px',margin:'0 auto 20px',maxWidth:'calc(100vw - 730px)' }}>
                                <div className='content-title'>{planDatas.contentDetail.title}</div>
                                <div className='html-content' id="health-content">
                                    <div className='' style={{maxWidth:'calc(100vw - 730px)'}} dangerouslySetInnerHTML={{ __html: planDatas.contentDetail.content || '' }} />
                                </div>
                                {planDatas.attchList.length>0 && <div className='attch'>
                                    <div className='attch-title' >附件<Icon type="link" /></div>
                                    <div className='attch-file-list'>
                                        {planDatas.attchList.map((it:any)=>{
                                            return (<a href={it.path} download={it.name} key={it.id}>{it.name}</a>)
                                        })}
                                        
                                        {/* <a href='#' download="视频教程模板">模板下载</a> */}
                                        {/* <a href='#' download="视频教程模板">模板下载</a> */}
                                    </div>
                                </div>}
                            </div>
                        </div>
                        {/* <div className="content-rigt"> */}
                            <NodeList />
                            {/* <div className='status-line'>
                                <div className='right-pannel-title'>事件轨迹:</div>
                                {appStore.HOSPITAL_ID != 'lcey' ? <Steps direction='vertical' size='small' current={handlenodeDto.indexOf(stepCurrent)} className='status-line-content'>
                                    {handlenodeDto.map((item, idx: number) => {
                                        let icon: any

                                        if (!item.noPass) {
                                            icon = <Icon type='check-circle' className='icon-step success' />
                                        } else {
                                            icon = <Icon type='close-circle' className='icon-step error' />
                                        }
                                        if (item.status === "0")
                                            icon = <Icon type='minus-circle' className='icon-step default' />
                                        // icon = <Icon type='right-circle' className='icon-step default' />
                                        // console.log(item.title)
                                        return (
                                            <Step
                                                title={item.title}
                                                icon={icon}
                                                description={<div>
                                                    <div>
                                                        <div style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nodeName}</div>
                                                        <span>{item.handlerName}</span>
                                                        <br />
                                                        <span>{item.handleTime}</span>
                                                        <br />
                                                        {item.handleContent && (
                                                            <div className="handle-content">
                                                                <span>{item.handleContent}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                                key={idx} />
                                        )
                                    })}
                                </Steps> : stepRender()}
                            </div> */}
                        {/* </div> */}
                    </>}
                </div>
            </div>
            </Spin>
            {/* <MModal> */}
                <Modal
                    title={'创建'+props.getTitle}
                    visible={planDatas.modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div className='modal-content'>
                    <div className="item-row" >
                    <div
              className="label"
              style={{ fontWeight: "bold", marginBottom: ".3em" }}
            >
              科室</div>
              <Select
                style={{ width: "100%" }}
                value={planDatas.createDeptCode}
                onChange={(val: any) => {
                  planDatas.createDeptCode = val;
                }}
              >
                {planDatas.deptList.map((v: any, i: number) => (
                  <Option key={v.code} value={v.code}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            
                            </div>
                        <div className="item-row" style={{ marginTop: '15px' }}>
                                <div className="label" style={{fontWeight: 'bold',marginBottom: '.3em'}}>年份</div>
                           
                                <DatePicker
                                    open={yearPickShow1}
                                    onOpenChange={status => {
                                        setYearPickShow1(status)
                                    }}
                                    onPanelChange={(value, mode) => {
                                        
                                        planDatas.createYear = value
                                        setYearPickShow1(false)
                                        
                                    }}
                                    mode="year"
                                    style={{ width: '100%' }}
                                    value={planDatas.createYear}
                                    allowClear={true}
                                    placeholder='选择年份'
                                    format="YYYY"
                                />
                        </div>
                        {planDatas.pathname.indexOf('quarter') > -1 &&
                            <div className="item-row" style={{ marginTop: '15px' }}>
                                    <div className="label" style={{fontWeight: 'bold',marginBottom: '.3em'}}>季度</div>
                                
                                    <Select
                                        style={{ width: '100%' }}
                                        value={planDatas.createQuarter}
                                        onChange={(val: any) => {
                                            planDatas.createQuarter = val
                                           
                                        }}
                                    >
                                        {
                                            quarterList.map((v: any, i: number) => (
                                                <Option key={i} value={i + 1}>{v}</Option>
                                            ))
                                        }
                                    </Select>
                            </div>}
                        {planDatas.pathname.indexOf('month') > -1 &&
                            <div className="item-row" style={{ marginTop: '15px' }}>
                                {/* <Col span={4}> */}
                                    <div className="label" style={{fontWeight: 'bold',marginBottom: '.3em'}}>月份</div>
                                {/* </Col>
                                <Col span={16}> */}
                                    <Select className="mr-15"
                                        style={{ width: '100%' }}
                                        value={planDatas.createMonth}
                                        onChange={(val: number) => {
                                            planDatas.createMonth = val
                                            // onload()
                                        }}
                                    >
                                        {
                                            monthList.map((v: any, i: number) => (
                                                <Option key={i} value={i + 1}>{v}</Option>
                                            ))
                                        }
                                    </Select>
                                {/* </Col> */}
                            </div>}
                    </div>
                </Modal>
            {/* </MModal> */}
        </Wrapper>
    )
})
const Wrapper = styled.div`
    /* overflow-x: auto; */
    /* overflow-y: hidden; */
p{
    margin: 0;
}
.main-contain{
    background-color: #fff;
    width: 100%;
    display: flex;
    height: calc(100vh - 95px);
    /* min-width: 1220px; */
    .left{
        width: 250px;
        /* overflow: hidden; */
        overflow-y: auto;
        border: 1px solid #ddd;
        box-sizing: border-box;
        /* padding: 5px; */
        .left-item{
            border-bottom: 1px solid #ddd;
            padding:5px;
           
            
            .plan-left-title{
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            .fontsize-16{
                font-size: 13px;
                font-weight: bold;
            }
            .ellipsis{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .plan-badge{
                flex: none;
                .ant-badge-status-text{
                    font-size: 12px;
                    margin-left:3px;
                    
                }
                &.through{
                    .ant-badge-status-text{
                        color: #87d068;
                    }
                }
                &.wait{
                    .ant-badge-status-text{
                        color: #F0944B;
                    }
                }
                &.ready{
                    .ant-badge-status-text{
                        color: #108ee9;
                    }
                }
                &.fail{
                    .ant-badge-status-text{
                        color: #f00;
                    }
                }
            }
            .plan-left-time{
                font-size: 12px;
                color: #999;
            }
            &:hover,&.active{
                cursor: pointer;
                background-color: #ddd;
                /* color: #fff; */
                .plan-left-time{
                    /* color: #fff; */
                }
                /* .plan-badge{
                    &.through{
                    .ant-badge-status-text{
                        color: #fff;
                    }
                } */
                    /* color: #fff !important; */
                }
            }
        }
        
}
.content{
        flex:1;
        display: flex;
        /* padding: 0 10px; */
        .content-content{
            display: flex;
            justify-content: space-between;
            height: 100%;
        }
        .content-rigt{
            .status-line{
                /* float: right; */
                width: 250px;
                height: 100%;
                background: #f7fafa;
                border-left: 1px solid #ddd;
                overflow-y: auto;
                overflow-x: hidden;
                padding-right: 18px;
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
                .right-pannel-title{
                    margin-top: 20px;
                    line-height: 24px;
                    text-indent: 15px;
                }
                .ant-steps{
                    margin-left: 25px;
                }
                .ant-steps-item-title{
                    font-weight: bold;
                }
            }
        }
        .content-middle{
            /* width: 720px; */
            flex: 1;
            overflow-y: auto;
            /* .btn-list{
                width: 100%;
                overflow: hidden;
                button{
                    float: right;
                    margin-right: 15px;
                }
            } */
            .btn-list{
                padding: 10px 10px 0;
                display: flex;
                justify-content: space-between;
                .mr-15{
                    margin-right: 15px;
                }
            }
        }
        .content-title{
            text-align: center;
            width: 100%;
            font-size:20px;
            font-weight: bold;
        }
}
.html-content{
    display: flex;
    justify-content: center;
}

/* 附件 */
.attch{
    .attch-title{
        font-size: 16px;
        font-weight: bold;
    }
    .attch-file-list{
        a{
            font-size: 14px;
            display: block;
            line-height: 1.1;
            text-decoration: underline;
        }
    }
}
.left .content,.right .content,.content-middle,.left{
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px #ffffff;
    // border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
`
const MModal = styled.div`
font-size: 13px;
	.modal-content{
		
	}
	.item-row{
    margin-bottom: 20px;
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .label{
    text-align: right;
    margin-right: 10px;
    line-height: 32px;
  }
`;