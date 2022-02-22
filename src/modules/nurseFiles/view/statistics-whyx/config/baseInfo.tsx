import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'
import { DoCon } from 'src/components/BaseTable'
import Zimage from 'src/components/Zimage'

let list: any= []
for (let i = 0; i < 100; i++) {
  list.push(i)
}
// 执业证书有效期
let dateList: any= []
for (let i = 0; i < 12; i++) {
  dateList.push(i)
}
export const pageObj: PageObj = {
  title: '基本信息',
  type: 'auditeNurseListWH',
  detailPath: '',
  filterList: [
    {
      label: '姓名或工号',
      type: 'input',
      name: 'name'
    },
    {
      label: '科室',
      type: 'multiplesSelect',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptCode',
      multiple: true
    },
    {
      label: '年龄',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      dataSource: list,
      unit: '岁',
      name: 'ageStart',
      name1: 'ageEnd',
    },
    {
      label: '政治面貌',
      type: 'multiplesSelect',
      name: 'politicsLook',
      dataSource: statisticsViewModal.getDict('政治面貌')
    },
    {
      label: '最高学历',
      type: 'multiplesSelect',
      name: 'highestEducation',
      dataSource: statisticsViewModal.getDict('最高学历类型')
    },
    {
      label: '职务',
      type: 'multiplesSelect',
      name: 'job',
      dataSource: statisticsViewModal.getDict('职务')
    },
    {
      label: '来院工作时间',
      type: 'numberUntilSelect',
      numberUntilSelect: true,
      dataSource: list,
      unit: '年',
      name: 'goHospitalWorkStartYear',
      name1: 'goHospitalWorkEndYear',
    },
    {
      label: '院内工作区域',
      type: 'multiplesSelect',
      name: 'workAddress',
      dataSource: [{name: '病例', code: '病例'}, {name: '门诊', code: '门诊'}, {name: '其他', code: '其他'}]
    },
    {
      label: '最高职称',
      type: 'multiplesSelect',
      name: 'newTitle',
      dataSource: statisticsViewModal.getDict('最高职称')
    },
    {
      label: '层级护理',
      type: 'multiplesSelect',
      name: 'nurseHierarchy',
      dataSource: statisticsViewModal.getDict('层级')
    },
    {
      label: '执业证书有效期',
      type: 'numberUntilSelect',
      dataSource: dateList,
      unit: '月',
      name: 'zyzsEffectiveUpStartDate',
      name1: 'zyzsEffectiveUpEndDate',
      numberUntilSelect: true,
    },
    {
      label: '参加工作时间',
      type: 'numberUntilSelect',
      dataSource: list,
      unit: '年',
      numberUntilSelect: true,
      name: 'goWorkTimeStartIndex',
      name1: 'goWorkTimeEndIndex',
    }
  ],
  tableList: [
    {
      title: '民族',
      dataIndex: 'nation',
      key: 'nation',
      width: 100,
      align: 'center'
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace',
      key: 'nativePlace',
      width: 100,
      align: 'center'
    },
    {
      title: '身份证号',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 200,
      align: 'center'
    },
    {
      title: '政治面貌',
      dataIndex: 'politicsLook',
      key: 'politicsLook',
      width: 120,
      align: 'center'
    },
    {
      title: '出生年月',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 210,
      align: 'center'
    },
    {
      title: '婚姻情况',
      dataIndex: 'maritalStatus',
      key: 'maritalStatus',
      width: 200,
      align: 'center'
    },
    {
      title: '生育情况',
      dataIndex: 'fertility',
      key: 'fertility',
      width: 90,
      align: 'center'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 90,
      align: 'center'
    },
    {
      title: '现住址',
      dataIndex: 'address',
      key: 'address',
      width: 120,
      align: 'center'
    },
    {
      title: '参加工作时间',
      dataIndex: 'goWorkTime',
      key: 'goWorkTime',
      width: 90,
      align: 'center'
    },
    {
      title: '最近入职时间',
      dataIndex: 'hireDate',
      key: 'hireDate',
      width: 120,
      align: 'center'
    },
    {
      title: '来院工作时间',
      dataIndex: 'goHospitalWorkDate',
      key: 'goHospitalWorkDate',
      width: 90,
      align: 'center'
    },
    {
      title: '护士执业证书编号',
      dataIndex: 'zyzsNumber',
      key: 'zyzsNumber',
      width: 120,
      align: 'center'
    },

    {
      title: '取得护士执业证书时间',
      dataIndex: 'zyzsDate',
      key: 'zyzsDate',
      width: 120,
      align: 'center'
    },
    {
      title: '本院注册时间',
      dataIndex: 'registerDate',
      key: 'registerDate',
      width: 120,
      align: 'center'
    },
    {
      title: '护士执业证书有效期',
      dataIndex: 'zyzsEffectiveUpDate',
      key: 'zyzsEffectiveUpDate',
      width: 120,
      align: 'center'
    },
    {
      title: '取得执业证书并从事护理岗位时间',
      dataIndex: 'zyzsNursingPostDate',
      key: 'zyzsNursingPostDate',
      width: 120,
      align: 'center'
    },
    {
      title: '初始学历',
      dataIndex: 'initialEducation',
      key: 'initialEducation',
      width: 120,
      align: 'center'
    },
    {
      title: '最高学历',
      dataIndex: 'highestEducation',
      key: 'highestEducation',
      width: 120,
      align: 'center'
    },
    {
      title: '取得最高学历时间',
      dataIndex: 'highestEducationDate',
      key: 'highestEducationDate',
      width: 120,
      align: 'center'
    },
    {
      title: '最高学位',
      dataIndex: 'highestEducationDegree',
      key: 'highestEducationDegree',
      width: 120,
      align: 'center'
    },
    {
      title: '最高职称',
      dataIndex: 'newTitle',
      key: 'newTitle', 
      width: 120,
      align: 'center'
    },
    {
      title: '评职日期',
      dataIndex: 'employNewTiTleDate',
      key: 'employNewTiTleDate',
      width: 120,
      align: 'center'
    },
    {
      title: '现职务任职起始时间',
      dataIndex: 'jobStartDate',
      key: 'jobStartDate',
      width: 120,
      align: 'center'
    },
    {
      title: '护理层级起始时间',
      dataIndex: 'nurseHierarchyDate',
      key: 'nurseHierarchyDate',
      width: 120,
      align: 'center'
    },
    {
      title: '院内工作区域',
      dataIndex: 'workAddress',
      key: 'workAddress',
      width: 120,
      align: 'center'
    },
    {
      title: '工作护理单元',
      dataIndex: 'workDeptName',
      key: 'workDeptName',
      width: 120,
      align: 'center'
    },
    {
      title: '鞋码大小',
      dataIndex: 'shoeSize',
      key: 'shoeSize',
      width: 120,
      align: 'center'
    },
    {
      title: '工作服码数',
      dataIndex: 'workclothessize',
      key: 'workclothessize',
      width: 120,
      align: 'center'
    },
    {
      title: '护士执业证书',
      dataIndex: '护士执业证书',
      key: '护士执业证书',
      width: 120,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.zyzsUrl ? <Zimage text='查看' list={row.zyzsUrl.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '部门类型',
      dataIndex: 'deptType',
      key: 'deptType',
      width: 120,
      align: 'center'
    },
    {
      title: '人员类型',
      dataIndex: 'empType',
      key: 'empType',
      width: 120,
      align: 'center'
    },
    {
      title: '职工类型',
      dataIndex: 'workType',
      key: 'workType',
      width: 120,
      align: 'center'
    },
    {
      title: '是否已转正',
      dataIndex: 'formalEmp',
      key: 'formalEmp',
      width: 120,
      align: 'center'
    },
    {
      title: '合同类型',
      dataIndex: 'contractType',
      key: 'contractType',
      width: 120,
      align: 'center'
    },
    {
      title: '合同到期时间',
      dataIndex: 'contractExDate',
      key: 'contractExDate',
      width: 120,
      align: 'center'
    }
  ]
}
