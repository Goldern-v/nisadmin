import Zimage from "src/components/Zimage";
import createModal from "src/libs/createModal";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { nurseFilesService } from "../../../services/NurseFilesService";
import { appStore, authStore } from "src/stores";
import { sexEnum } from "src/libs/enum/common";
import { observer } from "mobx-react-lite";
import { globalModal } from "src/global/globalModal";
import service from 'src/services/api'
import BaseLayout from "../components/BaseLayout";
import EditBaseInfoModal from "../modal/EditBaseInfoModal";
import { nurseFileDetailViewModal } from "../NurseFileDetailViewModal";
import { ScrollBox } from "src/components/common";
import { openAuditModal } from "../config/auditModalConfig";
export interface Props extends RouteComponentProps { }
/* 判断是否本人 */
export const isSelf = () => {
  // return appStore.queryObj.empNo == authStore!.user!.empNo
  return appStore.match.path == "/selfNurseFile/:type";
};
export  const editFlag=()=>{
  if((authStore.isAdmin||authStore.isRoleManage||authStore.isAd||JSON.parse(sessionStorage.getItem('user')||'').empNo===appStore.queryObj.empNo)&&['gxjb'].includes(appStore.HOSPITAL_ID)){
    return true
  }else{
    false
  }
}


export default observer(function BaseInfo() {
  const editBaseInfoModal = createModal(EditBaseInfoModal);
  let [tableData, setTableData]: [any, any] = useState([]);
  let [info, setInfo]: [any, any] = useState(
    nurseFileDetailViewModal.nurserInfo
  );
  const [idData, setIdData] = useState(0);
  const [id, setId] = useState(0);
  let clothingInfo = [
    {
      type: "nurse_shoes_style",
      name: "鞋款式"
    },
    {
      type: "summer_jacket_size",
      name: "夏装-上衣"
    },
    {
      type: "summer_trousers_size",
      name: "夏装-裤子"
    },
    {
      type: "winter_jacket_size",
      name: "冬装-上衣"
    },
    {
      type: "winter_trousers_size",
      name: "冬装-裤子"
    },
    {
      type: "summer_isolation_suit_size",
      name: "夏装-医生款"
    },
    {
      type: "winter_isolation_suit_size",
      name: "冬装-医生款"
    },
    // {
    //   type: "nurse_shoes_size",
    //   name: "鞋码"
    // },
  ]
  const limitsComponent = () => {
    let btnList:Array<object> = [];
      if(['gxjb'].includes(appStore.HOSPITAL_ID)){
        btnList = editFlag()?[
          {
            label: "修改",
            onClick: () => {
              editBaseInfoModal.show({
                id: id,
                data: info,
              });
            },
          },
          {
            label: "查看",
            onClick: () => {
              openAuditModal("基本信息", info, getTableData);
            },
          },
        ]:[
          {
            label: "查看",
            onClick: () => {
              openAuditModal("基本信息", info, getTableData);
            },
          },
        ];
      }else{
    if (isSelf()) {
      btnList = [
        {
          label: "修改",
          onClick: () => {
            editBaseInfoModal.show({
              id: id,
              data: info,
            });
          },
        },
        {
          label: "查看",
          onClick: () => {
            openAuditModal("基本信息", info, getTableData);
          },
        },
      ];
    } else {
      btnList = [
        {
          label: info.statusColor === "1" ? "审核" : "查看",
          onClick: () => {
            openAuditModal("基本信息", info, getTableData);
          },
        },
      ];
    }
  }
    return btnList;
  };

  const getTableData = () => {
    let fun = isSelf()
      ? nurseFilesService.nurseInformationSelf
      : nurseFilesService.nurseInformation;
    setInfo({});
    fun.call(nurseFilesService, appStore.queryObj.empNo).then((res) => {
      let data = res.data || info;
      let maps = res.data.maps || {}
      setInfo(data);
      setIdData(data.empNo);
      setId(data.id);
      let newTableDataDefault = [
        {
          民族: data.nation,
          籍贯: data.nativePlace,
        },
        {
          工号: data.empNo,
          身份证号: data.cardNumber,
        },
        {
          政治面貌: data.politicsLook,
          出生年月: data.birthday,
        },
        {
          年龄: data.age,
          手机号: data.phone,
        },
        {
          参加工作时间: appStore.HOSPITAL_ID === 'fsxt' ? data.goWorkTime : data.takeWorkTime,
          来院工作时间: data.goHospitalWorkDate,
        },

        {
          护士执业证书编号: data.zyzsNumber,
          取得护士执业证书时间: data.zyzsDate,
        },
        {
          ...appStore.HOSPITAL_ID === 'sdlj' ? {参加护理工作时间: data.zyzsNursingPostDate} : {取得执业证书并从事护理岗位时间: data.zyzsNursingPostDate},
          护士执业证书有效截止日期: data.zyzsEffectiveUpDate,
        },
        {
          初始学历: data.initialEducation,
          最高学历: data.highestEducation
        },
        {
          取得最高学历时间: data.highestEducationDate,
          最高学历学位: data.highestEducationDegree,
        },
        {
          职务: data.job,
          现职务任职起始时间: data.jobStartDate,
        },
        {
          院内工作地点: data.workAddress,
          工作护理单元: data.deptName,
        },
        (() => {
          switch (appStore.HOSPITAL_ID) {
            case "gxjb":
              return {
                家庭住址: data.address,
              };
            case "gzsrm":
              return {
                鞋码大小: data.shoeSize,
                职称: data.newTitle,
              };
            case "sdlj":
              return {
                夏季鞋码大小: data.shoeSize,
                冬季鞋码大小: data?.maps.winter_shoe_size,
              };
            case "qhwy":
              return {
                鞋码大小: data.shoeSize,
                护理学会会员证号: data.membershipCardNumber,
              };
            default:
              return {
                鞋码大小: data.shoeSize,
              };
          }
        })(),
      ]
      let newTableDataFxst = [
        {
          民族: data.nation,
          籍贯: data.nativePlace,
        },
        {
          工号: data.empNo,
          身份证号: data.cardNumber,
        },
        {
          政治面貌: data.politicsLook,
          出生年月: data.birthday,
        },
        {
          年龄: data.age,
          手机号: data.phone,
        },
        {
          参加工作时间: data.goWorkTime,
          来院工作时间: data.goHospitalWorkDate,
        },
        {
          护士执业证书编号: data.zyzsNumber,
          取得护士执业证书时间: data.zyzsDate,
        },
        {
          取得执业证书并从事护理岗位时间: data.zyzsNursingPostDate,
          // 护士执业证书有效截止日期: data.zyzsEffectiveUpDate,
          最高学历: data.highestEducation,
        },
        { 
          // 最高学历: data.highestEducation,
          职务: data.job,
          现职务任职起始时间: data.jobStartDate,
        },
        {
          // 现职务任职起始时间: data.jobStartDate,
          工作护理单元: data.deptName,
          鞋码: data.shoeSize,
        },
      ]
      let newTableData = (() => {
        switch(appStore.HOSPITAL_ID) {
          case "fsxt" : return newTableDataFxst
          default : return newTableDataDefault
        }
      })()

      setTableData(newTableData);
      // 处理扩展字段
      if (Object.keys(data).includes('maps'))
        return new Promise((resolve, reject) => {
          service.commonApiService.listNurseExpand('User')
            .then(res => {
              resolve({
                maps,
                mapsConfig: res.data,
                orgin: newTableData
              })
            }, (e) => reject(e))
        })
    }).then((payload: any) => {
      if (payload) {
        const { maps, mapsConfig, orgin } = payload
        const newTableData = [...orgin]

        for (let i = 0; i < mapsConfig.length; i++) {
          let mapCfgItem = mapsConfig[i]
          let key = mapCfgItem.fieldCode
          let val = maps[key] || ''

          if (mapCfgItem.fieldType === 'select_edit' || mapCfgItem.fieldType === 'select') {
            let options = []
            try {
              options = JSON.parse(mapCfgItem.fieldSelectContent)
            } catch (e) {

            }
            let target = options.find((opt: any) => opt.code === val)

            if (target) val = target.name
          }
          let fieldCode = mapCfgItem.fieldCode
          // let name = clothingInfo.find((item, index) => item.type == fieldCode).name
          let name = clothingInfo.filter((item, index) => item.type === fieldCode)[0]?.name
          // let name = mapCfgItem.fieldName
          let lastItem = newTableData[newTableData.length - 1]

          if (Object.keys(lastItem).length > 1) {
            if (name) newTableData.push({ [name]: val })
          } else {
            if (name) lastItem[name] = val
          }
        }
        if (['fsxt'].includes(appStore.HOSPITAL_ID)) {
          console.log(newTableData, 9998)
          setTableData(newTableData)


        }
      }
    }, e => { })
  };
  useEffect(() => {
    getTableData();
  }, [appStore.queryObj]);
  return (
    <BaseLayout title="基本信息" btnList={limitsComponent()}>
      <ScrollCon>
        <InfoTable>
          <colgroup>
            <col width="200" />
            <col />
            <col width="200" />
            <col />
            <col width="200" />
          </colgroup>
          <tbody>
            <tr>
              <td>姓名</td>
              <td>
                <Value>{info.empName}</Value>
              </td>
              <td>性别</td>
              <td>
                <Value>{info.sex}</Value>
              </td>
              <td rowSpan={5}>
                {info && info.nearImageUrl ? (
                  <Zimage
                    className="head-img"
                    src={info && info.nearImageUrl}
                    alt=""
                  />
                ) : (
                  <img
                    className="head-img"
                    src={require("../../../images/护士默认头像.png")}
                    alt=""
                  />
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
          <div className="img-con">
            {info.zyzsUrl ? (
              info.zyzsUrl
                .split(",")
                .map((item: any, index: number) => (
                  <Zimage src={item} alt="" key={index} />
                ))
            ) : (
              <img src={require("../../../images/证件空态度.png")} alt="" />
            )}
          </div>
        </ZyzsCon>
      </ScrollCon>
      <editBaseInfoModal.Component getTableData={getTableData} />
    </BaseLayout>
  );
});
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
`;
const Value = styled.div`
  background: rgba(238, 239, 240, 1);
  border-radius: 2px;
  border: 1px solid rgba(227, 228, 230, 1);
  padding: 3px 13px;
  min-height: 27px;
`;

const ZyzsCon = styled.div`
  min-height: 220px;
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
`;

// @ts-ignore
const ScrollCon = styled(ScrollBox)`
  overflow: auto;
  height: calc(100vh - 190px);
`;
