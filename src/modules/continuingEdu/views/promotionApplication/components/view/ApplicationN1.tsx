import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import SelectBox from "./SelectBox";
import { DatePicker, Icon , Upload, Button, message,Spin } from "antd";
import { PromotionAppUtils } from "../../PromotionAppUtils";
import UserCheckModal from "./UserCheckModal";
import DateModal from './Datemodal';
import { appStore, authStore } from "src/stores/index";

interface Props {
  printRef?: any;
  obj?: any;
}

interface webProps {
  accept: string;
  action: string;
  method: string;
  data: {};
  headers: {};
  maxCount: number;
  showUploadList:boolean;
  // onRemove: (file: any) => void;
  beforeUpload: (file: any,fileList:any) => boolean | PromiseLike<any>;
  onChange: (file:any)=> void;
}

export default observer(function ApplicationN1(props: Props) {
  const { tableObjN1 } = PromotionAppUtils;
  const [DotPass, setDotPass] = useState(false);
  const [upLoading,setupLoading] = useState(false)
  const [isAduit, setisAduit] = useState({
    nodeCode: "",
    noPass:false,
  });

  useEffect(() => {
    if(PromotionAppUtils.handlenodeDto.length){
      let DotList: any = PromotionAppUtils.handlenodeDto.filter(
        (item: any) => item.status == 1
      );
      let DotObject: any = DotList.length && DotList[DotList.length - 1];
      let isDotPass = PromotionAppUtils.handlenodeDto.some(
        (item: any) => item.status == 0
      );
      setDotPass(isDotPass);
      setisAduit(DotObject);
    }
  }, [PromotionAppUtils.handlenodeDto]);
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false);
  const onDatePickerChange = (e: any, value: any) => {
    tableObjN1[value] = e;
  };
  const handelTextarea = (e: any, value: any) => {
    let ctext = e.target.value;
    tableObjN1[value] = ctext;
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    tableObjN1[value] = e.target.value;
  };
  const handleUserCheckOk = (userAudit: any, value: any) => {
    console.log(userAudit, value);
    PromotionAppUtils.tableObjN1.JS0000010 = value.empName;
    PromotionAppUtils.tableObjN1.JS0000011 = moment(value.updateTime).format(
      "YYYY-MM-DD HH:mm"
    );
    // auditFormSubmit(userAudit)
    setUserCheckVisible(false);
  };
  const handleRomve = (data:any)=>{
    setupLoading(true)
    let delDate = {id:data.id,masterId:data.entityId}
    PromotionAppUtils.deleteAttachment(delDate).then((res)=>{
        if(res.code == 200){
          message.success('删除成功')
          setupLoading(false)
          PromotionAppUtils.attachmentList = PromotionAppUtils.attachmentList.filter((item:any) => item.id != data.id)
        }
      
    })
  }

  // 上传props
  const webprops: webProps = {
    accept: ".pdf , .word , .execl , .xls",
    action: "/crNursing/api/nurse/promotion/uploadAttachment",
    method: "POST",
    data: { masterId: PromotionAppUtils.master.id },
    headers: {
      "App-Token-Nursing": appStore.getAppToken(),
      "Auth-Token-Nursing": authStore.getAuthToken(),
    },
    maxCount: 1,
    showUploadList:false,
    
     //文件上传之前的操作
    beforeUpload: (file) => {
      const isExceed =  PromotionAppUtils.attachmentList.length >= 5
      if (isExceed) {
        message.error('最多上传5份文件!');
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('文件大小不能超过5M!');
      }
      return isLt5M && !isExceed
    },
    // defaultFileList: PromotionAppUtils.attachmentList,
   
    onChange:(file)=>{
      file.fileList = PromotionAppUtils.attachmentList;
      if (file.file.status === 'uploading' || file.fileList.length >= 5) {
        return;
      }
      if (file.file.status === 'done') {
        if(file.file.response.code == 200){
          message.success(file.file?.response?.desc)
          const data:any = file.file.response.data
          let allDataList:any = PromotionAppUtils.attachmentList
          data.status = data.status == 1 ? 'done' : 'error' 
          data.url = data.path
          allDataList.push({...data})
          PromotionAppUtils.attachmentList = allDataList
          console.log(PromotionAppUtils.attachmentList);
          
          // PromotionAppUtils.attachmentList.push()
        }else {
          message.error(file.file?.response?.desc)
        }
      }

    },
  };

  return (
    <Wrapper ref={props.printRef} id="formPrintPage">
      <div
        className="zindex-form"
        style={{
          display:
            PromotionAppUtils.edit == true &&
            PromotionAppUtils.editStatus == "取消编辑"
              ? "none"
              : "",
        }}
        onClick={() => {
          message.warning("当前不是编辑状态，如需修改请点击编辑按钮！");
        }}
      >
         { isAduit.noPass == true && (
          <img
            src={require("../image/审批不通过.png")}
            className="form-status-img"
          />
        )}
        {isAduit.nodeCode == "withdraw" && (
          <img
            src={require("../image/已撤销.png")}
            className="form-status-img"
          />
        )}
        { isAduit.noPass == false && !DotPass && PromotionAppUtils.handlenodeDto.length &&(
          <img
            src={require("../image/审批通过.png")}
            className="form-status-img"
          />
        )}
        {isAduit.nodeCode != "withdraw" &&
          isAduit.noPass != true &&
          DotPass &&
          Number(PromotionAppUtils.flowStatus) > 0 &&
          PromotionAppUtils.master.status != "" && (
            <img
              src={require("../image/待审批.png")}
              className="form-status-img"
            />
          )}
      </div>
      <div
        className="first-form"
        style={{
          top:
            PromotionAppUtils.edit == true &&
            PromotionAppUtils.editStatus == "取消编辑" &&
            Number(PromotionAppUtils.flowStatus) > 0
              ? "23px"
              : "1118px",
        }}
        onClick={() => {
          message.warning("当前暂不可编辑，请根据流程进行修改！");
        }}
      />
      <div className="wrapper-pages-form">
        <div className="form-title">
          临床护理人员晋升申请表（N0→N1）（{moment().format("YYYY")}版）
        </div>
        <table>
          <colgroup>
            <col width={160} />
            <col width={160} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
            <tr>
              <td className="title-item" colSpan={4}>
                一、基本信息
              </td>
            </tr>
            <tr>
              <td>
                <div className="base-item">
                  <span>科室：</span>
                  {/* <Input value="26888888" value={tableObjN1.deptName}  onChange={(e)=>{handleInput(e,'deptName')}}/> */}
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN1.JS0000001}
                    onChange={(e) => {
                      handleInput(e, "JS0000001");
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>姓名：</span>
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN1.JS0000002}
                    onChange={(e) => {
                      handleInput(e, "JS0000002");
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>SAP号码：</span>
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN1.JS0000003}
                    onChange={(e) => {
                      handleInput(e, "JS0000003");
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>来院时间：</span>
                  <DatePicker onChange={(e)=>{onDatePickerChange(e,'JS0000004')}} defaultValue={tableObjN1.JS0000004 && moment(tableObjN1.JS0000004)}  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="base-item">
                  <span>学历：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000005}
                    inputKey={"JS0000005"}
                    option={[
                      { label: "大专", value: "A" },
                      { label: "本科", value: "B" },
                    ]}
                  />
                  （标准、大专及以上）
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  护士执业证书编号:
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN1.JS0000006}
                    onChange={(e) => {
                      handleInput(e, "JS0000006");
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span>职称：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000007}
                    inputKey={"JS0000007"}
                    option={[
                      { label: "初级（士）", value: "A" },
                      { label: "初级（师）", value: "B" },
                    ]}
                  />
                  <span style={{ marginLeft: 15 }}>
                    （标准：初级（士）及以上）
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                二、分层培训
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、N0分层培训手册填写：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000036}
                    inputKey={"JS0000036"}
                    option={[
                      { label: "均填写完成", value: "A" },
                      { label: "未填写完整", value: "B" },
                    ]}
                  />
                  （标准：完成相关培训并填写完整）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>2、资质认证：</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN1.JS0000037}
                    inputKey={"JS0000037"}
                    option={[
                      { label: "CPR资质证", value: "A" },
                      { label: "静脉治疗资质证", value: "B" },
                      { label: "文件书写资质证", value: "C" },
                      { label: "夜班资质证（病区）", value: "D" },
                    ]}
                  />
                  （标准：获得以上资质证）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>
                    3、三基理论考核：
                    <DateModal 
                      value={tableObjN1.JS0000038}
                      keys={"JS0000038"}
                    />
                    年度
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000039}
                    inputKey={"JS0000039"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考合格", value: "B" },
                      { label: "未考核", value: "C" },
                    ]}
                  />
                  （标准80分，含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>
                    4、专科理论考核：
                    <DateModal 
                      value={tableObjN1.JS0000041}
                      keys={"JS0000041"}
                    />
                    年度 
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000042}
                    inputKey={"JS0000042"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考合格", value: "B" },
                      { label: "未考核", value: "C" },
                    ]}
                  />
                  （标准60分，含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={5} style={{ textAlign: "center" }}>
                三、工作能力
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、能独立从事一般患者护理工作</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000044}
                    inputKey={"JS0000044"}
                    option={[
                      { label: "能", value: "A" },
                      { label: "暂不能", value: "B" },
                    ]}
                  />
                  （标准：能）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>2、转正后持续工作时间：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000045}
                    inputKey={"JS0000045"}
                    option={[
                      { label: "工作时间≥12月", value: "A" },
                      { label: "工作时间≤12月", value: "B" },
                    ]}
                  />
                  （标准：≥12月）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>3、参与临床倒班时间：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000046}
                    inputKey={"JS0000046"}
                    option={[
                      { label: "≥4个月", value: "A" },
                      { label: "＜4个月", value: "B" },
                    ]}
                  />
                  （标准≥4个月）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>4、各类长休假情况： </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000032}
                    inputKey={"JS0000032"}
                    option={[
                      { label: "无各长休假假", value: "A" },
                      { label: "有各类假等", value: "B" },
                    ]}
                  />
                  （原由及累计时间：
                  <input
                    className="acc-time"
                    type="text"
                    value={tableObjN1.JS0000033}
                    onChange={(e) => {
                      handleInput(e, "JS0000033");
                    }}
                  /><span>）</span>
                  （因孕产连续休假时间≥8个月，或申报晋级前12个月，其他缺勤≥3个月者，不能参加2021年分层晋级）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>5、曾获得何种荣誉： </span>
                  <textarea
                    value={tableObjN1.JS0000034}
                    style={{
                      width: 405,
                      whiteSpace: "pre-wrap",
                      lineHeight: "24px",
                    }}
                    className="textarea"
                    onChange={(e) => {
                      handelTextarea(e, "JS0000034");
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span className="title-item">四、自我总结</span>
                  （优点及需要改进的地方）
                </div>
                <div style={{ height: 370 }}>
                  <textarea
                    className="textarea-summarize"
                    value={tableObjN1.JS0000035}
                    onChange={(e) => {
                      handelTextarea(e, "JS0000035");
                    }}
                  />
                  <div style={{ marginLeft: 300 }} className="base-item">
                    <span>申请人签名：</span>
                    <div
                      onClick={() => {
                        setUserCheckVisible(true);
                      }}
                      className="sign-item"
                    >
                      {tableObjN1.JS0000010}
                    </div>
                    {/* <input className="acc-time" type="text"  value={tableObjN1.JS0001014} onChange={(e)=>{handleInput(e,'JS0001014')}} /> */}
                    <span>申请日期：</span>
                    <input
                      className="wih-150"
                      type="text"
                      value={tableObjN1.JS0000011}
                      onChange={(e) => {
                        handleInput(e, "JS0000011");
                      }}
                      onClick={(e) => {
                        if (!tableObjN1.JS0000011) {
                          tableObjN1.JS0000011 = moment().format(
                            "YYYY-MM-DD HH:mm"
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="wrapper-pages-form" style={{ paddingTop: "20px" }}>
        <table>
          <colgroup>
            <col width={160} />
            <col width={160} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
            <tr>
              <td className="title-item" colSpan={4}>
                五、资质审核
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span style={{ marginRight: 53 }}>1.护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000012}
                    inputKey={"JS0000012"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "不合格", value: "B" },
                    ]}
                  />
                  <span style={{ marginLeft: 40 }}>护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000014}
                    readOnly
                  />
                  <span style={{ marginLeft: 13 }}>日期：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000016}
                    readOnly
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>2.科护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000017}
                    inputKey={"JS0000017"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "不合格", value: "B" },
                    ]}
                  />
                  <span style={{ marginLeft: 40 }}>科护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000019}
                    readOnly
                  />
                  <span>日期：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000021}
                    readOnly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
                六、晋级考核
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span>1.理论考核：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    value={tableObjN1.JS0000047}
                    onChange={(e) => {
                      handleInput(e, "JS0000047");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准分60分）</span>
                </div>
                <div className="base-item">
                  <span>2.床边综合能力考核：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    value={tableObjN1.JS0000048}
                    onChange={(e) => {
                      handleInput(e, "JS0000048");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准分60分）</span>
                </div>
                <div className="base-item">
                  <span>3.读书报告：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    value={tableObjN1.JS0000049}
                    onChange={(e) => {
                      handleInput(e, "JS0000049");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准分60分）</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
                七、综合评价
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span style={{ marginRight: 126 }}>
                    1.{moment().format("YYYY")}年度无护理服务投诉
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000050}
                    inputKey={"JS0000050"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <span>（标准分60分）</span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 178 }}>
                    2.{moment().format("YYYY")}年绩效考核
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000051}
                    inputKey={"JS0000051"}
                    option={[
                      { label: "A", value: "A" },
                      { label: "B", value: "B" },
                      { label: "C或D", value: "C或D" },
                    ]}
                  />
                  <span>（标准分60分）</span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>
                    3.{moment().format("YYYY")}年无个人原因的III级护理不良事件
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000052}
                    inputKey={"JS0000052"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <span>（标准分3分）</span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 165 }}>
                    4.{moment().format("YYYY")}年度学分达标{" "}
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000053}
                    inputKey={"JS0000053"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />
                  <span>（标准分3分）</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
              八、晋级审核
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>科晋级小组</td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000022}
                    inputKey={"JS0000022"}
                    option={[
                      { label: "同意晋升", value: "A" },
                      { label: "不予晋升", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000024}
                    readOnly
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000026}
                    readOnly
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>护理部</td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN1.JS0000027}
                    inputKey={"JS0000027"}
                    option={[
                      { label: "同意晋升", value: "A" },
                      { label: "不予晋升", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000029}
                    readOnly
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN1.JS0000031}
                    readOnly
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="remark">
          备注：晋级审核请同时提交职称/学历复印件、读书报告（附护士长评语）、床边综合能力考核资料!
        </div>
        <div className="main-acc">
          <div className="accessory">附件</div>
          <Upload {...webprops}>
            <div className="add-accessory">添加附件</div>
          </Upload>
          <span>（文件大小不超过5M，支持pdf、word、execl最多上传5份文件）</span>
        </div>
          {PromotionAppUtils.attachmentList.map((item:any)=>{
             return <div  key={item.uid} >
                <Spin spinning={upLoading} delay={500} >
                <div className="upload-item">
                  <span>{item.name}</span>
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#f33838" onClick={()=>{handleRomve(item)} }/>
                </div>
                </Spin>
              </div>
          })}
      </div>

      <UserCheckModal
        visible={userCheckVisible}
        onCancel={() => setUserCheckVisible(false)}
        onOk={handleUserCheckOk}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 680px;
  padding: 8px 10px;
  overflow-y: auto;
  font-size: 12px;
  position: relative;
  .zindex-form {
    position: absolute;
    top: 23px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: transparent;
    width: 780px;
    height: 2200px;
    z-index: 99;
    .form-status-img {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 170px;
      height: 150px;
    }
  }
  .first-form {
    position: absolute;
    top: 23px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: transparent;
    width: 780px;
    height: 1080px;
    z-index: 89;
  }
  .upload-item{
    display: flex;
    align-items: center;
    .success{
      background-color: #27ba8b;
    }
    .error{
      background-color: #ee4646;
    }
    span{
      line-height: 30px;
      margin-right: 40px;
      display: block;
    }
  }
  .wrapper-pages-form {
    background-color: #fff;
    width: 780px;
    height: 1080px;
    margin: 15px auto;
    padding: 0 40px;
    .form-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      height: 60px;
    }
    table {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          input,
          textarea {
            border: none;
            outline: none;
            resize: none;
            width: 100px;
            line-height: 13px;
          }
          .border {
            border-bottom: 1px solid #000;
          }
        }
      }
    }
    .base-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .title-item {
      font-weight: bold;
    }
    .remark {
      color: #b3b3b3;
      line-height: 26px;
    }
    .main-acc {
      display: flex;
      align-items: center;
      position: relative;
    }
    .accessory {
      color: #000;
      margin-right: 20px;
      display: flex;
      align-items: center;
      ::before {
        content: "";
        display: block;
        height: 20px;
        margin-right: 10px;
        width: 10px;
        background-color: #27ba8b;
      }
    }
    .add-accessory {
      color: #27ba8b;
      line-height: 26px;
    }
    .wih-150{
      width: 150px;
    }
    .textarea-summarize {
      width: 700px;
      height: 320px;
      line-height: 24px;
    }
    .year-picker {
      width: 38px;
      input {
        width: 38px;
      }
    }
    .acc-time {
      width: 80px;
      
    }
    .sign-item {
      width: 80px;
      height: 26px;
    }
  }
  .ant-calendar-picker-icon,
  .ant-calendar-picker-clear {
    display: none;
  }
  .ant-input {
    padding: 0;
    border: none;
    resize: none;
    outline: none;
    overflow: hidden;
    /* width: 40px !important; */
    height: 15px;
    text-align: center;
  }
`;
