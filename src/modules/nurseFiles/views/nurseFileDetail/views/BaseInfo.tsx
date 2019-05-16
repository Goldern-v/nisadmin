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
export default observer(function BaseInfo () {
  const editBaseInfoModal = createModal(EditBaseInfoModal)
  let [tableData, setTableData]: [any, any] = useState([])
  let [info, setInfo]: [any, any] = useState(nurseFileDetailViewModal.nurserInfo)
  const [idData, setIdData] = useState(0)
  const btnList = [
    {
      label: '修改',
      onClick: () => {
        editBaseInfoModal.show({
          id: idData,
          data: tableData
        })
      }
    },
    {
      label: '审核'
    }
  ]
  const getTableData = () =>
    nurseFilesService.nurseInformation(appStore.queryObj.empNo).then((res) => {
      let data = res.data || info
      setInfo(data)
      setIdData(data.id)
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
          职务: data.post
        },
        {
          参加工作时间: data.goWorkTime,
          最高学历: data.highestEducation
        },
        {
          技术职称: data.title,
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
  }, [])
  return (
    <BaseLayout title='基本信息' btnList={btnList}>
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
              <img
                className='head-img'
                src={(info && info.nearImageUrl) || require('../../../images/护士默认头像.png')}
                alt=''
              />
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
        <span>职业证书：</span>
        {info.zyzsUrl && <img src={info.zyzsUrl} alt='' />}
      </ZyzsCon>
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
  }
`
