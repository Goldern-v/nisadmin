import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import {
    Select,
    DatePicker,
    Button,
} from "src/vendors/antd";
import BaseTable, {DoCon} from "src/components/BaseTable";
import {QuarterlyZzwyData} from './Data';
import DeptSelect from "src/components/DeptSelect";
import QcQuarterlyModal from './components/AddModal'
import createModal from "src/libs/createModal";
import {appStore} from "src/stores";
import {globalModal} from "src/global/globalModal";

const Option = Select.Option;
export default observer(function QuarterlyAnalysisReportZzwy() {
    const {queryObj} = appStore
    const qcLevel = queryObj.qcLevel || '3'
    console.log("qcLevel===", qcLevel);
    let QcQuarterly = createModal(QcQuarterlyModal)
    const columns: any = [
        {
            title: "序号",
            dataIndex: 'index',
            align: 'center',
            width: 40,
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: '报告名称',
            dataIndex: 'reportName',
            align: 'center',
            // render:(text:string,record:any)=> `${record.reportYear}`

        },
        {
            title: '表单',
            dataIndex: 'summaryFormName',
            align: 'center',

        },
        {
            title: '科室',
            dataIndex: 'wardName',
            align: 'center',

        },
        {
            title: "报告年份",
            dataIndex: "reportYear",
            align: "center",

        },
        {
            title: "时间",
            dataIndex: "reportMonth",
            align: "center",
        },
        {
            title: "创建人",
            dataIndex: "creatorName",
            align: "center",

        },
        {
            title: "创建时间",
            dataIndex: "creatorTime",
            align: "center",
            width: 80,
        },
        {
            title: " 操作 ",
            width: 80,
            render(text: string, record: any, index: number) {
                return (
                    <DoCon>
                        <span onClick={() => handleReview(record)}>查看</span>
                        <span
                            onClick={() => {
                                globalModal
                                    .confirm("删除确认", "你确定删除该数据吗？")
                                    .then(res => {
                                        QuarterlyZzwyData.qcItemDeleteQcReport(record.id)
                                    });
                            }}>
                  删除
                </span>
                    </DoCon>
                );
            }
        }
    ]
    const handleReview = (record: any) => {
        appStore.history.push(`/QuarterlyAnalysisReportZzwyDetail?qcLevel=${qcLevel}&master=${record.id}`);
    }
    /** "id": 0,  没有就不传
     "qcMasterId": 0,  必传
     "qcItemCode": "string",  必传
     "type":  3：整改措施  5：追踪评价
     "content": "string"***/
    const onChange = () => {

    }
    const handleAdd = () => {
        QcQuarterly.show({
            title: "创建",
            qcLevel: qcLevel,
        })
    }

    // useEffect(()=>{
    //
    // },[])
    return (
        <Wrapper>
            <PageHeader>
                <PageTitle>质控检查反馈整改单</PageTitle>
                <Place/>
                <span>科室：</span>
                <DeptSelect hasAllDept onChange={onChange}/>
                <span>报告日期：</span>
                <DatePicker.RangePicker
                    allowClear={false}
                    format={'YYYY-MM-DD'}
                    value={QuarterlyZzwyData.filterDate}
                    onChange={(value) => {
                        QuarterlyZzwyData.filterDate = value
                    }}
                    style={{width: 220}}
                />
                <Button
                    onClick={handleAdd}
                    type={'primary'}
                    className="span">
                    创建
                </Button>
                <Button
                    onClick={() => QuarterlyZzwyData.getTableList()}
                    className="span">
                    查询
                </Button>
            </PageHeader>

            <BaseTable
                className="record-page-table"
                onRow={(record: any) => {
                    return {
                        onDoubleClick: () => handleReview(record)
                    }
                }}
                loading={QuarterlyZzwyData.tableLoading}
                dataSource={QuarterlyZzwyData.tableList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={220}
            />
            <QcQuarterly.Component/>
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