import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import {
    Select,
    DatePicker,
    Button,
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable from "src/components/BaseTable";
import {RectificationData} from './Data';
import {quarterList} from 'src/enums/date';
import YearMonthRangePicker from 'src/components/YearMonthRangePicker';
import {Input, message} from 'antd';
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";

const Option = Select.Option;
export default observer(function RectificationSummary() {
    const [yearPickShow, setYearPickShow] = useState(false);
    // const [columns,setColumns]=useState([] as any)
    const mergeCells = (text: string, data: any, key: string, index: number) => {
        if (text == '') {
            // 没有code值的时候
            return 1
        }
        if (index !== 0 && text === data[index - 1][key]) {
            return 0
        }
        let rowSpan = 1

        for (let i = index + 1; i < data.length; i++) {
            if (text !== data[i][key]) {
                break;
            }
            rowSpan++
        }
        return rowSpan
    }
    // 动态合并单元格
    const columns: any = [
        {
            title: '项目名称',
            dataIndex: 'masterQcName',
            align: 'center',
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: `${value}(检查时间:${row.masterEvalDate} 检查人员:${row.masterCreatorName})`,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.masterQcCode, RectificationData.tableList, 'masterQcCode', index)
                return obj
            }
        },
        {
            title: '项目合格率',
            dataIndex: 'masterEvalRate',
            align: 'center',
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: `${value}%`,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.masterQcCode, RectificationData.tableList, 'masterQcCode', index)
                return obj
            }
        },
        {
            title: '一级指标合格率',
            dataIndex: 'firstLevelEvalRate',
            align: 'center',
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: `${value}%`,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.firstLevelItemCode, RectificationData.tableList, 'firstLevelItemCode', index)
                return obj
            }
        },
        {
            title: "所属二级指标",
            dataIndex: "secondLevelItemName",
            align: "center",
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: value,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.secondLevelItemCode, RectificationData.tableList, 'secondLevelItemCode', index)
                return obj
            }
        },
        {
            title: "存在问题",
            dataIndex: "remark",
            align: "center",
        },
        // rectificationMeasure 整改措施   trackingEvaluate 追踪评价
        {
            title: "科室整改措施",
            dataIndex: "rectificationMeasure.content",
            align: "center",
            render: (text: string, record: any) => {
                return <Input key={record.qcMasterId + 're'}  className='input-value' defaultValue={text}
                              onBlur={(e: any) => handleChange(e.target.value, record, 3)}/>
            }
        },
        {
            title: "追踪评价",
            dataIndex: "trackingEvaluate.content",
            align: "center",
            width: 80,
            render: (text: string, record: any) => {
                return <Input key={record.qcMasterId + 'tr'} className='input-value' defaultValue={text}
                              onBlur={(e: any) => handleChange(e.target.value, record, 5)}/>
            }
        },
    ]
    /** "id": 0,  没有就不传
     "qcMasterId": 0,  必传
     "qcItemCode": "string",  必传
     "type":  3：整改措施  5：追踪评价
     "content": "string"***/
    const handleChange = (value: string, record: any, type: number) => {
        if (!value) return

        let arr: any = []
        arr.push({
            content: value,
            id: type == 3 ? record.rectificationMeasure?.id : record.trackingEvaluate?.id,
            qcMasterId: record.qcMasterId,
            qcItemCode: record.qcItemCode,
            type
        })
        RectificationData.tableLoading = true
        qcZzwyApi.saveOrUpdateContent({contentList: arr}).then((res: any) => {
            message.success('操作成功')
            RectificationData.getTableList()
        }).finally(() => {
            RectificationData.tableLoading = false
        })
    }
    useEffect(() => {
        RectificationData.getTableList()
        RectificationData.getNursingAll()
    }, [])
    return (
        <Wrapper>
            <PageHeader>
                <PageTitle>质控检查反馈整改单</PageTitle>
                <Place/>
                <span>科室：</span>
                <Select className="mr-15"
                        labelInValue
                        style={{width: 180}}
                        value={{key: RectificationData.deptCode}}
                        onChange={(val: any) => {
                            RectificationData.deptCode = val.key
                            RectificationData.deptName = val.label
                        }}
                >
                    <Option value='全院'>全院</Option>
                    {RectificationData.deptList.map((item: any) => {
                        return <Option value={item.code} key={item.code}>{item.name}</Option>
                    })}
                </Select>
                <span>类型：</span>
                <Select className="mr-15"
                        style={{width: 100}}
                        value={RectificationData.selectType}
                        onChange={(val: any) => {
                            RectificationData.selectType = val
                        }}
                >
                    {RectificationData.typeList.map((item: any) => {
                        return <Option value={item.type} key={item.type}>{item.title}</Option>
                    })}
                </Select>

                {RectificationData.selectType == '4' && <><span>日期：</span>
                    <DatePicker.RangePicker
                        allowClear={false}
                        format={'YYYY-MM-DD'}
                        value={RectificationData.filterDate}
                        onChange={(value) => {
                            RectificationData.filterDate = value
                        }}
                        style={{width: 220}}
                    /></>}
                {RectificationData.selectType == '1' && <>
                    <span>月份：</span>
                    <YearMonthRangePicker widthPx={180} value={RectificationData.monthRange} onChange={(val: any) => {
                        RectificationData.monthRange = val
                    }}/>
                </>}
                {(RectificationData.selectType == '3' || RectificationData.selectType == '2') && <>
                    <span>年份：</span>
                    <DatePicker className="mr-15"
                                open={yearPickShow}
                                onOpenChange={status => {
                                    setYearPickShow(status)
                                }}
                                onPanelChange={(value, mode) => {
                                    RectificationData.year = value
                                    setYearPickShow(false)
                                }}
                                mode="year"
                                style={{width: 120}}
                                value={RectificationData.year}
                                allowClear={true}
                                placeholder='选择年份'
                                format="YYYY"
                    />
                </>}
                {RectificationData.selectType == '2' && <>
                    <span>季度：</span>
                    <Select className="mr-15"
                            style={{width: 100}}
                            defaultValue={moment().quarter()}
                            onChange={(val: any) => {
                                RectificationData.selectQuarter = val
                            }}
                    >
                        {

                            quarterList.map((v: any, i: number) => (
                                <Option key={i} value={i + 1}>{v}</Option>
                            ))
                        }
                    </Select>
                </>}

                <Button
                    className="span"
                    onClick={() => RectificationData.getTableList()}>
                    查询
                </Button>
            </PageHeader>
            <ScrollCon>
                <BaseTable
                    className="record-page-table"
                    loading={RectificationData.tableLoading}
                    dataSource={RectificationData.tableList}
                    columns={columns}
                    surplusWidth={300}
                    surplusHeight={220}
                />
            </ScrollCon>
        </Wrapper>
    )
})
const Wrapper = styled.div`
  .mr-15 {
    margin-right: 15px;
  }
`
const ScrollCon = styled.div`
  flex: 1;

  .input-value {
    outline: none;
    border: 0;
    box-shadow: none;

    :focus {
      border: 0;
      box-shadow: none;
    }
  }
`;