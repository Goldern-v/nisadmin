import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditWritingsModal from '../modal/EditWritingsModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
export interface Props extends RouteComponentProps {}
export default observer(function Writings () {
  const editWritingsModal = createModal(EditWritingsModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editWritingsModal.show({
          signShow: '添加'
        })
    }
  ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      fbDate: '2012-09-16',
      tm: '护理六步法',
      brpm: '13',
      cbkd: '昆山日报',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '2',
      name: '杨春',
      age: 36,
      address: '西湖区湖底公园1号',
      fbDate: '2015-08-23',
      tm: '儿童预防接种反应',
      brpm: '36',
      cbkd: '天天日报',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '3',
      name: '赵平',
      age: 35,
      address: '西湖区湖底公园1号',
      fbDate: '2013-08-16',
      tm: '老年糖尿病护理',
      brpm: '53',
      cbkd: '青年杂社',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '4',
      name: '易小惠',
      age: 34,
      address: '西湖区湖底公园1号',
      fbDate: '2012-09-36',
      tm: '烧伤护理法',
      brpm: '39',
      cbkd: '长沙周刊',
      fj: '有',
      zt: '待护士长审核'
    }
  ]

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
      title: '发表日期',
      dataIndex: 'publicDate',
      key: '2',
      width: 150,
      align: 'center'
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: '3',
      width: 200,
      align: 'center'
    },
    {
      title: '本人排名',
      dataIndex: 'rank',
      key: '4',
      width: 100,
      align: 'center'
    },
    {
      title: '出版或刊登物',
      dataIndex: 'publication',
      key: '5',
      width: 200,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '6',
      width: 150,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            {row.urlImageOne && (
              <a href={row.urlImageOne} target='_blank'>
                查看
              </a>
            )}
          </DoCon>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      key: '61',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                editWritingsModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            <span>审核</span>
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nursePaperExperience(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='著作译文论文' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editWritingsModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
