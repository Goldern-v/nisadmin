import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import SelectBox from "./SelectBox";
import { DatePicker,Input  } from 'antd';
import {PromotionAppUtils} from '../../PromotionAppUtils';
import UserCheckModal from './UserCheckModal'

interface Props{
  printRef?: any;
  obj?:any
}

export default observer(function ApplicationN1(props:Props) {
  const {tableObj} = PromotionAppUtils
  const [yearPickerIsOpen,setyearPickerIsOpen] = useState(false)
  const [yearPickerIsOpen1,setyearPickerIsOpen1] = useState(false)
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false)
  const handleChange = (e:any , value:any) =>{
    tableObj[value] = e
    setyearPickerIsOpen(false)
  }
  const handleChange1 = (e:any , value:any) =>{
    tableObj[value] = e
    setyearPickerIsOpen1(false)
  }

  const handelTextarea = (e:any , value:any) =>{
    let ctext = e.target.value;
    tableObj[value] = ctext
  }

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>, value:any) =>{
    tableObj[value] = e.target.value
  }

  const handleUserCheckOk = (userAudit: any,value:any) => {
    console.log(userAudit,value)
    // auditFormSubmit(userAudit)
    setUserCheckVisible(false)
  }
  
  return (

    <Wrapper ref={props.printRef} id="formPrintPage">
      <div className="zindex-form" style={{display:(PromotionAppUtils.edit == true && PromotionAppUtils.editStatus != '编辑') ? 'none' : ''}}></div>
      <div className="wrapper-pages-form">
        <div className="form-title">
          临床护理人员晋升申请表（N0→N1）（{tableObj.JS0000027 || moment().format("YYYY")}版）
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
                  {/* <Input defaultValue="26888888" value={tableObj.deptName}  onChange={(e)=>{handleInput(e,'deptName')}}/> */}
                  <input className="mar-btom" type="text" value={tableObj.JS0000001} onChange={(e)=>{handleInput(e,'JS0000001')}}/>
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>姓名：</span>
                  <input className="mar-btom" type="text"  value={tableObj.JS0000002} onChange={(e)=>{handleInput(e,'JS0000002')}} />
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>SAP号码：</span>
                  <input className="mar-btom" type="text"  value={tableObj.JS0000003} onChange={(e)=>{handleInput(e,'JS0000003')}} />
                </div>
              </td>
              <td>
                <div className="base-item">
                  <span>来院时间：</span>
                  <input className="mar-btom" type="text"  value={tableObj.JS0000004} onChange={(e)=>{handleInput(e,'JS0000004')}} />
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
                    values={tableObj.JS0000005}
                    inputKey={'JS0000005'}
                    option={[{label:"大专",value:'A'},{label:"本科",value:'B'}]}
                  />
                  （标准、大专及以上）
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  护士执业证书编号:
                  <input className="mar-btom" type="text"  value={tableObj.JS0000006} onChange={(e)=>{handleInput(e,'JS0000006')}} />
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
                    values={tableObj.JS0000007}
                    inputKey={'JS0000007'}
                    option={[ {label:"初级（士）",value:'A'},{label:"初级（师）",value:'B'}]}
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
                    values={tableObj.JS0001001}
                    inputKey={'JS0001001'}
                    option={[ {label:"均填写完成",value:'A'},{label:"未填写完整",value:'B'}]}
                  />（标准：完成相关培训并填写完整）
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
                    values={tableObj.JS0001002}
                    inputKey={'JS0001002'}
                    option={[{label:"CPR资质证",value:'A'},{label:"静脉治疗资质证",value:'B'},{label:"文件书写资质证",value:'C'},{label:"夜班资质证（病区）",value:'D'}]}
                  />（标准：获得以上资质证）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>3、三基理论考核：<DatePicker
                          value={tableObj.JS0001003}
                          open={yearPickerIsOpen}
                          mode='year'
                          className='year-picker'
                          placeholder='全部'
                          format='YYYY'
                          onOpenChange={()=>{setyearPickerIsOpen(true)}}
                          onPanelChange={(e)=>{handleChange(e,'JS0001003')} }
                        />年度</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001004}
                    inputKey={'JS0001004'}
                    option={[ {label:"合格",value:'A'},{label:"补考合格",value:'B'},{label:"未考核",value:'C'}]}
                  />
                  （标准80分，含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>4、专科理论考核：<DatePicker
                          value={tableObj.JS0001005}
                          open={yearPickerIsOpen1}
                          mode='year'
                          className='year-picker'
                          placeholder='全部'
                          format='YYYY'
                          onOpenChange={()=>{setyearPickerIsOpen1(true)}}
                          onPanelChange={(e)=>{handleChange1(e,'JS0001005')}}
                        />年度</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001006}
                    inputKey={'JS0001006'}
                    option={[{label:"合格",value:'A'},{label:"补考合格",value:'B'},{label:"未考核",value:'C'}]}
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
                    values={tableObj.JS0001007}
                    inputKey={'JS0001007'}
                    option={[{label:"能",value:'A'},{label:"暂不能",value:'B'}]}
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
                    values={tableObj.JS0001008}
                    inputKey={'JS0001008'}
                    option={[{label:"工作时间≥12月",value:'A'},{label:"工作时间≤12月",value:'B'}]}
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
                    values={tableObj.JS0001009}
                    inputKey={'JS0001009'}
                    option={[{label:"≥4个月",value:'A'},{label:"＜4个月",value:'B'}]}
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
                    values={tableObj.JS0001010}
                    inputKey={'JS0001010'}
                    option={[{label:"无各长休假假",value:'A'},{label:"有各类假等",value:'B'}]}
                  />
                  （原由及累计时间：<input className="acc-time" type="text"  value={tableObj.JS0001011} onChange={(e)=>{handleInput(e,'JS0001011')}} />）
                  （因孕产连续休假时间≥8个月，或申报晋级前12个月，其他缺勤≥3个月者，不能参加2021年分层晋级）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>5、曾获得何种荣誉： </span>
                  <textarea defaultValue={tableObj.JS0001012} style={{ width: 405,whiteSpace:'pre-wrap',lineHeight:'24px' }} className="textarea" onChange={(e)=>{handelTextarea(e,'JS0001012')}}/>
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
                  <textarea className="textarea-summarize" defaultValue={tableObj.JS0001013} onChange={(e)=>{handelTextarea(e,'JS0001013')}}/>
                  <div style={{ marginLeft: 300 }} className="base-item">
                    <span>申请人签名：</span>
                    <div onClick={()=>{setUserCheckVisible(true)}} className="sign-item">{tableObj.JS0000009}</div>
                    {/* <input className="acc-time" type="text"  value={tableObj.JS0001014} onChange={(e)=>{handleInput(e,'JS0001014')}} /> */}
                    <span>申请日期：</span>
                    <input className="acc-time" type="text"  value={tableObj.JS0000010} onChange={(e)=>{handleInput(e,'JS0000010')}} />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="wrapper-pages-form" style={{paddingTop:"20px"}}>
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
                  <span style={{marginRight:53}}>1.护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0000011}
                    inputKey={'JS0000011'}
                    option={[{label:"合格",value:'A'},{label:"不合格",value:'B'}]}
                  />
                  <span style={{marginLeft:40}}>护士签名：</span>
                  <input type="text" className="mar-btom"  value={tableObj.JS0000012}/>
                  <span style={{marginLeft:13}}>日期：</span>
                  <input type="text" className="mar-btom"  value={tableObj.JS0000014}/>
                </div>
                <div className="base-item">
                  <span style={{marginRight:40}}>2.科护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0000015}
                    inputKey={'JS0000015'}
                    option={[{label:"合格",value:'A'},{label:"不合格",value:'B'}]}
                  />
                  <span style={{marginLeft:40}}>科护士签名：</span>
                  <input type="text" className="mar-btom"  value={tableObj.JS0000016}/>
                  <span>日期：</span>
                  <input type="text" className="mar-btom"  value={tableObj.JS0000018}/>
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
                  <input className="border mar-btom acc-time" type="text"  value={tableObj.JS0001014} onChange={(e)=>{handleInput(e,'JS0001014')}} /> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span>2.床边综合能力考核：</span>
                  <input className="border mar-btom acc-time" type="text"  value={tableObj.JS0001015} onChange={(e)=>{handleInput(e,'JS0001015')}} /> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span>3.读书报告：</span>
                  <input className="border mar-btom acc-time" type="text"  value={tableObj.JS0001016} onChange={(e)=>{handleInput(e,'JS0001016')}} /> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
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
                  <span style={{ marginRight: 126 }}>1.{tableObj.JS0000027 || moment().format("YYYY")}年度无护理服务投诉</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001017}
                    inputKey={'JS0001017'}
                    option={[{label:"无",value:'A'},{label:"有",value:'B'}]}
                  />
                  <span >
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 178 }}>2.{tableObj.JS0000027 || moment().format("YYYY")}年绩效考核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001018}
                    inputKey={'JS0001018'}
                    option={[{label:"A",value:'A'},{label:"B",value:'B'},{label:"C或D",value:'C或D'}]}
                  />
                  <span >
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>3.{tableObj.JS0000027 || moment().format("YYYY")}年无个人原因的III级护理不良事件</span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001019}
                    inputKey={'JS0001019'}
                    option={[{label:"无",value:'A'},{label:"有",value:'B'}]}
                  />
                  <span >
                  （标准分3分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 165 }}>4.{tableObj.JS0000027 || moment().format("YYYY")}年度学分达标 </span>
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0001020}
                    inputKey={'JS0001020'}
                    option={[{label:"达标",value:'A'},{label:"不达标",value:'B'}]}
                  />
                  <span >
                  （标准分3分）  
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
              七、综合评价 
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                科晋级小组
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0000019}
                    inputKey={'JS0000019'}
                    option={[ {label:"同意晋升",value:'A'},{label:"不予晋升",value:'B'}]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input type="text"  className="mar-btom" value={tableObj.JS0000020}/>
                  <span>审核日期：</span>
                  <input type="text" className="mar-btom"  value={tableObj.JS0000022}/>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                护理部
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}      
                    values={tableObj.JS0000023}
                    inputKey={'JS0000023'}
                    option={[{label:"同意晋升",value:'A'},{label:"不予晋升",value:'B'}]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input type="text" className="mar-btom" value={tableObj.JS0000024}/>
                  <span>审核日期：</span>
                  <input type="text" className="mar-btom" value={tableObj.JS0000026}/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="remark">备注：晋级审核请同时提交职称/学历复印件、读书报告（附护士长评语）、床边综合能力考核资料!</div>
        <div className="main-acc">
          <div className="accessory">附件</div>
          <div className="add-accessory">添加附件</div><span>（文件大小不超过5M，支持pdf、word、execl最多上传5份文件）</span>
        </div>
      </div>

      <UserCheckModal
        visible={userCheckVisible}
        onCancel={() => setUserCheckVisible(false)}
        onOk={handleUserCheckOk} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 680px;
  padding: 8px 10px;
  overflow-y: auto;
  font-size: 12px ;
  position: relative;
  .zindex-form{
    position: absolute;
    top: 23px;
    left: 21.5%;
    background-color: transparent;
    width: 780px;
    height: 2200px;
    z-index: 99;
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
            overflow: hidden;
            line-height: 15px;
          }
          .border{
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
    .remark{
      color: #b3b3b3;
      line-height: 26px;
    }
    .main-acc{
      display: flex;
      align-items: center;
    }
    .accessory{
      color: #000;
      margin-right: 20px;
      display: flex;
      align-items: center;
      ::before{
        content: "";
        display: block;
        height: 20px;
        margin-right: 10px;
        width: 10px;
        background-color: #27ba8b;
      }
    }
    .add-accessory{
      color: #27ba8b;
      line-height: 26px;
    }
    .textarea-summarize{
      width: 700px;
      height: 320px;
      line-height:24px;
    }
    .year-picker{
      width: 38px;
      input{
        width: 38px;
      }
    }
    .acc-time{
      width: 80px;
    }
    .sign-item{
      width: 80px;
      height: 26px;
    }
  }
  .ant-calendar-picker-icon , .ant-calendar-picker-clear{
    display: none;
  }
  .ant-input{
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
