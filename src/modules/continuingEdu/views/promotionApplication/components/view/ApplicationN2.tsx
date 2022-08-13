import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import SelectBox from "./SelectBox";
import { Icon , Upload, DatePicker , message,Spin,Input } from "antd";
import DateModal from './Datemodal';
import { PromotionAppUtils } from "../../PromotionAppUtils";
import UserCheckModal from "./UserCheckModal";
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
  const { tableObjN2 } = PromotionAppUtils;
  const [upLoading,setupLoading] = useState(false)
  const [DotPass, setDotPass] = useState(false);
  const [isAduit, setisAduit] = useState({
    noPass: false,
    nodeCode:''
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
    tableObjN2[value] = e;
  };
  const handelTextarea = (e: any, value: any) => {
    let ctext = e.target.value;
    tableObjN2[value] = ctext;
  };
  const handelTextareas = (e: any, value: any,key:number) => {
    let ctext = e.target.value;
    PromotionAppUtils.carePatientList[key][value] = ctext
    PromotionAppUtils.carePatientList[key].masterId = PromotionAppUtils.master.id
  };
  const handelDatePicker = (e: any, value: any,key:number) => {
    let ctext = moment(e).format("YYYY-MM-DD HH:mm");
    PromotionAppUtils.carePatientList[key][value] = ctext
    PromotionAppUtils.carePatientList[key].masterId = PromotionAppUtils.master.id
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    tableObjN2[value] = e.target.value;
  };
  const handleUserCheckOk = (userAudit: any, value: any) => {
    console.log(userAudit, value);
    PromotionAppUtils.tableObjN2.JS0000010 = value.empName;
    PromotionAppUtils.tableObjN2.JS0000011 = moment(value.updateTime).format(
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

  //点击跳转对应页
  const handleSkip =(data:any)=> {
    const path: string = data.path
    window.open(path);
  }

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
        { isAduit.noPass == false && !DotPass && PromotionAppUtils.handlenodeDto.length &&  (
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
            PromotionAppUtils.editStatus == "取消编辑" &&
            Number(PromotionAppUtils.flowStatus) > 0  
              ? "23px"
              : "1118px",
          height:
            PromotionAppUtils.editStatus == "取消编辑" &&
            Number(PromotionAppUtils.flowStatus) > 0
              ? "1080px"
              : "2213px",
        }}
        onClick={() => {
          message.warning("当前暂不可编辑，请根据流程进行修改！");
        }}
      ></div>
     <div className="wrapper-pages-form">
        <div className="form-title">
          临床护理人员晋升申请表（N1→N2）（{moment().format("YYYY")}版）
        </div>
        <table>
          <colgroup>
            <col width={80} />
            <col width={240} />
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
              <td colSpan={2}>
                <div className="base-item">
                  <span>科室：</span>
                  {/* <Input value="26888888" value={tableObjN2.deptName}  onChange={(e)=>{handleInput(e,'deptName')}}/> */}
                  <input
                    type="text"
                    className="mar-btom"
                    value={tableObjN2.JS0000001}
                    onChange={(e) => {
                      handleInput(e, "JS0000001");
                    }}
                  />
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  <span>姓名：</span>
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN2.JS0000002}
                    onChange={(e) => {
                      handleInput(e, "JS0000002");
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
            <td colSpan={2}>
                <div className="base-item">
                  <span>SAP号码：</span>
                  <input
                    className="mar-btom"
                    type="text"
                    value={tableObjN2.JS0000003}
                    onChange={(e) => {
                      handleInput(e, "JS0000003");
                    }}
                  />
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  <span>学历：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000005}
                    inputKey={"JS0000005"}
                    option={[
                      { label: "大专", value: "A" },
                      { label: "本科", value: "B" },
                    ]}
                  />
                  （标准、大专及以上）
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
                    values={tableObjN2.JS0000007}
                    inputKey={"JS0000007"}
                    option={[
                      { label: "初级（士）", value: "A" },
                      { label: "初级（师）", value: "B" },
                      { label: "主管护师 ", value: "C" },
                    ]}
                  />
                  <span style={{ marginLeft: 15 }}>
                    （标准：护师及以上职称或获得护士职称5年以上）
                  </span> 
                  </div>
              </td>
            </tr>
            <tr>
            <td colSpan={2}>
                <div className="base-item">
                  <span>来院时间：</span>
                  <DatePicker onChange={(e)=>{onDatePickerChange(e,'JS0000004')}} value={tableObjN2.JS0000004 && moment(tableObjN2.JS0000004)}  />（标准：{moment().subtract(3,'year').format('YYYY年MM月DD日')}前）
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  <span>取得N1资质时间：</span>
                   <DatePicker onChange={(e)=>{onDatePickerChange(e,'JS0000054')}} value={tableObjN2.JS0000054 && moment(tableObjN2.JS0000054)}  />
                  （标准：{moment().subtract(1,'year').format('YYYY年MM月DD日')}前）
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                二、分层培训
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、N1分层培训：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000055}
                    inputKey={"JS0000055"}
                    option={[
                      { label: "完成相关培训", value: "A" },
                      { label: "未完成相关培训", value: "B" },
                    ]}
                  />
                  （查看“分层手册填写”情况）
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
                    values={tableObjN2.JS0000056}
                    inputKey={"JS0000056"}
                    option={[
                      { label: "CPR资质证", value: "A" },
                      { label: "专科准入资质证（重症、急诊填写）", value: "B" },
                      { label: "床边教学老师培训合格证", value: "C" },
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
                      value={tableObjN2.JS0000057}
                      keys={"JS0000057"}
                    />
                   年度
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000058}
                    inputKey={"JS0000058"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "不合格", value: "B" },
                    ]}
                  />
                  <DateModal 
                      value={tableObjN2.JS0000060}
                      keys={"JS0000060"}
                    />
                    年度
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000061}
                    inputKey={"JS0000061"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "不合格", value: "B" },
                    ]}
                  />（标准80分，不含补考）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>
                    4、专科理论考核：
                    <DateModal 
                      value={tableObjN2.JS0000041}
                      keys={"JS0000041"}
                    />
                    年度
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000042}
                    inputKey={"JS0000042"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考合格", value: "B" },
                      { label: "未考核", value: "C" },
                    ]}
                  />（标准70分，含补考合格，未考核请注明原因）
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={6} style={{ textAlign: "center" }}>
                三、工作能力
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、能独立承担各班次工作</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000063}
                    inputKey={"JS0000063"}
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
                  <span>2、能独立进行危重患者护理</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000064}
                    inputKey={"JS0000064"}
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
                  <span>3、</span>
                  <DateModal 
                      value={tableObjN2.JS0000065}
                      keys={"JS0000065"}
                    />
                    年-
                    <DateModal 
                      value={tableObjN2.JS0000066}
                      keys={"JS0000066"}
                    />年N班班次：
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000067}
                    inputKey={"JS0000067"}
                    option={[
                      { label: "≥35个/年", value: "A" },
                      { label: "＜35个/年 ", value: "B" },
                    ]}
                  />
                  （标准≥35个/年）
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
                    values={tableObjN2.JS0000032}
                    inputKey={"JS0000032"}
                    option={[
                      { label: "无各长休假假", value: "A" },
                      { label: "有各类假等", value: "B" },
                    ]}
                  />
                  （原由及累计时间：
                  <input
                    className="mar-btom acc-time"
                    type="text"
                    defaultValue={tableObjN2.JS0000033}
                    onChange={(e) => {
                      handleInput(e, "JS0000033");
                    }}
                  />
                  <span>）</span>
                  （晋级前12个月，累计缺勤时间≥6个月者，返岗当年不得参加晋级考核）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>5、参与教学： </span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN2.JS0000068}
                    inputKey={"JS0000068"}
                    option={[
                      { label: "健教大课堂授课次", value: "A" },
                    ]}
                  />：
                  <input
                    className=" border mar-btom"
                    type="text"
                    value={tableObjN2.JS0000069}
                    onChange={(e) => {
                      handleInput(e, "JS0000069");
                    }}
                  />次；  授课时间及课题 
                   <input
                    className=" border mar-btom"
                    type="text"
                    value={tableObjN2.JS0000070}
                    onChange={(e) => {
                      handleInput(e, "JS0000070");
                    }}
                  />
                </div>
                <div className="base-item">
                  <span style={{marginLeft:125}}> </span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN2.JS0000071}
                    inputKey={"JS0000071"}
                    option={[
                      { label: "理论授课", value: "B" },
                    ]}
                  />：
                  <input
                    className=" border mar-btom"
                    type="text"
                    value={tableObjN2.JS0000072}
                    onChange={(e) => {
                      handleInput(e, "JS0000072");
                    }}
                  />次；  授课时间及课题 
                   <input
                    className=" border mar-btom"
                    type="text"
                    value={tableObjN2.JS0000073}
                    onChange={(e) => {
                      handleInput(e, "JS0000073");
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>6、曾获得何种荣誉： </span>
                  <textarea
                    value={tableObjN2.JS0000034}
                    style={{
                      width: 405,
                      whiteSpace: "pre-wrap",
                      lineHeight: "24px",
                      textAlign: "left"
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
                <div style={{ height: 330 }}>
                  <textarea
                    className="textarea-summarize"
                    value={tableObjN2.JS0000035}
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
                      {tableObjN2.JS0000010}
                    </div>
                    {/* <input className="acc-time" type="text"  value={tableObjN2.JS0001014} onChange={(e)=>{handleInput(e,'JS0001014')}} /> */}
                    <span>申请日期：</span>
                    <input
                      className="wih-150"
                      type="text"
                      style={{ width: "150px" }}
                      value={tableObjN2.JS0000011}
                      onChange={(e) => {
                        handleInput(e, "JS0000011");
                      }}
                      onClick={(e) => {
                        if (!tableObjN2.JS0000011) {
                          tableObjN2.JS0000011 = moment().format(
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
                    disabled={true}
                    values={tableObjN2.JS0000012}
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
                    readOnly
                    defaultValue={tableObjN2.JS0000014}
                  />
                  <span style={{ marginLeft: 13 }}>日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    readOnly
                    defaultValue={tableObjN2.JS0000016}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>2.科护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={true}
                    values={tableObjN2.JS0000017}
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
                    readOnly
                    defaultValue={tableObjN2.JS0000019}
                  />
                  <span>日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    readOnly
                    defaultValue={tableObjN2.JS0000021}
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
                    value={tableObjN2.JS0000047}
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
                    value={tableObjN2.JS0000048}
                    onChange={(e) => {
                      handleInput(e, "JS0000048");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准分60分）</span>
                </div>
                <div className="base-item">
                  <span>3.个案论文：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    value={tableObjN2.JS0000074}
                    onChange={(e) => {
                      handleInput(e, "JS0000074");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准分3分）</span>
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
                  <span style={{ marginRight: 99 }}>
                  1.近两年无护理服务投诉： 
                  </span>
                  <DateModal 
                      value={tableObjN2.JS0000075}
                      keys={"JS0000075"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000076}
                    inputKey={"JS0000076"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <DateModal 
                      value={tableObjN2.JS0000077}
                      keys={"JS0000077"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000078}
                    inputKey={"JS0000078"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <span>（标准：无）</span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 117 }}>
                  2. 年度绩效考核结果：
                  </span>
                  <DateModal 
                      value={tableObjN2.JS0000079}
                      keys={"JS0000079"}
                    />年
                     <input
                        type="text"
                        style={{margin:"0px 10px"}}
                        className="mar-btom border acc-time"
                        value={tableObjN2.JS0000080}
                        onChange={(e) => {
                          handleInput(e, "JS0000080");
                        }}
                      />
                      <DateModal 
                      value={tableObjN2.JS0000081}
                      keys={"JS0000081"}
                    />年
                     <input
                        type="text"
                        style={{margin:"0px 10px"}}
                        className="mar-btom border acc-time"
                        value={tableObjN2.JS0000082}
                        onChange={(e) => {
                          handleInput(e, "JS0000082");
                        }}
                      />
                      （标准:B级以上）
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 20 }}>
                  3.无个人原因导致的III级护理不良事件：
                  </span>
                  <DateModal 
                      value={tableObjN2.JS0000083}
                      keys={"JS0000083"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000084}
                    inputKey={"JS0000084"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <DateModal 
                      value={tableObjN2.JS0000085}
                      keys={"JS0000085"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000086}
                    inputKey={"JS0000086"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <span>（标准：无）</span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 125 }}>
                  4.年度学分达标： 
                  </span>
                  <DateModal 
                      value={tableObjN2.JS0000087}
                      keys={"JS0000087"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000088}
                    inputKey={"JS0000088"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />
                  <DateModal 
                      value={tableObjN2.JS0000089}
                      keys={"JS0000089"}
                    />年
                     <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN2.JS0000090}
                    inputKey={"JS0000090"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />（标准:达标）
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
                    disabled={true}
                    values={tableObjN2.JS0000022}
                    inputKey={"JS0000022"}
                    option={[
                      { label: "同意晋升", value: "A" },
                      { label: "不予晋升", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 145 }}>科护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    readOnly
                    defaultValue={tableObjN2.JS0000024}
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    readOnly
                    defaultValue={tableObjN2.JS0000026}
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
                    disabled={true}
                    values={tableObjN2.JS0000027}
                    inputKey={"JS0000027"}
                    option={[
                      { label: "同意晋升", value: "A" },
                      { label: "不予晋升", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 145 }}>科护士签名：</span>
                  <input
                    type="text"
                    className="mar-btom"
                    readOnly
                    defaultValue={tableObjN2.JS0000029}
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    readOnly
                    defaultValue={tableObjN2.JS0000031}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="remark">
        备注：1、晋级审核请同时提交职称/学历复印件、个案论文（附个案论文评价表）、床边综合能力考核资料!
        </div>
        <div className="remark">
        2、关于危重患者护理能力请填写至少5名患者的信息
        </div>
        <div className="main-acc">
          <div className="accessory">附件</div>
          <Upload {...webprops}>
            <div className="add-accessory">添加附件</div>
          </Upload>
          <span>（文件大小不超过5M，支持pdf、word、execl最多上传5份文件）</span>
        </div>
        <div className="word-item">
          {PromotionAppUtils.attachmentList.map((item:any)=>{
             return <div  key={item.uid} >
                <Spin spinning={upLoading} delay={500} >
                <div className="upload-item"  onClick={()=>{handleSkip(item)}}>
                  <span>{item.name}</span>
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#f33838" onClick={()=>{handleRomve(item)} }/>
                </div>
                </Spin>
              </div>
          })}
        </div>
      </div>
      <div className="wrapper-pages-form" style={{ paddingTop: "40px" }}>
        <table>
          <colgroup>
            <col width={120} />
            <col width={130} />
            <col width={250} />
            <col width={700 - 500} />
          </colgroup>
          <thead>
            <tr>
              <td>患者姓名</td>
              <td>病案号</td>
              <td>总结患者危险点或<br />发现异常病情主动上报 </td>
              <td>护理的具体时间（N1期间）</td>
            </tr>
          </thead>
          <tbody>
            {PromotionAppUtils.carePatientList.length == 6 && PromotionAppUtils.carePatientList.map((item:any,index:number)=><tr key={index}>
              <td>
              <Input
                value={item.patientName}
                className="td-center inp_textArea"
                onChange={(e) => {
                  handelTextareas(e, "patientName",index);
                }}
              />
              </td>
              <td>
              <Input
                value={item.medicalRecordNo}
                className="td-center inp_textArea"
                onChange={(e) => {
                  handelTextareas(e, "medicalRecordNo",index);
                }}
              />
              </td>
              <td>
              <Input.TextArea
                value={item.careMessage}
                className="td-center inp_textArea"
                onChange={(e) => {
                  handelTextareas(e, "careMessage",index);
                }}
                autosize={{ minRows: 3 }}
              />
              </td>
              <td style={{textAlign:'center'}}>
              <DatePicker showTime onChange={(e)=>{handelDatePicker(e, "careTime",index);}} value={(item.careTime ? moment(item.careTime) : undefined)} format="YYYY-MM-DD HH:mm" className="inp_textArea" key={'careTime' + index}/>
              </td>
            </tr>
            )}
            
          </tbody>
        </table>
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
    height: 3295px;
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
            text-align: center;
            overflow: hidden;
            line-height: 15px;
          }
          .border {
            border-bottom: 1px solid #000;
          }
        }
      }
      thead{
        text-align: center;
        font-size: 15px;
        font-weight: bold;
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
    .word-item{
      height: 200px;
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
    .textarea-summarize {
      width: 700px;
      height: 280px;
      line-height: 24px;
      text-align: left;
    }
    .year-picker {
      width: 38px;
      border-bottom:1px solid;
      input {
        width: 38px;
      }
    }
    .acc-time {
      width: 80px;
    }
    .mar-btom{
      margin: 0 10px;
    }
    .sign-item {
      width: 80px;
      height: 26px;
    }
    .inp_textArea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      border-radius: 0;
      resize: none;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
      ::-webkit-scrollbar {
        display: none;
      }
      .ant-input{
        width:150px;
      }
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
