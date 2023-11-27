import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import {Select, Input} from 'src/vendors/antd'
import { authStore} from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import { jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";

const {Option} = Select

export interface Props {
    title?: string
    menuCode?: string
}

export default observer(function (props: Props) {
    const {title, menuCode} = props
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [menuList, setMenuList] = useState([])
    const [total, setTotal] = useState(0)
    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        year: moment(),
        pageSize: 20,
        menuCode: "",
        monitorContent: '',
        assortName:"",
        pageNum: 1,
    })

    let columns: any = [

        {
            title: '分类',
            dataIndex: 'assortName',
            width: 100,
            align: 'center',
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 150,
            align: 'center'
        },
        {
            title: '指标名称',
            dataIndex: 'monitorContent',
            width: 100,
            align: 'center'
        },
        {
            title: '目标值',
            dataIndex: 'finalValue',
            width: 80,
            align: 'center'
        },

        {
            title: '1月',
            dataIndex: 'month1',
            width: 60,
            align: 'center'
        },

        {
            title: '2月',
            dataIndex: 'month2',
            width: 60,
            align: 'center'
        },
        {
            title: '3月',
            dataIndex: 'month3',
            width: 60,
            align: 'center'
        },
        {
            title: '4月',
            dataIndex: 'month4',
            width: 60,
            align: 'center'
        },
        {
            title: '5月',
            dataIndex: 'month5',
            width: 60,
            align: 'center'
        },
        {
            title: '6月',
            dataIndex: 'month6',
            width: 60,
            align: 'center'
        },
        {
            title: '7月',
            dataIndex: 'month7',
            width: 60,
            align: 'center'
        },
        {
            title: '8月',
            dataIndex: 'month8',
            width: 60,
            align: 'center'
        },
        {
            title: '9月',
            dataIndex: 'month9',
            width: 60,
            align: 'center'
        },
        {
            title: '10月',
            dataIndex: 'month10',
            width: 60,
            align: 'center'
        },
        {
            title: '11月',
            dataIndex: 'month11',
            width: 60,
            align: 'center'
        },
        {
            title: '12月',
            dataIndex: 'month12',
            width: 60,
            align: 'center'
        },
        {
            title: '均值(年)',
            width: 100,
            dataIndex: 'qualified',
            align: 'center'
        }
    ]
    const getMenuCode = () => {
        nurseHandBookService.getFormList().then(res => {
            setMenuList(res.data)
        })
    }
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getIndicatorsSummary({...query, year: query.year.format('YYYY')}).then((res: Obj) => {
            setDataSource(res.data.list||[])
            setTotal(res.data.totalCount)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    useEffect(() => {
        getData()
    }, [query])
    // useEffect(() => {
    //     if(menuCode){
    //         getMenuCode()
    //     }
    // }, [menuCode])
    return (
        <Wrapper>
            <WrapperHeard>
                <PageTitle>{title}</PageTitle>
                <Place/>
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

                <span className='label'>年份:</span>
                <YearPicker value={query.year} onChange={(e: any) => {
                    setQuery({...query, year: e})
                }}/>
                <span className='label'>分类:</span>
                <Select value={query.assortName} onChange={(e: any) => {
                    setQuery({...query, assortName: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        model.menuList.map((v:any) => (
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
            </WrapperHeard>
            <BaseTable
                loading={pageLoading}
                dataSource={dataSource}
                columns={columns}
                surplusHeight={220}
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