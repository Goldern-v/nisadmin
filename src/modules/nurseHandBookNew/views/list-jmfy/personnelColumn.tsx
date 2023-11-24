import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button, Row, Col} from 'antd'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import {DatePicker, Select, PaginationConfig, Modal, message, Input} from 'src/vendors/antd'
import {appStore, authStore} from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import {DoCon} from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import moment from "moment";
import YearPicker from "src/components/YearPicker";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";

const {Option} = Select

export interface Props {
    title?: string
}

export default observer(function (props: Props) {
    const {title} = props
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        year: moment(),
        pageSize: 20,
        pageNum: 1,
    })

    let columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'deptName',
            width: 100,
            align: 'center'
        },
        {
            title: '年龄',
            dataIndex: 'createTime',
            width: 70,
            align: 'center'
        },
        {
            title: '学历',
            dataIndex: 'creatorName',
            width: 60,
            align: 'center'
        },
        {
            title: '在岗情况',
            dataIndex: 'creatorName',
            align: 'center',
            children: [
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
            ]
        },
    ]
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getStaffList({...query, year: query.year.format('YYYY')}).then((res: Obj) => {
            setDataSource(res.list)
            setTotal(res.totalCount)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    useEffect(() => {
        getData()
    }, [query])
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

                <span className='label'>入院时间:</span>
                <YearPicker value={query.year} onChange={(e: any) => {
                    setQuery({...query, year: e})
                }}/>
            </WrapperHeard>
            <BaseTable
                loading={pageLoading}
                dataSource={dataSource}
                columns={columns}
                wrapperStyle={{margin: '0 15px'}}
                type={['index']}
                surplusHeight={280}
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
    .heard{
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