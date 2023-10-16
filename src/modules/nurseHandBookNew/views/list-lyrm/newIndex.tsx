import {observer} from 'mobx-react'
import React, {useEffect, useMemo, useState} from 'react'
import {Obj} from 'src/libs/types'
import styled from 'styled-components'
import {appStore, authStore} from 'src/stores'
import moment from 'moment'
import {currentMonth, currentYear} from 'src/utils/date/rangeMethod'
import {nurseHandBookService} from '../../services/NurseHandBookService'
import SelectCon from '../list-jew/components/SelectCon'
import AddModal from '../list-jew/components/addModal'
import createModal from 'src/libs/createModal'
import useFirstDisEffect from 'src/hooks/useFirstDisEffect'
import {message, Tabs, Spin, Button, Select, DatePicker} from 'antd'
import {formatTitle} from '../detail-lyrm/config'
import AuditModal from './components/auditModal'
import {Badge, Empty} from "src/vendors/antd";
import DetailNewIndex from '../detail-lyrm/newIndex'
import {nurseHandbookRecordModel as model} from '../detail-lyrm/newModel'
import {HALF_YEAR} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";
import LYHZSC_7 from '../detail-lyrm/components/LYHZSC_4/LYHZSC_7'
import {PageHeader, PageTitle} from "src/components/common";
import LYHZSC_8 from "src/modules/nurseHandBookNew/views/detail-lyrm/components/LYHZSC_4/LYHZSC_8";

const Quarter = {'第一季度': 1, '第二季度': 2, '第三季度': 3, '第四季度': 4}
const QuarterV = {1: '第一季度', 2: '第二季度', 3: '第三季度', 4: '第四季度'}
const {TabPane} = Tabs
const {Option} = Select

export interface Props {
    options: Obj
}

