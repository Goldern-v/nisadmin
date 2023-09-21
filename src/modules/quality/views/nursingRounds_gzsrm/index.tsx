import moment from 'moment'
import DeptSelect from 'src/components/DeptSelect'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import {Button, Checkbox, DatePicker, Select} from 'antd'
import { appStore, authStore } from 'src/stores'
import { fileDownload } from "src/utils/file/file";
import api from '../scoringRecord/api'
interface Props {

}

const defaultForm = {
  wardCode: authStore.selectedDeptCode,
  status: undefined,
  beginDate: undefined,
  endDate: undefined,
  formCodes: [],
  pageIndex: 1,
  pageSize: 20
}
export default observer((props: Props) => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [form, setForm]: any = useState(defaultForm)
  const setFormItem = (item = {}) => {
    setForm({ ...form, ...item })
  }
  const [total, setTotal] = useState(1)
  const statusMap_gzsrm = ['待提交', '待病区整改', '待科护士长审核', '完成']
  const statusMapSelect_gzsrm = ['全部', '待病区整改', '待科护士长审核', '完成']
  const columns_gzsrm: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 30
    },
    {
      title: "日期",
      dataIndex: `itemDataMap.SR0005003`,
      width: 120,
      align: "center",
      render: (text: string) => {
        return (
          moment(text).format('YYYY-MM-DD HH:mm')
        )
      }
    },
    {
      title: "检查病区",
      dataIndex: 'SR0005004',
      width: 120,
      align: "center"
    },
    {
      title: "得分",
      dataIndex: 'SR0005022',
      width: 80,
      align: "center"
    },
    {
      title: "查房问题",
      dataIndex: 'problems',
      width: 80,
      align: "center",
      onCell: () => {
        return {
          style: {
            maxWidth: 80,
            overflow: 'hidden',
            whiteSpace: 'pre-line',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      },
    },
    {
      title: "值班护士",
      dataIndex: 'SR0005007',
      width: 80,
      align: "center"
    },
    {
      title: `查房护士长`,
      dataIndex: 'SR0005001',
      width: 80,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (text: string, row: any, c: any) => {
        return (
          isNaN(row.status) ? '待提交' : statusMap_gzsrm[row.status]
        )
      }

    },
    {
      title: "操作",
      width: 100,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => handleView(row)}>
              查看
            </span>
          </DoCon>
        );
      }
    }
  ]
  const getList = async () => {
    setTableLoading(true)
    const { data } = await api.getList({...form,formCodes:['SR0005']})
    setTableLoading(false)
    setTotal(data.totalCount)
    setTableData(data.list.map((item: any) => {
      return {
        ...item,
        ...item.itemDataMap
      }
    }))
  }
  const addTable = () => {
    appStore.history.push(`/nursingRounds_gzsrm/detail`)
  }

  const handleView = (row: any) => {
    appStore.history.push(`/nursingRounds_gzsrm/detail?id=${row.id}`)
  }
  const onCheckboxChange = (e: { target: { checked: any; }; }) => {
    setTableLoading(true)
    if (e.target.checked) {
      const data = {
        pageIndex: form.pageIndex,
        pageSize: form.pageSize
      }
      api.getPageByCreatorNo(data).then(res => {
        setTableLoading(false)
        if (res.code === '200') {
          setTotal(res.data?.totalCount)
          setTableData(res.data?.list?.map((item: any) => {
            return {
              ...item,
              ...item.itemDataMap
            }
          }))
        }
      })
    } else {
      getList().then()
    }
  }

  useEffect(() => {
    getList().then()
  }, [form])
/*导出*/
  const exportFiles=()=>{
    api.getPageByUserDeptExport({...form}).then(res=>{
      fileDownload(res)
    })
  }
  return (
    <Wrapper>
      <SearchBar>
        <div className='page-title'>护士长夜查房评分记录</div>
      <Checkbox style={{ marginLeft: '14px' }} onChange={onCheckboxChange}>我的创建</Checkbox>
        <div className='button-group'>
          <span className='label'>科室：</span>
          <DeptSelect hasAllDept onChange={(deptCode) => setFormItem({ wardCode: deptCode === '全院' ? '' : deptCode })} />
          <span className='label'>日期：</span>
          <DatePicker.RangePicker
            style={{ width: 220 }}
            value={[form.beginDate, form.endDate]}
            onChange={(val) => setFormItem({ beginDate: val[0], endDate: val[1] })} />
          <span className='label'>状态：</span>
          <Select
            value={form.status}
            style={{ width: '140px' }}
            onChange={(val: string) => setFormItem({ status: val })}>
            {
              statusMapSelect_gzsrm.map((item, index) => {
                return <Select.Option key={index} value={'' + (index === 0 ? '' : index)}>{item}</Select.Option>
              })
            }
          </Select>
          <Button onClick={() => getList()}> 查询</Button>
          { authStore.isRoleManage && <Button onClick={() => addTable()}> 新增</Button>}

          {/* 需要重新写接口联调 */}
          <Button type='primary' onClick={exportFiles}>导出</Button>
        </div>
      </SearchBar>
      <MainWrapper>
        <BaseTable
          type={'index'}
          loading={tableLoading}
          columns={ columns_gzsrm }
          dataSource={tableData}
          surplusHeight={200}
          wrapperStyle={{ borderRadius: '5px' }}
          pagination={{
            current: form.pageIndex,
            pageSize: form.pageSize,
            total: total
          }}
          onChange={(pagination: any) => {
            setFormItem({
              pageIndex: pagination.current,
              pageSize: pagination.pageSize,
            })
          }}
        />
      </MainWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px 20px;
`

const SearchBar = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title{
    font-weight: bold;
    font-size: 18px;
  }
  .button-group{
    display: flex;
    align-items: center;
    .label{
      margin-left: 15px;
    }
    button{
      margin-left:10px;
    }
  }
`


const MainWrapper = styled.div`
  background: #fff;
  //height: calc(100% - 50px);
  padding: 0 20px;
  .itemHide{
    display: none
  }
`
