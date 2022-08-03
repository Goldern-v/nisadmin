import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Radio, DatePicker, Button, message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM'
import { fileDownload } from 'src/utils/file/file'
import { writingFormService } from './services/queryStatisticsServices'
import { PageTitle } from 'src/components/common'
import service from 'src/services/api'
import { Select } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'

export interface Props extends RouteComponentProps {}

export default observer(function WritingForm(props: any) {
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [selectedDept, setSelectedDept] = useState('')
  const [deptList, setDeptList] = useState([])
  // const [date]
  const columns: any[] = [
    {
      title: '姓名',
      dataIndex: 'wardName',
      width: 100,
      align: 'left'
    },
    {
      title: '住院号',
      width: 100,
      dataIndex: 'detailList',

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
      dataIndex: 'recordSize',
      width: 140,
      align: 'center'
    },
    {
      title: '病区名称',
      dataIndex: 'recordSize',
      width: 140,
      align: 'center'
    },
    {
      title: '出院时间',
      dataIndex: 'detailList',
      width: 150,
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
      dataIndex: 'recordSize',
      width: 80,
      align: 'center'
    },
    {
      title: '评估得分',
      dataIndex: 'recordSize',
      width: 80,
      align: 'center'
    },
    {
      title: '1分项',
      children: [
        {
          title: '年龄≧70岁',
          dataIndex: 'grade',
          key: 'grade',
          width: 100
        },
        {
          title: '心脏和/或呼吸衰竭',
          dataIndex: 'grade1',
          key: 'grade1',
          width: 100
        },
        {
          title: '心梗和/或卒中 ',
          dataIndex: 'grade',
          key: 'grade',
          width: 100
        },
        {
          title: '感染和/或风湿',
          dataIndex: 'grade1',
          key: 'grade1',
          width: 100
        },
        {
          title: '肥胖',
          dataIndex: 'grade',
          key: 'grade',
          width: 100
        },
        {
          title: '激素治疗',
          dataIndex: 'grade1',
          key: 'grade1',
          width: 100
        }
      ]
    },
    {
      title: '2分项',
      children: [
        {
          title: '创伤或手术',
          dataIndex: 'grade2_1',
          key: 'grade2_1',
          width: 100
        }  
      ]
    },
    {
      title: '3分项',
      children: [
        {
          title: '肿瘤、化疗或放疗',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: 'VTE既往史',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '卧床',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '血栓形成倾向',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        }
      ]
    },
    {
      title: '基础预防',
      children: [
        {
          title: '补液或饮水',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '戒烟戒酒',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '穿刺',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '观察皮肤',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '抬高下肢',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '下床活动',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        },
        {
          title: '踝泵运动',
          dataIndex: 'grade2_2',
          key: 'grade2_2',
          width: 100
        }
      ]
    },
    {
      title: '物理预防',
      children: [
        {
          title: '弹力袜',
          dataIndex: 'recordSize',
          width: 80,
          align: 'center'
        },
        {
          title: '加压装置',
          dataIndex: 'recordSize',
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
          dataIndex: 'recordSize',
          width: 80,
          align: 'center'
        }
      ]
    },
    {
      title: '是否落实恰当措施',
      children: [
        {
          title: '点击一下即√点第二下×',
          dataIndex: 'recordSize',
          width: 80,
          align: 'center'
        }
      ]
    },
    {
      title: '签名人',
      children: [
        {
          title: '点击签名',
          dataIndex: 'recordSize',
          width: 80,
          align: 'center'
        }
      ]
    }
  ]

  const exportExcel = () => {
    let data = {
      beginDate: qualityControlRecordVM.filterDate[0].format('YYYY-MM-DD'),
      endDate: qualityControlRecordVM.filterDate[1].format('YYYY-MM-DD'),
      wardCode: selectedDept
    }
    writingFormService.exportExcel(data).then((res) => {
      fileDownload(res)
    })
  }

  useEffect(() => {
    service.commonApiService.getNursingUnitAll().then((res) => {
      setDeptList(res.data.deptList)
    })
    getTableData()
  }, [])

  const getTableData = () => {
    setLoadingTable(true)

    if (
      qualityControlRecordVM.filterDate &&
      qualityControlRecordVM.filterDate[0] &&
      qualityControlRecordVM.filterDate[1]
    ) {
      writingFormService
        .docWrite({
          beginDate: qualityControlRecordVM.filterDate[0].format('YYYY-MM-DD'),
          endDate: qualityControlRecordVM.filterDate[1].format('YYYY-MM-DD'),
          wardCode: selectedDept
        })
        .then((res) => {
          let r: any= [{
            recordSize: ''
          }]
          setTableData(r)
          setLoadingTable(false)
        })
    } else {
      message.warning('时间不能为空')
    }
  }

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle>术科VTE质量单统计</PageTitle>
        </LeftIcon>
        <RightIcon>
          <div className='item'>
            <div className='label'>日期：</div>
            <div className='content'>
              <DatePicker.RangePicker
                allowClear={false}
                value={qualityControlRecordVM.filterDate}
                onChange={(value) => {
                  qualityControlRecordVM.filterDate = value
                  getTableData()
                }}
                style={{ width: 220 }}
              />
            </div>
          </div>
          {/* <div className='item'>
            <div className='label'>科室：</div>
            <div className='content'>
              <Select style={{ width: 200 }} value={selectedDept} onChange={(val: any) => setSelectedDept(val)}>
                <Select.Option value=''>全部</Select.Option>
                {deptList.map((item: any) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div> */}
          <div className='item'>
            <div className='label'>质控科室：</div>
            <div className='content'>
              <DeptSelect onChange={(val: any) => setSelectedDept(val)} style={{ width: 160 }} />
            </div>
          </div>

          <div className='item'>
            <Button type='primary' className='statistics' onClick={getTableData}>
              查询
            </Button>
          </div>
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
        </RightIcon>
      </HeaderCon>
      <MidCon>
        <Title>术科VTE质量表</Title>
        <TableCon>
          <BaseTable
            type={['index']}
            surplusHeight={300}
            surplusWidth={80}
            loading={loadingTable}
            dataSource={tableData}
            columns={columns}
          />
        </TableCon>
      </MidCon>
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
