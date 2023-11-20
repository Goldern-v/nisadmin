import {observer} from 'mobx-react'
import React, {useEffect, useRef, useState} from 'react'
import {PageContainer} from 'src/components/common'
import {Obj} from 'src/libs/types'
import styled from 'styled-components'
import {appStore, authStore} from 'src/stores'
import BaseTable, {DoCon} from 'src/components/BaseTable'
import moment from 'moment'
import {currentMonth} from 'src/utils/date/rangeMethod'
import {nurseHandBookService} from '../../services/NurseHandBookService'
import SelectCon from './components/SelectCon'
import AddModal from './components/addModal'
import createModal from 'src/libs/createModal'
import useFirstDisEffect from 'src/hooks/useFirstDisEffect'
import {message, Modal} from 'antd'
import {HALF_YEAR, STATUS_LIST, QuarterV} from '../list-jew/utils/enums'
import {formatTitle} from '../detail-lyrm/config'
import AuditModal from './components/auditModal'
import {nurseHandbookRecordModel as model} from '../detail-jew/model'
import {fileDownload} from "src/utils/file/file";
import PersonnelColumn from "src/modules/nurseHandBookNew/views/list-jmfy/personnelColumn";
import SummaryIndex from "src/modules/nurseHandBookNew/views/list-jmfy/nursingQuality/summaryIndex";
import JMFYZLJCZBWH from './nursingQuality/JMFYZLJCZBWH'

export interface Props {
    options: Obj
}

