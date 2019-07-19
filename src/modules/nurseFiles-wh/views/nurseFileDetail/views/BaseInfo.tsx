import Zimage from 'src/components/Zimage'
import createModal from 'src/libs/createModal'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { nurseFilesService } from 'src/modules/nurseFiles-wh/services/NurseFilesService'
import { appStore, authStore } from 'src/stores'
import { sexEnum } from 'src/libs/enum/common'
import { observer } from 'mobx-react-lite'
import { globalModal } from 'src/global/globalModal'

import BaseLayout from '../components/BaseLayout'
import EditBaseInfoModal from '../modal/EditBaseInfoModal'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { ScrollBox } from 'src/components/common'

export interface Props extends RouteComponentProps {}
export default observer(function BaseInfo() {
  const editBaseInfoModal = createModal(EditBaseInfoModal)
  let [tableData, setTableData]: [any, any] = useState([])
  let [info, setInfo]: [any, any] = useState(nurseFileDetailViewModal.nurserInfo)
  const [idData, setIdData] = useState(0)
  const [id, setId] = useState(0)
  const limitsComponent = () => {
    if (appStore.isDev || info.statusColor === '1') {
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
                {
                  姓名: 'empName',
                  性别: 'sex'
                },
                {
                  民族: 'nation',
                  籍贯: 'nativePlace'
                },
                {
                  工号: 'empNo',
                  身份证号: 'cardNumber'
                },
                {
                  政治面貌: 'politicsLook',
                  出生年月: 'birthday'
                },
                {
                  年龄: 'age',
                  联系电话: 'phone'
                },
                {
                  参加工作时间: 'takeWorkTime',
                  参加工作年限: 'takeWorkYear'
                },
                {
                  来院工作时间: 'goHospitalWorkDate',
                  来院工作年限: 'goHospitalWorkYear'
                },
                {
                  护士执业资格证书编号: 'zyzsNumber',
                  取得执业资格证书时间: 'zyzsDate'
                },
                {
                  取得执业资格证书并开始从事护理岗位时间: 'zyzsNursingPostDate',
                  护士执业资格证书有效截止日期: 'zyzsEffectiveUpDate'
                },
                {
                  护理年资: 'nursingSeniority',
                  初始学历: 'initialEducation'
                },
                {
                  最高学历: 'highestEducation',
                  取得最高学历时间: 'highestEducationDate'
                },
                {
                  最高学历学位: 'highestEducationDegree',
                  职务: 'job'
                },
                {
                  现职务任职起始时间: 'jobStartDate',
                  考取技术职称时间: 'winNewTiTleDate'
                },
                {
                  医院聘用技术职称时间: 'employNewTiTleDate',
                  '技术职称（医院聘用为准）': 'newTitle'
                },
                {
                  工作编制: 'workConversion',
                  转编时间: 'conversionDate'
                },
                {
                  院内工作地点: 'workAddress',
                  工作护理单元: 'workDeptName'
                },
                {
                  层级: 'nurseHierarchy',
                  取得层级时间: 'nurseHierarchyDate'
                },
                {
                  鞋码大小: 'shoeSize'
                }
              ],
              fileData: [
                {
                  个人头像: info.nearImageUrl
                },
                ...(info.zyzsUrl
                  ? info.zyzsUrl.split(',').map((item: any, index: number) => {
                      return {
                        ['执业证书' + (index + 1)]: item
                      }
                    })
                  : [])
              ],
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
        //       id: id,
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
        // {
        //   姓名: data.empName,
        //   性别: data.sex
        // },
        {
          民族: data.nation,
          籍贯: data.nativePlace
        },
        {
          工号: data.empNo,
          身份证号: data.cardNumber
        },
        {
          政治面貌: data.politicsLook,
          出生年月: data.birthday
        },
        {
          年龄: data.age,
          联系电话: data.phone
        },
        {
          参加工作时间: data.takeWorkTime,
          参加工作年限: data.takeWorkYear
        },
        {
          来院工作时间: data.goHospitalWorkDate,
          来院工作年限: data.goHospitalWorkYear
        },
        {
          护士执业资格证书编号: data.zyzsNumber,
          取得执业资格证书时间: data.zyzsDate
        },
        {
          取得执业资格证书并开始从事护理岗位时间: data.zyzsNursingPostDate,
          护士执业资格证书有效截止日期: data.zyzsEffectiveUpDate
        },
        {
          护理年资: data.nursingSeniority,
          初始学历: data.initialEducation
        },
        {
          最高学历: data.highestEducation,
          取得最高学历时间: data.highestEducationDate
        },
        {
          最高学历学位: data.highestEducationDegree,
          职务: data.job
        },
        {
          现职务任职起始时间: data.jobStartDate,
          考取技术职称时间: data.winNewTiTleDate
        },
        {
          医院聘用技术职称时间: data.employNewTiTleDate,
          '技术职称（医院聘用为准）': data.newTitle
        },
        {
          工作编制: data.workConversion,
          转编时间: data.conversionDate
        },
        {
          院内工作地点: data.workAddress,
          工作护理单元: data.workDeptName
        },
        {
          层级: data.nurseHierarchy,
          取得层级时间: data.nurseHierarchyDate
        },
        {
          鞋码大小: data.shoeSize
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
            <col width='200' />
            <col />
            <col width='200' />
            <col />
            <col width='200' />
          </colgroup>
          <tbody>
            <tr>
              <td>姓名</td>
              <td>
                <Value>{info.empName}</Value>
              </td>
              <td>性别</td>
              <td>
                <Value>{sexEnum[info.sex]}</Value>
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
          <div className='img-con'>
            {info.zyzsUrl ? (
              info.zyzsUrl.split(',').map((item: any, index: number) => <Zimage src={item} alt='' key={index} />)
            ) : (
              <img src={require('../../../images/证件空态度.png')} alt='' />
            )}
          </div>
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
  .img-con {
    margin: 15px 0 0 137px;
  }
  img {
    float: left;
    margin: 5px;
    width: 240px;
    height: 174px;
    border: 1px solid rgba(219, 224, 228, 1);
    object-fit: contain;
  }
`

const ScrollCon = styled(ScrollBox)`
  overflow: auto;
  height: calc(100vh - 190px);
`
