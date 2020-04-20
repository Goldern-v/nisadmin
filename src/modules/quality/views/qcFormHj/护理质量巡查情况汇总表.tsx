import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import { PageTitle } from 'src/components/common'
import { qcFormHjService } from './api/QcFormHjService'
import { fileDownload } from "src/utils/file/file";
import moment from 'moment'

export interface Props { }

export default observer(function 护理质量巡查情况汇总表(props: Props) {
  const { queryObj } = appStore
  const [filterDate, setFilterDate] = useState([moment(moment().format('YYYY-MM') + '-01'), moment()])

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [qcNameList, setQcNameList] = useState([] as any[])

  const columns: any[] = [
    {
      title: () => {
        return <LineCon>
          <TextCon>
            <Text x="20%" y="70%" deg="0">
              科室
          </Text>
            <Text x="65%" y="70%" deg="22">
              通过率(%)
          </Text>
            <Text x="65%" y="20%" deg="0">
              项目
          </Text>
          </TextCon>
          <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line x1="0" y1="0" x2="60%" y2="100%" />
            <line x1="0" y1="0" x2="100%" y2="80%" />
          </SvgCon>
        </LineCon>
      },
      dataIndex: 'wardName',
      width: 180,
      align: 'left'
    },
    ...qcNameList.map((item: any) => {
      return {
        title: item,
        dataIndex: item,
        width: 100,
      }
    })
  ]

  const getTableData = () => {
    // console.log(queryObj.qcLevel)
    setLoading(true)
    qcFormHjService.countResult({
      qcLevel: queryObj.qcLevel || '1',
      beginDate: filterDate[0].format('YYYY-MM-DD'),
      endDate: filterDate[1].format('YYYY-MM-DD'),
    })
      .then(res => {
        setLoading(false)
        if (res.data) {
          let newQcNameList = res.data.qcNameList || []
          setQcNameList(newQcNameList)
          let newTableData = (res.data.wardDataList || [])
            .map((item: any) => {
              let tableItem = { ...item }

              for (let i = 0; i < newQcNameList.length; i++) {
                let name = newQcNameList[i]
                let val = tableItem.evalRateList[i] || ''
                tableItem[name] = val
              }

              return tableItem
            })

          setTableData(newTableData)
        }
      }, err => setLoading(false))
  }

  const handleExport = () => {
    //fileDownload
    setLoading(true)
    qcFormHjService
      .countResultExport({
        qcLevel: queryObj.qcLevel || '1',
        beginDate: filterDate[0].format('YYYY-MM-DD'),
        endDate: filterDate[1].format('YYYY-MM-DD'),
      })
      .then(res => {
        setLoading(false)
        fileDownload(res)
      }, err => setLoading(false))
  }

  // useEffect(() => {
  //   getTableData()
  // }, [])

  useEffect(() => {
    getTableData()
  }, [filterDate])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>
          {filterDate[0].format('YYYY')}年{queryObj.title || '护理质量巡查情况汇总表'}
        </PageTitle>
      </LeftIcon>
      <RightIcon>
        <div className="item">
          <div className="label">时间：</div>
          <div className="content">
            <DatePicker.RangePicker
              allowClear={false}
              value={[filterDate[0], filterDate[1]]}
              onChange={(value: any) => setFilterDate(value)}
              style={{ width: 220 }}
            />
          </div>
        </div>
        <div className='item'>
          <Button type='primary' onClick={getTableData}>
            查询
          </Button>
        </div>
        <div className="item">
          <Button onClick={handleExport}>
            导出
          </Button>
        </div>
      </RightIcon>
    </HeaderCon>
    <TableCon>
      <BaseTable
        surplusHeight={195}
        loading={loading}
        dataSource={tableData}
        columns={columns}
      />
    </TableCon>
  </Wrapper>
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

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
`
const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
`;

const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: #e8e8e8;
    stroke-width: 1;
  }
`;
const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${p => p.x};
  top: ${p => p.y};
  white-space: nowrap;
  transform: rotate(${p => p.deg}deg);
`;