import styled from "styled-components"
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Input, Modal, Select } from "antd"
import DeptSelect from "src/components/DeptSelect"
import { DatePicker } from "src/vendors/antd"
import moment from "moment"
import { getCurrentMonth } from "src/utils/date/currentMonth"
import api from "./api"
import BaseTable from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import { Obj } from "src/libs/types"

interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  isMulti?: boolean,
  // 可显示的搜索参数
  searchCodes?: string[]
}
const getLastSixMonths = () => {
  const currentDate = moment(moment().format('YYYY-MM-DD'))
  const preSixMonthDate = moment(moment().subtract(6, 'month').format('YYYY-MM-DD'))
  return [preSixMonthDate, currentDate]
}
export default observer((props: Props) => {
  const { location } = appStore
  /**是否病区登记本及武汉 by wh */
  const isWR = useMemo(() => location.pathname.includes('/wardRegister') && 'wh' === appStore.HOSPITAL_ID, [location.pathname])
  const { visible, onOk, onCancel, isMulti = false, searchCodes = ['wardCode', 'status', 'time', 'name', 'patientId', 'inpNo', 'bedLabel'] } = props
  const [loading, setLoading] = useState(false)
  const [form, setForm]: any = useState({
    status: '1',
    time: appStore.HOSPITAL_ID === 'whsl' ? getLastSixMonths() : getCurrentMonth()
  })
  const setFormItem = (item: {}) => {
    setForm({ ...form, ...item })
  }
  const [tableData, setTableData] = useState<Obj[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20
  })
  const [pages, setPages] = useState(1)
  const columns: any = [
    {
      title: '护理单元',
      dataIndex: 'wardName',
      align: 'left'
    },
    {
      title: '床号',
      dataIndex: 'bedLabel',
      align: 'center',
      width: 60
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 70,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 50
    },
    {
      title: '住院号',
      dataIndex: 'inpNo',
      align: 'center',
      width: 110
    },
    {
      title: '病人ID',
      dataIndex: 'patientId',
      align: 'center',
      width: 110
    },
    {
      title: '次数',
      dataIndex: 'visitId',
      align: 'center',
      width: 50
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDate',
      align: 'center'
    },
  ]
  const columns1: any = [

    {
      title: '住院号',
      dataIndex: 'medicareNo',
      align: 'center',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'patName',
      align: 'center',
      width: 80,
    },
    {
      title: '床号',
      dataIndex: 'bedCode',
      align: 'center',
      width: 80,
    },
    {
      title: '入院时间',
      dataIndex: 'inHospDateTime',
      align: 'center',
      width: 100,
    },
    {
      title: '住院天数',
      dataIndex: 'inHospDays',
      align: 'center',
      width: 80,
    },
    {
      title: '转归',
      dataIndex: 'dischCondit',
      align: 'center',
      width: 80,
    },
    {
      title: '出院诊断',
      dataIndex: 'disDiag',
      align: 'center',
      width: 120,
    },
    {
      title: '医师签名',
      dataIndex: 'mainDoctor',
      align: 'center',
      width: 80,
    },
    {
      title: '联系方式',
      dataIndex: 'telphone',
      align: 'center',
      width: 100,
    },
    {
      title: '责任护士',
      dataIndex: 'mainNurse',
      align: 'center',
      width: 60,
    },
  ]

  const getData = async () => {
    const dateBegin = moment(form.time[0]).format('YYYY-MM-DD')
    const dateEnd = moment(form.time[1]).format('YYYY-MM-DD')
    let params: Obj = {
      wardCode: form.wardCode,
      name: form.name,
      status: form.status,
      patientId: form.patientId,
      inpNo: form.inpNo,
      bedLabel: form.bedLabel,
      admissionDateBegin: form.status === '1' ? dateBegin : '',
      admissionDateEnd: form.status === '1' ? dateEnd : '',
      dischargeDateBegin: form.status === '2' ? dateBegin : '',
      dischargeDateEnd: form.status === '2' ? dateEnd : '',
      pageIndex: pagination.current,
      pageNum: pagination.pageSize
    }
    params.wardCode === '全院' && delete params.wardCode
    if (isWR) {
      params = {
        wardCode: form.wardCode === '全院' ? '' : form.wardCode,
        // tradeCode: "getdischargedpatient",
        startDate: dateBegin,     //开始日期
        endDate: dateEnd,
      }
    }
    setLoading(true)
    const fn = isWR ? api.getDischargedPatient : api.getPatientList
    const { data } = await fn.call(api, params)
    setLoading(false)
    if (isWR) {
      setTableData(data.data || [])
    } else {
      setTableData(data.list)
      setPages(data.page)
    }
    setSelected([])
  }

  const handleChange = async (keys: any[]) => {
    if (!isMulti) {
      if (keys.length > 1) {
        setSelected([keys[keys.length - 1]])
        return
      }
    }
    setSelected(keys)
  }

  const handleOk = async () => {
    const arr = selected.map(v => tableData.find((v1: Obj) => v1.patientId === v))
    // const { data } = await api.getPatientItem(selected.patientId, selected.visitId)
    // const obj = {
    //   patientId: data.patientId,
    //   patientName: data.name,
    //   wardCode: data.wardCode,
    //   wardName: data.wardName,
    //   inpNo: data.inpNo,
    //   visitId: data.visitId,
    //   bedLabel: data.bedLabel,
    //   admissionDate: moment(data.admissionDate),
    //   sex: data.sex,
    //   birthday: data.birthday
    // }
    onOk(arr)
  }
  /**是否搜索添加 */
  const isSearchCondition = (text: string) => {
    return searchCodes.includes(text)
  }

  useEffect(() => {
    getData()
  }, [form, pagination])
  useLayoutEffect(() => {
    if (visible)
      setSelected([])
  }, [visible])

  return (
    <Modal
      title={`选择患者`}
      centered
      width={1100}
      visible={visible}
      onCancel={() => onCancel()}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => onCancel()}>
            取消
          </Button>
          <Button type='primary' disabled={!selected.length} onClick={handleOk}>
            确定
          </Button>
        </div>
      }
    >
      <Wrapper>
        <TableWrapper>
          <BaseTable
            surplusWidth={20}
            loading={loading}
            columns={isWR ? columns1 : columns}
            dataSource={tableData}
            surplusHeight={200}
            wrapperStyle={{ padding: 0 }}
            rowKey="patientId"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selected,
              onChange: handleChange
            }}
            pagination={isWR ? false : {
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: (pages * pagination.pageSize),
              showTotal: () => `共 ${pages || 1} 页`
            }}
            onChange={(page: any) => {
              setPagination({
                current: page.current,
                pageSize: page.pageSize
              })
            }}
          />
        </TableWrapper>
        <SearchWrapper>
          {isSearchCondition('wardCode') && <>
            <div className='label'>护理单元:</div>
            <div className='item'>
              <DeptSelect hasAllDept deptCode={authStore.defaultDeptCode} style={{ width: '100%' }}
                onChange={deptCode => setFormItem({ 'wardCode': deptCode })} />
            </div>
          </>
          }
          {isSearchCondition('status') && <>

            <div className='label'>出入院:</div>
            <Select value={form.status} className='item'
              onChange={(val: string) => setFormItem({ 'status': val })}>
              <Select.Option value="1">在院</Select.Option>
              <Select.Option value="2">出院</Select.Option>
            </Select>
          </>
          }
          {isSearchCondition('time') && <>
            <div className='label'>时间:</div>
            <DatePicker.RangePicker
              className='item'
              value={form.time}
              onChange={(dates) => setFormItem({ 'time': dates })} />
          </>
          }
          <div className='label'>病人信息:</div>
          {isSearchCondition('name') && <>
            <Input value={form.name} className='item' placeholder='姓名'
              onChange={(event => setFormItem({ 'name': event.target.value }))} />
          </>
          }
          {isSearchCondition('patientId') && <>
            <Input value={form.patientId} className='item' placeholder='病人ID'
              onChange={(event => setFormItem({ 'patientId': event.target.value }))} />
          </>
          }
          {isSearchCondition('inpNo') && <>
            <Input value={form.inpNo} className='item' placeholder='住院号'
              onChange={(event => setFormItem({ 'inpNo': event.target.value }))} />
          </>
          }
          {isSearchCondition('bedLabel') && <>
            <Input value={form.bedLabel} className='item' placeholder='床号'
              onChange={(event => setFormItem({ 'bedLabel': event.target.value }))} />
          </>
          }
          <Button type='primary' className='item' onClick={() => getData()}>查询</Button>
        </SearchWrapper>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
              height: 500px;
              display: flex;
              `

const TableWrapper = styled.div`
              width: 80%;
              height: 100%;
              `
const SearchWrapper = styled.div`
              width: 20%;
              padding-left: 10px;

              .label{
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              }
              .item{
              width: 100%;
              margin-bottom: 10px;
              }
              `