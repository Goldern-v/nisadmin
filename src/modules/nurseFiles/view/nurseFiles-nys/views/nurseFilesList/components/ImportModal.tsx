import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Radio, DatePicker, Select, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import BaseTable from 'src/components/BaseTable'
import service from 'src/services/api'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { ModalComponentProps } from "src/libs/createModal"
import moment from 'moment'

const TextArea = Input.TextArea
const Option = Select.Option

export interface Props extends ModalComponentProps {
  data?: any[],
  onOkCallback?: Function
}

export default observer(function ImportModal(props: Props) {
  const { visible, onCancel, data, onOkCallback } = props
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [deptList, setDeptList] = useState([] as any[])

  /** 下拉列表 */
  const [educationList, setEducationList] = useState([] as any[])
  const [titleList, setTitleList] = useState([] as any[])
  // const CURRENTLEVEL_LIST = ['N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6']
  const [postList, setPostList] = useState([] as any[])

  //文本类型
  const textAreaRender = (val: any, record: any, idx: number, key: string) => {
    return <TextArea
      defaultValue={val}
      autosize={{ minRows: 1 }}
      onBlur={(e: any) => {
        record[key] = e.target.value
        setTableData(tableData)
      }} />
  }

  //下拉选择类型
  const selectRender = (val: any, record: any, idx: number, key: string, options: any[]) => {
    return <Select
      style={{ width: '100%' }}
      defaultValue={val}
      showSearch
      filterOption={(input: any, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={(val: any) => {
        record[key] = val
        if (key == 'deptCode') {
          let target = deptList.find((item: any) => item.code == val)
          if (target) record.deptName = target.name
        }
        setTableData(tableData)
      }}>
      {options.map((item: any, optIdx: number) =>
        <Option value={item.code} key={optIdx}>{item.name}</Option>)}
    </Select>
  }


  //时间类型
  const dateRender = (val: any, record: any, idx: number, key: string, _format?: string) => {
    const format = _format || 'YYYY-MM-DD'

    return <DatePicker
      allowClear
      format={format}
      defaultValue={val ? moment(val) : undefined}
      onChange={(val: any) => {
        let newVal = ''
        if (val) newVal = val.format(format)

        record[key] = newVal

        setTableData(tableData)
      }} />
  }

  const columns: any[] = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, row: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "科室名称",
      dataIndex: "deptName",
      width: 120,
      className: 'ipt-cell',
      align: "center",
      render: (text: any, row: any, index: number) =>
        selectRender(text, row, index, 'deptName', deptList)
    },
    {
      title: "工号",
      dataIndex: "empNo",
      width: 70,
      className: 'ipt-cell',
      align: "center",
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'empNo')
    },
    {
      title: "姓名",
      dataIndex: "empName",
      width: 70,
      className: 'ipt-cell',
      align: "center",
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'empName')
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 70,
      className: 'ipt-cell',
      align: "center",
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'age')
    },
    {
      title: "性别",
      dataIndex: "sex",
      width: 50,
      className: 'ipt-cell',
      align: "center",
      render: (text: any, row: any, index: number) =>
        selectRender(text, row, index, 'sex', [
          { name: "男", code: "0" },
          { name: "女", code: "1" }
        ])
      // render(sex: any) {
      //   return sex === "0" ? "男" : sex === "1" ? "女" : "";
      // }
    },
    // {
    //   title: "年龄",
    //   dataIndex: "age",
    //   width: 50,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     textAreaRender(text, row, index, 'age')
    // },
    // {
    //   title: "职称",
    //   dataIndex: "newTitle",
    //   width: 90,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     selectRender(text, row, index, 'newTitle',
    //       [{ code: '', name: '' }, ...titleList])
    // },
    // {
    //   title: "类型",
    //   dataIndex: "nurseHierarchy",
    //   width: 70,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     selectRender(text, row, index, 'nurseHierarchy',
    //       CURRENTLEVEL_LIST.map((text: string) => {
    //         return {
    //           code: text,
    //           name: text,
    //         }
    //       }))
    // },
    // {
    //   title: "职务",
    //   dataIndex: "job",
    //   width: 120,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     selectRender(text, row, index, 'job',
    //       [{ code: '', name: '' }, ...postList])
    // },
    {
      title: "最高学历",
      dataIndex: "highestEducation",
      width: 80,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        selectRender(text, row, index, 'highestEducation',
          [{ code: '', name: '' }, ...educationList])
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 70,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'status')
    },
    // {
    //   title: "籍贯",
    //   dataIndex: "nativePlace",
    //   width: 100,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     textAreaRender(text, row, index, 'nativePlace')
    // },
    // {
    //   title: "民族",
    //   dataIndex: "nation",
    //   width: 70,
    //   align: "center",
    //   className: 'ipt-cell',
    //   render: (text: any, row: any, index: number) =>
    //     textAreaRender(text, row, index, 'nation')
    // },
    {
      title: "身份证出生日期",
      dataIndex: "birthday",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        dateRender(text, row, index, 'birthday')
    },
    {
      title: "身份证号",
      dataIndex: "cardNumber",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'cardNumber')
    },
    {
      title: "岗位类别",
      dataIndex: "postType",
      width: 80,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        textAreaRender(text, row, index, 'postType')
    },
    {
      title: "个人身份",
      dataIndex: "grsf",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'grsf')
    },
    {
      title: "参加工作时间",
      dataIndex: "goWorkTime",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        dateRender(text, row, index, 'goWorkTime')
    },
    {
      title: "入职时间",
      dataIndex: "goHospitalWorkDate",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
        dateRender(text, row, index, 'goHospitalWorkDate')
    },
    {
      title: "现有专业技术资格",
      dataIndex: "xyzyjszg",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'xyzyjszg')
    },
    {
      title: "现有专业技术资格级别",
      dataIndex: "xyzyjszgjb",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'xyzyjszgjb')
    },
    {
      title: "现任专业技术职务",
      dataIndex: "xrzyjszw",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'xrzyjszw')
    },
    {
      title: "现任专业技术职务级别",
      dataIndex: "xrzyjszwjb",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'xrzyjszwjb')
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      width: 120,
      align: "center",
      className: 'ipt-cell',
      render: (text: any, row: any, index: number) =>
      textAreaRender(text, row, index, 'phone')
    },
  ]
  //nurseFilesListViewModel.loadNursingList()
  const handleOk = () => {
    setLoading(true)
    let list = tableData.map((item) => {
      return {
        ...item,
        isNurse: true
      }
    })
    nurseFilesService
      .saveListImport(list)
      .then(res => {
        setLoading(false)
        onCancel && onCancel()
        onOkCallback && onOkCallback()
        message.success('导入成功')
      }, () => setLoading(false))
  }



  useEffect(() => {
    /** 科室 */
    service.commonApiService
      .getNursingUnitAll()
      .then(res => {
        if (res.data.deptList) setDeptList(res.data.deptList)
      })

    /** 职务 */
    service.commonApiService.dictInfo("user_new_job").then(res => {
      setPostList(res.data);
    });

    /** 职称 */
    service.commonApiService.dictInfo("user_new_title").then(res => {
      setTitleList(res.data);
    });

    // /** 类型 --南医三专有 */
    // service.commonApiService.dictInfo("user_new_nansan_type").then(res => {
    //   setNansanTypeList(res.data);
    // });

    /** 学历 */
    service.commonApiService
      .dictInfo("user_new_highest_education")
      .then(res => {
        setEducationList(res.data);
      });
  }, [])

  useEffect(() => {
    if (visible) {
      let newData = (data?.concat() || []).map((item: any) => {
        let deptCode = ''

        for (let i = 0; i < deptList.length; i++) {
          let deptItem = deptList[i]

          if (deptItem.name == item.deptName) {
            deptCode = deptItem.code
            break
          }
        }

        return {
          ...item,
          deptCode
        }
      })

      setTableData(newData)
    } else {
      setTableData([])
    }
  }, [visible])

  return <Modal
    title="导入护士档案"
    visible={visible}
    centered
    confirmLoading={loading}
    width={1100}
    onOk={handleOk}
    onCancel={onCancel}>
    <Wrapper>
      <BaseTable
        surplusHeight={400}
        surplusWidth={200}
        loading={loading}
        dataSource={tableData}
        columns={columns}
      />
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .ipt-cell{
    padding:0!important;
    textarea,.ant-select-selection,.ant-input{
      border:0;
      outline:0;
      border-radius:0;
      resize: none;
    }
    .ant-select-arrow{
      display:none;
    }
    .ant-select-selection-selected-value{
      padding-right:0!important;
    }
  }
`