import Form from 'src/components/Form'
import styled from 'styled-components'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Modal, Button, Input, message as Message, message} from 'antd'
import {ModalComponentProps} from 'src/libs/createModal'
import BaseTable, {DoCon} from "src/components/BaseTable";
import {Obj} from "src/libs/types";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import update from "immutability-helper";
import {cloneDeep} from "lodash";


export interface Props extends ModalComponentProps {
    onOkCb: Function
    menuCode?: string
}

export default function (props: Props) {
    const {visible, onCancel, onOkCb, menuCode} = props
    const [data, setData] = useState([] as any)
    const handleOk = () => {
        if(data.filter((item:any)=> !item.name).length >=1){
            return message.info('分类名称不能为空')
        }
        nurseHandBookService.saveCategoryMenu(data).then(res => {
            if (res.code == 200) {
                Message.success('保存成功')
                onCancel()
            }
        })
    }
    const handleInputChange = (index: number) => (e: any) => {
        let newData: any = cloneDeep(data)
        newData[index].name = e.target.value
        setData(newData)
    };
    const columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: 60,
            render:(text:string,record:any,index:number)=>{
                return index + 1
            }
        },
        {
            title: '分类名称',
            dataIndex: 'name',
            align: 'center',
            width: 140,
            render: (text: string, record: any, index: number) => {
                return <Input
                    key={index+'a1'}
                    onChange={handleInputChange(index)}
                    value={text} placeholder='请输入分类名称'/>
            }
        },
        {
            title: '操作',
            dataIndex: 'op',
            align: 'center',
            width: 100,
            render: (text: string, record: Obj) => {
                return (
                    <DoCon>
                        <span onClick={() => handleDelete(record)}>删除</span>
                        <span onClick={() => handleSaveItem(record)}>保存</span>
                    </DoCon>
                )
            }
        },
    ]
    const add = () => {
        setData([...data, { name: '',}])
    }
    const handleSaveItem = (record: any) => {
        nurseHandBookService.saveCategoryMenu( [record] ).then(res => {
            if (res.code == 200) {
                Message.success('保存成功')
                getMenuData()

            }
        })
    }
    const handleDelete = (record: any) => {
        Modal.confirm({
            title: '提示',
            content: '是否删除?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            centered: true,
            onOk: () => {
                nurseHandBookService.deleteCategoryMenu({id: record.id}).then((res) => {
                    if (res.code == 200) {
                        Message.success('删除成功')
                        getMenuData()

                    }
                })
            }
        })
    }
    const getMenuData = () => {
        nurseHandBookService.getFormList().then(res => {
            setData(res.data || [])
        })
    }
    useEffect(() => {
        if (menuCode) {
            getMenuData()
        }

    }, [menuCode])
    return (
        <Modal
            title='分类维护'
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            centered>
            <Wrapper>
                <Button onClick={add}>新增</Button>
                <BaseTable
                    dataSource={data}
                    columns={columns}
                    type={['diagRow']}
                    moveRow={(dragIndex: number, hoverIndex: number) => {
                        const dragRow = data[dragIndex];
                        setData(
                            update(data, {
                                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
                            })
                        );
                    }}
                />
            </Wrapper>
        </Modal>
    )
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`