const Quarter = {'第一季度': 1, '第二季度': 2, '第三季度': 3, '第四季度': 4}
export default observer(function (props: Props) {
    const {options} = props
    const tableRef = useRef<any>(null)
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
    const [tableData, setTableData] = useState([])
    const [columns, setColumns] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [formList, setFormList] = useState<Obj[]>([])
    const [selectedRows, setSelectedRows] = useState<Obj[]>([])
    const [auditVisible, setAuditVisible] = useState(false)
    const rowSelection = {
        selectedRowKeys,
        getCheckboxProps: (record: Obj) => ({
            disabled: record.status !== 1, // Column configuration not to be checked
            name: record.name,
        }),
        onChange: (keys: any, rows: any) => {
            setSelectedRows(rows)
            setSelectedRowKeys(keys)
        }
    }
    const getHalfYear = () => {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1; // JavaScript 中月份从 0 开始，所以需要加 1
        return currentMonth >= 1 && currentMonth <= 6 ? '上半年' : '下半年'
    }
    const defColumns: any[] = [
        {
            title: '序号',
            align: 'center',
            dataIndex: '',
            render: (text: string, row: Obj, index: number) => index + 1,
        },
        {
            title: '标题',
            align: 'center',
            dataIndex: 'title',
            render: (text: string, record: any) => {
                return (record.year ? record.year + '年' : "") + (record.month ? record.month + '月' : "") + record.title
            }
        },

        options.isAudit ? {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            render(text: number, row: Obj) {
                const cur = STATUS_LIST.find(v => v.value === text)
                return <span style={{color: cur?.color}}>{cur?.label || row.statusDesc}</span>
            }
        } : {},
        // ...appStore.hisMatch({
        //   map:{
        //     'qhwy':[],
        //     other:[{
        //       title: '状态',
        //       align: 'center',
        //       dataIndex: 'status',
        //       render(text: number, row: Obj) {
        //         const cur = STATUS_LIST.find(v => v.value === text)
        //         return <span style={{ color: cur?.color }}>{cur?.label || row.statusDesc}</span>
        //       }
        //     },]
        //   }
        // }),

        {
            title: '科室',
            align: 'center',
            dataIndex: 'deptName'
        },
        ...columns,
        {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdTime'
        },
        {
            title: '创建人',
            align: 'center',
            dataIndex: 'empName'
        },
        {
            title: '操作',
            align: 'center',
            render: (text: string, row: Obj) => {
                return (
                    <DoCon>
                        <span
                            onClick={() => appStore.history.push(`/nurseHandBookNewForm/detail?id=${row.id}&menuCode=${row.menuCode}&type=${row?.type}`)}>查看</span>
                        <span onClick={() => {
                            onDel(row.id)
                        }}>删除</span>
                    </DoCon>
                )
            }
        },
    ]
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
                menuCode: ''
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                menuCode: ''
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
                year: moment()
            })
            setAddQuery({
                ...addQuery,
                year: moment()
            })
            const newColumns = [
                {
                    title: '年份',
                    align: 'center',
                    dataIndex: 'year'
                },
                // {
                //   title: '标题',
                //   align: 'center',
                //   dataIndex: 'title'
                // }
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
            })
            setAddQuery({
                ...addQuery,
                startTime,
                endTime,
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
        month_no_create_more: () => {
            setQuery({
                ...query,
                year: moment(),
                month: moment().format('M'),
                menuCode: options.showType == 'childList' ? '' : undefined,  //针对925月报配置显示配置表
            })
            setAddQuery({
                ...addQuery,
                year: moment(),
                month: moment().format('M'),
                menuCode: options.showType == 'childList' ? '' : undefined,//针对925月报配置显示配置表

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
        no_validate_create_more: () => {
            setQuery({
                ...query,
            })
            setAddQuery({
                ...addQuery,
                coverCode: "925SCFM_1",
            })
            // const newColumns = [
            //   {
            //     title: '',
            //     align: 'center',
            //     dataIndex: 'title',
            //     render: (text: string) => {
            //       return `${text}`
            //     }
            //   },
            // ]
            // setColumns(newColumns)
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
            const newColumns = [
                {
                    title: '年度',
                    align: 'center',
                    dataIndex: 'halfYear',
                    render: (text: any) => {
                        return {'1': '下半年', '0': '上半年', '2': "全年"}[text]
                    }
                },
            ]
            setColumns(newColumns)
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
        if (params.hasOwnProperty('halfYear')) {
            params.halfYear = HALF_YEAR[params.halfYear]
        }
        const data: Obj = {...params}
        if (!params.menuCode) {
            data.menuCode = menuCode
        }
        title && (data.title = title)

        nurseHandBookService.createOrUpdate(data).then(res => {
            if (res.code === '200') {
                const {id} = res.data
                // let link =params.url?`/nurseHandBookNewForm/detail?id=${id}&url=${params.url}&menuCode=${options.menuCode}`:`/nurseHandBookNewForm/detail?id=${id}&menuCode=${options.menuCode}`
                appStore.history.push(`/nurseHandBookNewForm/detail?id=${id}&menuCode=${options.menuCode}&type=${params?.type}`)
            }
        })
    }
    const openCreate = () => {
        addModal.show({
            onOkCb: onOkBAdd,
            formList,
            addQuery,
            menuCode: options?.menuCode
        })
    }

    // const getDeptList = async () => {
    //   return commonApi.getNursingUnitSelf().then((res: Obj) => {
    //     setDeptList(res.data.deptList)
    //     return { deptCode: res.data.defaultDept }
    //   })
    // }
    const getTableData = () => {
        const {menuCode} = options
        setLoading(true)
        const params = {...query}
        if (!params.menuCode) params.menuCode = menuCode
        if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
        if (params.hasOwnProperty('startTime')) {
            const {startTime, endTime} = params
            params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
            params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
        }
        if (params.hasOwnProperty('quarter')) {
            params.quarter = Quarter[params.quarter]
        }
        if (params.hasOwnProperty('halfYear')) {
            console.log(params.halfYear);
            params.halfYear = params.halfYear === '上半年' ? 0 : 1
        }
        nurseHandBookService.getTableDataList(params).then((res: Obj) => {
            setTableData(res.data.list || [])
            setTotal(res.data.totalCount)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    const onDel = (id: string) => {
        Modal.confirm({
            title: '删除',
            content: '确认删除该表单？',
            onOk: () => {
                nurseHandBookService.delNHR({id}).then(res => {
                    if (res.code === '200') {
                        message.success('删除成功')
                        getTableData()
                    }
                })
            }
        })
    }
    /**根据menuCode获取表单 */
    const getFormList = () => {
        const {menuCode} = options
        nurseHandBookService.getFormListNHR({menuCode}).then(res => {
            setFormList(res.data || [])
            model.formListMenu = res.data || []
        })
    }
    /**isAudit 为ture才能审核**/
    const openAudit = () => {
        if (options?.isAudit) {
            if (selectedRowKeys.length === 0) {
                return message.warning('请勾选需要审批的数据')
            }
            setAuditVisible(true)
        }
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
    /****/
    const openImport = () => {
        const params = {
            title: options.name,
            nurseHandbookRecords: selectedRowKeys.length === 0 ? tableData : selectedRows
        }
        nurseHandBookService.nurseRecordExport(params).then((res: any) => {
            fileDownload(res)
        })
    }

    useEffect(() => {
        init()
    }, [options])

    useFirstDisEffect(() => {
        if(!['JMFYHLRYYLB','JMFYZLJCZBHZ','JMFYZLJCZBWH'].includes(options.menuCode)){
            getTableData()
        }
    }, [query])
    const getElement = () => {
        switch (options.menuCode) {
            case 'JMFYHLRYYLB':
                return <PersonnelColumn title={options.name || ''}/>;
            case 'JMFYZLJCZBHZ':
                return <SummaryIndex menuCode={options.menuCode} title={options.name || ''}/>;
            case   'JMFYZLJCZBWH':
                return  <JMFYZLJCZBWH menuCode={options.menuCode} title={options.name || ''}/>
            default :
                return <>
                    <SelectCon {...{
                        query, setQuery, openCreate, title: options.name || '', formList, openAudit, openImport,

                    }} isAudit={options.isAudit}/>
                    <PageContainer ref={tableRef}>
                        <BaseTable
                            surplusHeight={250}
                            dataSource={tableData}
                            columns={defColumns.filter((item: any) => item.title)}
                            rowSelection={options.isAudit ? rowSelection : undefined}
                            loading={loading}
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
                    </PageContainer>
                </>
        }
    }
    return (
        <Wrapper>
            {getElement()}
            <addModal.Component/>
            <AuditModal visible={auditVisible} onOkCb={handleAudit} selectedList={selectedRows}
                        onCancel={() => setAuditVisible(false)}/>
        </Wrapper>
    )
})

const Wrapper = styled.div`

`