/** 29张表的菜单页，by临邑 */
export default observer(function (props: Props) {
    const {options} = props
    const [startTime, endTime] = currentYear()
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
    // LYHZSC_8 登记表搜索参数
    const [lyhzscQuery, setLyhzscQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        startTime,
        endTime
    })
    /** 创建弹窗参数
     */
    const [addQuery, setAddQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
    })
    // const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState([])
    // const [columns, setColumns] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [formList, setFormList] = useState<Obj[]>([])
    const [selectedRows, setSelectedRows] = useState<Obj[]>([])
    const [auditVisible, setAuditVisible] = useState(false)
    const getHalfYear = () => {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1; // JavaScript 中月份从 0 开始，所以需要加 1
        return currentMonth >= 1 && currentMonth <= 6 ? '上半年' : '下半年'
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
            getFormList()
        },
        year_no_create_more: () => {
            setQuery({
                ...query,
                menuCode: options.menuCode === '925NDBRDJ_7' ? '' : undefined,
                year: moment()
            })
            setAddQuery({
                ...addQuery,
                menuCode: options.menuCode === '925NDBRDJ_7' ? '' : undefined,
                year: moment()
            })
            getFormList()
        },
        start_end_time_create_more: () => {
            const [startTime, endTime] = currentMonth()
            setQuery({
                ...query,
                startTime,
                endTime,
                // menuCode: '',
            })
            setAddQuery({
                ...addQuery,
                startTime,
                endTime,
                // menuCode: '',
            })
            getFormList()
        },
        month_no_create_more: () => {
            setQuery({
                ...query,
                year: moment(),
                month: '',
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                month: moment().format('M'),
            })

            getFormList()
        },
        quarter_not_more: () => {
            setQuery({
                ...query,
                year: moment(),
                quarter: QuarterV[moment().quarter()],
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                quarter: QuarterV[moment().quarter()],
            })
            getFormList()
        },
        no_validate_create_more: () => {
            setQuery({
                ...query,
            })
            setAddQuery({
                ...addQuery,
                code: "no_validate_create_more",
            })
            getFormList()
        },
        half_year_not_more: () => {
            setQuery({
                ...query,
                year: moment(),
                halfYear: getHalfYear()
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                halfYear: getHalfYear()
            })
            getFormList()
        },
        time_create_more: () => {
            const [startTime] = currentMonth()
            setQuery({
                ...query,
                time: startTime
            })
            setAddQuery({
                ...addQuery,
                time: startTime
            })
            getFormList()
        },
        time_no_create_more: () => {
            const [startTime] = currentMonth()
            setQuery({
                ...query,
                time: startTime
            })
            setAddQuery({
                ...addQuery,
                time: startTime
            })
            getFormList()
        },
    }

    const onOkBAdd = (params: Obj) => {
        const {menuCode} = options
        const title = formatTitle(params, options)
        const data: Obj = {...params}
        if (!params.menuCode) {
            data.menuCode = menuCode
        }
        title && (data.title = title)
        nurseHandBookService.createOrUpdate(data).then(res => {
            if (res.code === '200') {
                const {id} = res.data
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


    const getTableData = (key: string = '1') => {
        const {menuCode} = options
        setLoading(true)
        const params = {...query,}
        if (!params.menuCode) params.menuCode = menuCode
        if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
        if (params.hasOwnProperty('startTime')) {
            const {startTime, endTime} = params
            params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
            params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
        }
        if (params.hasOwnProperty('halfYear')) {
            params.halfYear = HALF_YEAR[params.halfYear]
        }
        if (params.hasOwnProperty('quarter')) params.quarter = Quarter[params.quarter]
        /**我的计划不用传工号**/
        if (key == '1') {
            params['createdBy'] = authStore.user?.empNo
        }
        nurseHandBookService.getTableDataList({
            ...params,
        }).then((res: Obj) => {
            const { list } =res.data
            setTableData(list)
            setCurrContent(list[0])
            // setTotal(res.data.totalCount)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    /**根据menuCode获取表单 */
    const getFormList = () => {
        const {menuCode} = options
        nurseHandBookService.getFormListNHR({menuCode}).then(res => {
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
        const data = selectedRows.map((v: Obj) => ({...params, nodeCode: v.nextNode, id: v.id}))
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

    const callback = (key: string) => {
        getTableData(key)
    }
    const onResetQuery = () => {
        const [startTime, endTime] = currentMonth()
        if (query.year) query.year = moment()
        if (query.startTime) query.startTime = startTime
        if (query.endTime) query.endTime = endTime
        if (query.month) query.month = ''
        if (query.quarter) query.quarter = QuarterV[moment().quarter()]
        if (query.halfYear) query.halfYear = getHalfYear()
        if (query.time) query.time = startTime
        if (query.menuCode) query.menuCode = ''
        setQuery({
            ...query,
            deptCode: authStore.defaultDeptCode,
            status: '',
            pageSize: 20,
            pageNum: 1,
        })

    }
    const menuElement = () => {
        switch (options.menuCode) {
            case 'LYHZSC_7':
                return <LYHZSC_7/>;
            case 'LYHZSC_8':
                return <LYHZSC_8
                    startTime={lyhzscQuery.startTime}
                    endTime={lyhzscQuery.endTime}
                    deptCode={lyhzscQuery.deptCode}/>;
            default :
                return <div className="main-contain">
                    <div className="left">
                        {authStore.isDepartment && <Tabs defaultActiveKey="1" className='sticky' onChange={callback}>
                            <TabPane tab={options.menuCode === 'LYHZSC_4_1' ? '我的指标'  : '我的计划'} key="1">
                            </TabPane>
                            <TabPane tab={ options.menuCode === 'LYHZSC_4_1' ? '全院指标' : '全院计划'} key="2">
                            </TabPane>
                        </Tabs>}

                        {tableData.length < 1 &&
                            <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                                   description={'创建一份' + (options.name || '')}/>}
                        {
                            tableData.map((it: any) => {
                                return (
                                    <div
                                        className={it.id == currContent?.id ? 'left-item active' : 'left-item'}
                                        key={it.id} onClick={() => {
                                        setCurrContent(it);
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
                                            <span
                                                className='fontsize-16'>{it.createName}</span><span>{it.deptName}</span>
                                        </div>
                                        <p className='plan-left-time'>{it.createdTime}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='right'>
                        {
                            currContent?.id ? <DetailNewIndex id={currContent.id}/>
                                :
                                <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}
                                       description={'选择左侧' + (options.name || '') + '或创建一份' + (options.name || '')}/>
                        }
                    </div>
                </div>
        }
    }
    const selectConElement =() => {
        switch (options.menuCode) {
            case 'LYHZSC_7':
                return <WrapperLYHZSC_7>
                    <PageTitle>{options.name || ''}</PageTitle>
                    <Button onClick={model.onPrint}>导出Pdf</Button>
                    <Button type={'primary'} onClick={model.handleSaveNotice}>保存</Button>
                </WrapperLYHZSC_7>;
            case 'LYHZSC_8':
                return <WrapperLYHZSC_7>
                    <PageTitle>{options.name || ''}</PageTitle>
                    <span className='label'>科室:</span>
                    <Select value={lyhzscQuery.deptCode} onChange={(e: any) => {
                        setLyhzscQuery({
                            ...lyhzscQuery,
                            ['deptCode']: e
                        })
                    }}>
                        <Option key={0} value={''}>全部</Option>
                        {
                            authStore.deptList.map(v => (
                                <Option key={v.code} value={v.code}>{v.name}</Option>
                            ))
                        }</Select>
                    <span className='label'>调入时间:</span>
                    <DatePicker.RangePicker format={'YYYY-MM-DD'}
                                            onChange={(e: any) => {
                                                const [d1, d2] = e
                                                setLyhzscQuery({
                                                    ...lyhzscQuery,
                                                    startTime: d1 ? d1 : null,
                                                    endTime: d2 ? d2 : null,
                                                })
                                            }}
                                            value={[lyhzscQuery.startTime, lyhzscQuery.endTime]}
                    />
                </WrapperLYHZSC_7>;
            default:
                return <SelectCon {...{
                    query,
                    setQuery,
                    onResetQuery,
                    openCreate,
                    title: options.name || '',
                    formList,
                    openAudit
                }}/>

        }
    }
    useEffect(() => {
        init()
        model.isNotice = options.menuCode === 'LYHZSC_4_1'
    }, [options])

    useFirstDisEffect(() => {
        getTableData()
    }, [query, model.statusChange])
    return (
        <Wrapper>
            {/*也是925版本，后边统一*/}
            {/*  头部内容 */}
            {selectConElement()}
            {/*   护士长手册内容 */}
            <Spin spinning={loading}>
                {menuElement()}
            </Spin>
            {/*  用925那边的弹窗，内容齐全 */}
            <addModal.Component/>
            <AuditModal visible={auditVisible} onOkCb={handleAudit} selectedList={selectedRows}
                        onCancel={() => setAuditVisible(false)}/>
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

    .right {
      flex: 1;
    }
  }

`
const WrapperLYHZSC_7: any = styled(PageHeader)`
`