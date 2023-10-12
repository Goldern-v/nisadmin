import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import { currentMonth } from 'src/utils/date/rangeMethod'
import { nurseHandBookService } from '../../services/NurseHandBookService'
import SelectCon from '../list-jew/components/SelectCon'
import AddModal from '../list-jew/components/addModal'
import createModal from 'src/libs/createModal'
import useFirstDisEffect from 'src/hooks/useFirstDisEffect'
import { message } from 'antd'
import { formatTitle } from '../detail-lyrm/config'
import AuditModal from './components/auditModal'
import {planDatas} from "src/modules/nurseHandBookNew/bookGdrm/workPlan/planing/planData";
import {Badge, Empty} from "src/vendors/antd";
import  DetailNewIndex from '../detail-lyrm/newIndex'
import { nurseHandbookRecordModel as model } from '../detail-lyrm/newModel'
const Quarter ={'第一季度':1,'第二季度':2,'第三季度':3,'第四季度':4}
const QuarterV ={1:'第一季度',2:'第二季度',3:'第三季度',4:'第四季度'}
export interface Props {
    options: Obj
}

/** 29张表的菜单页，by临邑 */
export default observer(function (props: Props) {
    const { options } = props
    const [currContent, setCurrContent] = useState({} as any);//点击的当前item

    /**创建弹窗 */
    const addModal = createModal(AddModal)
    useEffect(() => {
        return () => {
            addModal.unMount()
        }
    }, [appStore.location.pathname])

    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        status: '',
        pageSize: 20,
        pageNum: 1,
    })
    /** 创建弹窗参数
     */
    const [addQuery, setAddQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode
    })
    const [total, setTotal] = useState(0)
    // const [deptList, setDeptList] = useState<Obj[]>([])
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [formList, setFormList] = useState<Obj[]>([])
    const [selectedRows, setSelectedRows] = useState<Obj[]>([])
    const [auditVisible, setAuditVisible] = useState(false)
    const getHalfYear =()=>{
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1; // JavaScript 中月份从 0 开始，所以需要加 1
        return  currentMonth >= 1 && currentMonth <= 6 ? '上半年':'下半年'
    }
    /**
     * 初始化设置
     * year_can_create_more：按年度创建，可以创建多个记录；对应登记表
     * year_no_create_more：按年度创建，不能创建多个记录；对应工作计划、工作总结、管理目标、计划表
     * date：按时间创建；对应记录表
     * validateField：
     * （1）year_can_create_more：科室、年
     * （2）year_no_create_more：科室、年
     * （3）month_create_more：科室、年、月
     * （4）month_no_create_more：科室、年、月
     * （5）half_year_more：科室、年、上半年/下半年
     * （6）half_year_not_more：科室、年、上半年/下半年
     * （7）quarter_more：科室、年、季度
     * （8）quarter_not_more：科室、年、季度
     * （9）time_create_more：科室、日期（日）
     * （10）time_no_create_more：科室、日期（日）
     * （11）start_end_time_create_more：科室、开始时间、结束时间
     * （12）no_validate_create_more：科室
     */
    const switchFn = {
        year_can_create_more: () => {
            setQuery({
                ...query,
                year: moment(),
                menuCode: '',
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                menuCode: '',
            })
            const newColumns = [
                {
                    title: '年份',
                    align: 'center',
                    dataIndex: 'year'
                },
                {
                    title: '类型',
                    align: 'center',
                    dataIndex: 'menuName'
                }
            ]
            setColumns(newColumns)
            getFormList()
        },
        year_no_create_more: () => {
            setQuery({
                ...query,
                menuCode:options.menuCode === '925NDBRDJ_7' ? '':undefined,
                year: moment()
            })
            setAddQuery({
                ...addQuery,
                menuCode:options.menuCode === '925NDBRDJ_7' ? '':undefined,
                year: moment()
            })
            const newColumns = [
                {
                    title: '年份',
                    align: 'center',
                    dataIndex: 'year'
                },
                {
                    title: '标题',
                    align: 'center',
                    dataIndex: 'title'
                }
            ]
            setColumns(newColumns)
            getFormList()
        },
        start_end_time_create_more: () => {
            const [startTime, endTime] = currentMonth()
            setQuery({
                ...query,
                startTime,
                endTime,
                menuCode: '',
            })
            setAddQuery({
                ...addQuery,
                startTime,
                endTime,
                menuCode: '',
            })
            const newColumns = [
                {
                    title: '日期',
                    align: 'center',
                    dataIndex: 'startTime',
                    render: (text: string, row: Obj) => {
                        return `${row.startTime}-${row.endTime}`
                    }
                },
                {
                    title: '类型',
                    align: 'center',
                    dataIndex: 'menuName'
                }
            ]
            setColumns(newColumns)
            getFormList()
        },
        month_no_create_more:() => {
            setQuery({
                ...query,
                year: moment(),
                month:'',
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                month:moment().format('M'),
            })
            const newColumns = [
                {
                    title: '年份',
                    align: 'center',
                    dataIndex: 'year',
                    render: (text: string) => {
                        return `${text}年`
                    }
                },
                {
                    title: '月份',
                    align: 'center',
                    dataIndex: 'month',
                    render: (text: string) => {
                        return `${text}月`
                    }
                }
            ]
            setColumns(newColumns)
            getFormList()
        },
        quarter_not_more:()=>{
            setQuery({
                ...query,
                year: moment(),
                quarter:QuarterV[moment().quarter()],
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                quarter:QuarterV[moment().quarter()],
            })
            const newColumns = [
                {
                    title: '年份',
                    align: 'center',
                    dataIndex: 'year',
                    render: (text: string) => {
                        return `${text}年`
                    }
                },
                {
                    title: '季度',
                    align: 'center',
                    dataIndex: 'quarter',
                    render: (text: string) => {
                        return `第${text}季度`
                    }
                }
            ]
            setColumns(newColumns)
            getFormList()
        },
        no_validate_create_more:()=>{
            setQuery({
                ...query,
            })
            setAddQuery({
                ...addQuery,
                code:"no_validate_create_more",
            })
            const newColumns = [
                {
                    title: '封面名称',
                    align: 'center',
                    dataIndex: 'title',
                    render: (text: string) => {
                        return `${text}`
                    }
                },
            ]
            setColumns(newColumns)
            getFormList()
        },
        half_year_not_more:()=>{
            setQuery({
                ...query,
                year: moment(),
                halfYear:getHalfYear()
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                halfYear:getHalfYear()
            })
            const newColumns = [
                {
                    title: '年度',
                    align: 'center',
                    dataIndex: 'halfYear',
                    render:(text:any)=>{
                        return {'1':'下半年','0':'上半年','2':"全年"}[text]
                    }
                },
            ]
            setColumns(newColumns)
            getFormList()
        },
        time_create_more:()=>{
            const [startTime] = currentMonth()
            setQuery({
                ...query,
                time:startTime
            })
            setAddQuery({
                ...addQuery,
                time:startTime
            })
            getFormList()
        },
        time_no_create_more:()=>{
            const [startTime] = currentMonth()
            setQuery({
                ...query,
                time:startTime
            })
            setAddQuery({
                ...addQuery,
                time:startTime
            })
            getFormList()
        },
    }

    const onOkBAdd = (params: Obj) => {
        const { menuCode } = options
        const title = formatTitle(params, options)
        const data: Obj = { ...params }
        if (!params.menuCode) {
            data.menuCode = menuCode
        }
        title && (data.title = title)
        nurseHandBookService.createOrUpdate(data).then(res => {
            if (res.code === '200') {
                const { id } = res.data
                getTableData()
                model.init(id)
                addModal.hide()
                // appStore.history.push(`/nurseHandBookNewForm/detail?id=${id}`)
            }
        })
    }
    const openCreate = () => {
        addModal.show({
            onOkCb: onOkBAdd,
            formList,
            addQuery,
        })
    }

    // const getDeptList = async () => {
    //   return commonApi.getNursingUnitSelf().then((res: Obj) => {
    //     setDeptList(res.data.deptList)
    //     return { deptCode: res.data.defaultDept }
    //   })
    // }
    const getTableData = () => {
        const { menuCode } = options
        setLoading(true)
        const params = { ...query }
        if (!params.menuCode) params.menuCode = menuCode
        if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
        if (params.hasOwnProperty('startTime')) {
            const { startTime, endTime } = params
            params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
            params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
        }
        nurseHandBookService.getTableDataList(params).then((res: Obj) => {
            setTableData(res.data.list || [])
            setCurrContent(res.data.list[0])
            setTotal(res.data.totalCount)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    /**根据menuCode获取表单 */
    const getFormList = () => {
        const { menuCode } = options
        nurseHandBookService.getFormListNHR({ menuCode }).then(res => {
            setFormList(res.data || [])
        })
    }
    const openAudit = () => {
        if (selectedRowKeys.length === 0) {
            return message.warning('请勾选需要审批的数据')
        }
        setAuditVisible(true)
    }
    const handleAudit = (params: any) => {
        const data = selectedRows.map((v: Obj) => ({ ...params, nodeCode: v.nextNode, id: v.id }))
        nurseHandBookService.multiHandleNodeNHR(data).then((res) => {
            setSelectedRowKeys([])
            setSelectedRows([])
            getTableData()
        });
    }
    /**初始化query columns，弹窗， 搜索组件，请求列表数据 */
    const init = async () => {
        // getDeptList()
        if (options.validateField && switchFn[options.validateField]) {
            switchFn[options.validateField]()
        }
    }

    useEffect(() => {
        init()
    }, [options])

    useFirstDisEffect(() => {
        getTableData()
    }, [query,model.statusChange])

    return (
        <Wrapper>
            {/*也是925版本，后边统一*/}
            <SelectCon {...{ query, setQuery, openCreate, title: options.name || '', formList, openAudit }} />
            <div className="main-contain">
                <div className="left">
                    {tableData.length < 1 &&
                        <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                               description={'创建一份' + (options.name || '')}/>}
                    {
                        tableData.map((it: any) => {
                            return (
                                <div
                                    className={it.id == planDatas.contentItem.id ? 'left-item active' : 'left-item'}
                                    key={it.id} onClick={() => {
                                    setCurrContent(it);
                                    // planDatas.contentItem = it;
                                    // planDatas.getDetail(it.id)
                                }}>
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
                                        <span className='fontsize-16'>{it.createName}</span><span
                                        style={{marginLeft: '8px'}}>{it.deptName}</span>
                                    </div>
                                    <p className='plan-left-time'>{it.createdTime}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    {
                        currContent?.id ?  <DetailNewIndex id={currContent.id}/>
                            :<Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={'选择左侧' + (options.name || '') + '或创建一份' + (options.name || '')}/>
                    }
                </div>
            </div>
            {/*  用925那边的弹窗，内容齐全 */}
            <addModal.Component />
            <AuditModal visible={auditVisible} onOkCb={handleAudit} selectedList={selectedRows} onCancel={() => setAuditVisible(false)} />
        </Wrapper>
    )
})

const Wrapper = styled.div`
  .main-contain {
    background-color: #fff;
    width: 100%;
    display: flex;
    height: calc(100vh - 95px);
    /* min-width: 1220px; */

    .left {
      width: 250px;
      /* overflow: hidden; */
      overflow-y: auto;
      border: 1px solid #ddd;
      box-sizing: border-box;
      /* padding: 5px; */

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
          /* color: #fff; */

          .plan-left-time {
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
  .right{
    flex: 1;
  }
  }

`