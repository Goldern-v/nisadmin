import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWritingsModal from '../modal/EditWritingsModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function FileList () {
  const editWritingsModal = createModal(EditWritingsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () => editWritingsModal.show({})
    }
  ]
  const dataSource = []

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '2',
      width: 300,
      align: 'center'
    },
    {
      title: '文件数',
      dataIndex: 'number',
      key: '3',
      width: 200,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '8',
      key: '8',
      width: 100,
      align: 'center',
      render: (a: any, b: any, c: any) => {
        console.log(a, b, c)
        return (
          <DoCon>
            <span>修改</span>
            <span>审核</span>
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nurseAttachment(appStore.queryObj.empNo).then((res) => {
      let data: any = [
        {
          content: '身份证',
          number: res.data.filter((item: any) => item.type === '1').length,
          status: '待护士长审核'
        },
        {
          content: '学历毕业证复印件',
          number: res.data.filter((item: any) => item.type === '2').length,
          status: '待护士长审核'
        },
        {
          content: '执业证复印件',
          number: res.data.filter((item: any) => item.type === '3').length,
          status: '待护士长审核'
        },
        {
          content: '资格证复印件',
          number: res.data.filter((item: any) => item.type === '4').length,
          status: '待护士长审核'
        },
        {
          content: '职称聘用证明和层级晋级表',
          number: res.data.filter((item: any) => item.type === '6').length,
          status: '待护士长审核'
        },
        {
          content: '护理会诊人员资质认定表',
          number: res.data.filter((item: any) => item.type === '7').length,
          status: '待护士长审核'
        },
        {
          content: '厚街医院护理人员执业准入资格备案表',
          number: res.data.filter((item: any) => item.type === '8').length,
          status: '待护士长审核'
        },
        {
          content: '高风险诊疗技术操作人员资质申请表',
          number: res.data.filter((item: any) => item.type === '9').length,
          status: '待护士长审核'
        }
      ]
      setTableData(data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='附件' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editWritingsModal.Component />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
`
