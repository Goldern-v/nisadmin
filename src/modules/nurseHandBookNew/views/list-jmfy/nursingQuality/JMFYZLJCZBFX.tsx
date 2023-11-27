import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button,  Icon, Table} from 'antd'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import { Select,  Input} from 'src/vendors/antd'
import {appStore, authStore} from 'src/stores'
import {observer} from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import { jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";

const {Option} = Select
const Quarter = [{name: '第一季度', code: 1}, {name: '第二季度', code: 2}, {
    name: '第三季度',
    code: 3
}, {name: '第四季度', code: 4}]

export interface Props {
    title?: string
    menuCode?: string
}

export default observer(function (props: Props) {
    const {title, menuCode} = props
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([]  as any)
    const [total, setTotal] = useState(0)
    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        year: moment(),
        pageSize: 20,
        menuCode: "",
        monitorContent: '',
        pageNum: 1,
        timeType: 1,
        month: moment().format('M'),
        quarter: moment().quarter()
    })

    let columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: '指标内容',
            dataIndex: 'monitorContent',
            align: 'center',
        },
        {
            title: '数据汇总',
            dataIndex: 'all',
            align: 'center',
            children: [
                {
                    title: '汇总',
                    dataIndex: 'summary',
                    align: 'center',
                    defaultSortOrder: 'descend',
                    sorter: (a: any, b: any) => a.summary - b.summary,
                },
                {
                    title: '同期数据',
                    dataIndex: 'sameTerm',
                    align: 'center',
                    defaultSortOrder: 'descend',
                    sorter: (a: any, b: any) => a.sameTerm - b.sameTerm,
                },
                {
                    title: '同比',
                    dataIndex: 'yoy',
                    align: 'center',
                    defaultSortOrder: 'descend',
                    sorter: (a: any, b: any) => a.yoy - b.yoy,
                    render: (text: any) => {
                        return <div style={{
                            position: "relative",
                            color:text > 0 ? 'green':'red'
                        }}>
                            {text}
                            {text > 0 ? <Icon style={{color: 'green'}} type='arrow-up'/> :
                                <Icon style={{color: 'red'}} type='arrow-down'/>}
                        </div>
                    }
                },
                {
                    title: '上期数据',
                    dataIndex: 'period',
                    align: 'center',
                    defaultSortOrder: 'descend',
                    sorter: (a: any, b: any) => a.period - b.period,
                },
                {
                    title: '环比',
                    dataIndex: 'qoq',
                    align: 'center',
                    defaultSortOrder: 'descend',
                    sorter: (a: any, b: any) => a.qoq - b.qoq,
                    render:(text:any)=>{
                        return <div style={{ color:text > 0 ? 'green':'red'}}>{text}</div>
                    }
                }
            ]
        }

    ]
    let newColumn:any=[
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title:'科室' ,
            dataIndex: 'deptName',
            align: 'center',
        },

     {
        title:(a:any,b:any,c:any)=>{
            console.log(a,b,c)
        } ,
         // ColumnGroupProps:()=>{},
        dataIndex: 'monitorContent',
        align: 'center',
         render(text:any, record:any) {
             console.log("record",record);
             return <span >{record.monitorContent}</span>
         },
        children: [
            {
                title: '汇总',
                dataIndex: 'summary',
                align: 'center',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.summary - b.summary,
                render:(text:any,record:any)=>{
                    return record[record.monitorContent].summary
                }
            },
            {
                title: '同期数据',
                dataIndex: 'sameTerm',
                align: 'center',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.sameTerm - b.sameTerm,
                render:(text:any,record:any)=>{
                    return record[record.monitorContent].sameTerm
                }
            },
            {
                title: '同比',
                dataIndex: 'sameTerm',
                align: 'center',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.yoy - b.yoy,
                render: (text: any) => {
                    return <div style={{
                        position: "relative",
                        color:text > 0 ? 'green':'red'
                    }}>
                        {text}
                        {text > 0 ? <Icon style={{color: 'green'}} type='arrow-up'/> :
                            <Icon style={{color: 'red'}} type='arrow-down'/>}
                    </div>
                }
            },
            {
                title: '上期数据',
                dataIndex: 'period',
                align: 'center',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.period - b.period,
                render:(text:any,record:any)=>{
                    return record[record.monitorContent].period
                }
            },
            {
                title: '环比',
                dataIndex: 'qoq',
                align: 'center',
                defaultSortOrder: 'descend',
                sorter: (a: any, b: any) => a.qoq - b.qoq,
                render:(text:any,record:any)=>{
                    return record[record.monitorContent].qoq
                }
                // render:(text:any)=>{
                //     return <div style={{ color:text > 0 ? 'green':'red'}}>{text}</div>
                // }
            }
        ]
    }

]
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getIndicatorsAnalysis({...query, year: query.year.format('YYYY')}).then((res: Obj) => {
            // if (res.data && res.data.length >= 1) {
            //     setDataSource(res.data)
            // }
    // let data =[{
    //     deptName:"呼吸与危重症医学科护理单元",
    //     monitorContent:'uuuuu',
    //     'uuuuu':{
    //         qoq:1,
    //         period:2,
    //         descend:3,
    //         sameTerm:4,
    //         summary:5
    //     }
    // },
    //     {
    //         deptName:"呼吸",
    //         monitorContent:'xxxx',
    //         'xxxx':{
    //             qoq:1,
    //             period:2,
    //             descend:3,
    //             sameTerm:4,
    //             summary:5
    //         }
    //     }]
            setDataSource(res.data||[])
            setTotal(res.data.totalCount)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    useEffect(() => {
        getData()
    }, [query])

    return (
        <Wrapper>
            <PageTitle>{title}</PageTitle>
            <WrapperHeard>
                <Place/>
                <Select value={query.timeType} onChange={(e: any) => {
                    setQuery({...query, timeType: e})
                }}>
                    {
                        [{name: "按月度", code: 1}, {name: '按季度', code: 2}, {name: '按年度', code: 3}].map(v => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                        ))
                    }</Select>
                <span className='label'>日期:</span>
                <YearPicker value={query.year} onChange={(e: any) => {
                    setQuery({...query, year: e})
                }}/>
                {query.timeType == 2 && <Select value={query.quarter} onChange={(e: any) => {
                    setQuery({...query, quarter: e})
                }}>
                    {
                        Quarter.map(v => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                        ))
                    }</Select>}
                {query.timeType == 1 && <Select value={query.month} onChange={(e: any) => {
                    setQuery({...query, quarter: e})
                }}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(v => (
                            <Option key={v} value={v}>{v}月</Option>
                        ))
                    }</Select>}
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
                <Select value={query.menuCode} onChange={(e: any) => {
                    setQuery({...query, menuCode: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        model.menuList.map((v: any) => (
                            <Option key={v.menuCode} value={v.menuCode}>{v.name}</Option>
                        ))
                    }
                </Select>
                <span className='label'>指标名称:</span>
                <Input
                    placeholder='请输入指标名称'
                    style={{width: '120px'}} value={query.monitorContent} onChange={(e: any) => {
                    setQuery({...query, year: e.target.value})
                }}/>
                <Button>导出</Button>
            </WrapperHeard>
            <div style={{
                padding: '15px 20px'
            }}>
                <Table
                    pagination={false}
                    bordered={true}
                    loading={pageLoading} columns={columns} dataSource={dataSource}/>
                {/*<BaseTable*/}
                {/*    loading={pageLoading}*/}
                {/*    dataSource={dataSource}*/}
                {/*    columns={columns}*/}
                {/*    surplusHeight={220}*/}
                {/*    wrapperStyle={{margin: '0 15px'}}*/}
                {/*    type={['index']}*/}
                {/*/>*/}
            </div>
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