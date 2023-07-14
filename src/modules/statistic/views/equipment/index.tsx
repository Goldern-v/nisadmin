import BaseTable from 'src/components/BaseTable'
import styled from 'styled-components'
import React, { useEffect, useState, useRef} from 'react'
import { observer } from 'mobx-react'
import { Obj } from 'src/libs/types'
import DeptSelect from "src/components/DeptSelect";
import SelectData from "src/modules/statistic/common/SelectData";
import { Button, Select, Modal, Checkbox,  Row, Col, message } from "antd";
import api from '../../api/StatisticsApi'
import { authStore } from 'src/stores/index'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'

const { Option } = Select;

export interface Props {
}
export default observer(function PatientFlow(props: Props) {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Obj[]>([])
  const [typeList, setTypeList] = useState<Obj[]>([])
  const [device, setDevice] = useState<Obj[]>([])
  const [statisticalList, setStatisticalList] = useState(['汇总统计', '明细统计'])
  const [search, setSearch] = useState({
    statistical: '汇总统计',
    type: '',
  })
  const [statuses, setStatuses] = useState(true)
  const [visible, setVisible] = useState(false)
  
  const [typeOptions, setTypeOptions] = useState([])

  const [columns, setColumns] = useState<Obj[]>([])

  const DeptChange = (value: string) => {
    if (value === '全院') {
      setStatuses(false)
      setStatisticalList(['汇总统计'])
      setSearch({ ...search, statistical: '汇总统计' })
    } else {
      if (search.statistical === '汇总统计') {
        setStatuses(false)
      } else {
        setStatuses(true)
      }
      setStatisticalList(['汇总统计', '明细统计'])
    }
  };

  function searchButtonClick() {
    getDeviceUsageCount()
  }

  // 统计查询
  const getDeviceUsageCount = async (type: string = '', method: string = '') => {
    setLoading(true)
    let params = {
      wardCode: authStore.selectedDeptCode === '全院' ? '' : authStore.selectedDeptCode,
      wardName: authStore.selectedDeptNameOnly,
      method: search.statistical,
      type: statuses ? search.type : '',
      beginTime: statisticViewModel.startDate,
      endTime: statisticViewModel.endDate,
    }
    let { data: { item, row, column } } = await api.getDeviceUsageCount(params)
    setLoading(false)
    let arr = []
    for(let [key,val] of Object.entries(item || {})){
      arr.push({...JSON.parse(JSON.stringify(val)), '科室': key})
    };

    let rowSum = 0
    let newArr = arr.map((item, index) => {
      rowSum += parseInt(row[index])
      return { ...item, '合计': row[index] }
    })

    let columnSum = 0
    Object.values(column || {}).map((key:any) => {
      columnSum += parseInt(key)
    })
    // console.log(rowSum, columnSum, '计算')
    setData([...newArr, { ...column, '科室': '合计', '合计': rowSum + columnSum}])

  }

  // 查询汇总统计设备类别当表格的columns（设备类别没有科室之分）table表头）
  const getAlldeviceType = async(deptCode: string = '') => {
    let { data } = await api.getAllNeedCount_deviceType()
    if (data && data.length > 0) {
      let columns = data.map((item:any) => {
        return Object.assign({
          title: item,
          dataIndex: item,
          align: 'center',
        }, data.length > 7 ? { width: 120 } : {})
      })
      setColumns([
        {
          title: deptCode === '全院' ? '科室' : '使用人员',
          dataIndex: '科室',
          width: 180,
          align: 'center',
          fixed: 'left',
        },
        ...columns,
        {
          title: '合计',
          dataIndex: '合计',
          width: 80,
          align: 'center',
          fixed: 'right',
        }
      ])
    } else setColumns([])
  }

  // 选择某一个科室 和 明细统计 和 设备类别（table表头）
  const getAllNeedCount = async(value: string = '') => {
    let { data } = await api.getAllNeedCount({
      wardName: authStore.selectedDeptNameOnly,
      type: value || search.type
    })
    if (data && data.length > 0) {
      let columns = data.map((item:any) => {
        return Object.assign({
          title: item,
          dataIndex: item,
          align: 'center',
        }, data.length > 7 ? { width: 120 } : {})
      })
      setColumns([
        {
          title: '使用人员',
          dataIndex: '科室',
          width: 180,
          align: 'center',
          fixed: 'left',
        },
        ...columns,
        {
          title: '合计',
          dataIndex: '合计',
          width: 80,
          align: 'center',
          fixed: 'right',
        }
      ])
    } else setColumns([])
  }

  const statisticalChange = (value: string, text: string) => {
    setSearch({...search, [text]: value})
    if (value === '汇总统计') {
      setStatuses(false)
    } else {
      setStatuses(true)
    }
    
  }
  const setDeviceType = () => {
    setVisible(true)
    getAllDeviceTypeOrDevice()
  }

  // 获取所有的设备类别 或者 所有的设备 (所有的设备: 点击选择按钮【设置统计设备】 获取设备)
  const getAllDeviceTypeOrDevice = async () => {
    let { data } = !statuses ? 
    await api.getAllDeviceType() 
    : 
    await api.getByDevice({
      wardName: authStore.selectedDeptNameOnly,
      type: search.type
    })

    let newData = (data || []).map((item: any) => {
      if (item.isCount) return item.id
    })
    setTypeOptions(newData)
    setDevice(data || [])
  }

  // 获取所有的设备类别 -- (标头查询-设备类别)
  const getAllDeviceType = async () => {
    let { data } = await api.getAllDeviceType() 
    setTypeList(data || [])
    setSearch({...search, type: data.length > 0 ? data[0].name : ''})
  }


  const onOk = async () => {
    let res = !statuses ? await api.changeIsCountType(device) : await api.changeIsCountDevice(device)
    let text = !statuses ? '设备类别' : '设备'
    setVisible(false)
    if (res && res.code === '200') {
      message.success(`设备统计的${text}成功！`)
      if (authStore.selectedDeptCode === '全院' || search.statistical === '汇总统计') {
        getAlldeviceType(authStore.selectedDeptCode)
      } else {
        getAllNeedCount()
      }
      getDeviceUsageCount()
    } else {
      message.error(res.desc || `设备统计的${text}失败！`)
    }
  }
  const onCancel = () => {
    setVisible(false)
  }

  const typeCheckChange = (value: any) => {
    let typeList_new: any[] = device
    let value_new = value
    
    typeList_new.forEach((item) => {
      try {
        value_new.forEach((id:any) =>  {
          if (id === item.id) {
            item.isCount = 1;
            throw new Error('End Loop')
          } else item.isCount = 0;
        })
      } catch {}
    })
    setTypeOptions(value)
    setTypeList(typeList_new)
  }

  useEffect(() => {
    getAllDeviceType()
    // getAlldeviceType(authStore.selectedDeptCode)
    // getDeviceUsageCount()
    
  }, [])

  useEffect(() => {
    if (didMountRef.current) {
      if (authStore.selectedDeptCode === '全院' || search.statistical === '汇总统计') {
        getAlldeviceType(authStore.selectedDeptCode)
      } else {
        getAllNeedCount()
      }
      getDeviceUsageCount()
    } else didMountRef.current = true;
  }, [search.statistical, search.type, statisticViewModel.startDate,statisticViewModel.endDate, authStore.selectedDeptCode]);

  return (
    <Wrapper>
      <Header>
        <SelectData />
        <span className="text">科室：</span>
        <DeptSelect onChange={DeptChange} hasAllDept />
        <div>
          <span className="text">统计方式：</span>
          <Select value={search.statistical} style={{ width: 100 }} onChange={(value: any) => statisticalChange(value, 'statistical')}>
            {statisticalList.map(item => {
              return <Option value={item}>{item}</Option>
            })}
          </Select>
        </div>
        {
          statuses && 
          <div>
            <span className="text">设备类别：</span>
            <Select showSearch defaultValue={search.type} style={{ width: 100 }} onChange={(value: any) => statisticalChange(value, 'type')}>
              {typeList.map((item: any) => {
                return <Option value={item.name}>{item.name}</Option>
              })}
            </Select>
          </div>
        }
        <Button
          type="primary"
          style={{ margin: "0 0 0 10px", width: "70px" }}
          onClick={searchButtonClick}
        >
          查询
        </Button>
      </Header>
      <Button
        type="primary"
        className='setDevice'
        onClick={setDeviceType}
      >
        {!statuses ? '设置统计设备类别' : '设置统计设备'}
      </Button>
      <BaseTable
        className="record-page-table"
        loading={loading}
        dataSource={data}
        columns={columns}
        surplusHeight={210}
        surplusWidth={300}
        title={() => <span>设备使用情况统计</span>}
      />
      <Modal
        title="请选择需要统计的设备类别"
        width="60%"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Checkbox.Group value={typeOptions} style={{ width: '100%' }} onChange={typeCheckChange}>
          <Row>
            {
              device.map(item => {
                return (
                  <Col span={6}>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </Col>
                )
              })
            }
          </Row>
        </Checkbox.Group>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`
padding: 0 20px 20px 20px;
position: relative;
.ant-table-title {
  font-size: 21px;
  font-weight: bold;
  text-align: center;
}
.setDevice{
  width: 135px;
  position: absolute;
  right: 44px;
  top: 76px; 
  z-index: 10
}
`
const Header = styled.div`
  display: flex;
  background: #fff;
  padding: 10px;
  .text{
    line-height: 30px;
    padding-left: 10px;
  }
`