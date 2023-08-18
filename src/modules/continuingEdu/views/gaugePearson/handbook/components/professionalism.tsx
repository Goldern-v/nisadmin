import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import BaseTable, {TabledCon, DoCon} from 'src/components/BaseTable'
import {DatePicker, Button, message, Input, Modal, Row, Col, InputNumber} from "src/vendors/antd";
import moment from 'moment'
import {authStore} from 'src/stores'
import {trainingSettingApi} from '../../api/TrainingSettingApi';
import TemplateSingModal from 'src/modules/continuingEdu/components/SingModal'
import createModal from "src/libs/createModal";

export interface Props {
    payload: any;
}

export default observer(function professionalism(props: Props) {
    const [tableData, setTableData] = useState([]);

    // 签名对话框
    const templateSingModal = createModal(TemplateSingModal)
    const [signValue, setSignValue] = useState() as any

    useEffect(() => {
        let templateItemListVos = handbookModel?.detail.templateItemListVos || []
        let tableDateNew: any = []
        templateItemListVos.map((it: any) => {
            if (it.itemDataStr != '') {
                // console.log(JSON.parse(it.itemDataStr))
                // 就是有值
                tableDateNew.push({...it, ...(JSON.parse(it.itemDataStr))})
            } else {
                tableDateNew.push(it)
            }
        })
        // console.log(tableDateNew)
        setTableData(tableDateNew)

    }, [handbookModel?.detail])

    // 动态合并单元格
    const mergeCells = (text: string, data: any, key: string, index: number) => {
        if (data.length < 1) {
            return 1
        }
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
    const columns: any = [
        {
            title: "项目",
            dataIndex: "catagory",
            align: "center",
            width: 100,
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: <>{value.indexOf('\n') > -1 ? value.split('\n').map((it: string) => <>{it}<br></br></>) : value}</>,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.catagory, handbookModel?.detail.templateItemListVos || [], 'catagory', index)
                return obj
            }
        },
        {
            title: "评价内容",
            dataIndex: "content",
            align: "center",
            width: 120
        },
        {
            title: "标准分",
            dataIndex: "standartrd",
            align: "center",
            width: 40
        },
        {
            title: '得分',
            dataIndex: "score",
            align: "center",
            width: 60,
            render: (value: any, row: any, index: number) => {
                return (<InputNumber style={{width: 'auto'}} precision={2} min={0} max={row.standartrd} key={row.id}
                                     defaultValue={value} onBlur={(e: any) => {
                    row.score = e.target.value
                }

                }/>)
            }
        },
        {
            title: '护士长评语',
            dataIndex: "remark",
            align: "center",
            width: 80,
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: <Input.TextArea autosize={{minRows: 2}} key={row.id} defaultValue={value}
                                              onBlur={(e: any) => {
                                                  row.remark = e.target.value
                                              }

                                              }/>,
                    props: {rowSpan: 0},
                } as any;
                if (index === 0) {
                    obj.props.rowSpan = tableData.length
                }
                return obj
            }
        },
        {
            title: "老师签名",
            dataIndex: "signName",
            align: "center",
            width: 60,
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: <DoCon>
                        <span key={row.id} onClick={() => handleSign(row, 'signName')}>{value || '签名'}</span>
                    </DoCon>,
                    props: {rowSpan: 0},
                } as any;
                if (index === 0) {
                    obj.props.rowSpan = tableData.length
                }
                return obj
            }
        },

    ];

    /**保存 */
    const saveTable = () => {
        let paramter: any = {
            templateItemListVos: [],
            masterId: handbookModel.curCatalogue?.masterId,
            templateId: handbookModel.curCatalogue?.templateId,
            catalogId: handbookModel.curCatalogue?.id,
            templateType: handbookModel.curCatalogue?.templateType,
        }
        let dataObj = {}
        tableData.map((it: any) => {
            dataObj = {
                signName: it.signName || undefined,
                score: it.score || undefined,
                remark: it.remark || undefined,
            }
            paramter.templateItemListVos.push({
                id: it.id,
                itemDataStr: JSON.stringify(dataObj)
            })
        })

        handbookModel.tableLoading = true
        trainingSettingApi.saveOrUpdateItemData(paramter).then((res: any) => {
            message.success('保存成功')
            handbookModel.tableLoading = false
        }).catch((err: any) => {
            handbookModel.tableLoading = false

        })
    }

    const handleSign = (record: any, itemCode: string) => {
        if (record[itemCode]) {
            Modal.confirm({
                title: '提示',
                content: '是否清除签名？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    record[itemCode] = '';
                    setTableData([...tableData])
                }
            })
            return false
        }
        if (!signValue) {
            templateSingModal.show({
                handleOk: (value: any) => {
                    // console.log(authStore.user?.empName)
                    record[itemCode] = value.empNo;
                    /**需要记录起来，下次签名直接使用**/
                    setSignValue(value.empNo)
                    // updateDataSource()
                }
            })
        } else {
            // console.log(signValue)
            record[itemCode] = signValue;
            setTableData([...tableData])
        }

    }

    return (
        <Wrapper>
            <BaseTable
                title={() => <Button type='primary' onClick={saveTable}> 保存</Button>}
                loading={handbookModel?.tableLoading}
                dataSource={tableData || []}
                columns={columns}
                surplusHeight={350}
                surplusWidth={0}
                className="custom-table" // 自定义样式类名
            />
            <templateSingModal.Component/>

        </Wrapper>
    )
})
const Wrapper = styled.div`
  .ant-input-number-handler-wrap {
    display: none;
  }

  .custom-table td {
    border: 1px solid #e8e8e8; /* 添加边框 */
  }

  .custom-table .ant-table-title {
    overflow: hidden;

    button {
      float: right;
    }
  }
`



