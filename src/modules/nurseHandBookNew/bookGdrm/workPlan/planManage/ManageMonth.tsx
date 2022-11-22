import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlanHeader from '../header/PlanHeader';
// import Editor from './Editor.jsx';
import moment from 'moment';
import { authStore, appStore } from 'src/stores'
import {
    Badge, ColumnProps,Spin,
    // message,
    // Input,
    // Select,
    // DatePicker,
    // Steps,
    Button,
    // Modal,
    Icon,
    // Row, Col,
    Empty
} from 'src/vendors/antd'
// import 审核集中管理 from 'src/modules/continuingEdu/views/审核集中管理/审核集中管理';
// import { nursingDataApi } from 'src/modules/indicator/mainView/nursingData/api/NursingDataApi';
// import { nursingHandlerApi } from '../../api/NursingHandlerApi';
import NodeList from './NodeList';
// import { init } from 'echarts';
import ManageHeader from './ManageHeader';
import { manageDatas } from './ManageDatas';
import { planDatas } from '../planing/planData';
// const Option = Select.Option;
// const RangePicker = DatePicker.RangePicker
// const { Step } = Steps

export interface Props {
    payload: any;
    getTitle: any;
}

export default observer(function ManageMonth(props: Props) {

    // const [yearPickShow1, setYearPickShow1] = useState(false);//年份
    const { history, location } = appStore;
    const [currContent, setCurrContent] = useState({ id: null, content: '', status: null });//点击的当前item

    // 初始化
    useEffect(() => {
        // manageDatas.pathname = location.pathname
        // 截取最后一个'/'后面的字符串
        let index = location.pathname.lastIndexOf('/')
        manageDatas.pathname = location.pathname.substring(index + 1, location.pathname.length)
        init()
        // console.log(props.getTitle)

    }, [props.getTitle])

    const init = () => {
        // 初始化数据
        manageDatas.attchList = []
        manageDatas.auditInfo = []
        manageDatas.contentDetail = {}
        manageDatas.contentItem = {id:null,content:'',status:null}
        manageDatas.getDept()
        manageDatas.handelReset()
    }

    // 打印
    const onPrint = (isPrint: boolean) => {

    }
    return (
        <Wrapper>
            <ManageHeader title={props.getTitle}></ManageHeader>
            <Spin spinning={manageDatas.mainLoading}>
            <div className="main-contain">
                <div className="left">
                    {manageDatas.itemList.length<1 && <Empty style={{ marginTop: '200px',width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无数据' />}
                    {
                        manageDatas.itemList.map((it: any) => {
                            return (
                                <div className={it.id == manageDatas.contentItem.id ? 'left-item active' : 'left-item'} key={it.id} onClick={() => { setCurrContent(it); manageDatas.contentItem = it; manageDatas.getDetail(it.id) }}>
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
                    {/* <div> */}
                    <Spin style={{ marginTop: '20%',width: "50%"}} spinning={manageDatas.detailLoading} size="large"></Spin>
                    {(manageDatas.contentItem.status == null && !manageDatas.detailLoading) && <Empty style={{ marginTop: '200px',width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'选择左侧'+planDatas.getEmptyTips(manageDatas.pathname)} />}
                    {(manageDatas.contentItem.status != null) && <>
                        <div className='content-middle'>
                            <div>
                            <div className='btn-list'>
                                <div className="btn-list-left">
                                    <Button onClick={() => manageDatas.exportEditor()}>导出</Button>
                                </div>
                                <div className="btn-list-right">
                                    {/* {manageDatas.contentItem.status===1 && <Button className='mr-15' onClick={() => manageDatas.cancelSubmit()} type="danger">撤销</Button>} */}
                                    {/* <Button onClick={() => {onPrint}}>打印</Button> */}
                                </div>
                            </div>
                            <div style={{ padding: '0 10px',margin:'0 auto 20px',maxWidth:'calc(100vw - 730px)' }}>
                                <div className='content-title'>{manageDatas.contentDetail.title}</div>
                                <div className='html-content' id="health-content" >
                                    <div className='' style={{maxWidth:'calc(100vw - 730px)'}} dangerouslySetInnerHTML={{ __html: manageDatas.contentDetail.content || '' }} />
                                </div>
                                {manageDatas.attchList.length>0 && <div className='attch'>
                                    <div className='attch-title' >附件<Icon type="link" /></div>
                                    <div className='attch-file-list'>
                                        {manageDatas.attchList.map((it:any)=>{
                                            return (<a href={it.path} download={it.name} key={it.id}>{it.name}</a>)
                                        })}
                                    </div>
                                </div>}
                            </div>
                            </div>
                        </div>
                        <NodeList />
                    </>}
                    {/* </div> */}
                </div>
                
            </div>
            </Spin>
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
.left .content,.right .content,.content-middle{
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