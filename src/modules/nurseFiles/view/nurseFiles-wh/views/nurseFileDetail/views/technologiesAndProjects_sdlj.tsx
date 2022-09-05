import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import technologiesAndProjectsModal from '../modal/technologiesAndProjectsModal_sdlj'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { isSelf,editFlag } from './BaseInfo'
import Do from '../components/Do'
import { Table, Pagination ,Tooltip} from "antd";
import { render } from 'react-dom'
export interface Props extends RouteComponentProps {}
export default observer(function PersonWinning() {
  const EdittechnologiesModal = createModal(technologiesAndProjectsModal)
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.commonfindByEmpNoSubmit('nurseWHCarryOut', appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  const btnList = [
    {
      label: '添加',
      onClick: () => EdittechnologiesModal.show({ signShow: '添加' })
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '',
      key: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 55
    },
    {
      title: '开展项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 200,
      align: 'center'
    },
    {
      title: '技术等级',
      dataIndex: 'technologyLevel',
      key: 'technologyLevel',
      width: 200,
      align: 'center'
    },
    {
      title: '起止时间',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 210,
      align: 'center',
      render: (text: any,row: any) => (
        <span>{ row.id ? (row.startDate + ' —— ' + row.endDate) : '' }</span>
      )
    },
    {
      title: '开展例数',
      dataIndex: 'numberCase',
      key: 'numberCase',
      width: 110,
      align: 'center'
    },
    {
      title: '项目效益',
      dataIndex: 'projectBenefit',
      key: 'projectBenefit',
      width: 100,
      align: 'center',
      onCell: () => {
        return {
          style: {
            maxWidth: 100,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }
        };
      },
      render: (text:any) =>{
        return text&&text.length > 8 ?<Tooltip  placement='topLeft' title={text}>{text}</Tooltip>:<div>{text}</div>
      }},
    Do('nurseWHCarryOut', EdittechnologiesModal, getTableData)
  ]

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='新技术、新项目开展情况' btnList={isSelf() || editFlag()? btnList : []}>
      {/*<Table dataSource={tableData} columns={columns}/>*/}
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={255} surplusWidth={250} type={['spaceRow']} />
      <EdittechnologiesModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``
