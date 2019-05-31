import styled from 'styled-components'
// import React from 'react'
import React, { useState, useEffect } from 'react'
import BaseTable from 'src/components/BaseTable'
import { authStore } from 'src/stores/index'
import emitter from 'src/libs/ev'
import { observer } from 'mobx-react-lite'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi.ts'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
export default observer(function BedSituation () {
  const [tableDate, setTableDate]: any = useState([])
  const [typeGet, setTypeGet] = useState('在院')
  // const [startDate, setStartDate] = useState(statisticViewModel.getStartDate)
  // const [endDate, setEndDate] = useState(statisticViewModel.getEndDate)

  useEffect(() => {
    console.log(tableDate)

    getTableMethods()
    // }, [startDate, endDate, typeGet, authStore.selectedDeptCode])
  }, [])
  const getTableMethods = () => {
    const postDate = {
      startDate: statisticViewModel.startDate,
      endDate: statisticViewModel.endDate,
      deptCode: authStore.selectedDeptCode,
      type: typeGet
    }
    StatisticsApi.patientStatistics(postDate).then((res) => {
      if (res.data) {
        setTableDate(res.data)
      }
    })
  }
  const columns: any = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '住院号',
      dataIndex: 'visitId',
      key: 'visitId',
      align: 'center'
    },
    {
      title: '受教育程度',
      dataIndex: 'educationLevel',
      key: 'educationLevel',
      align: 'center'
    },
    {
      title: 'MMSE得分',
      dataIndex: 'mmseScore',
      key: 'mmseScore ',
      align: 'center'
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDateTime',
      key: 'admissionDateTime',
      align: 'center'
    },
    {
      title: '入院科室',
      dataIndex: 'admissionDept',
      key: 'admissionDept',
      align: 'center'
    },
    {
      title: '出院日期',
      dataIndex: 'dischargeDateTime',
      key: 'dischargeDateTime',
      align: 'center'
    },
    {
      title: '出院科室',
      dataIndex: 'dischargeDeptCode',
      key: 'dischargeDeptCode',
      align: 'center'
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      width: 200,
      align: 'left'
    },
    {
      title: '主管医生',
      dataIndex: 'doctor',
      key: 'doctor',
      align: 'center'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '单位电话',
      dataIndex: 'companyPhone',
      key: 'companyPhone',
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      key: 'contactName',
      align: 'center'
    },
    {
      title: '联系人电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      align: 'center'
    },
    {
      title: '身份证号',
      dataIndex: 'idNo',
      key: 'idNo',
      align: 'center'
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    }
    // {
    //   title: '操作',
    //   dataIndex: 'cz',
    //   key: '8',
    //   width: 100,
    //   align: 'center',
    //   render: (text: any, record: any, index: any) => {
    //     const DoCon = styled.div`
    //       display: flex;
    //       justify-content: space-around;
    //       cursor: pointer;
    //       font-size: 12px;
    //       color: ${(p) => p.theme.$mtc};
    //     `
    //     return (
    //       <DoCon>
    //         <span
    //           data-index={index}
    //           onClick={(e) => {
    //             deleteClick(e, record, text)
    //           }}
    //           data-record={record}
    //         >
    //           删除
    //         </span>
    //       </DoCon>
    //     )
    //   }
    // }
  ]

  // emitter.removeAllListeners('设置统计页日期')
  // emitter.addListener('设置统计页日期', (value: any) => {
  //   setStartDate(value[0])
  //   setEndDate(value[1])
  // })
  // emitter.removeAllListeners('住院病人认知情况统计表类型')
  emitter.addListener('住院病人认知情况统计表类型', (value: any) => {
    setTypeGet(value)
  })

  emitter.removeAllListeners('住院病人认知情况统计表查询')
  emitter.addListener('住院病人认知情况统计表查询', () => {
    getTableMethods()
  })
  return (
    <Con>
      <TablleScroll>
        <BaseTable dataSource={tableDate} columns={columns} surplusHeight={30} />
      </TablleScroll>
    </Con>
  )
})

const Con = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const TablleScroll = styled.div`
  height: 100%;
  width: 200%;
  .eUYVkN {
    padding: 0;
  }
`
