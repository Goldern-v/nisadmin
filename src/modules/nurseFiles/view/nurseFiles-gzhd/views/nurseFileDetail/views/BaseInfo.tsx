import Zimage from 'src/components/Zimage'
import createModal from 'src/libs/createModal'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { nurseFilesService } from '../../../services/NurseFilesService';
import { appStore, authStore } from 'src/stores'
import { sexEnum } from 'src/libs/enum/common'
import { observer } from 'mobx-react-lite'
import { globalModal } from 'src/global/globalModal'

import BaseLayout from '../components/BaseLayout'
import EditBaseInfoModal from '../modal/EditBaseInfoModal'
import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { nurseFilesListViewModel } from '../../nurseFilesList/NurseFilesListViewModel'

export interface Props extends RouteComponentProps { }
export default observer(function BaseInfo() {
  const editBaseInfoModal = createModal(EditBaseInfoModal)
  let [tableData, setTableData]: [any, any] = useState([])
  let [info, setInfo]: [any, any] = useState(nurseFileDetailViewModal.nurserInfo)
  let [hdryQuaimage, setHdryQuaimage]: [any, any] = useState([])
  const [idData, setIdData] = useState(0)
  const [id, setId] = useState(0)

  const [ditList, setDitList] = useState([])

  const limitsComponent = () => {
    let auditBtnText = info.statusColor === '1' ? '审核' : '查看'
    if (appStore.selfNurseFile) auditBtnText = '查看'

    const auditBtn = {
      label: auditBtnText,
      onClick: () => {
        globalModal.auditModal.show({
          empNo: idData,
          id: id,
          type: 'nurseInformation',
          getTableData: getTableData,
          title: '审核基础信息',
          tableFormat: [
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
              手机号: `phone`,
              家庭住址: `address`
            },
            {
              毕业院校: 'graduateSchool',
              来院工作时间: 'goHospitalWorkDate'
            },
            {
              职业证书截止日期: 'zyzsEffectiveUpDate',
              资格名称: 'qualificationName'
            },
            {
              护理岗位: 'nursingJob',
            },
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
              : []),
            ...(hdryQuaimage
              ? hdryQuaimage.map((item: any, index: number) => {
                return {
                  ['资格证书' + (index + 1)]: item
                }
              })
              : [])
          ],
          allData: info
        })
      }
    }

    if (appStore.selfNurseFile) {
      return [
        {
          label: '修改',
          onClick: () => {
            editBaseInfoModal.show({
              id: id,
              data: info,
            })
          }
        },
        auditBtn
      ]
    } else {
      return [
        auditBtn
      ]
    }
  }

  const getTableData = () => {
    if (!appStore.queryObj.empNo) return

    let reqMethod = appStore.selfNurseFile ?
      nurseFilesService.nurseInformationSelf.bind(nurseFilesService) :
      nurseFilesService.nurseInformation.bind(nurseFilesService)

    reqMethod(appStore.queryObj.empNo).then((res) => {
      let data = res.data || info
      let imgList=data.maps.hdry_qua_cer_image?data.maps.hdry_qua_cer_image.split(','):[]
      setHdryQuaimage(imgList)
      setInfo(data)
      setIdData(data.empNo)
      setId(data.id)
      //表格信息
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
          手机号: data.phone,
          家庭住址: data.address
        },
        {
          毕业院校: data.graduateSchool,
          来院工作时间: data.goHospitalWorkDate
        },
        {
          职业证书截止日期: data.zyzsEffectiveUpDate,
          资格名称: data.qualificationName
        },
        {
          工作年限: data.goHospitalWorkYear,
          资格证书编号: data.maps.hdry_qua_cer_no
        },
        {
          护理岗位: data.nursingJob,
        },
      ])
    })
  }
  useEffect(() => {
    // 获取护理岗位列表
    nurseFilesService.findDitList().then(res=>{
      let nursePostList = []
      nursePostList = res.data.map((it:any)=>{return it.name})
      nurseFilesListViewModel.nursePostList2 = nursePostList
    }).catch(err=>{
    })

  }, [])
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
                <Value>{nurseFileDetailViewModal.nurserInfo.empName}</Value>
              </td>
              <td>工号</td>
              <td>
                <Value>{nurseFileDetailViewModal.nurserInfo.empNo}</Value>
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
          <span>护士执业证书：</span>
          <div className='img-con'>
            {info.zyzsUrl ? (
              info.zyzsUrl.split(',').map((item: any, index: number) => <Zimage src={item} alt='' key={index} />)
            ) : (
                <img src={require('../../../images/证件空态度.png')} alt='' />
              )}
          </div>
        </ZyzsCon>
        <ZyzsCon>
          <span>资格证书：</span>
          <div className='img-con'>
            {hdryQuaimage ? (
              hdryQuaimage.map((item: any, index: number) => <Zimage src={item} alt='' key={index} />)
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
  min-height: 220px;
  height: auto;
  overflow: hidden;
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
    margin: 15px 0 15px 137px;
    overflow: hidden;
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

const ScrollCon = styled.div`
  overflow: auto;
  height: calc(100vh - 240px);
`
