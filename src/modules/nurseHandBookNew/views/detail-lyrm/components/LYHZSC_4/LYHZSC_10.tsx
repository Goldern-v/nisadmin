import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../../newModel'
import {Input, message, Switch} from 'antd'
import {observer} from 'mobx-react'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import BaseTable, {DoCon} from "src/components/BaseTable";

const {TextArea} = Input

export interface Props {
}
interface NurseParams {
    deptCode?: string,
    startTime?: any
    endTime?: any
}

/**护士长基本情况登记*/
export default observer(function (props: NurseParams) {
    const [loading, setLoading] = useState(false)

    const [tableData, setTableData] = useState([] as any)
    const defColumns: any = [
        {
            title: '姓名',
            dataIndex: 'empName',
            key: 'empName',
            align: 'center',
        },
        {
            title: '资质种类',
            dataIndex: 'nurseName',
            key: 'nurseName',
            align: 'center',
        },
        {
            title: '发证时间',
            dataIndex: 'cardNumberDate',
            key: 'cardNumberDate',
            align: 'center',
        },
        {
            title: '发证单位',
            dataIndex: 'cardUnit',
            key: 'cardUnit',
            align: 'center',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            align: 'center',
        },
    ]
    const getData =()=>{
        setLoading(true)
        nurseHandBookService.getNurseFilingForm({
            deptCode: props?.deptCode,
            startTime: props?.startTime.format('YYYY-MM-DD') + ' 00:00:00',
            endTime: props?.endTime.format('YYYY-MM-DD') + ' 23:59:59',
        }).then((res: any) => {
            setTableData(res.data|| [])
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [props.deptCode,props.startTime,props.endTime])
    return (
        <Wrapper ref={model.ctxRef}>
            <BaseTable
                surplusHeight={200}
                dataSource={tableData}
                columns={defColumns}
                loading={loading}
            />
        </Wrapper>
    )
})

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 95px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;

  .title {
    margin-top: 6vh;
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    line-height: 40px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;
    min-height: 40px;

    :focus {
      box-shadow: none;
    }

`