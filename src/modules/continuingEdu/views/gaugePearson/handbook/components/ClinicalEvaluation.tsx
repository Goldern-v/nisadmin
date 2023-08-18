import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import BaseTable from 'src/components/BaseTable'
import {Button, message} from "src/vendors/antd";
import {trainingSettingApi} from '../../api/TrainingSettingApi';
import {Input, DatePicker} from "antd";
import TemplateSingModal from 'src/modules/continuingEdu/components/SingModal'
import createModal from "src/libs/createModal";
import moment from "moment";
import DeptSelect from "src/components/DeptSelect";
import { cloneJson } from 'src/utils/json/clone';

export interface Props {
    payload: any;
}

export default observer(function ClinicalEvaluation(props: Props) {
    const [tableData, setTableData] = useState([] as any);
    const templateSingModal = createModal(TemplateSingModal)

    // 签名对话框
    useEffect(() => {
        let templateItemListVos = handbookModel?.detail.templateItemListVos || []
        let tableDateNew: any = []
        templateItemListVos.map((it: any) => {
            if (it.itemDataStr != '') {
                tableDateNew.push({...it, ...(JSON.parse(it.itemDataStr))})
            } else {
                tableDateNew.push(it)
            }
        })
        if (handbookModel?.detail?.dataMaps) {
            setHeardValue({...handbookModel?.detail?.dataMaps})
        }
        setTableData([...tableDateNew])
        console.log("tableDateNew===",tableDateNew);
    }, [handbookModel?.detail])
    const [heardValue, setHeardValue] = useState({} as any)
    // 动态合并单元格
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
    const handleInput = (e: any, code: string, record: any) => {
        record.modified = true
        record[code] = e.target.value
        let cloneData = cloneJson(tableData);
        setTableData(cloneData)
    }
    const columns: any = [
        {
            title: "项目",
            dataIndex: "catagory",
            align: "center",
            render: (value: string, row: any, index: number) => {
                const obj: any = {
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
        },
        {
            title: '入科评估',
            children: [
                {
                    title: '自评',
                    dataIndex: 'intoOne',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoOne-${index}`}
                            className='table-input'
                            value={text} onChange={(e: any) => handleInput(e, 'intoOne', record)}/>
                    }
                },
                {
                    title: '老师评估',
                    dataIndex: 'intoTwo',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoTwo-${index}`}
                            className='table-input'
                            value={text} onChange={(e: any) => handleInput(e, 'intoTwo', record)}/>
                    }
                },
            ],
        },
        {
            title: '入科3月',
            children: [
                {
                    title: '自评',
                    dataIndex: 'intoThree',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoThree-${index}`}
                            className='table-input'
                            value={text} onChange={(e: any) => handleInput(e, 'intoThree', record)}/>
                    }
                },
                {
                    title: '老师评估',
                    dataIndex: 'intoFour',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoFour-${index}`}
                            className='table-input'
                            value={text} onChange={(e: any) => handleInput(e, 'intoFour', record)}/>
                    }
                },
            ],
        },
        {
            title: '出科评价',
            children: [
                {
                    title: '自评',
                    dataIndex: 'intoFive',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoFive-${index}`}
                            className='table-input'
                            defaultValue={text} onChange={(e: any) => handleInput(e, 'intoFive', record)}/>
                    }
                },
                {
                    title: '老师评估',
                    dataIndex: 'intoSix',
                    align: "center",
                    render: (text: string, record: any, index: number) => {
                        return <Input
                            key={`intoSix-${index}`}
                            className='table-input'
                            defaultValue={text} onChange={(e: any) => handleInput(e, 'intoSix', record)}/>
                    }
                },
            ],
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
            dataMaps: heardValue
        }
        let dataObj = {}
        tableData.map((it: any) => {
            dataObj = {
                intoOne: it.intoOne || undefined,
                intoTwo: it.intoTwo || undefined,
                intoThree: it.intoThree || undefined,
                intoFour: it.intoFour || undefined,
                intoFive: it.intoFive || undefined,
                intoSix: it.intoSix || undefined,
            }
            params.templateItemListVos.push({
                id: it.id,
                itemDataStr: JSON.stringify(dataObj)
            })
        })
        handbookModel.tableLoading = true
        trainingSettingApi.saveOrUpdateItemData(params).then((res: any) => {
            message.success('保存成功')
        }).finally(() => {
            handbookModel.tableLoading = false
        })
    }

    const handleSign = (code: string) => {
        templateSingModal.show({
            handleOk: (value: any) => {
                heardValue[code] = `${value.empNo}-${moment().format('YYYY-MM-DD')}`
                setHeardValue({...heardValue})
            }
        })
    }
    return (
        <Wrapper>
            <div className='btn-save'>
                <Button type={'primary'} onClick={saveTable}> 保存</Button>
            </div>
            <>
                <div className='heard'>
                    <div>轮转科室:</div>
                    <div className='item' style={{display:'flex',alignItems:'center'}}>内科病区:
                        <DeptSelect hasAllDept deptCode={heardValue?.one}  onChange={(e: any) => {
                            setHeardValue({...heardValue, one: e})
                        }} />
                        {/*<Input style={{width: 120}} value={heardValue?.one}*/}
                        {/*                                  onChange={(e: any) => {*/}
                        {/*                                      setHeardValue({...heardValue, one: e.target.value})*/}
                        {/*                                  }}/>*/}
                    </div>
                    <div className='item'>入科时间:<DatePicker
                        value={heardValue?.two ? moment(heardValue?.two) : undefined}
                        format="YYYY-MM-DD"
                        onChange={(newTime, dateString: string) => {
                            setHeardValue({...heardValue, two: dateString})
                        }}
                        allowClear={false}
                    /></div>
                    <div className='item'>出科时间:<DatePicker
                        value={heardValue?.three ? moment(heardValue?.three) : undefined}
                        format="YYYY-MM-DD"
                        onChange={(newTime, dateString) => {
                            console.log(newTime);
                            setHeardValue({...heardValue, three: dateString})
                        }}
                        allowClear={false}/></div>
                    <div className='item'>带教老师:<Input value={heardValue?.four} style={{width: 80}}
                                                          onChange={(e: any) => {
                                                              setHeardValue({...heardValue, four: e.target.value})
                                                          }}/></div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', lineHeight: '30px'}}>
                    <div className='item'>入科评估老师签名时间:
                        <div className='line' onClick={() => handleSign('five')}>{heardValue?.five}</div>
                    </div>
                    <div className='item'>入科 3月老师签名时间:
                        <div className='line' onClick={() => handleSign('six')}>{heardValue?.six}</div>
                    </div>
                    <div className='item'>出科评估老师签名时间:
                        <div className='line' onClick={() => handleSign('seven')}>{heardValue?.seven}</div>
                    </div>
                </div>
                <p style={{marginTop: 10}}>(1) 掌握情况:未掌握(1分 → 10分) 熟练掌握，根据实践情况给予1-10分，出科评估 ＜
                    5分为不及格，需重新培训直至掌握。</p>
                <p>(2) 培训时间: 入科评估在入科一周内完成；3个月评估在3个月左右完成，不能超过3个半月；出科评价爱出科前一周完成，带教老师经过跟踪考核评估(
                    如只轮转3个月，则将入科3个月栏 * / *)</p>
            </>
            <BaseTable
                loading={handbookModel?.tableLoading}
                dataSource={tableData || []}
                columns={columns}
                surplusHeight={400}
            />
            <templateSingModal.Component/>
        </Wrapper>
    )
})
const Wrapper = styled.div`
  .btn-save {
    height: 30px;
    display: flex;
    justify-content: flex-end;
  }

  .heard {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .item {
    margin:5px 8px;
    //margin-right: 5px;
    //margin-top: 5px;
    .line {
      display: inline-block;
      height: 28px;
      border-bottom: 1px solid #333333;
      width: 140px;
      text-align: center;
      font-weight: 600;
      color: #00A680;
    }
  }

  .table-input {
    border: 0 !important; // 去除未选中状态边框
    outline: none !important; // 去除选中状态边框
    :focus{
      border: 0 !important; // 去除未选中状态边框
      outline: none !important; // 去除选中状态边框
      background-color: rgba(0, 0, 0, 0) !important; // 透明背景
    }
  }
`



