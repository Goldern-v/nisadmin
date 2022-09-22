import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, DatePicker, Button, Input, Select } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { fileDownload } from 'src/utils/file/file'
import { writingFormService } from './services/queryStatisticsServices'
import { PageTitle } from 'src/components/common'
import service from 'src/services/api'
import DeptSelect from 'src/components/DeptSelect'
// import AddModal from './modal/add'
import moment from 'moment'
import { authStore } from 'src/stores'
import { message } from 'antd/es'

const { Option } = Select

const { MonthPicker } = DatePicker

const { confirm } = Modal;

export interface Props extends RouteComponentProps {}

export default observer(function WritingForm(props: any) {
  const [tableData, setTableData] = useState([])
  const [cacheTableData, setCacheTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [selectedDept, setSelectedDept] = useState(authStore.defaultDeptCode)
  const [tableList, setTableList] = useState(new Array())
  const [deptList, setDeptList] = useState([])
  const [defaultValue, setDefaultValue] = useState('')

  const [date, setDate]= useState(moment())
  let checkData: any[] = []


  // let date = moment()
  // const [date]
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: '',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 80,
      fixed: "left",
    },
    {
      title: '姓名',
      dataIndex: 'PATIENT_NAME',
      width: 100,
      align: 'center',
      fixed: "left",
    },
    {
      title: '住院号',
      width: 100,
      dataIndex: 'PATIENT_ID',
      align: 'center',
      fixed: "left",
      // render(text: any, rocord: any, index: number) {
      //   return text.map((item: any, index: number) => {
      //     return (
      //       <div key={index} className='cell'>
      //         {item.inpNo}
      //       </div>
      //     )
      //   })
      // }
    },
    {
      title: '科室名称',
      dataIndex: 'DEPT_NAME',
      width: 120,
      align: 'center',
      fixed: "left",
    },
    {
      title: '病区名称',
      dataIndex: 'WARD_NAME',
      width: 160,
      align: 'center'
    },
    {
      title: '出院时间',
      dataIndex: 'DISCHARGE_DATE_TIME',
      width: 180,
      align: 'center'
      // render(text: any, rocord: any, index: number) {
      //   return text.map((item: any, index: number) => {
      //     return (
      //       <div key={index} className='cell'>
      //         {item.evalDate}
      //       </div>
      //     )
      //   })
      // }
    },
    {
      title: '评估等级',
      dataIndex: 'EVAL_DESC',
      width: 120,
      align: 'center'
    },
    {
      title: '评估得分',
      dataIndex: 'EVAL_SCORE',
      width: 80,
      align: 'center'
    },
    {
      title: '1分项',
      children: [
        {
          title: '年龄41-60',
          dataIndex: 'ITEM_VALUE1',
          key: 'ITEM_VALUE1',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '下肢肿胀',
          dataIndex: 'ITEM_VALUE3',
          key: 'ITEM_VALUE3',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '静脉曲张',
          dataIndex: 'ITEM_VALUE4',
          key: 'ITEM_VALUE4',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '肥胖(BMI>25kg/m2)',
          dataIndex: 'ITEM_VALUE2',
          key: 'ITEM_VALUE2',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '计划小手术',
          dataIndex: 'ITEM_VALUE7',
          key: 'ITEM_VALUE7',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '脓毒血症',
          dataIndex: 'ITEM_VALUE12',
          key: 'ITEM_VALUE12',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '急性心肌梗死',
          dataIndex: 'ITEM_VALUE5',
          key: 'ITEM_VALUE5',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '充血性心力衰竭',
          dataIndex: 'ITEM_VALUE6',
          key: 'ITEM_VALUE6',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '卧床休息的内科疾病',
          dataIndex: 'ITEM_VALUE32',
          key: 'ITEM_VALUE32',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '炎症性肠病史',
          dataIndex: 'ITEM_VALUE40',
          key: 'ITEM_VALUE40',
          width: 100,
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '大手术史',
          dataIndex: 'ITEM_VALUE16',
          key: 'ITEM_VALUE16',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '肺功能异常',
          dataIndex: 'ITEM_VALUE15',
          key: 'ITEM_VALUE15',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '严重肺病',
          dataIndex: 'ITEM_VALUE28',
          key: 'ITEM_VALUE28',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '口服避孕药或激素',
          dataIndex: 'ITEM_VALUE27',
          key: 'ITEM_VALUE27',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '妊娠期或产后状态',
          dataIndex: 'ITEM_VALUE14',
          key: 'ITEM_VALUE14',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '不明原因死胎、反复流产',
          dataIndex: 'ITEM_VALUE33',
          key: 'ITEM_VALUE33',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        }
      ]
    },
    {
      title: '2分项',
      children: [
        {
          title: '年龄61-74',
          dataIndex: 'ITEM_VALUE9',
          key: 'ITEM_VALUE9',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '关节镜手术',
          dataIndex: 'ITEM_VALUE29',
          key: 'ITEM_VALUE29',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '恶性肿瘤（既往或现患）',
          dataIndex: 'ITEM_VALUE18',
          key: 'ITEM_VALUE18',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '中心静脉置管',
          dataIndex: 'ITEM_VALUE34',
          key: 'ITEM_VALUE34',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '大手术',
          dataIndex: 'ITEM_VALUE8',
          key: 'ITEM_VALUE8',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '腹腔镜手术',
          dataIndex: 'ITEM_VALUE19',
          key: 'ITEM_VALUE19',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '限制性卧床',
          dataIndex: 'ITEM_VALUE35',
          key: 'ITEM_VALUE35',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '石膏固定',
          dataIndex: 'ITEM_VALUE17',
          key: 'ITEM_VALUE17',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        }
      ]
    },
    {
      title: '3分项',
      children: [
        {
          title: '年龄≥75',
          dataIndex: 'ITEM_VALUE20',
          key: 'ITEM_VALUE20',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '深静脉血栓/肺栓塞栓塞症',
          dataIndex: 'ITEM_VALUE10',
          key: 'ITEM_VALUE10',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '凝血酶原/因子Leiden突变',
          dataIndex: 'ITEM_VALUE30',
          key: 'ITEM_VALUE30',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '血栓家族史',
          dataIndex: 'ITEM_VALUE11',
          key: 'ITEM_VALUE11',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '狼疮抗凝阳性',
          dataIndex: 'ITEM_VALUE22',
          key: 'ITEM_VALUE22',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '高半胱氨酸血症',
          dataIndex: 'ITEM_VALUE36',
          key: 'ITEM_VALUE36',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '血小板减少',
          dataIndex: 'ITEM_VALUE41',
          key: 'ITEM_VALUE41',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '抗心磷脂抗体阳性',
          dataIndex: 'ITEM_VALUE21',
          key: 'ITEM_VALUE21',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
        {
          title: '易栓症',
          dataIndex: 'ITEM_VALUE13',
          key: 'ITEM_VALUE13',
          width: 100,
          align: 'center',
          render(text: any, record: any) {
            return text ? '√' : '';
          }
        },
      ]
    },
    {
      title: '基础预防',
      children: [
        {
          title: '补液或饮水',
          dataIndex: 'ITEM_VALUE42',
          key: 'ITEM_VALUE42',
          width: 100,
          align: 'center'
        },
        {
          title: '戒烟戒酒',
          dataIndex: 'ITEM_VALUE43',
          key: 'ITEM_VALUE43',
          width: 100,
          align: 'center'
        },
        {
          title: '穿刺',
          dataIndex: 'ITEM_VALUE44',
          key: 'ITEM_VALUE44',
          width: 100,
          align: 'center'
        },
        {
          title: '观察皮肤',
          dataIndex: 'ITEM_VALUE45',
          key: 'ITEM_VALUE45',
          width: 100,
          align: 'center'
        },
        {
          title: '抬高下肢',
          dataIndex: 'ITEM_VALUE46',
          key: 'ITEM_VALUE46',
          width: 100,
          align: 'center'
        },
        {
          title: '下床活动',
          dataIndex: 'ITEM_VALUE47',
          key: 'ITEM_VALUE47',
          width: 100,
          align: 'center'
        },
        {
          title: '踝泵运动',
          dataIndex: 'ITEM_VALUE48',
          key: 'ITEM_VALUE48',
          width: 100,
          align: 'center'
        }
      ]
    },
    {
      title: '物理预防',
      children: [
        {
          title: '弹力袜',
          dataIndex: 'ITEM_VALUE49',
          width: 80,
          align: 'center'
        },
        {
          title: '加压装置',
          dataIndex: 'ITEM_VALUE50',
          width: 80,
          align: 'center'
        }
      ]
    },
    {
      title: '药物预防',
      children: [
        {
          title: '正确用药',
          dataIndex: 'ITEM_VALUE51',
          width: 80,
          align: 'center'
        }
      ]
    },
    {
      title: '是否落实恰当措施',
      fixed: 'right',
      children: [
        {
          title: '点击一下即√点第二下×',
          dataIndex: 'isAppropriate',
          width: 160,
          align: 'center',
          render(text: any, record: any) {
            return (
            <Signature>
              <span onClick={() => clickResult(text, record)}>{text}</span>
            </Signature>
            )}
        }
      ]
    },
    {
      title: '签名人',
      fixed: 'right',
      children: [
        {
          title: '点击签名',
          dataIndex: 'autograph',
          width: 80,
          align: 'center',
          render(text: any, record: any) {
            return (
              <Signature>
                <span onClick={() => handleSign(text, record)}>{text ? text : '签名'}</span>
              </Signature>
            )
          }
        }
      ]
    }
  ]

  const clickResult = (text: string, record: any) => {
    if (text) {
      if (text === '√'){
        record.isAppropriate = "×"
      }
      else record.isAppropriate = "√"
    }else {
      record.isAppropriate = "√"
    }
    writingFormService.saveNurseVet({
      formName: '广州市花都人民医院术科VTE质量表',
      wardCode: selectedDept,
      listMonth: moment(date).format("MM"),
      listYear: moment(date).format("YYYY"),
      list: [
        {
          formId: record.ID,
          isAppropriate: record.isAppropriate,
          autograph: record.autograph
        }
      ]
    })
    setTableList(tableData);
    const arrOne = tableData.slice();
    setTableData([])
    setTableData(arrOne)
  }

  const handleSign = (text: any, record: any) => {
    if (!text) {
      saveSign('确认', '签名', record, authStore.user?.empName)
    } else {
      // saveSign('取消', '取消签名', record, '')
      message.warning(`不能取消签名！`)
    }
  }

  const saveSign = (text: string, sign: string, record:any, empName: string | undefined = '') => {
    confirm({
      title: `${text}签名?`,
      content: '',
      onOk() {
        writingFormService.saveNurseVet({
          formName: '广州市花都人民医院术科VTE质量表',
          wardCode: selectedDept,
          listMonth: moment(date).format("MM"),
          listYear: moment(date).format("YYYY"),
          list: [
            {
              formId: record.ID,
              isAppropriate: record.isAppropriate,
              autograph: empName
            }
          ]
        }).then((res) => {
          if (res.code === '200') {
            message.success(`${sign}成功！`)
            record.autograph = empName
            setTableList(tableData);
            const arrOne = tableData.slice();
            setTableData([])
            setTableData(arrOne)
          } else {
            message.error(`${sign}失败！`)
          }
        })
      },
      onCancel() {
      },
    });
  }
  // 获取某一个月的开始时间和结束时间
  const startEndDate = () => {
    
    let startDate = moment(date);
    let endDate: any = new Date(startDate.format('YYYY/MM/DD'));
    startDate.date(1);

    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    endDate = moment(endDate);
    return {startDate, endDate}
  }

  const exportExcel = () => {
    const { startDate, endDate } = startEndDate()
    let data = {
      formName: '广州市花都人民医院术科VTE质量表',
      wardCode: selectedDept,
      queryMonth: moment(date).format("MM"),
      queryYear: moment(date).format("YYYY"),
      jsonMap: {
        tradeCode: "nurse_VTE",
        Ward_code: selectedDept,
        Start_time: startDate.format("YYYY-MM-DD"),
        End_time: endDate.format("YYYY-MM-DD"),
      }
    }
    writingFormService.exportExcel(data).then((res) => {
      fileDownload(res)
    })
  }

  const exportQualityExcel = (wardCode = selectedDept) => {
    let data = {
      formName: '术科质量单汇总',
      wardCode,
      queryMonth: moment(date).format("MM"),
      queryYear: moment(date).format("YYYY"),
    }
    writingFormService.exportQualityExcel(data).then((res) => {
      fileDownload(res)
    })
  }

  useEffect(() => {
    service.commonApiService.getNursingUnitAll().then((res) => {
      setDeptList(res.data.deptList)
    })
    // getTableData()
  }, [])

  useEffect(() => {
    getTableData()
  }, [date, selectedDept])

  const getTableData = () => {
    const { startDate, endDate } = startEndDate()
    setLoadingTable(true)
    if (date) {
      writingFormService
        .getNurseVet({
          formName: '广州市花都人民医院术科VTE质量表',
          wardCode: selectedDept,
          queryMonth: moment(date).format("MM"),
          queryYear: moment(date).format("YYYY"),
          jsonMap: {
            tradeCode: "nurse_VTE",
            Ward_code: selectedDept,
            Start_time: startDate.format("YYYY-MM-DD"),
            End_time: endDate.format("YYYY-MM-DD"),
          }
        })
        .then((res) => {
          if (res.code === '200') {
            // setTableData(res.data || [])
            setCacheTableData(res.data || [])
            const data = res.data.filter((item: any) => {
              return item.EVAL_DESC.indexOf(defaultValue) !== -1;
            })
            setTableData(data)
          }
          setLoadingTable(false)
        })
    } else {
      message.warning('时间不能为空')
    }
  }

  // const addVIE = () => {
  //   setVisible(true)
  // }

  // const onOk = (params: any) => {
  //   writingFormService.getNurseVet(params).then((res) => {
  //     if (res.code === 200) {
  //       setLoadingTable(false)
  //       setVisible(false)
  //     }
  //   })
  // }
  // const onCancel = () => {
  //   setVisible(false)
  // }

  const batchSign = () => {
    let listArr = checkData.map((row: any) => {
      return {
        formId: row.ID,
        isAppropriate: row.isAppropriate,
        autograph: authStore.user?.empName
      }
    })
    writingFormService.saveNurseVet({
      formName: '广州市花都人民医院术科VTE质量表',
      wardCode: selectedDept,
      listMonth: moment(date).format("MM"),
      listYear: moment(date).format("YYYY"),
      list: listArr
    }).then((res) => {
      if (res.code === '200') {
        message.success(`批量签名成功！`)
        getTableData()
      } else {
        message.error(`批量签名失败！`)
      }
    })
  }

  const rowSelection = {
    // onChange: (selectedRowKeys: any, selectedRows: any) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      checkData = selectedRows
      
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      checkData = selectedRows
    },
  };

  const handleChange = (data: any) => {
    let newData: string = data === '全部' ? '' : data
    setDefaultValue(newData)
    let newTableData = cacheTableData.filter((item: any) => {
      return item.EVAL_DESC.indexOf(newData) !== -1;
    })
    setTableData(newTableData)
    
  }

  return (
    <Wrapper>
      <HeaderCon>
        {/* <LeftIcon>
          <PageTitle>术科VTE质量单统计</PageTitle>
        </LeftIcon> */}
        <RightIcon>
          <div className='item'>
            <div className='label'>等级评估：</div>
            <div className='content'>
              <Select defaultValue='全部' style={{ width: 180 }} onChange={handleChange}>
                {['全部',  '术科VTE中高危及以上',  '术科VTE极高危',  '术科VTE高危',  '术科VTE中高危',  '术科VTE中危',  '术科VTE低危',  '术科VTE极低危' ].map((item: any, index) =>{
                  return <Option value={item}>{item}</Option>
                })}
              </Select>
            </div>
          </div>
          <div className='item'>
            <div className='label'>日期：</div>
            <div className='content'>
              <MonthPicker value={date}  placeholder="请选择年月"
                onChange={(value: any) => {
                  setDate(value)
                }}
              />
            </div>
          </div>
          <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
              {/* <DeptSelect deptCode={selectedDept} onChange={(val: any) => {
                setSelectedDept(val)
              } } style={{ width: 160 }} /> */}
              <Select 
                style={{ width: 160 }} 
                value={selectedDept}
                // allowClear
                onChange={(val:any)=> setSelectedDept(val) }
                showSearch={true}
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/* <Select.Option value='全部'>全部</Select.Option> */}
                {deptList.map((item: any) => (
                  <Select.Option key={item.name} value={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className='item'>
            <Button type='primary' className='statistics' onClick={getTableData}>
              查询
            </Button>
          </div>
          {/* <div className='item'>
            <Button type='primary' className='statistics' onClick={addVIE}>
              新增
            </Button>
          </div> */}
          <div className='item'>
            <Button
              className='excel'
              onClick={() => {
                exportExcel()
              }}
            >
              导出Excel
            </Button>
          </div>
          <div className='item'>
            <Button
              className='excel'
              onClick={() => {
                exportQualityExcel()
              }}
            >
              导出汇总Excel
            </Button>
          </div>
          {authStore.isDepartmentHuadu && <div className='item'>
            <Button
              className='excel'
              onClick={() => {
                exportQualityExcel('')
              }}
            >
              导出全院汇总Excel
            </Button>
          </div>}
        </RightIcon>
      </HeaderCon>
      <MidCon>
        <Title>术科VTE质量表</Title>
        <div className='batchBtn'>
          <Button onClick={batchSign} className='btn'>批量签名</Button>
        </div>
        <TableCon>
          <BaseTable
            surplusHeight={300}
            surplusWidth={80}
            loading={loadingTable}
            dataSource={tableData}
            columns={columns}
            rowSelection={rowSelection}
          />
        </TableCon>
      </MidCon>
      {/* <AddModal 
        visible={visible} 
        onOk={onOk} 
        onCancel={onCancel} 
        wardList={wardList}
        loading={false}
      /> */}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  .item {
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    .label {
    }
    .content {
      .year-picker {
        width: 75px;
      }
      .recode-type-select {
        min-width: 200px;
      }
      .month-select {
        width: 72px;
      }
    }
    .statistics {
      border-color: #fff;
    }
  }
  .cell {
    margin: 0 -8px;
    padding: 5px;
    text-align: center;
    & + .cell {
      border-top: 1px solid rgb(232, 232, 232);
    }
  }
  .batchBtn{
    display: flex;
    justify-content: right;
    margin: 0 20px -6px 0;
    .btn{
      width: 85px;
    }
  }
`
const LeftIcon = styled.div`
  height: 55px;
  float: left;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  float: right;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const HeaderCon = styled.div`
  height: 55px;
  align-items: center;
`
const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  /* height: 0; */
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
  width: 100%;
`
const Signature = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
  span{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
