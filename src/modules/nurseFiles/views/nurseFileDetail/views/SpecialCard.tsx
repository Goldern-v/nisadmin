import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import EditSpecialCardModal from '../modal/EditSpecialCardModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { globalModal } from 'src/global/globalModal'
export interface Props extends RouteComponentProps {}
export default observer(function SpecialCard () {
  const editSpecialCardModal = createModal(EditSpecialCardModal)
  const btnList = [
    {
      label: '添加',
      onClick: () =>
        editSpecialCardModal.show({
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
      hdTime: '2007-03-08',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-04344-45435-78841',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '赵志平',
      age: 29,
      address: '城市花园37号',
      hdTime: '2013-06-09',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43324-55342-67898',
      fj: '有',
      zt: '待护士长审核'
    },
    {
      key: '1',
      name: '杨华',
      age: 28,
      address: '西湖区湖底公园1号',
      hdTime: '2015-03-08',
      zjName: '特级护理医疗证',
      zgzNumber: 'thx-43434-55434-33443',
      fj: '有',
      zt: '待护士长审核'
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, row: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },

    {
      title: '获得时间',
      dataIndex: 'time',
      key: '2',
      width: 100,
      align: 'center'
    },
    {
      title: '资格名称',
      dataIndex: 'specialQualificationName',
      key: '3',
      width: 150,
      align: 'center'
    },
    {
      title: '资格证编号',
      dataIndex: 'specialQualificationNo',
      key: '4',
      width: 200,
      align: 'center'
    },
    {
      title: '附件',
      dataIndex: 'fj',
      key: '5',
      width: 200,
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
      key: '6',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            <span
              onClick={() => {
                editSpecialCardModal.show({ data: row, signShow: '修改' })
              }}
            >
              修改
            </span>
            <span
              onClick={() => {
                globalModal.auditModal.show({
                  id: row.id,
                  type: 'nurseSpecialQualification',
                  title: '审核特殊资格证',
                  tableFormat: [
                    {
                      获得时间: `time`,
                      资格名称: `specialQualificationName`
                    },
                    {
                      资格证编号: `specialQualificationNo`
                    }
                  ],
                  fileData: [
                    {
                      附件1: row.urlImageOne,
                      附件2: require(`../../../images/证件空态度.png`)
                    }
                  ],
                  allData: row
                })
              }}
            >
              审核
            </span>
          </DoCon>
        )
      }
    }
  ]
  const [tableData, setTableData] = useState([])
  const getTableData = () => {
    nurseFilesService.nurseSpecialQualification(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  return (
    <BaseLayout title='特殊资格证' btnList={btnList}>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={365} type={['spaceRow', 'fixedWidth']} />
      <editSpecialCardModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const Wrapper = styled.div``

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${(p) => p.theme.$mtc};
  span {
    cursor: pointer;
  }
`
