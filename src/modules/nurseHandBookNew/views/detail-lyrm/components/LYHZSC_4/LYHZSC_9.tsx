import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../../newModel'
import {Input, message, Switch} from 'antd'
import {observer} from 'mobx-react'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import BaseTable, {DoCon} from "src/components/BaseTable";

export interface Props {
}

interface NurseParams {
    deptCode: string,
    startTime?: any
    endTime?: any
    pageSize:number
    pageNum: number
    setLyhzscQuery: any
    randonNum?:number
}

/**护士长基本情况登记*/
export default observer(function (props: any) {
    const {setLyhzscQuery,pageNum,pageSize} =props
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    const [tableData, setTableData] = useState([] as any)
    const defColumns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: 60,
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 80,
            render: (text: string, record: any, index: number) => {
             return    <Switch key={index + 'a'} checked={ text == '1'  } onChange={(e:boolean)=>{
                 handleSaveRow({...record,status:e?1:0})
             }}/>
            }
        },
        {
            title: '监测内容',
            dataIndex: 'monitorContent',
            key: 'monitorContent',
            align: 'center',
        },
        {
            title: '计算方法',
            dataIndex: 'calculationMethod',
            key: 'calculationMethod',
            align: 'center',
        },
        {
            title: '合格指标',
            dataIndex: 'qualified',
            key: 'qualified',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'zyzsDate',
            key: 'zyzsDate',
            align: 'center',
            width: 100,
            render(text: string, record: any, index: number) {
                return (
                    <DoCon>
                        <span onClick={() => handleSaveRow(record)}>保存</span>
                        <span
                            className={( record.use ? 'disabled':'')} onClick={() => handleDeleteRow(record, index)}>删除</span>
                    </DoCon>
                );
            }
        },
    ]
    const handleDeleteRow = (record: any, index: number) => {
        nurseHandBookService.deleteIndicatorsItem({id: record.id}).then((res: any) => {
            let data = [...tableData]
            data.splice(index, 1)
            message.success('删除成功')
            setTableData(data)
        })
    }
    const  handleSaveRow =(record:any)=>{
        nurseHandBookService.saveIndicatorsTItem({...record}).then((res: any) => {
            message.success('保存成功')
            getData()
        })
    }
    const getData =()=>{
        setLoading(true)
        nurseHandBookService.getIndicatorsItem({
            deptCode: props?.deptCode,
            startTime: props?.startTime.format('YYYY-MM-DD') + ' 00:00:00',
            endTime: props?.endTime.format('YYYY-MM-DD') + ' 23:59:59',
        }).then((res: any) => {
            setTableData(res.data.list || [])
            setTotal(res.data.totalCount)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [props.deptCode,props.startTime,props.endTime,props.pageNum,props.pageSize,props.randonNum])
    return (
        <Wrapper ref={model.ctxRef}>
            <BaseTable
                surplusHeight={200}
                dataSource={tableData}
                columns={defColumns}
                loading={loading}
                pagination={{
                    current:pageNum,
                    pageSize:pageSize,
                    total,
                }}
                onChange={(pagination) => {
                    setLyhzscQuery({
                        ...props,
                        pageNum: pagination.current,
                        pageSize: pagination.pageSize,
                    })
                }}
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