import styled from 'styled-components'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ModalComponentProps } from "src/libs/createModal"
import { DatePicker, Input, message, Modal } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { appStore, authStore } from 'src/stores'
import { InputProps, TextAreaProps } from 'antd/es/input'
import { Select } from 'antd/es'
import { SelectProps } from 'antd/es/select'
import moment, { Moment } from 'moment'
import { Rules } from 'src/components/Form/interfaces'
export interface Props extends ModalComponentProps {
  handleOk: (data:any[]) => void
  data: any[]
}
export interface TSelectProps extends SelectProps {
  list: any[],
  listConfig?: {
    label: string,
    value: string
  }
}
const { Option } = Select
const { TextArea } = Input
const TInput = memo(function(props: InputProps) {
  return <Input
    size='small'
    {...props} />
}, (per, cur) => {
  return per.value  ===  cur.value
})
const TTextArea = memo(function(props: TextAreaProps) {
  return <TextArea
      {...props} />
}, (per, cur) => {
  return per.value  ===  cur.value
})
const TSelect = memo(function(props: TSelectProps) {
  let {
    list,
    listConfig = {
      label: 'label',
      value: 'value',
    },
    ...args} = props
  const { value: val, label } = listConfig
  return <Select
  size='small'
  allowClear
  {...args}>
    { props.list.map((v: any, i:number) => <Option value={v[val]} key={i}>{v[label]}</Option>) }
  </Select>
}, (per, cur) => {
  return per.value  ===  cur.value
})
const TDatePicker = memo(function(props: any) {
  return <DatePicker
    size='small'
    format='YYYY-MM-DD'
    {...props}
   />
})

