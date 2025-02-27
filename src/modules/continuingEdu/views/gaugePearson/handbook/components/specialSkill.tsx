import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import BaseTable, {DoCon} from 'src/components/BaseTable'
import {DatePicker, Button, message, Input, Modal} from "src/vendors/antd";
import moment from 'moment'
import {trainingSettingApi} from '../../api/TrainingSettingApi';
import TemplateSingModal from 'src/modules/continuingEdu/components/SingModal'
import createModal from "src/libs/createModal";

export interface Props {
// payload: any;
    exportData?: any
    isExport?:boolean
}

export default observer(function specialSkill(props: Props) {
    const {exportData,isExport} = props
    const [tableData, setTableData] = useState([]);

    // 签名对话框
    const templateSingModal = createModal(TemplateSingModal)
    const [signValue, setSignValue] = useState() as any

    useEffect(() => {
        let templateItemListVos = exportData || handbookModel?.detail.templateItemListVos || []
        let tableDateNew: any = []
        templateItemListVos.map((it: any) => {
            if (it.itemDataStr != '') {
                // 就是有值
                tableDateNew.push({...it, ...(JSON.parse(it.itemDataStr))})
            } else {
                tableDateNew.push(it)
            }
        })
        setTableData(tableDateNew)

    }, [exportData, handbookModel?.detail])
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
            title: "序号",
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 40,
            render: (text: any, record: any, index: number) => index + 1
        },
        {
            title: "考核要求",
            dataIndex: "catagory",
            align: "center",
            width: 100,
            render: (value: any, row: any, index: number) => {
                const obj = {
                    children: <>{value.indexOf('\n') > -1 ? value.split('\n').map((it: string) => <>{it}<br></br></>) : value}</>,
                    props: {},
                } as any;
                obj.props.rowSpan = mergeCells(row.catagory, tableData || [], 'catagory', index)
                return obj
            }
        },

        {
            title: "内容",
            dataIndex: "content",
            align: "center",
            width: 120
        },
        {
            title: "考核时间",
            dataIndex: "examTime",
            align: "center",
            width: 130,
            render: (value: any, row: any) => {
                if (isExport) {
                    return <div>{value}</div>
                }
                return (
                    <DatePicker key={row.id} defaultValue={value ? moment(value) : undefined} onChange={(date: any) => {
                        row.examTime = date?.format('YYYY-MM-DD') || undefined
                    }}></DatePicker>)
            }

        },
        {
            title: '考核结果',
            dataIndex: "score",
            align: "center",
            width: 80,
            render: (value: any, row: any) => {
                if (isExport) {
                    return <div>{value}</div>
                }
                return (<Input key={row.id} defaultValue={value} onBlur={(e: any) => {
                    row.score = e.target.value
                }

                }/>)
            }
        },
        {
            title: "老师签名",
            dataIndex: "signName",
            align: "center",
            width: 60,
            render: (value: any, row: any, index: number) => {
                if (isExport) {
                    return <div>{value}</div>
                }
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
        {
            title: '备注',
            dataIndex: "remark",
            align: "center",
            width: 80,
            render: (value: any, row: any, index: number) => {
                if (isExport) {
                    return <div>{value}</div>
                }
                return (<Input.TextArea autosize={{minRows: 1}} key={row.id} defaultValue={value} onBlur={(e: any) => {
                    row.remark = e.target.value
                }

                }/>)
            }
        },
    ];

    /**保存 */
    const saveTable = () => {
        let params: any = {
            templateItemListVos: [],
            masterId: handbookModel.curCatalogue?.masterId,
            templateId: handbookModel.curCatalogue?.templateId,
            catalogId: handbookModel.curCatalogue?.id,
            templateType: handbookModel.curCatalogue?.templateType,
        }
        let dataObj = {}
        tableData.map((it: any) => {
            // 有改动的
            dataObj = {
                signName: it.signName || undefined,
                score: it.score || undefined,
                examTime: it.examTime || undefined,
                remark: it.remark || undefined,
            }
            params.templateItemListVos.push({
                id: it.id,
                itemDataStr: JSON.stringify(dataObj)
            })
        })
        handbookModel.tableLoading = true
        trainingSettingApi.saveOrUpdateItemData(params).then((res: any) => {
            message.success('保存成功')
            handbookModel.tableLoading = false
        }).finally(() => {
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
                onOk: async () => {
                    record[itemCode] = '';
                    await setTableData([...tableData])
                    await saveTable()
                    /*需要重新跑保存接口*/
                }
            })
            return false
        }
        if (!signValue) {
            templateSingModal.show({
                handleOk: (value: any) => {
                    record[itemCode] = value.empNo;
                    /**需要记录起来，下次签名直接使用**/
                    setSignValue(value.empNo)
                }
            })
        } else {
            record[itemCode] = signValue;
            setTableData([...tableData])
        }

    }
    const saveElement = () => {
        if (!isExport) {
            return (
                <Button type='primary' onClick={saveTable}>保存</Button>
            )
        }
    }
    return (
        <Wrapper>
            {isExport && <div className='title'>专项技能考核表</div>}
            <BaseTable
                title={saveElement}
                loading={handbookModel?.tableLoading}
                dataSource={tableData || []}
                columns={columns}
                surplusHeight={isExport ? undefined : 350}
                surplusWidth={0}
                className="custom-table" // 自定义样式类名
            />
            <templateSingModal.Component/>

        </Wrapper>
    )
})
const Wrapper = styled.div`
  //min-height: 200px;

  .title {
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .custom-table .ant-table-title {
    overflow: hidden;

    button {
      float: right;
    }
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`



