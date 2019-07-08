import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'
import limitUtils from 'src/modules/nurseFiles/views/nurseFileDetail/utils/limit.ts'
import EditFileListModal from '../modal/EditFileListModal'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { Modal, Button, Icon, Carousel } from 'antd'
export interface Props extends RouteComponentProps {}
export default observer(function FileList() {
  const [visible, setVisible] = useState(false)
  const editFileListModal = createModal(EditFileListModal)
  const [pictureArr, setPictureArr] = useState([])
  // const btnList = [
  //   {
  //     label: '添加',
  //     onClick: () => editFileListModal.show({})
  //   }
  // ]
  const dataSource = []

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
      width: 60
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: '2',
      width: 350,
      align: 'center'
    },
    {
      title: '文件数',
      dataIndex: 'number',
      key: '3',
      width: 120,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: '4',
      width: 120,
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
            {row.type < 7 && <Zimage text='查看' list={row.filterData} />}
            {row.type > 6 && row.isShow ? (
              <span
                onClick={() => {
                  editFileListModal.show({ data: row, signShow: '添加' })
                }}
              >
                添加
              </span>
            ) : (
              ''
            )}

            {row.id && (
              <span
                onClick={() => {
                  globalModal.auditModal.show({
                    getTableData: getTableData,
                    id: row.id,
                    type: 'nurseAttachment',
                    title: '附件审核',
                    tableFormat: [],
                    fileData: row.path
                      ? row.path.split(',').map((item: any, index: number) => {
                          return {
                            ['附件' + (index + 1)]: item
                          }
                        })
                      : [],
                    allData: row
                  })
                }}
              >
                {limitUtils(row, '附件审核') ? '审核' : '查看'}
              </span>
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
          content: '学历毕业证复印件',
          number: res.data.filter((item: any) => item.type === '2').length,
          status: '',
          filterData: res.data
            .filter((item: any) => item.type === '2')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '学历毕业证复印件',
          type: '2'
        },
        {
          content: '执业证复印件',
          number: res.data.filter((item: any) => item.type === '3').length,
          status: '',
          filterData: res.data
            .filter((item: any) => item.type === '3')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '执业证复印件',
          type: '3'
        },
        {
          content: '资格证复印件',
          number: res.data.filter((item: any) => item.type === '4').length,
          status: '',
          filterData: res.data
            .filter((item: any) => item.type === '4')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '资格证复印件',
          type: '4'
        },
        {
          content: '职称聘用证明',
          number: res.data.filter((item: any) => item.type === '5').length,
          status: '',
          filterData: res.data
            .filter((item: any) => item.type === '5')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '职称聘用证明',
          type: '5'
        },
        {
          content: '层级晋级表',
          number: res.data.filter((item: any) => item.type === '6').length,
          status: '',
          filterData: res.data
            .filter((item: any) => item.type === '6')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '层级晋级表',
          type: '6'
        },
        {
          content: '护理会诊人员资质认定表',
          number: res.data.filter((item: any) => item.type === '7').length,
          status:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].auditedStatusName,
          filterData: res.data
            .filter((item: any) => item.type === '7')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '护理会诊人员资质认定表',
          statusColor:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].statusColor,
          isShow:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].isShow,
          path:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].path,
          id:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].id,
          empNo:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].empNo,
          saveStatus:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].saveStatus,
          empName:
            res.data.filter((item: any) => item.type === '7')[0] &&
            res.data.filter((item: any) => item.type === '7')[0].empName,
          type: '7'
        },
        {
          content: '厚街医院护理人员执业准入资格备案表',
          number: res.data.filter((item: any) => item.type === '8').length,
          status:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].auditedStatusName,
          filterData: res.data
            .filter((item: any) => item.type === '8')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '厚街医院护理人员执业准入资格备案表',
          statusColor:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].statusColor,
          isShow:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].isShow,
          path:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].path,
          id:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].id,
          empNo:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].empNo,
          saveStatus:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].saveStatus,
          empName:
            res.data.filter((item: any) => item.type === '8')[0] &&
            res.data.filter((item: any) => item.type === '8')[0].empName,
          type: '8'
        },
        {
          content: '高风险诊疗技术操作人员资质申请表',
          number: res.data.filter((item: any) => item.type === '9').length,
          status:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].auditedStatusName,
          filterData: res.data
            .filter((item: any) => item.type === '9')
            .map((item: any) => item.path)
            .reduce((prev: any, curr: any) => {
              let arr = curr ? curr.split(',') : []
              return [...prev, ...arr]
            }, []),
          fileName: '高风险诊疗技术操作人员资质申请表',
          statusColor:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].statusColor,
          isShow:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].isShow,
          id:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].id,
          path:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].path,
          empNo:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].empNo,
          saveStatus:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].saveStatus,
          empName:
            res.data.filter((item: any) => item.type === '9')[0] &&
            res.data.filter((item: any) => item.type === '9')[0].empName,
          type: '9'
        }
      ]
      setTableData(data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [])
  const bodyStyle = { width: '900px' }
  // 轮播图组件
  const pictureDom = pictureArr.map((item: any, index: number) => {
    return (
      <div style={{ height: '300px' }} key={index}>
        <img src={item.path} style={{ height: '200px', width: '600px', margin: '0 auto' }} />
      </div>
    )
  })
  return (
    <BaseLayout title='附件'>
      <BaseTable dataSource={tableData} columns={columns} surplusHeight={305} type={['spaceRow', 'fixedWidth']} />
      <editFileListModal.Component getTableData={getTableData} />
      {/* 附件查看 */}
      <ModalCon>
        <Modal
          width={1000}
          title='上一页的内容'
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className='CarouselCon'>
            <div className='leftIcon'>
              <Icon type='left' style={{ fontSize: '60px' }} />
            </div>
            <div className='rightIcon'>
              <Icon type='right' style={{ fontSize: '60px' }} />
            </div>
            <Carousel>{pictureDom}</Carousel>
          </div>
        </Modal>
      </ModalCon>
      <Carousel>{/* <div>f</div> */}</Carousel>
    </BaseLayout>
  )
})
const Wrapper = styled.div``
const ModalCon = styled.div`
  height: 70%;
  .CarouselCon {
    height: 450px;
    .leftIcon {
      display: inline-block;
      height: 200px;
      width: 100px;
    }
    .rightIcon {
      display: inline-block;
      height: 200px;
      width: 100px;
    }
    .slick-dots {
      margin-top: 100px !important;
      background-color: red !important;
    }
  }

  .ant-carousel {
    button {
      background: red !important;
      color: red;
    }
  }

  .ant-carousel .slick-slide h3 {
    color: yellow;
    background-color: yellow;
  }
`