const sexArr = [
  { label: '男', value: '0' },
  { label: '女', value: '1' },
]
const titleArr = [
  { label: '见习护士', value: '见习护士' },
  { label: '护士', value: '护士' },
  { label: '主管护师', value: '主管护师' },
  { label: '副主任护师', value: '副主任护师' },
  { label: '主任护师', value: '主任护师' },
]
const educationArr = [
  { label: '博士', value: '9' },
  { label: '研究生', value: '8' },
  { label: '本科', value: '7' },
  { label: '大专', value: '6' },
  { label: '中专', value: '5' },
]
const isResidentArr = [
  { label: '是', value: '1' },
  { label: '否', value: '0' },
]
// 科室code对应name
const keys = {
  'studyDeptCode01': 'studyDeptName01'
}
// 导入展示弹窗
export default function SheetDetailModal(props: Props) {
  const { visible, onCancel, handleOk, data } = props
  const [tableData, setTableData] = useState<any[]>([])
  /**
   * 初始化tableData
   * @param data 
   */
  const initTableData = (data: any[]) => {
    return data.map((v: any) => {
      const item = { ...v }
      // item.sex = sexArr.find((v1: any) => v1.label == v.sex)?.value || ''
      item.education = educationArr.find((v1: any) => v1.label == v.education)?.value || ''
      item.title = titleArr.find((v1: any) => v1.label == v.title)?.value || ''
      item.isResident = isResidentArr.find((v1: any) => v1.label == v.isResident)?.value || ''
      const curDept = authStore.deptList.find((v1: any) => v1.name == v.studyDeptName01)
      item.studyDeptCode01 = curDept?.code || ''
      item.studyDeptName01 = curDept?.name || ''
      item.studyTimeBegin = moment(item.studyTimeBegin).toString() == 'Invalid date' ? null : item.studyTimeBegin
      item.studyTimeEnd = moment(item.studyTimeEnd).toString() == 'Invalid date' ? null : item.studyTimeEnd
      return item
    })
  }
  useEffect(() => {
    if (data) {
      setTableData(initTableData(data))
    }
  }, [data])
  const setItem = useCallback((e: any, key:string, index: number) => {
    console.log('test-value', e)
    let value: string = ''
    if (['string'].includes(typeof e)) {
      value = e
    } else if ((e as any)?.target != undefined) {
      value = e.target.value
    } else if (e instanceof moment) {
     value = (e as Moment).format('YYYY-MM-DD') 
    }
    if (['studyDeptCode01'].includes(key)) {
      let item: any | undefined = value ? authStore.deptList.find(v => v.code == value) : undefined
      return setTableData((data) => data.map((v: any, i:number) => i === index ? { ...v, [key]: value, [keys[key]]: item?.name || '' } : v))
    }
    // 输入框
    // let { value } = e.target
    setTableData((data) => data.map((v: any, i:number) => i === index ? { ...v, [key]: value } : v))
  },[tableData])
  // 必填
  const rules: Rules = {
    name: val => !!val || "姓名不能为空",
    sex: val => !!val || "性别不能为空",
    age: val => !!val || "年龄不能为空",
    title: val => !!val || "职称不能为空",
    education: val => !!val || "学历不能为空",
    originalWorkUnit: val => !!val || "原单位名称不能为空",
    originalDepartment: val => !!val || "原科室不能为空",
    idCardNo: val => !!val || "身份证号码不能为空",
    phone: val => !!val || "联系电话不能为空",
    isResident: val => !!val || "是否住宿不能为空",
    studyTimeBegin: val => !!val || "进修开始时间不能为空",
    studyTimeEnd: val => !!val || "进修结束时间不能为空",
    studyDeptCode01: val => !!val || "进修科室一不能为空",
    address: val => !!val || "家庭住址不能为空",
    emergencyContactPerson: val => !!val || "紧急联系人不能为空",
    emergencyContactPhone: val => !!val || "紧急联系人电话不能为空"
  }
  /**
   * 校验数据
   */
  const validData = () => {
    let errText: string[] = []
    tableData.forEach((v: any, i: number) => {
      for (let key in rules) {
        if (rules[key] ) {
  
          let result: any = rules[key]
            
          if (result instanceof Function) {
            result = result(v[key])
          }
          if (typeof result !== 'boolean') {
            errText[i] ? (errText[i] += `${result}\n`) : errText.push(`第${i + 1}项${result}\n`)
            // throw(new Error('找到空数据'))
          }
        }
      }
    })
    if (errText.length) {
      message.error(errText.join('\n'))
      return false
    }
    return true
  }
  const onOk = () => {
    if (validData()) {

      handleOk(tableData)
    }
  }
  //表格数据
  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 60
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 80,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'name', index)
        }} />)
      }
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 80,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TSelect value={text} list={sexArr} onChange={(e) => {
          setItem(e, 'sex', index)
        }} />)
      }
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 70,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'age', index)
        }} />)
      },
    },
    {
      title: "职称",
      dataIndex: "title",
      width: 120,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TSelect value={text} list={titleArr} onChange={(e) => {
          setItem(e, 'title', index)
        }} />)
      }
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 100,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TSelect value={text} list={educationArr} onChange={(e) => {
          setItem(e, 'education', index)
        }} />)
      }
    },
    {
      title: "原单位名称",
      dataIndex: "originalWorkUnit",
      width: 150,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'originalWorkUnit', index)
        }} />)
      },
    },
    {
      title: "原科室",
      dataIndex: "originalDepartment",
      width: 180,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'originalDepartment', index)
        }} />)
      },
    },
    {
      title: "身份证号码",
      dataIndex: "idCardNo",
      width: 180,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'idCardNo', index)
        }} />)
      },
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      width: 120,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'phone', index)
        }} />)
      },
    },
    {
      title: "是否住宿",
      dataIndex: "isResident",
      width: 80,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TSelect value={text} list={isResidentArr} onChange={(e) => {
          setItem(e, 'isResident', index)
        }} />)
      },
    },
    {
      title: "宿舍编号",
      dataIndex: "dormitoryNumber",
      width: 180,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'dormitoryNumber', index)
        }} />)
      },
    },
    {
      title: "进修开始时间",
      dataIndex: "studyTimeBegin",
      width: 210,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TDatePicker value={text ? moment(text) : null} onChange={(e:any) => {
          setItem(e, 'studyTimeBegin', index)
        }} />)
      }
    },
    {
      title: "进修结束时间",
      dataIndex: "studyTimeEnd",
      width: 210,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TDatePicker value={text ? moment(text) : null} onChange={(e:any) => {
          setItem(e, 'studyTimeEnd', index)
        }} />)
      }
    },
    
    {
      title: "进修科室一",
      dataIndex: "studyDeptCode01",
      width: 200,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TSelect value={text} list={authStore.deptList} listConfig={{label: 'name', value: 'code'}} onChange={(e) => {
          setItem(e, 'studyDeptCode01', index)
        }} />)
      },
    },
    {
      title: "家庭住址",
      dataIndex: "address",
      width: 250,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'address', index)
        }} />)
      },
    },
    {
      title: "紧急联系人",
      dataIndex: "emergencyContactPerson",
      width: 100,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'emergencyContactPerson', index)
        }} />)
      },
    },
    {
      title: "紧急联系人电话",
      dataIndex: "emergencyContactPhone",
      width: 150,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TInput value={text} onChange={(e) => {
          setItem(e, 'emergencyContactPhone', index)
        }} />)
      },
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: 200,
      align: "center",
      render(text: string, row: any, index: number) {
        return (<TTextArea value={text} onChange={(e) => {
          setItem(e, 'remark', index)
        }} />)
      },
    },
  ];

  return (
    <Modal
      title="导入"
      visible={visible}
      width={1200}
      onCancel={onCancel}
      onOk={onOk}
      centered>
      <Wrapper>
        <BaseTable
          dataSource={tableData}
          columns={columns}
          surplusWidth={350}
          surplusHeight={300}
        />
      </Wrapper>
    </Modal>
  )
}
const Wrapper = styled.div`
  text-align: center;
  .ant-select {
    width: 100%
  }
`