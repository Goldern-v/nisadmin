import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import { globalModal } from 'src/global/globalModal'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import EditFileListModal from '../modal/EditFileListModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { Carousel, Modal, Button } from 'antd'

export interface Props extends RouteComponentProps {}
export default observer(function FileList () {
  const [visible, setVisible] = useState(false)
  const editFileListModal = createModal(EditFileListModal)
  const btnList = [
    // {
    //   label: '添加',
    //   onClick: () => editFileListModal.show({})
    // }
  ]
  const dataSource = []
  const showModalPicture = () => {
    setVisible(true)
  }
  const handleOk = (e: any) => {
    setVisible(false)
  }
  const handleCancel = (e: any) => {
    setVisible(false)
  }
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
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            <span onClick={showModalPicture}>查看</span>
            {limitUtils(row, '附件审核') ? (
              <span
                onClick={() => {
                  globalModal.auditModal.show({
                    getTableData: getTableData,
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
            ) : (
              ''
            )}
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
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '1')
        },
        {
          content: '学历毕业证复印件',
          number: res.data.filter((item: any) => item.type === '2').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '2')
        },
        {
          content: '执业证复印件',
          number: res.data.filter((item: any) => item.type === '3').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '3')
        },
        {
          content: '资格证复印件',
          number: res.data.filter((item: any) => item.type === '4').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '4')
        },
        {
          content: '职称聘用证明和层级晋级表',
          number: res.data.filter((item: any) => item.type === '6').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '6')
        },
        {
          content: '护理会诊人员资质认定表',
          number: res.data.filter((item: any) => item.type === '7').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '7')
        },
        {
          content: '厚街医院护理人员执业准入资格备案表',
          number: res.data.filter((item: any) => item.type === '8').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '8')
        },
        {
          content: '高风险诊疗技术操作人员资质申请表',
          number: res.data.filter((item: any) => item.type === '9').length,
          status: '待护士长审核',
          filterData: res.data.filter((item: any) => item.type === '9')
        }
      ]
      setTableData(data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])

  return (
    <BaseLayout title='附件'>
      <BaseTable
        // bodyStyle={width:300px}
        dataSource={tableData}
        columns={columns}
        surplusHeight={365}
        type={['spaceRow', 'fixedWidth']}
      />
      <editFileListModal.Component />
      {/* 附件查看 */}
      <Modal title='上一页的内容' visible={visible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
