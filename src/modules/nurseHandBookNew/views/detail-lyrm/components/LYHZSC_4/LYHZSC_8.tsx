import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../../newModel'
import {observer} from 'mobx-react'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import BaseTable from "src/components/BaseTable";

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
            title: '出生年月',
            dataIndex: 'birthday',
            key: 'birthday',
            align: 'center',
        },
        {
            title: '参加工作时间',
            dataIndex: 'goWorkTime',
            key: 'goWorkTime',
            align: 'center',
        },
        {
            title: '政治面貌',
            dataIndex: 'politicsLook',
            key: 'politicsLook',
            align: 'center',
        },
        {
            title: '学历',
            dataIndex: 'education',
            key: 'education',
            align: 'center',
        },
        {
            title: '毕业时间',
            dataIndex: 'highestEducationDate',
            key: 'highestEducationDate',
            align: 'center',
        },
        {
            title: '毕业学校',
            dataIndex: 'schoolName',
            key: 'schoolName',
            align: 'center',
        },
        {
            title: '技术职称',
            dataIndex: 'technologyTitle',
            key: 'technologyTitle',
            align: 'center',
        },
        {
            title: '层级',
            dataIndex: 'nurseHierarchy',
            key: 'nurseHierarchy',
            align: 'center',
        },
        {
            title: '调入时间',
            dataIndex: 'inDate',
            key: 'inDate',
            align: 'center',
        },
        {
            title: '调出时间',
            dataIndex: 'outDate',
            key: 'outDate',
            align: 'center',
        },
        {
            title: '执业证号',
            dataIndex: 'zyzsNumber',
            key: 'zyzsNumber',
            align: 'center',
        },
        {
            title: '执业证注册时间',
            dataIndex: 'zyzsDate',
            key: 'zyzsDate',
            align: 'center',
        },
    ]
    useEffect(() => {
        setLoading(true)
        nurseHandBookService.getNurseList({
            ...props,
            startTime:props?.startTime.format('YYYY-MM-DD') + ' 00:00:00' ,
            endTime:props?.endTime.format('YYYY-MM-DD') + ' 23:59:59',
        }).then((res: any) => {
            setTableData(res.data)
        }).finally(()=>{
            setLoading(false)
        })
    }, [props])
    return (
        <Wrapper ref={model.ctxRef}>
            <BaseTable
                surplusHeight={250}
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