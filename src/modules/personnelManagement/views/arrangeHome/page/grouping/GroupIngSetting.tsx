import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import BaseTable from "src/components/BaseTable";
import {Button, Input, message, Modal, Select} from "antd";
import {groupingService} from "src/modules/personnelManagement/views/arrangeHome/page/grouping/groupingService";
import {SelectValue} from "antd/es/select";
import {tubeBedService} from "src/modules/personnelManagement/views/arrangeHome/page/tubeBed/services/TubeBedService";
import {authStore} from "src/stores";
import {ColumnProps} from "antd/es/table";

interface TableItem {
    id?:number|string|undefined;
    index?: number | string;
    bedGroupName?: string;
    bedLabels?: SelectValue

}

export interface Props extends RouteComponentProps {
}

export default function GroupIngSetting() {
    const [tableLoading, setTableLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<Array<TableItem>>([])
    const [bedNoList,setBedNoList] =useState([])
    useEffect(() => {
        const fetchFun = async ()=>{
            await getSelectData()
            await getData()
        }
        fetchFun()
    },[])
    const getSelectData =()=>{
        tubeBedService.getBedRec(authStore.selectedDeptCode).then((res:any) => {
            setBedNoList(res.data)
        })
    }
    const getData = () => {
        setTableLoading(true)
        groupingService.getList().then((res: any) => {
            setTableLoading(false)
            setTableData(res.data||[])
        })
    }
    const handleInputChange = (value: string,index:number) => {
     let list:TableItem[] = tableData.map((item:TableItem,k:number)=>{
            if(k == index){
                item.bedGroupName = value
            }
            return item
        })
        setTableData([...list])
    }
    const handleSelectChange =(value:any,index:number)=>{
        let list:TableItem[] = tableData.map((item:TableItem,k:number)=>{
            if(k == index){
                item.bedLabels = value.join(',').length ? value.join(',') : ''
            }
            return item
        })
        setTableData([...list])
    }
    const columns:ColumnProps<any>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            render: (text: any, record: any, index: number) => index + 1,
        },
        {
            title: '管床名称',
            dataIndex: 'bedGroupName',
            key: 'bedGroupName',
            width: 200,
            render: (text: string, record: any, index: number) => {
                return <Input style={{width:'100%'}}
                              defaultValue={text}
                              placeholder='请输入管床名称' key={`${index}+a`}
                              onChange={(e: any) => handleInputChange(e.target.value,index)}/>
            }

        },
        {
            title: '管床床号',
            dataIndex: 'bedLabels',
            key: 'bedLabels',
            render(text: any, record: any, index: any) {
                return  <Select
                    mode="tags"
                    size={'default'}
                    placeholder="请选择床位号"
                    key={index}
                    defaultValue={text? text.split(',') : []}
                    onChange={(value:SelectValue)=>handleSelectChange(value,index)}
                    style={{ width: '100%' }}>
                    {bedNoList && bedNoList.map((item: any, index: any) => {
                        return <Select.Option value={item.bedLabel} key={index}>{item.bedLabel}</Select.Option>
                    })}
                </Select>
            },
        },
        {
            title: '操作',
            dataIndex: 'cz',
            key: 'cz',
            width:80,
            render: (text: string, record: TableItem) => {
                return (
                   <div style={{cursor:'pointer',textAlign:"center"}} onClick={() => handleDelete(record.id)}>删除</div>
                )
            }
        }
    ]
    const handleAdd = () => {
        let params: TableItem = {
            index: tableData.length + 1,
            bedGroupName: '',
            bedLabels: ''
        }
        setTableData([...tableData, params])
    }
    const handleDelete = (id:any) => {
        if(!id)return
        Modal.confirm({
            title: "删除确认",
            content: "确定要删除此数据？",
            okText: "确认",
            cancelText: "取消",
            centered: true,
            maskClosable: true,
            onOk: () => {
                groupingService.delete({id}).then((res)=>{
                    message.success('删除成功')
                    getData()
                })
            },
        });
    }
    const handleSave = () => {
        // tableData
        // "bedGroupName": "string",
        //         "bedLabels": "string",
        //         "empNo": "string",
        //         "empName": "string",
        //         "createDate": "string",
        //         "updateDate": "string",
        //         "deleteFlag": "string"
        let list =tableData.map((item:any)=>{
            item.empNo =authStore.user?.empNo
            item.empName =authStore.user?.empName
            return item
        })
        groupingService.save(list).then((res:any)=>{
            message.success('保存成功')
            getData()
        })
    }
    return (
        <Wrapper>
            <PageHeader>
                <PageTitle>
                    管床分组
                </PageTitle>
                <Place/>
                <Button onClick={handleAdd}>
                    添加
                </Button>
                <Button onClick={handleSave}>
                    保存
                </Button>
            </PageHeader>

            <MainBoxCon>
                <BaseTable
                    loading={tableLoading}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    surplusHeight={190}
                />
            </MainBoxCon>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  height: 100%;
`

const MainBoxCon = styled.div`
  background: #fff;
  padding-bottom: 50px;
  margin-bottom: -50px;
  overflow: hidden;
`
export const PageHeader: any = styled.div`
  height: 50px;
  font-size: 13px;
  position: relative;
  color: #333333;
  padding: 0 15px 0 15px;
  display: flex;
  align-items: center;
  z-index: 1;

  > span.label {
    margin-left: 15px;
    margin-right: 10px;
  }

  > button:first-of-type {
    margin-left: 20px;
  }

  > button {
    margin-left: 10px;
  }

  > .ant-select {
    min-width: 100px;
  }

  > .select-year {
    width: 100px;
  }
`
export const Place = styled.div`
  flex: 1;
`

export const PageTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  @media (max-width: ${(props: { maxWidth?: number }) => props.maxWidth || 1400}px) {
    display: none;
  }
`