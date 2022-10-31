import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import SelectBox from "./SelectBox";
import { Icon , Upload, DatePicker, message,Spin,Input } from "antd";
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
  const { tableObjN4 } = PromotionAppUtils;
  const [DotPass, setDotPass] = useState(false);
  const [upLoading,setupLoading] = useState(false)
  const [isAduit, setisAduit] = useState({noPass:false,nodeCode:''});

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
  const handelTextarea = (e: any, value: any) => {
    let ctext = e.target.value;
    tableObjN4[value] = ctext;
  };
  const onDatePickerChange = (e: any, value: any) => {
    tableObjN4[value] = e;
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    tableObjN4[value] = e.target.value;
  };
  const handleUserCheckOk = (userAudit: any, value: any) => {
    PromotionAppUtils.tableObjN4.JS0000010 = value.empName;
    PromotionAppUtils.tableObjN4.JS0000011 = value.updateTime? moment(value.updateTime).format(
      "YYYY-MM-DD HH:mm") : moment().format("YYYY-MM-DD HH:mm");
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
            backgroundColor: PromotionAppUtils.editStatus == "创建" ? "rgba(204, 204, 204, 0.5)" : ""
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
        { isAduit.noPass == false && !DotPass && PromotionAppUtils.handlenodeDto.length && (
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
              : "1807px",
          height:
            PromotionAppUtils.editStatus == "取消编辑" &&
            Number(PromotionAppUtils.flowStatus) > 0
              ? "1807px"
              : "1500px",
        }}
        onClick={() => {
          message.warning("当前暂不可编辑，请根据流程进行修改！");
        }}
      ></div>
     <div className="wrapper-pages-form">
        <div className="form-title">
          临床护理人员晋升申请表（N3→N4）（{moment().format("YYYY")}版）
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
                  <input
                    className="wih-150"
                    type="text"
                    value={tableObjN4.JS0000001}
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
                    value={tableObjN4.JS0000002}
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
                    value={tableObjN4.JS0000003}
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
                    values={tableObjN4.JS0000005}
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
                    values={tableObjN4.JS0000007}
                    inputKey={"JS0000007"}
                    option={[
                      { label: "主管护师", value: "C" },
                    ]}
                  />
                    （<DateModal
                      value={tableObjN4.JS0000009}
                      keys={"JS0000009"}
                    />
                    年获得）
                <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000007}
                    inputKey={"JS0000007"}
                    option={[
                      { label: "副主任护师 ", value: "D" },
                    ]}
                  />
                  <span style={{ marginLeft: 15 }}>
                  （标准：副主任护师或获得主管护师3年以上）
                  </span>
                  </div>
              </td>
            </tr>
            <tr>
            <td colSpan={2}>
                <div className="base-item">
                  <span>来院时间：</span>
                  <DatePicker onChange={(e)=>{onDatePickerChange(e,'JS0000004')}} value={tableObjN4.JS0000004 && moment(tableObjN4.JS0000004)}  />
                 （标准：{moment().subtract(3,'year').format('YYYY年MM月DD日')}前）
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  <span>取得N3资质时间</span>
                  <DatePicker onChange={(e)=>{onDatePickerChange(e,'JS0000133')}} value={tableObjN4.JS0000133 && moment(tableObjN4.JS0000133)}  />
                  （标准：{moment().subtract(1,'year').format('YYYY年MM月DD日')}前）
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={5} style={{ textAlign: "center" }}>
                二、分层培训
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、N3层级培训课程、操作技能完成率：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000134}
                    inputKey={"JS0000134"}
                    option={[
                      { label: "≥60%", value: "A" },
                      { label: "＜60%", value: "B" },
                    ]}
                  />
                  （标准：≥60%）
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
                    values={tableObjN4.JS0000135}
                    inputKey={"JS0000135"}
                    option={[
                      { label: "", value: "A" },
                    ]}
                  />
                  <input
                    className="border mar-btom"
                    type="text"
                    value={tableObjN4.JS0000094}
                    onChange={(e) => {
                      handleInput(e, "JS0000094");
                    }}
                  />专科护士证
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                      type="checkbox"
                      disabled={false}
                      values={tableObjN4.JS0000135}
                      inputKey={"JS0000135"}
                      option={[
                        { label: "", value: "B" },
                      ]}
                    />
                    <input
                      className="border mar-btom"
                      type="text"
                      value={tableObjN4.JS0000095}
                      onChange={(e) => {
                        handleInput(e, "JS0000095");
                      }}
                    /> <span>专长护理资质证（气道护理、IABP护理、CRRT护理、心衰/心衰超滤、</span>
                    <span>皮肤、糖尿病、健康教育讲师、疼痛、静疗、康复）</span>
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                      type="checkbox"
                      disabled={false}
                      values={tableObjN4.JS0000135}
                      inputKey={"JS0000135"}
                      option={[
                        { label: "获得“护理论文撰写提高班”合格证书", value: "C" },
                      ]}
                    />
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                （标准：1、获得专科护士证或一项专长护理资质证 2、获得“护理论文撰写提高班”合格证书）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>
                  3、三基理论考核：
                    <DateModal
                      value={tableObjN4.JS0000097}
                      keys={"JS0000097"}
                    />
                    年度
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000098}
                    inputKey={"JS0000098"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考", value: "B" },
                    ]}
                  />
                  <span style={{marginLeft:40}}></span>
                    <DateModal
                      value={tableObjN4.JS0000100}
                      keys={"JS0000100"}
                    />
                    年度
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000101}
                    inputKey={"JS0000101"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{marginLeft:100}}></span>
                  <DateModal
                      value={tableObjN4.JS0000136}
                      keys={"JS0000136"}
                    />
                    年度
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000137}
                    inputKey={"JS0000137"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考", value: "B" },
                    ]}
                  />（标准：合格，不含补考）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>
                  4、专科理论考核：
                  <DateModal
                      value={tableObjN4.JS0000041}
                      keys={"JS0000041"}
                    />
                    年度
                  </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000042}
                    inputKey={"JS0000042"}
                    option={[
                      { label: "合格", value: "A" },
                      { label: "补考合格", value: "B" },
                      { label: "未考核", value: "C" },
                    ]}
                  />（标准80分，不含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span> 5、发表护理论文：</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000139}
                    inputKey={"JS0000139"}
                    option={[
                      { label: "≥ 2篇", value: "1" },
                    ]}
                  />
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000140}
                    inputKey={"JS0000140"}
                    option={[
                      { label: "参编书籍", value: "1" },
                    ]}
                  />
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000141}
                    inputKey={"JS0000141"}
                    option={[
                      { label: "专利发明人第一人", value: "1" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{marginLeft:50}}>1)  论文题目：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000142}
                      onChange={(e) => {
                        handleInput(e, "JS0000142");
                      }}
                    />
                  <span style={{marginLeft:50}}> 发表时间： </span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000143}
                      onChange={(e) => {
                        handleInput(e, "JS0000143");
                      }}
                    />
                </div>
                <div className="base-item"style={{marginLeft:70}}>
                  <span> 期刊名称：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000144}
                      onChange={(e) => {
                        handleInput(e, "JS0000144");
                      }}
                    />
                  <span style={{marginLeft:50}}> 影响因子：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000145}
                      onChange={(e) => {
                        handleInput(e, "JS0000145");
                      }}
                    />
                </div>
                <div className="base-item">
                  <span style={{marginLeft:50}}>2)  论文题目：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000146}
                      onChange={(e) => {
                        handleInput(e, "JS0000146");
                      }}
                    />
                  <span style={{marginLeft:50}}> 发表时间： </span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000147}
                      onChange={(e) => {
                        handleInput(e, "JS0000147");
                      }}
                    />
                </div>
                <div className="base-item"style={{marginLeft:70}}>
                  <span> 期刊名称：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000148}
                      onChange={(e) => {
                        handleInput(e, "JS0000148");
                      }}
                    />
                  <span style={{marginLeft:50}}> 影响因子：</span>
                  <input
                      className="border other-time mar-btom"
                      type="text"
                      value={tableObjN4.JS0000149}
                      onChange={(e) => {
                        handleInput(e, "JS0000149");
                      }}
                    />
                </div>
                <div className="base-item"style={{marginLeft:50}}>
                  <span> 3) 其他（参编书籍、专利）：</span>
                  <input
                      className="border wih-300"
                      style={{width:300}}
                      type="text"
                      value={tableObjN4.JS0000150}
                      onChange={(e) => {
                        handleInput(e, "JS0000150");
                      }}
                    />
                </div>
                (标准：以第一作者发表论文N3阶段≥2篇，含至少1篇影响因子≥0.6；北大核心或统计源核心可1篇或参编书籍一本或专利发明人第一人
              </td>
            </tr>
            <tr>
              <td rowSpan={3} style={{ textAlign: "center" }}>
                三、工作能力
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、患者护理：</span>
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <span> 指导下级护士进行危重患者护理: </span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000151}
                    inputKey={"JS0000151"}
                    option={[
                      { label: "能指导下级护士进行疑难、危重、抢救护理，主持大科疑难讨论≥1次", value: "1" },
                    ]}
                  />

                </div>
                <div className="base-item" style={{marginLeft:77}}>
                主持时间及患者信息
                   <input
                      className="border wih-300"
                      style={{width:300}}
                      type="text"
                      value={tableObjN4.JS0000152}
                      onChange={(e) => {
                        handleInput(e, "JS0000152");
                      }}
                    />

                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000153}
                    inputKey={"JS0000153"}
                    option={[
                      { label: "参与区域/院级疑难危重会诊", value: "1" },
                    ]}
                  />
                   <input
                      className="border wih-300"
                      style={{width:300}}
                      type="text"
                      value={tableObjN4.JS0000154}
                      onChange={(e) => {
                        handleInput(e, "JS0000154");
                      }}
                    />
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000155}
                    inputKey={"JS0000155"}
                    option={[
                      { label: "参与", value: "1" },
                    ]}
                  />
                   <input
                      className="border wih-150"
                      style={{width:200}}
                      type="text"
                      value={tableObjN4.JS0000156}
                      onChange={(e) => {
                        handleInput(e, "JS0000156");
                      }}
                    />
                    护理门诊 （标准：至少具备一项）
                </div>

              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>3、</span>
                  <DateModal
                      value={tableObjN4.JS0000065}
                      keys={"JS0000065"}
                    />-
                  <DateModal
                      value={tableObjN4.JS0000066}
                      keys={"JS0000066"}
                    />年N班班次：
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000067}
                    inputKey={"JS0000067"}
                    option={[
                      { label: "≥25个/年", value: "A" },
                      { label: "＜25个/年", value: "B" },
                    ]}
                  />
                  （标准≥25个/年）
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
                    values={tableObjN4.JS0000032}
                    inputKey={"JS0000032"}
                    option={[
                      { label: "无各长休假假", value: "A" },
                      { label: "有各类假等", value: "B" },
                    ]}
                  />
                  （原由及累计时间：
                  <input
                    className="mar-btom"
                    type="text"
                    defaultValue={tableObjN4.JS0000033}
                    onChange={(e) => {
                      handleInput(e, "JS0000033");
                    }}
                  /> <span>）</span>
                  （晋级前12个月，累计缺勤时间≥6个月者，返岗当年不得参加晋级考核）
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className="wrapper-pages-form" style={{ paddingTop: "50px" }}>
        <table>
          <colgroup>
            <col width={80} />
            <col width={240} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
          <tr>
              <td></td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>5、曾获得何种荣誉： </span>
                  <textarea
                    value={tableObjN4.JS0000034}
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
            <td></td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>6、教学情况： </span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000109}
                    inputKey={"JS0000109"}
                    option={[
                      { label: "实习/轮转/新护士带教", value: "1" },
                    ]}
                  />
                   <input
                    className="mar-btom border"
                    type="text"
                    defaultValue={tableObjN4.JS0000110}
                    onChange={(e) => {
                      handleInput(e, "JS0000110");
                    }}
                  />人；临床带教时间及姓名
                   <input
                    className="mar-btom border"
                    type="text"
                    value={tableObjN4.JS0000111}
                    onChange={(e) => {
                      handleInput(e, "JS0000111");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000115}
                    inputKey={"JS0000115"}
                    option={[
                      { label: "健康宣教大课堂授课", value: "1" },
                    ]}
                  />
                   <input
                    className="mar-btom border"
                    type="text"
                    defaultValue={tableObjN4.JS0000116}
                    onChange={(e) => {
                      handleInput(e, "JS0000116");
                    }}
                  />次；授课时间及课题
                   <input
                    className="mar-btom border"
                    type="text"
                    defaultValue={tableObjN4.JS0000117}
                    onChange={(e) => {
                      handleInput(e, "JS0000117");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000157}
                    inputKey={"JS0000157"}
                    option={[
                      { label: "院级教学工作：授课时间及课题", value: "1" },
                    ]}
                  />
                   <input
                    className="mar-btom border"
                    type="text"
                    defaultValue={tableObjN4.JS0000158}
                    onChange={(e) => {
                      handleInput(e, "JS0000158");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:77}}>
                （ 标准：1、N3阶段带教实习生/进修/轮转/新上岗护士≥2人；
              <br />2、N3阶段院级教学工作≥4学时；或参加健康宣教大课堂授课10学时）
                </div>
              </td>
            </tr>
          <tr>
            <td></td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>7、参与管理：</span>
                </div>
                <div className="base-item" style={{marginLeft:30}}>
                <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000118}
                    inputKey={"JS0000118"}
                    option={[
                      { label: "协助护士长病房管理，具有提升护理品质的能力，组织安全讨论会≥1次组织时间和主题", value: "1" },
                    ]}
                  />
                   <input
                    className="border mar-btom"
                    type="text"
                    defaultValue={tableObjN4.JS0000119}
                    onChange={(e) => {
                      handleInput(e, "JS0000119");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:30}}>
                <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000120}
                    inputKey={"JS0000120"}
                    option={[
                      { label: "参与QCC（骨干成员） QCC主题、承担角色", value: "1" },
                    ]}
                  />
                  <input
                    className="border wih-300"
                    type="text"
                    defaultValue={tableObjN4.JS0000121}
                    style={{width:200}}
                    onChange={(e) => {
                      handleInput(e, "JS0000121");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:30}}>
                <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000122}
                    inputKey={"JS0000122"}
                    option={[
                      { label: "参与专科小组/委员会 ：  ", value: "1" },
                    ]}
                  />
                   <input
                    className="border mar-btom"
                    type="text"
                    defaultValue={tableObjN4.JS0000123}
                    onChange={(e) => {
                      handleInput(e, "JS0000123");
                    }}
                  />专科/委员会，承担角色
                   <input
                    className="border mar-btom"
                    type="text"
                    defaultValue={tableObjN4.JS0000124}
                    onChange={(e) => {
                      handleInput(e, "JS0000124");
                    }}
                  />
                </div>
                <div className="base-item" style={{marginLeft:30}}>
                <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000125}
                    inputKey={"JS0000125"}
                    option={[
                      { label: "未参与 ", value: "1" },
                    ]}
                  />
                </div>
                （ 标准：1、N3阶段参与病房管理，组织安全讨论会1次 2、N3阶段承担QCC骨干成员或专科小组/委员会核心成员）
              </td>
            </tr>
          <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span className="title-item">四、自我总结</span>
                  （优点及需要改进的地方）
                </div>
                <div style={{ height: 250 }}>
                  <textarea
                    className="textarea-summarize"
                    value={tableObjN4.JS0000035}
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
                      {tableObjN4.JS0000010}
                    </div>
                    {/* <input className="acc-time" type="text"  value={tableObjN4.JS0001014} onChange={(e)=>{handleInput(e,'JS0001014')}} /> */}
                    <span>申请日期：</span>
                    <input
                      className="wih-150"
                      type="text"
                      style={{ width: "150px" }}
                      defaultValue={tableObjN4.JS0000011}
                      onChange={(e) => {
                        handleInput(e, "JS0000011");
                      }}
                      onClick={(e) => {
                        if (!tableObjN4.JS0000011) {
                          tableObjN4.JS0000011 = moment().format(
                            "YYYY-MM-DD HH:mm"
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </td>
            </tr>
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
                    values={tableObjN4.JS0000012}
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
                    defaultValue={tableObjN4.JS0000014}
                    readOnly
                  />
                  <span style={{ marginLeft: 13 }}>日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    defaultValue={tableObjN4.JS0000016}
                    readOnly
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>2.科护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={true}
                    values={tableObjN4.JS0000017}
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
                    defaultValue={tableObjN4.JS0000019}
                    readOnly
                  />
                  <span>日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    defaultValue={tableObjN4.JS0000021}
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
                  <span>是否申请免考 </span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000126}
                    inputKey={"JS0000126"}
                    option={[
                      { label: "否（选否者填写考核成绩）", value: "A" },
                      { label: "申请免考（免考原由", value: "B" },
                    ]}
                  />
                 <input
                    className="border mar-btom"
                    type="text"
                    defaultValue={tableObjN4.JS0000127}
                    onChange={(e) => {
                      handleInput(e, "JS0000127");
                    }}
                  />）
                </div>
                <div className="base-item">
                  <span>1.理论考核：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    defaultValue={tableObjN4.JS0000047}
                    style={{...appStore.HOSPITAL_ID==='whyx'&&Number(tableObjN4.JS0000047)<60? {color: 'red'}:null}}
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
                    defaultValue={tableObjN4.JS0000048}
                    style={{...appStore.HOSPITAL_ID==='whyx'&&Number(tableObjN4.JS0000048)<80? {color: 'red'}:null}}
                    onChange={(e) => {
                      handleInput(e, "JS0000048");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准80分）</span>
                </div>
                <div className="base-item">
                  <span>3.CPR抢救配合考核：</span>
                  <input
                    className="border mar-btom acc-time"
                    type="text"
                    defaultValue={tableObjN4.JS0000128}
                    style={{...appStore.HOSPITAL_ID==='whyx'&&Number(tableObjN4.JS0000128)<85? {color: 'red'}:null}}
                    onChange={(e) => {
                      handleInput(e, "JS0000128");
                    }}
                  />{" "}
                  分<span style={{ marginLeft: 40 }}>（标准85分）</span>
                </div>
                <div className="base-item">
                  <span>4.同行评议结果：</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    values={tableObjN4.JS0000159}
                    inputKey={"JS0000159"}
                    option={[
                      { label: "优秀", value: "A" },
                      { label: "称职", value: "B" },
                      { label: "基本称职", value: "C" },
                      { label: "不称职  ", value: "D" },
                    ]}
                  />（标准：称职及以上）
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className="wrapper-pages-form" style={{ paddingTop: "80px" }}>
      <table>
          <colgroup>
            <col width={80} />
            <col width={240} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
          <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span style={{ marginRight: 99 }}>
                  1.护理服务投诉（标准：无）：
                  </span>
                  <DateModal
                      value={tableObjN4.JS0000129}
                      keys={"JS0000129"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000130}
                    inputKey={"JS0000130"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                   <DateModal
                      value={tableObjN4.JS0000131}
                      keys={"JS0000131"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000132}
                    inputKey={"JS0000132"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item" >
                <span style={{ marginRight: 266 }}></span>
                <DateModal
                      value={tableObjN4.JS0000160}
                      keys={"JS0000160"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000161}
                    inputKey={"JS0000161"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 117 }}>
                  2. 年度绩效考核结果（标准:B级以上）：
                  </span>
                  <DateModal
                      value={tableObjN4.JS0000079}
                      keys={"JS0000079"}
                    />年
                     <input
                        type="text"
                        style={{margin:"0px 10px"}}
                        className="mar-btom border acc-time"
                        defaultValue={tableObjN4.JS0000080}
                        onChange={(e) => {
                          handleInput(e, "JS0000080");
                        }}
                      />
                      <DateModal
                      value={tableObjN4.JS0000081}
                      keys={"JS0000081"}
                    />年
                     <input
                        type="text"
                        style={{margin:"0px 10px"}}
                        className="mar-btom border acc-time"
                        defaultValue={tableObjN4.JS0000082}
                        onChange={(e) => {
                          handleInput(e, "JS0000082");
                        }}
                      />

                </div>
                <div className="base-item" >
                <span style={{ marginRight: 338 }}></span>
                <DateModal
                      value={tableObjN4.JS0000162}
                      keys={"JS0000162"}
                    />年
                     <input
                        type="text"
                        style={{margin:"0px 10px"}}
                        className="mar-btom border acc-time"
                        defaultValue={tableObjN4.JS0000163}
                        onChange={(e) => {
                          handleInput(e, "JS0000163");
                        }}
                      />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 20 }}>
                  3.无个人原因导致的III级护理不良事件（标准:无）   ：
                  </span>
                  <DateModal
                      value={tableObjN4.JS0000083}
                      keys={"JS0000083"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000084}
                    inputKey={"JS0000084"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                  <DateModal
                      value={tableObjN4.JS0000085}
                      keys={"JS0000085"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000086}
                    inputKey={"JS0000086"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />

                </div>
                <div className="base-item" >
                <span style={{ marginRight: 314 }}></span>
                <DateModal
                      value={tableObjN4.JS0000164}
                      keys={"JS0000164"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000165}
                    inputKey={"JS0000165"}
                    option={[
                      { label: "无", value: "A" },
                      { label: "有", value: "B" },
                    ]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 125 }}>
                  4.继续教育学分达标（标准:达标）：
                  </span>
                  <DateModal
                      value={tableObjN4.JS0000166}
                      keys={"JS0000166"}
                    />年
                  <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000167}
                    inputKey={"JS0000167"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />
                  <DateModal
                      value={tableObjN4.JS0000168}
                      keys={"JS0000168"}
                    />年
                     <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000169}
                    inputKey={"JS0000169"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />

                </div>
                <div className="base-item" >
                <span style={{ marginRight: 323 }}></span>
                <DateModal
                      value={tableObjN4.JS0000170}
                      keys={"JS0000170"}
                    />年
                     <SelectBox
                    type="radio"
                    disabled={false}
                    values={tableObjN4.JS0000171}
                    inputKey={"JS0000171"}
                    option={[
                      { label: "达标", value: "A" },
                      { label: "不达标", value: "B" },
                    ]}
                  />
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
                    values={tableObjN4.JS0000022}
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
                    defaultValue={tableObjN4.JS0000024}
                    readOnly
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    defaultValue={tableObjN4.JS0000026}
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
                    disabled={true}
                    values={tableObjN4.JS0000027}
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
                    defaultValue={tableObjN4.JS0000029}
                    readOnly
                  />
                  <span>审核日期：</span>
                  <input
                    type="text"
                    className="wih-150"
                    defaultValue={tableObjN4.JS0000031}
                    readOnly
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
      height: 200px;
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
    .word-item{
      height: 200px;
    }
    .acc-time {
      width: 80px;
    }
    .other-time {
      width: 150px;
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
    }
  }
  .ant-calendar-picker-icon{
    display: none;
  }
  .ant-calendar-picker-clear, .ant-calendar-picker-icon{
    right: 1px;
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
