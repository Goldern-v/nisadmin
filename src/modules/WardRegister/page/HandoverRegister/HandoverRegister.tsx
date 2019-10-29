import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import HeadCon from '../../components/HeadCon/HeadCon'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps, PaginationConfig, AutoComplete, message } from 'src/vendors/antd'
import { wardRegisterService } from '../../services/WardRegisterService'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { wardRegisterViewModal } from '../../WardRegisterViewModal'
export interface Props {}

export default observer(function HandoverRegister() {
  const [oldData, setOldData]: any = useState({})
  const [dataSource, setDataSource] = useState([])
  const [itemConfigList, setItemConfigList] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })
  const [total, setTotal] = useState(0)
  const updateDataSource = () => {
    setDataSource([...dataSource])
  }
  const columns: ColumnProps<any>[] | any = [
    {
      title() {
        return (
          <LineCon>
            <TextCon>
              <Text x='20%' y='75%' deg='0'>
                日期
              </Text>
              <Text x='65%' y='77%' deg='22'>
                班次
              </Text>
              <Text x='80%' y='62%' deg='21'>
                质量
              </Text>
              <Text x='83%' y='35%' deg='12'>
                基数
              </Text>
              <Text x='82%' y='8%' deg='0'>
                物品
              </Text>
            </TextCon>
            <SvgCon xmlns='http://www.w3.org/2000/svg' version='1.1'>
              <line x1='0' y1='0' x2='60%' y2='100%' />
              <line x1='0' y1='0' x2='100%' y2='100%' />
              <line x1='0' y1='0' x2='100%' y2='33%' />
              <line x1='0' y1='0' x2='100%' y2='66%' />
              <line x1='0' y1='0' x2='100%' y2='100%' />
            </SvgCon>
          </LineCon>
        )
      },
      dataIndex: 'recordDate',
      align: 'center',
      colSpan: 2,
      width: 107,
      fixed: 'left'
    },
    {
      title: '头部',
      colSpan: 0,
      width: 73,
      dataIndex: 'range',
      align: 'center',
      fixed: 'left'
    },
    ...itemConfigList.map((item: any) => {
      if (item.checkSize) {
        return {
          title(text: string, record: any, index: number) {
            return (
              <ThBox>
                <div className='title'>
                  <span className='title-text'>{item.itemCode}</span>
                </div>
                <div className='aside'>{item.checkSize}</div>
              </ThBox>
            )
          },
          align: 'center',
          dataIndex: item.itemCode,
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                dataSource={(item.options || '').split(';')}
                value={text}
                onChange={(value) => {
                  record[item.itemCode] = value
                  updateDataSource()
                }}
              />
            )
          }
        }
      } else {
        return {
          title(text: string, record: any, index: number) {
            return (
              <ThBox>
                <div className='title'>
                  <span className='title-text'>{item.itemCode}</span>
                </div>
              </ThBox>
            )
          },
          align: 'center',
          dataIndex: item.itemCode,
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                dataSource={(item.options || '').split(';')}
                value={text}
                onChange={(value) => {
                  record[item.itemCode] = value
                  updateDataSource()
                }}
              />
            )
          }
        }
      }
    }),

    {
      title: '备注',
      width: 100,
      render(text: string, record: any, index: number) {
        return ''
      }
    },
    {
      title: '交班者签名',
      width: 80,
      dataIndex: 'signerName',
      align: 'center',
      render(text: string, record: any, index: number) {
        return text
      }
    },
    {
      title: '接班者签名',
      width: 80,
      dataIndex: 'auditorName',
      align: 'center',
      render(text: string, record: any, index: number) {
        return text
      }
    }
  ]

  const onLoad = () => {
    setPageLoading(true)
    wardRegisterService
      .getPage({
        wardCode: authStore.selectedDeptCode,
        recordCode: 'qc_register_handover',
        startDate: wardRegisterViewModal.startDate,
        endDate: wardRegisterViewModal.endDate,
        ...pageOptions
      })
      .then((res) => {
        setTotal(res.data.page.total)
        setDataSource(res.data.page.list)
        setItemConfigList(res.data.itemConfigList)
        setOldData(res.data)
        setPageLoading(false)
      })
  }

  const onSave = () => {
    wardRegisterService
      .saveAndSignAll({
        itemConfigList: oldData.itemConfigList,
        itemDataList: dataSource,
        wardCode: authStore.selectedDeptCode,
        recordCode: 'qc_register_handover'
      })
      .then((res) => {
        message.success('保存成功')
        onLoad()
      })
  }

  useEffect(() => {
    onLoad()
  }, [pageOptions, authStore.selectedDeptCode, wardRegisterViewModal.startDate, wardRegisterViewModal.endDate])
  return (
    <Wrapper>
      <HeadCon
        pageTitle='物品交接登记本'
        setPageTitle='物品交接登记本设置'
        setPageUrl={'/wardRegister/handoverRegisterSet'}
        btnList={[
          {
            name: '查询',
            type: 'primary',
            onClick: () => {
              onLoad()
            }
          },
          {
            name: '保存',
            type: 'primary',
            onClick: () => {
              onSave()
            }
          },
          {
            name: '导出',
            onClick: () => {},
            type: ''
          }
        ]}
      />
      <TableCon>
        <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          surplusWidth={190}
          surplusHeight={300}
          pagination={{
            current: pageOptions.pageIndex,
            pageSize: pageOptions.pageSize,
            total: total
          }}
          onChange={(pagination: PaginationConfig) => {
            setPageOptions({
              pageIndex: pagination.current,
              pageSize: pagination.pageSize
            })
          }}
        />
      </TableCon>
    </Wrapper>
  )
})
const Wrapper = styled.div``
const TableCon = styled.div`
  padding: 0 15px;
  .ant-table-header-column {
    height: 100%;
    > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ant-table-column-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-select {
    margin: 0 -8px;
    border-radius: 0;
    input {
      border: 0;
      border-radius: 0;
      text-align: center;
    }
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
`

const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
    display: flex;
  }
  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`

const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
`

const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: rgb(99, 99, 99);
    stroke-width: 1;
  }
`
const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`
const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${(p) => p.x};
  top: ${(p) => p.y};
  white-space: nowrap;
  transform: rotate(${(p) => p.deg}deg);
`
