import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
import { appStore, authStore } from 'src/stores'
import { sexEnum } from 'src/libs/enum/common'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
export interface Props extends RouteComponentProps {}
import createModal from 'src/libs/createModal'
import EditBaseInfoModal from '../modal/EditBaseInfoModal'
import { observer } from 'mobx-react-lite'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'

export default observer(function BaseInfo () {
  const editBaseInfoModal = createModal(EditBaseInfoModal)
  let [tableData, setTableData]: [any, any] = useState([])
  let [info, setInfo]: [any, any] = useState(nurseFileDetailViewModal.nurserInfo)
  const [idData, setIdData] = useState(0)
  const [id, setId] = useState(0)
  // const btnList = [
  //   {
  //     label: '修改',
  //     onClick: () => {
  //       editBaseInfoModal.show({
  //         id: idData,
  //         data: info
  //       })
  //     }
  //   },
  //   {
  //     label: '审核',
  //     //

  //     //
  //     onClick: () => {
  //       globalModal.auditModal.show({
  //         id: idData,
  //         type: 'nurseInformation',
  //         // empNo: appStore.queryObj.empNo,
  //         title: '审核基础信息',
  //         tableFormat: [
  //           {
  //             获得时间: `empName`,
  //             资格名称: `birthday`
  //           },
  //           {
  //             资格证编号: `age`
  //           }
  //         ],
  //         // fileData: [
  //         //   {
  //         //     附件1: info.urlImageOne,
  //         //     附件2: 'bbb'
  //         //   }
  //         // ],
  //         allData: info
  //       })
  //     }
  //   }
  // ]
  const limitsComponent = () => {
    if (info.statusColor === '1') {
      return [
        {
          label: '修改',
          onClick: () => {
            editBaseInfoModal.show({
              id: id,
              data: info
            })
          }
        },
        {
          label: '审核',
          onClick: () => {
            globalModal.auditModal.show({
              empNo: idData,
              id: id,
              type: 'nurseInformation',
              getTableData: getTableData,
              // empNo: appStore.queryObj.empNo,
              title: '审核基础信息',
              tableFormat: [
                //
                {
                  姓名: `empName`,
                  工号: `empNo`
                },
                {
                  性别: `sex`,
                  民族: `nation`
                },
                {
                  出生年月: `birthday`,
                  年龄: `age`
                },
                {
                  籍贯: `nativePlace`,
                  职务: `job`
                },
                {
                  参加工作时间: `goWorkTime`,
                  最高学历: `highestEducation`
                },
                {
                  技术职称: `newTitle`,
                  护士执业证书编号: `zyzsNumber`
                },
                {
                  身份证号: `cardNumber`,
                  社会团体职务: `socialGroup`
                },
                {
                  联系电话: `phone`,
                  家庭住址: `address`
                },
                //
                {
                  获得时间: `empName`,
                  资格名称: `birthday`
                },
                {
                  资格证编号: `age`
                }
              ],
              // fileData: [
              //   {
              //     附件1: info.urlImageOne,
              //     附件2: 'bbb'
              //   }
              // ],
              allData: info
            })
          }
        }
      ]
    } else {
      return [
        // {
        //   label: '修改',
        //   onClick: () => {
        //     editBaseInfoModal.show({
        //       id: idData,
        //       data: info
        //     })
        //   }
        // }
      ]
    }
  }

  const getTableData = () =>
    nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
      let data = res.data || info
      setInfo(data)
      setIdData(data.empNo)
      setId(data.id)
      setTableData([
        {
          性别: sexEnum[data.sex],
          民族: data.nation
        },
        {
          出生年月: data.birthday,
          年龄: data.age
        },
        {
          籍贯: data.nativePlace,
          职务: data.job
        },
        {
          参加工作时间: data.goWorkTime,
          最高学历: data.highestEducation
        },
        {
          技术职称: data.newTitle,
          护士执业证书编号: data.zyzsNumber
        },
        {
          身份证号: data.cardNumber,
          社会团体职务: data.socialGroup
        },
        {
          联系电话: data.phone,
          家庭住址: data.address
        }
      ])
    })
  useEffect(() => {
    getTableData()
  }, [appStore.queryObj])
  return (
    <BaseLayout title='基本信息' btnList={limitsComponent()}>
      <ScrollCon>
        <InfoTable>
          <colgroup>
            <col width='120' />
            <col />
            <col width='139' />
            <col />
            <col width='200' />
          </colgroup>
          <tbody>
            <tr>
              <td>姓名</td>
              <td>
                <Value>{appStore.queryObj.empName}</Value>
              </td>
              <td>工号</td>
              <td>
                <Value>{appStore.queryObj.empNo}</Value>
              </td>
              <td rowSpan={5}>
                {info && info.nearImageUrl ? (
                  <Zimage className='head-img' src={info && info.nearImageUrl} alt='' />
                ) : (
                  <img className='head-img' src={require('../../../images/护士默认头像.png')} alt='' />
                )}
              </td>
            </tr>
            {tableData.map((obj: any, index: number) => (
              <tr key={index}>
                <td>{Object.keys(obj)[0]}</td>
                <td>
                  <Value>{obj[Object.keys(obj)[0]]}</Value>
                </td>
                <td>{Object.keys(obj)[1]}</td>
                <td colSpan={index >= 4 ? 2 : 1}>
                  <Value>{obj[Object.keys(obj)[1]]}</Value>
                </td>
              </tr>
            ))}
          </tbody>
        </InfoTable>
        <ZyzsCon>
          <span>执业证书图片：</span>
          {info.zyzsUrl ? (
            <Zimage src={info.zyzsUrl} alt='' />
          ) : (
            <img src={require('../../../images/证件空态度.png')} alt='' />
          )}
        </ZyzsCon>
      </ScrollCon>
      <editBaseInfoModal.Component getTableData={getTableData} />
    </BaseLayout>
  )
})
const InfoTable = styled.table`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dbe0e4;
  width: 100%;
  .head-img {
    width: 132px;
    height: 180px;
    margin: auto;
    display: block;
    object-fit: contain;
  }
  td {
    height: 38px;
    padding: 5px 10px;
    font-size: 13px;
    border: 1px solid #dbe0e4;
    vertical-align: middle;
  }
  & tr td:nth-of-type(1),
  & tr td:nth-of-type(3) {
  }
`
const Value = styled.div`
  background: rgba(238, 239, 240, 1);
  border-radius: 2px;
  border: 1px solid rgba(227, 228, 230, 1);
  padding: 3px 13px;
  min-height: 27px;
`

const ZyzsCon = styled.div`
  height: 220px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(219, 224, 228, 1);
  position: relative;
  font-size: 13px;
  color: #666666;
  margin-top: 10px;
  span {
    position: absolute;
    left: 12px;
    top: 19px;
  }
  img {
    position: absolute;
    width: 240px;
    height: 174px;
    border: 1px solid rgba(219, 224, 228, 1);
    top: 20px;
    left: 137px;
    object-fit: cover;
  }
`

const ScrollCon = styled.div`
  overflow: auto;
  height: calc(100vh - 285px);
`
