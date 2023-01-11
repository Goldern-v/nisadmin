import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import CommonLayout from '../../common/CommonLayout'
import {Button, DatePicker, Spin} from 'antd'
import moment from 'src/vendors/moment'
import BaseTable from 'src/components/BaseTable'
import {ColumnProps} from 'antd/lib/table'
import {BloodApi} from './api'
import {numberFormat} from 'src/utils/number/numberFormat';
import {fileDownload} from "src/utils/file/file";

const RangePicker = DatePicker.RangePicker

interface IQuery {
    startTime: string | any;
    endTime: string | any;
}

interface SummaryData {
    transfuseSum?: string;
    effectRate?: string;
    adverseEffectSum?: string;
}

export default observer(function BloodTransfusion() {
    const [query, setQuery] = useState<IQuery>({
        startTime: moment().subtract(30, "days").format("YYYY-MM-DD HH:mm"),
        endTime: moment().format('YYYY-MM-DD HH:mm'),
    })
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([] as any[])
    const [summaryData, setSummaryData] = useState<SummaryData>()

    interface IHeaderType {
        title: string;
        width: number;
        align: string;
        render?: (val: any, record: any, idx: number) => number;
        dataIndex: string;
    }

    const columns: ColumnProps<IHeaderType>[] = [
        {
            title: '序号',
            dataIndex: "",
            render: (text: any, record: any, index: number) => index + 1,
            align: "center",
            width: 50
        },
        {
            title: '科室名称',
            width: 150,
            dataIndex: 'deptName',
            align: 'center',
        },
        {
            title: '输血总人次',
            width: 100,
            dataIndex: 'transfuseSum',
            align: 'center',
        },
        {
            title: '发生输血不良反应人次',
            width: 140,
            dataIndex: 'adverseEffectSum',
            align: 'center',
        },

        {
            title: '发生输血不良反应率(%)',
            width: 140,
            dataIndex: 'effectRate',
            align: 'center',
            render: (text: any) => {
                return <span>{text}%</span>
            }
        },
    ]

    /**
     * 查询
     */
    const handleSearch = () => {
        getList()
    }

    /**
     * 导出excel
     */
    const exportTable = () => {
        let params = {
            startTime: query.startTime,
            endTime: query.endTime,
        }
        BloodApi.exportData(params).then((res: any) => {
            fileDownload(res);
        });
    }

    /**
     * 获取表格数据
     * @param startDateStr 开始时间
     * @param endDateStr 结束时间
     */
    const getList = (startDateStr?: string, endDateStr?: string) => {
        let params = {
            startTime: startDateStr || query.startTime,
            endTime: endDateStr || query.endTime,
        }
        setLoading(true)
        BloodApi.getCountSummary(params).then((res: any) => {
            if (res.code == 200) {
                setData(res.data.countDatas || [])
                setSummaryData(res.data.summaryData || {})
            }
        }).catch(() => {
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Wrapper>
            <CommonLayout
                header={<div>
                    <span>时间段：</span>
                    <RangePicker showTime={{format: "YYYY-MM-DD HH:mm"}}
                                 className="content-item"
                                 style={{width: 350}}
                                 value={[moment(query.startTime), moment(query.endTime)]}
                                 format="YYYY-MM-DD HH:mm"
                                 onOk={(payload: any) => {
                                     getList(payload[0].format('YYYY-MM-DD HH:mm'), payload[1].format('YYYY-MM-DD HH:mm'))
                                 }}
                                 onChange={(payload: any) => {
                                     setQuery({
                                         ...query,
                                         startTime: payload[0].format('YYYY-MM-DD HH:mm'),
                                         endTime: payload[1].format('YYYY-MM-DD HH:mm'),
                                     })
                                 }}
                                 allowClear={false}/>

                    <Button type="primary" onClick={handleSearch}>查询</Button>
                    <Button style={{marginLeft: '15px'}} onClick={exportTable}>导出</Button>

                </div>}
                body={
                    <Spin spinning={loading}>
                        <div className="main-title">患者输血情况统计</div>
                        {<BaseTable
                            rowClassName={(record, index) => {
                                if (Object.values(record).indexOf('汇总') > -1) {
                                    return 'fixedTr'
                                } else {
                                    if (index % 2 == 0) return 'singleRow'
                                    else return 'evenRow'
                                }

                            }}
                            bordered={false}
                            expandIconAsCell={false}
                            expandIconColumnIndex={-1}
                            surplusWidth={500}
                            surplusHeight={270}
                            columns={columns}
                            dataSource={data}
                        />}
                        {summaryData&&<FooterElement>
                            <div style={{marginLeft:"30px",width:'60px'}}>汇总</div>
                            <div style={{width:'60px'}}>全部科室</div>
                            <div style={{marginLeft:"30px",width:'60px'}}>{summaryData?.transfuseSum}</div>
                            <div style={{marginLeft:"30px",width:'60px'}}>{summaryData?.adverseEffectSum}</div>
                            <div style={{marginLeft:"30px",width:'60px'}}>{summaryData?.effectRate}%</div>
                        </FooterElement>}
                    </Spin>}
            />

        </Wrapper>
    )
})
const Wrapper = styled.div`
  .fixedTr {
    position: sticky;
    background-color: #ccc;
    font-size: 15px;
    z-index: 100000;
  }

  .singleRow, .evenRow {
    cursor: pointer;
  }

  .evenRow {
    background-color: rgba(247, 247, 247, 1);

  }

`
const FooterElement = styled.div`
  display: flex;
  min-width:1100px;
  justify-content: space-between;
  align-items: center;
  padding:15px;
  position: fixed;
  bottom:10px;
font-weight:bold;
  font-size:14px
  
`
